import dedent from 'dedent';
import { expect, it } from 'vitest';
import { loadUnoConfig } from '../src/transformer/style-processor';

it('should resolve config', async () => {
  const result = await loadUnoConfig(__dirname);
  expect(result).toHaveProperty('theme.colors.primary');
	expect(result.presets).toHaveLength(2);
});
