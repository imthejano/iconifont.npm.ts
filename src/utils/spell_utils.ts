interface GenerateClassNameArgs {
	name: string
	suffix: string
	affix: string
	notation: 'camelCase' | 'kebabCase' | 'snakeCase' | 'pascalCase'
}

export function generateClassName(params: GenerateClassNameArgs): string {
	const { name, suffix, affix, notation } = params
	const transformedSuffix = transformString(suffix, notation)
	const transformedName = transformString(name, notation)
	const transformedAffix = transformString(affix, notation)

	return transformedSuffix + transformedName + transformedAffix
}

export function transformString(
	str: string,
	notation: 'camelCase' | 'kebabCase' | 'snakeCase' | 'pascalCase'
): string {
	switch (notation) {
		case 'camelCase':
			return toCamelCase(str)
		case 'kebabCase':
			return toKebabCase(str)
		case 'snakeCase':
			return toSnakeCase(str)
		case 'pascalCase':
			return toPascalCase(str)
		default:
			throw new Error('Invalid notation')
	}
}

export function toCamelCase(str: string): string {
	return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
}

export function toKebabCase(str: string): string {
	return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

export function toSnakeCase(str: string): string {
	return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()
}

export function toPascalCase(str: string): string {
	return str
		.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
			return index === 0 ? letter.toUpperCase() : letter.toLowerCase()
		})
		.replace(/\s+/g, '')
}

export function generateRandomString(length: number): string {
	const characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	let randomString = ''
	for (let i = 0; i < length; i++) {
		randomString += characters.charAt(
			Math.floor(Math.random() * characters.length)
		)
	}
	return randomString
}
