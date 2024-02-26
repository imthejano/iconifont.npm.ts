# Iconifont

This Node.js package allows you to transform all SVG files in a directory into four font files: SVG, TTF, WOFF, and WOFF2. Additionally, it generates a CSS stylesheet to facilitate their usage in web projects.

## Installation

To install this package, you can use npm:

```bash
npm install --save-dev @imjano/iconifont
```

## Usage

Here's an example of how to use this package in a TypeScript project:

```typescript
import generateIconifont, { IGenerateIconifontArgs } from '@imjano/iconifont'

async function generateFonts() {
	const options: GenerateIconifontArgs = {
		svgDirectory: './my_svg_directory',
		outputFontDirectory: './fonts',
		outputCSSDirectory: './css',
		fontName: 'myIconFont',
		classSuffix: 'icon',
		classAffix: 'font',
		classNotation: 'camelCase',
		baseUnicode: 'E001',
	}

	try {
		await generateIconifont(options)
		console.log('Fonts and stylesheet generated successfully!')
	} catch (error) {
		console.error('An error occurred while generating fonts:', error)
	}
}
```

| Parameter           | Description                                                                                                                                                                                                                      |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| svgDirectory        | The path to the directory containing the SVG files to be used for generating the fonts.                                                                                                                                          |
| outputFontDirectory | The path to the directory where the font files (SVG, TTF, WOFF, WOFF2) will be generated.                                                                                                                                        |
| outputCSSDirectory  | The path to the directory where the CSS stylesheet will be generated.                                                                                                                                                            |
| fontName            | The name to be used for the generated font.                                                                                                                                                                                      |
| classSuffix         | The suffix to be appended to the classes of the icons in the CSS stylesheet.                                                                                                                                                     |
| classAffix          | The affix to be appended to the font name in the CSS stylesheet.                                                                                                                                                                 |
| classNotation       | The notation to be used for naming the classes of the icons in the CSS stylesheet.                                                                                                                                               |
| baseUnicode         | The base Unicode value to be used for assigning Unicode codes to the icons in the stylesheet. It's recommended to use E001 as it falls within the "Private Use Area" of Unicode, ensuring no conflicts with standard characters. |
