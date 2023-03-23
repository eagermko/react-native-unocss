import React from 'react';
import { SvgXml } from 'react-native-svg';

const stylesToObject = (styles: Record<string, any>[]) => {
  return styles.reduce((prev, current) => {
    return Object.assign(prev, current);
  }, {});
};

export default function Icon(props: { icon: string; className: string }) {
  // @ts-ignore
  const { icon, style } = props;
  const styles = React.useMemo(() => stylesToObject(style), [props.className]);
  if (!icon.startsWith('<svg')) return null;
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
