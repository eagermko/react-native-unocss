import { expect, it } from 'vitest';
import dedent from 'dedent';
import svgTransformer from '../src/transformer/svg-transformer';

it('replace icon with svgxml', async () => {
  const input = dedent`
		<Icon icon="charm-archive" />
		<Icon icon="charm-archive-x" />
	`;

  const result = await svgTransformer(input);
  expect(result).toMatchInlineSnapshot(`
		"<Icon icon='<svg viewBox=\\"0 0 16 16\\" width=\\"1em\\" height=\\"1em\\" ><path fill=\\"none\\" stroke=\\"currentColor\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\" stroke-width=\\"1.5\\" d=\\"M1.75 2.75h12.5v3.5H1.75zm5 6.5h2.5m-6.5-2.5v7.5h10.5v-7.5\\"/></svg>' />
				<Icon icon=\\"charm-archive-x\\" />"
	`);
});
