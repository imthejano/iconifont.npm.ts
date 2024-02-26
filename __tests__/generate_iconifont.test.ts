import generateIconifont, {
	GenerateIconifontArgs,
} from '../src/generate_iconifont'

describe('generateIconifont', () => {
	it('should generate iconifont', () => {
		const mockOptions: GenerateIconifontArgs = {
			options: {
				svgDirectory: '__tests__/svgtest',
				outputFontDirectory: '__tests__/output/fonts',
				outputCSSDirectory: '__tests__/output/styles',
				fontName: 'iconifont',
				classSuffix: 'icon',
				classAffix: 'font',
				classNotation: 'camelCase',
				baseUnicode: 'E001',
			},
		}

		try {
			expect(() => generateIconifont(mockOptions).then()).not.toThrow()
		} catch (e) {
			console.error(e)
			throw e
		}
	})
})
