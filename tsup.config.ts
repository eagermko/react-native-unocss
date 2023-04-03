import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/transformerEntry.ts',
    'src/preset.ts',
    'src/babel.ts',
  ],
  splitting: false,
  sourcemap: false,
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
  external: [
    'metro-react-native-babel-transformer',
    'react',
    'react-native',
    'react-native-svg',
    '@babel/helper-module-imports',
  ],
});
