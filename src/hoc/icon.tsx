import React from 'react';
import { View, Text } from 'react-native';

const stylesToObject = (styles: Record<string, any>[]) => {
  return styles.reduce((prev, current) => {
    return Object.assign(prev, current);
  }, {});
};

function tryRequireSvgXml() {
  try {
    return require('react-native-svg').SvgXml;
  } catch (e) {
    return null;
  }
}

const SvgXml = tryRequireSvgXml();
function IconSvgXml(props: { icon: string; className: string }) {
  // @ts-ignore
  const { icon, style } = props;
  const styles = React.useMemo(() => stylesToObject(style), [props.className]);
  if (!icon.startsWith('<svg'))
    return (
      <View>
        <Text>{icon} not found</Text>
      </View>
    );

  return (
    <SvgXml
      width={styles.width || '32'}
      height={styles.width || '32'}
      xml={props.icon}
      // @ts-ignore
      style={styles}
    />
  );
}

function IconNotImplement(props: { icon: string; className: string }) {
  return (
    <View>
      <Text>react-native-svg not resolve</Text>
    </View>
  );
}

export function Icon(props: { icon: string; className: string }) {
  return SvgXml ? <IconSvgXml {...props} /> : <IconNotImplement {...props} />;
}
