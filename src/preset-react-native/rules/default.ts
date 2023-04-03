import type { Rule } from '@unocss/core';
import { transitions } from './transition';
import { borders } from './border';
import { bgColors, opacity, textColors } from './color';
import { flex } from './flex';
import {
  fonts,
  tabSizes,
  textIndents,
  textShadows,
  textStrokes,
} from './typography';
import { gaps } from './gap';
import { overflows } from './layout';
import {
  alignments,
  boxSizing,
  floats,
  insets,
  justifies,
  orders,
  placements,
  positions,
  zIndexes,
} from './position';
import { aspectRatio, sizes } from './size';
import { margins, paddings } from './spacing';
import {
  appearances,
  breaks,
  contains,
  contentVisibility,
  contents,
  cursors,
  displays,
  fontSmoothings,
  fontStyles,
  pointerEvents,
  resizes,
  textOverflows,
  textTransforms,
  userSelects,
  whitespaces,
} from './static';
import { transforms } from './transform';
import { cssProperty, cssVariables } from './variables';
import { textAligns, verticalAligns } from './align';
import { textDecorations } from './decoration';

export const rules: Rule[] = [
  cssVariables,
  cssProperty,
  paddings,
  margins,
  displays,
  opacity,
  bgColors,
  borders,
  contentVisibility,
  contents,
  fonts,
  tabSizes,
  textIndents,
  textOverflows,
  textDecorations,
  textStrokes,
  textShadows,
  textTransforms,
  textAligns,
  textColors,
  fontStyles,
  fontSmoothings,
  flex,
  gaps,
  positions,
  sizes,
  aspectRatio,
  cursors,
  appearances,
  pointerEvents,
  resizes,
  verticalAligns,
  userSelects,
  whitespaces,
  breaks,
  overflows,
  orders,
  justifies,
  alignments,
  placements,
  insets,
  floats,
  zIndexes,
  boxSizing,
  transitions,
  transforms,
  contains,
].flat(1);
