import { transform as babelTransform } from '@babel/core';
import dedent from 'dedent';
import { expect, it } from 'vitest';
import plugin from '../src/babel';
import transform from '../src/transformer';

function doBabelTransform(input: string) {
  const result = babelTransform(input, {
    plugins: ['syntax-jsx', plugin],
  });

  if (!result) {
    throw new Error('transform failed');
  }

  return result.code!;
}

const source = dedent`
import { Icon } from 'unonative';
function App() {
  return (
    <View className='bg-red-100'>
      <Text className='text-lg'>Hello</Text>
      <Text className='text-lg'>Word</Text>
      <Icon icon='cib-addthis' className='h-8 w-8' />
		</View>
	);
}
`;

it('transform code correctly', async () => {
	const result = await transform(source);
	const babelResult = await doBabelTransform(result);

	expect(babelResult).toMatchInlineSnapshot(`
		"import { UnoStyled as _UnoStyled } from \\"unonative\\";
		import __unonative__ from \\"unonative\\";
		import { Icon } from 'unonative';
		function App() {
		  return <_UnoStyled className='bg-red-100' component={View}>
		     <_UnoStyled className='text-lg' component={Text}>Hello</_UnoStyled>
		     <_UnoStyled className='text-lg' component={Text}>Word</_UnoStyled>
		     <_UnoStyled icon='<svg viewBox=\\"0 0 32 32\\" width=\\"1em\\" height=\\"1em\\" ><path fill=\\"currentColor\\" d=\\"M24 17.995h-6v5.979h-4v-5.979H8v-3.984h6V8.027h4v5.984h6zM28 .052H4a4.008 4.008 0 0 0-4 3.99v23.922a4.007 4.007 0 0 0 4 3.984h24a4.007 4.007 0 0 0 4-3.984V4.042a4.01 4.01 0 0 0-4-3.99z\\"/></svg>' className='h-8 w-8' component={Icon} />
				</_UnoStyled>;
		}
		__unonative__.register({
		  \\"bg-red-100\\": {
		    \\"backgroundColor\\": \\"rgba(254,226,226,1)\\"
		  },
		  \\"text-lg\\": {
		    \\"fontSize\\": 18
		  },
		  \\"h-8\\": {
		    \\"height\\": 32
		  },
		  \\"w-8\\": {
		    \\"width\\": 32
		  }
		});"
	`);
});
