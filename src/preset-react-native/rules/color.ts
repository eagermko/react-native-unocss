import type { Rule } from '@unocss/core'
import { colorResolver, globalKeywords, handler as h } from '../utils'
import { numberWithUnitRE } from '../_utils/handlers/regex'

/**
 * @example op10 op-30 opacity-100
 */
export const opacity: Rule[] = [
  [/^op(?:acity)?-?(.+)$/, ([, d]) => ({ opacity: h.bracket.percent.cssvar(d) })],
]

/**
 * @example c-red color-red5 text-red-300
 */
export const textColors: Rule[] = [
  [/^(?:color|c)-(.+)$/, colorResolver('color', 'text'), { autocomplete: '(color|c)-$colors' }],
  // auto detection and fallback to font-size if the content looks like a size
  [/^text-(.+)$/, colorResolver('color', 'text', css => !css.color?.toString().match(numberWithUnitRE)), { autocomplete: 'text-$colors' }],
  [/^(?:text|color|c)-(.+)$/, ([, v]) => globalKeywords.includes(v) ? { color: v } : undefined, { autocomplete: `(text|color|c)-(${globalKeywords.join('|')})` }],
]

export const bgColors: Rule[] = [
  [/^bg-(.+)$/, colorResolver('background-color', 'bg'), { autocomplete: 'bg-$colors' }],
]
