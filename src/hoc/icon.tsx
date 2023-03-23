import React from 'react';
import { View, Text } from 'react-native';

const stylesToObject = (styles: Record<string, any>[]) => {
  return styles.reduce((prev, current) => {
    return Object.assign(prev, current);
  }, {});
};

export default function Icon(props: { icon: string; className: string }) {
  const SvgXml = require('react-native-svg').SvgXml;
  // @ts-ignore
  const { icon, style } = props;
  const styles = React.useMemo(() => stylesToObject(style), [props.className]);
  if (!icon.startsWith('<svg'))
    return (
      <View>
        <Text>{icon} Not Found</Text>
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

export function IconNotImplement(props: { icon: string; className: string }) {
  return (
    <View>
      <Text>react-native-svg not resolve</Text>
    </View>
  );
}
