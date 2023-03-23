import { expect, it } from 'vitest';
import dedent from 'dedent';
import { transform } from '@babel/core';
import plugin from '../src/babel';

function doTransform(input: string) {
  const result = transform(input, {
    plugins: ['syntax-jsx', plugin],
  });

  if (!result) {
    throw new Error('transform failed');
  }

  return result.code!;
}

it('transform and add import', () => {
  const result = doTransform(dedent`
		<View className="123">Hello</View>
	`);

  expect(result).toMatchInlineSnapshot(`
    "import { UnoStyled as _UnoStyled } from \\"unonative\\";
    <_UnoStyled className=\\"123\\" component={View}>Hello</_UnoStyled>;"
  `);
});

it('transform and add import once', () => {
  const result = doTransform(dedent`
    function App() {
      return <View className="123">Hello</View>;
    }    
	`);

  expect(result).toMatchInlineSnapshot(`
    "import { UnoStyled as _UnoStyled } from \\"unonative\\";
    function App() {
      return <_UnoStyled className=\\"123\\" component={View}>Hello</_UnoStyled>;
    }"
  `);
});

it('transform and add import once', () => {
  const result = doTransform(dedent`
    function App() {
      return <View>
      <View className="123">Hello</View>
      <Image className="234"></Image>
      </View>
    }    
	`);

  expect(result).toMatchInlineSnapshot(`
    "import { UnoStyled as _UnoStyled } from \\"unonative\\";
    function App() {
      return <View>
      <_UnoStyled className=\\"123\\" component={View}>Hello</_UnoStyled>
      <_UnoStyled className=\\"234\\" component={Image}></_UnoStyled>
      </View>;
    }"
  `);
});
