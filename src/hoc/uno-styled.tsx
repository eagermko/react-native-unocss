import React from 'react';
import { uno } from './hub';

export default function UnoStyled(props: any) {
  const { component: Component, ...rest } = props;

  const style = uno(rest.className);

  return <Component {...props} style={style} />;
}
