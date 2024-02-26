interface GenerateUnicodeArgs {
	baseUnicode: TUnicode
	code: number
}

export default function generateUnicode({
	baseUnicode,
	code,
}: GenerateUnicodeArgs): TUnicode {
	const unicodeDec = parseInt(baseUnicode, 16) + code
	const unicode = unicodeDec.toString(16)
	return unicode as TUnicode
}
