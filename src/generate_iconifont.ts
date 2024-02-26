import generateSVG, { GenerateSVGArgs } from './generate_svg'
import generateStyleSheet, {
	GenerateStyleSheetArgs,
} from './generate_style_sheet'
import fs from 'fs'
import path from 'path'
import { generateTTF, generateWOFF, generateWOFF2 } from './generate_fonts'

export interface GenerateIconifontArgs {
	options: {
		svgDirectory: string
		outputFontDirectory: string
		outputCSSDirectory: string
		fontName: string
		classSuffix: string
		classAffix: string
		classNotation: 'camelCase' | 'kebabCase' | 'snakeCase' | 'pascalCase'
		baseUnicode: TUnicode | string
	}
}

export default async function generateIconifont({
	options,
}: GenerateIconifontArgs): Promise<void> {
	const {
		svgDirectory,
		outputFontDirectory,
		outputCSSDirectory,
		fontName,
		classSuffix,
		classAffix,
		classNotation,
		baseUnicode,
	} = options

	const isSvgDirectoryExists =
		fs.existsSync(svgDirectory) && fs.existsSync(svgDirectory)
	if (!isSvgDirectoryExists)
		throw new Error('svgDirectory does not exist or is not a directory.')

	const isOutputFontDirectoryExists = fs.existsSync(outputFontDirectory)
	if (!isOutputFontDirectoryExists) {
		fs.mkdirSync(outputFontDirectory, { recursive: true })
	}
	const isOutputCSSDirectoryExists = fs.existsSync(outputCSSDirectory)
	if (!isOutputCSSDirectoryExists) {
		fs.mkdirSync(outputCSSDirectory, { recursive: true })
	}

	if (
		typeof baseUnicode !== 'string' ||
		!/^[0-9A-Fa-f]{4}$/.test(baseUnicode)
	) {
		throw new Error(
			'baseUnicode must be a valid hexadecimal number of 4 digits. Example: E000, E001, ... E002.'
		)
	}

	const svgOptions: GenerateSVGArgs['options'] = {
		outputDirectory: outputFontDirectory,
		fontName,
		svgDirectory,
		baseUnicode: (baseUnicode as TUnicode) ?? 'E000',
		classSuffix,
		classAffix,
		classNotation,
	}
	const styleSheetOptions: GenerateStyleSheetArgs['options'] = {
		svgDirectory,
		outputDirectory: outputCSSDirectory,
		fontName,
		classSuffix,
		classAffix,
		classNotation,
		styleSheetName: fontName,
		hasSVGFont: true,
		hasTTFFont: true,
		hasWOFFFont: true,
		hasWOFF2Font: true,
		fontsDirectory: outputFontDirectory,
		baseUnicode: (baseUnicode as TUnicode) ?? 'E000',
	}

	try {
		await generateSVG({ options: svgOptions })
		const svgDirectory = path.join(outputFontDirectory, `${fontName}.svg`)
		const ttfDirectory = path.join(outputFontDirectory, `${fontName}.ttf`)
		await generateStyleSheet({ options: styleSheetOptions })
		const svgContent = fs.readFileSync(svgDirectory, 'utf-8')
		await generateTTF({
			svgContent,
			outputDirectory: outputFontDirectory,
			fontName,
		})
		const ttfContent = fs.readFileSync(ttfDirectory)
		await generateWOFF({
			ttf: ttfContent,
			outputDirectory: outputFontDirectory,
			fontName,
		})
		await generateWOFF2({
			ttf: ttfContent,
			outputDirectory: outputFontDirectory,
			fontName,
		})
	} catch (error) {
		throw new Error(error as string)
	}
}
