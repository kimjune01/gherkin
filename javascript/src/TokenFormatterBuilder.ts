import type * as messages from '@cucumber/messages'
import type AstNode from './AstNode'
import type { IAstBuilder } from './IAstBuilder'
import type IToken from './IToken'
import type { Item } from './IToken'
import { type RuleType, TokenType } from './Parser'

/**
 * A builder that formats tokens as strings, matching the output format
 * used by acceptance tests across all Gherkin implementations.
 *
 * Format: (line:column)TokenType:(KeywordType)Keyword/Text/Items
 */
export default class TokenFormatterBuilder implements IAstBuilder<AstNode, TokenType, RuleType> {
  stack: AstNode[] = []
  comments: messages.Comment[] = []
  readonly newId: messages.IdGenerator.NewId = () => '0'

  private tokens: IToken<TokenType>[] = []

  reset(): void {
    this.tokens = []
  }

  startRule(_ruleType: RuleType): void {
    // no-op
  }

  endRule(): void {
    // no-op
  }

  build(token: IToken<TokenType>): void {
    this.tokens.push(token)
  }

  getResult(): string {
    return this.tokens.map((token) => formatToken(token)).join('\n')
  }

  currentNode(): AstNode {
    return undefined as unknown as AstNode
  }

  getLocation(token: IToken<TokenType>, column?: number): messages.Location {
    return !column ? token.location : { line: token.location.line, column }
  }

  getTags(_node: AstNode): readonly messages.Tag[] {
    return []
  }

  getCells(_tableRowToken: IToken<TokenType>): readonly messages.TableCell[] {
    return []
  }

  getDescription(_node: AstNode): string {
    return ''
  }

  getSteps(_node: AstNode): messages.Step[] {
    return []
  }

  getTableRows(_node: AstNode): readonly messages.TableRow[] | undefined {
    return undefined
  }

  ensureCellCount(_rows: readonly messages.TableRow[]): void {
    // no-op
  }

  transformNode(_node: AstNode): unknown {
    return undefined
  }
}

function formatToken(token: IToken<TokenType>): string {
  if (token.isEof) {
    return 'EOF'
  }

  const line = token.location.line ?? ''
  const column = token.location.column ?? ''
  const tokenTypeName = TokenType[token.matchedType]
  const keyword = token.matchedKeyword
    ? `(${token.matchedKeywordType ?? ''})${token.matchedKeyword}`
    : ''
  const text = token.matchedText ?? ''
  const items = token.matchedItems
    ? token.matchedItems.map((item: Item) => `${item.column}:${item.text}`).join(',')
    : ''

  return `(${line}:${column})${tokenTypeName}:${keyword}/${text}/${items}`
}
