import babel, { PluginObj } from '@babel/core';
import { addNamed } from '@babel/helper-module-imports';

/**
 * 将 <View className="abc"></View>
 * 处理为 <UnoStyledFactory component={View} className="abc"></UnoStyledFactory>
 * @param classNamePath
 */
function processOpeningElement(
  classNamePath: babel.NodePath<babel.types.JSXAttribute>,
  t: typeof babel['types']
) {
  const jsxElementPath = classNamePath.findParent(
    (v) => v.type === 'JSXElement'
  )! as babel.NodePath<babel.types.JSXElement>;
  const jsxOpeningElementPath =
    classNamePath.parentPath as babel.NodePath<babel.types.JSXOpeningElement>;

  const openingElementName = jsxOpeningElementPath.node
    .name as babel.types.JSXIdentifier;

  jsxOpeningElementPath.node.attributes.push(
    t.jSXAttribute(
      t.jSXIdentifier('component'),
      t.jsxExpressionContainer(t.identifier(openingElementName.name))
    )
  );

  // rename jsx tag name
  [jsxElementPath.node.openingElement, jsxElementPath.node.closingElement]
    .filter(Boolean)
    .forEach((node) => {
      if (node!.name.type === 'JSXIdentifier') {
        node!.name.name = '_UnoStyled';
      }
    });

  const programPath = classNamePath.findParent(
    (v) => v.type === 'Program'
  ) as any;
  if (programPath.__process) return;
  // add _ prefix
  programPath.__process = true;
  addNamed(programPath, 'UnoStyled', 'unonative');
}

export default ({ types }: typeof babel): PluginObj => {
  return {
    visitor: {
      Program: {
        enter(program) {},
        exit(program) {},
      },
      JSXAttribute(classNamePath) {
        if (classNamePath.node.name.name !== 'className') return;
        processOpeningElement(classNamePath, types);
      },
    },
  };
};
