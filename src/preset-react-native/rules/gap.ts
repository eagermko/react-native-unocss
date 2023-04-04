import type { Rule, RuleContext } from '@unocss/core'
import type { Theme } from '../theme'
import { handler as h } from '../utils'

const directions: Record<string, string> = {
  '': '',
  'x': 'column-',
  'y': 'row-',
}

const handleGap = ([, d = '', s]: string[], { theme }: RuleContext<Theme>) => {
  const v = theme.spacing?.[s] ?? h.bracket.cssvar.global.rem(s)
  if (v != null) {
    return {
      [`grid-${directions[d]}gap`]: v,
      [`${directions[d]}gap`]: v,
    }
  }
}

export const gaps: Rule[] = [
  [/^(?:flex-|grid-)?gap-?()(.+)$/, handleGap, { autocomplete: ['gap-$spacing', 'gap-<num>'] }],
  [/^(?:flex-|grid-)?gap-([xy])-?(.+)$/, handleGap, { autocomplete: ['gap-(x|y)-$spacing', 'gap-(x|y)-<num>'] }],
]
