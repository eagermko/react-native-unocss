import { loadConfig } from '@unocss/config';
import transform from 'css-to-react-native';
import cssom from 'cssom';
import { Preset, UnoGenerator } from '@unocss/core';
import { presetReactNative } from '../preset-react-native';

const remRE = /(-?[\.\d]+)rem/g;

export interface RemToPxOptions {
  /**
   * 1rem = n px
   * @default 16
   */
  baseFontSize?: number;
}
export default function remToPxPreset(options: RemToPxOptions = {}): Preset {
  const { baseFontSize = 16 } = options;

  return {
    name: '@unocss/preset-rem-to-px',
    postprocess: (util) => {
      util.entries.forEach((i) => {
        const value = i[1];
        if (value && typeof value === 'string' && remRE.test(value))
          i[1] = value.replace(remRE, (_, p1) => `${p1 * baseFontSize}px`);
      });
    },
  };
}

export const preset = [presetReactNative(), remToPxPreset()];

function toTuple(style: any) {
  const tuple: [string, string][] = [];
  for (let i = 0; i < style.length; i++) {
    const key = style[i];
    const value = style.getPropertyValue(key);
    tuple.push([key, value]);
  }

  return tuple;
}

class StyleSheet {
  private styleSheet: Record<string, any> = {};
  add(rule: string, sheet: any) {
    // 因为不是 css规则,所以不需要转义
    this.styleSheet[rule.replaceAll('\\', '')] = sheet;
  }
  get text() {
    return JSON.stringify(this.styleSheet);
  }
  get sheet() {
    return this.styleSheet;
  }
  get size() {
    return Object.keys(this.styleSheet).length;
  }
}

function uniq(arr: any[]) {
  const result: any[] = [];
  for (const item of arr) {
    if (!result.includes(item)) result.push(item);
  }

  return result;
}

export async function loadUnoConfig(workdir: string) {
  const defaultConfig = { presets: preset };
  if (!workdir) return defaultConfig;

  const { config, sources } = await loadConfig(workdir);
  if (!sources.length) {
    return defaultConfig;
  }

  config.presets ??= [];
  // @ts-ignore
  config.presets = uniq([...config.presets, ...preset]);

  return config;
}

let _generator: UnoGenerator;
export async function resolveGenerator(workdir: string) {
  if (process.env.NODE_ENV !== 'test' && _generator) {
    return _generator;
  }

  const config = await loadUnoConfig(workdir);
  // @ts-ignore
  _generator = new UnoGenerator(config);
  return _generator;
}

export async function genStyle(source: string, workdir: string = '') {
  const generator = await resolveGenerator(workdir);
  const tokens = await generator.applyExtractors(source);
  const result = await generator.generate(tokens);
  const ast = cssom.parse(result.css);

  const styleSheet = new StyleSheet();

  for (const rule of ast.cssRules) {
    for (const selector of rule.selectorText.split(',')) {
      let _select = selector.trim().replace(/^./, '');
      styleSheet.add(_select, transform(toTuple(rule.style)));
    }
  }

  return styleSheet;
}
