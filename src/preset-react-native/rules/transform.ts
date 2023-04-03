import type { Rule } from 'unocss'
import { handler as h } from '../utils'

export const transforms: Rule[] = [
  // base
  [/transform-(.*)$/, ([_, str]) => {
    return { transform: h.bracket(str) || str };
  }],
  ['transform-none', { transform: '' }],
]
