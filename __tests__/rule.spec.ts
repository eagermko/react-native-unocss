import { expect, it } from 'vitest';
import transform from '../src/transformer';

it('rule transform', async () => {
  const source = `<Text className='transform-[rotateX(45deg)_rotateZ(0.785398rad)]'>Hello</Text>`;
  const result = await transform(source, { projectRoot: __dirname });

  expect(result).toMatchInlineSnapshot(`
    "import __unonative__ from \\"unonative\\"
    <Text className='transform-[rotateX(45deg)_rotateZ(0.785398rad)]'>Hello</Text>
    __unonative__.register({\\"transform-[rotateX(45deg)_rotateZ(0.785398rad)]\\":{\\"transform\\":[{\\"rotateZ\\":\\"0.785398rad\\"},{\\"rotateX\\":\\"45deg\\"}]}})"
  `);
});
