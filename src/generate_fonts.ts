import fs from 'fs'
import svg2ttf from 'svg2ttf'
import ttf2woff from 'ttf2woff'

export interface GenerateTTFArgs {
	svgContent: string
	outputDirectory: string
	fontName: string
}

export function generateTTF({
	svgContent,
	outputDirectory,
	fontName,
}: GenerateTTFArgs) {
	const ttf = svg2ttf(svgContent, {
		url: 'https://imjano.com',
	})
	fs.writeFileSync(
		`${outputDirectory}/${fontName}.ttf`,
		Buffer.from(ttf.buffer)
	)
}

export interface GenerateWOFFArgs {
	ttf: Uint8Array
	outputDirectory: string
	fontName: string
}

export function generateWOFF({
	ttf,
	outputDirectory,
	fontName,
}: GenerateWOFFArgs) {
	const woff = ttf2woff(ttf)
	fs.writeFileSync(
		`${outputDirectory}/${fontName}.woff`,
		Buffer.from(woff.buffer)
	)
}

export interface GenerateWOFF2Args {
	ttf: Uint8Array
	outputDirectory: string
	fontName: string
}

export function generateWOFF2({
	ttf,
	outputDirectory,
	fontName,
}: GenerateWOFF2Args) {
	const woff2 = ttf2woff(ttf)
	fs.writeFileSync(
		`${outputDirectory}/${fontName}.woff2`,
		Buffer.from(woff2.buffer)
	)
}
