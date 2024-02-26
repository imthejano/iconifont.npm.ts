import SVGIcons2SVGFontStream from 'svgicons2svgfont'
import fs from 'fs'
import path from 'path'
import generateUnicode from './utils/generate_unicode'
import { generateClassName } from './utils/spell_utils'

export interface GenerateSVGArgs {
	options: {
		svgDirectory: string
		outputDirectory: string
		fontName: string
		baseUnicode?: TUnicode
		classSuffix: string
		classAffix: string
		classNotation: 'camelCase' | 'kebabCase' | 'snakeCase' | 'pascalCase'
	}
}

export default function generateSVG({
	options,
}: GenerateSVGArgs): Promise<void> {
	if (!options.svgDirectory) throw new Error('svgDirectory is required')
	if (!fs.statSync(options.svgDirectory).isDirectory())
		throw new Error('svgDirectory must be a directory')

	return new Promise((resolve, reject) => {
		const fontStream = new SVGIcons2SVGFontStream({
			fontName: options.fontName,
			normalize: true,
			fontHeight: 1000,
			centerHorizontally: true,
			centerVertically: true,
			fixedWidth: true,
		})
		const { outputDirectory, fontName, baseUnicode, svgDirectory } = options
		const outputPath = path.join(outputDirectory, `${fontName}.svg`)
		fontStream
			.pipe(fs.createWriteStream(outputPath))
			.on('finish', () => resolve())
			.on('error', (error) => reject(error))

		const files = fs.readdirSync(svgDirectory)
		const svgFiles = files.filter((file) => path.extname(file) === '.svg')

		svgFiles.forEach((svgFile, index) => {
			const unicodeHex = generateUnicode({
				baseUnicode: (baseUnicode as TUnicode) ?? 'E000',
				code: index,
			})
			const unicode = String.fromCharCode(parseInt(unicodeHex, 16))
			const glyph = fs.createReadStream(
				path.join(svgDirectory, svgFile)
			) as any
			glyph.metadata = {
				unicode: [unicode],
				id: unicodeHex,
				name: generateClassName({
					name: svgFile.replace('.svg', ''),
					suffix: options.classSuffix,
					affix: options.classAffix,
					notation: options.classNotation,
				}),
				stream: glyph,
			}
			fontStream.write(glyph)
		})
		fontStream.end()
	})
}
