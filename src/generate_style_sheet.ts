import fs from 'fs'
import path from 'path'
import generateUnicode from './utils/generate_unicode'
import { generateClassName, generateRandomString } from './utils/spell_utils'

export interface GenerateStyleSheetArgs {
	options: {
		svgDirectory: string
		outputDirectory: string
		fontName: string
		styleSheetName: string
		classSuffix: string
		classAffix: string
		classNotation: 'camelCase' | 'kebabCase' | 'snakeCase' | 'pascalCase'
		baseUnicode?: TUnicode
		hasTTFFont?: boolean
		hasWOFFFont?: boolean
		hasWOFF2Font?: boolean
		hasSVGFont?: boolean
		fontsDirectory?: string
	}
}

export default function generateStyleSheet({
	options,
}: GenerateStyleSheetArgs): Promise<void> {
	const {
		svgDirectory,
		outputDirectory,
		fontName,
		styleSheetName,
		baseUnicode,
		classAffix,
		classSuffix,
		classNotation,
		hasTTFFont,
		hasWOFFFont,
		hasWOFF2Font,
		hasSVGFont,
		fontsDirectory,
	} = options

	const cacheBuster = generateRandomString(6)

	let styleSheetStr = `
    @font-face {
        font-family: '${fontName}';
		src:
			${
				hasTTFFont &&
				`url('${fontsDirectory}/${fontName}.ttf?${cacheBuster}') format('truetype')`
			}
			${
				hasWOFFFont &&
				`url('${fontsDirectory}/${fontName}.woff?${cacheBuster}') format('woff')`
			}
			${
				hasWOFF2Font &&
				`url('${fontsDirectory}/${fontName}.woff2?${cacheBuster}') format('woff2')`
			}
			${
				hasSVGFont &&
				`url('${fontsDirectory}/${fontName}.svg?${cacheBuster}#${fontName}') format('svg')`
			}
			;
        font-weight: normal;
        font-style: normal;
		font-display: block;
    }
    .icon {
		/* use !important to prevent issues with browser extensions that change fonts */
		font-family: ${fontName} !important;
		speak: never;
		font-style: normal;
		font-weight: normal;
		font-variant: normal;
		text-transform: none;
		line-height: 1;

		/* Better Font Rendering =========== */
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
    }
    `
	const files = fs.readdirSync(svgDirectory)
	const svgFiles = files.filter((file) => path.extname(file) === '.svg')
	svgFiles.forEach((svgFile, index) => {
		const className = generateClassName({
			name: svgFile.replace('.svg', ''),
			affix: classAffix,
			suffix: classSuffix,
			notation: classNotation,
		})
		const unicode = generateUnicode({
			baseUnicode: baseUnicode ?? ('E000' as TUnicode),
			code: index,
		})
		styleSheetStr += `\n\t.${className}:before { content: '\\${unicode}'; }`
	})
	return new Promise((resolve, reject) => {
		fs.writeFile(
			path.join(outputDirectory, `${styleSheetName}.css`),
			styleSheetStr,
			(err) => {
				if (err) reject(err)
				resolve()
			}
		)
	})
}
