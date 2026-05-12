import { readFileSync } from 'node:fs'
import {
  GherkinClassicTokenMatcher,
  GherkinInMarkdownTokenMatcher,
  Parser,
} from './dist/src/index.js'
import TokenFormatterBuilderModule from './dist/src/TokenFormatterBuilder.js'

const TokenFormatterBuilder = TokenFormatterBuilderModule.default || TokenFormatterBuilderModule

const [path] = process.argv.slice(2)

const builder = new TokenFormatterBuilder()
const matcher = path.endsWith('.md')
  ? new GherkinInMarkdownTokenMatcher()
  : new GherkinClassicTokenMatcher()
const parser = new Parser(builder, matcher)
const source = readFileSync(path, { encoding: 'utf-8' })

const result = parser.parse(source)
process.stdout.write(`${result}\n`)
