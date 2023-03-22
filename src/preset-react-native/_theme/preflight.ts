import { transformBase } from '../rules'
import type { Theme } from './types'

export const preflightBase = {
  ...transformBase,
} satisfies Theme['preflightBase']
