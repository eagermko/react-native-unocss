import type { StyleProp, ViewStyle } from 'react-native/types';

class Hub {
  private styleHub = new Map<string, any>();
  register = (styleObject: Record<string, any>) => {
    for (const [k, v] of Object.entries(styleObject)) {
      this.styleHub.set(k, v);
    }
  };
  get(v: string) {
    return this.styleHub.get(v.trim());
  }
}

const hub = new Hub();

function uno(className: string): StyleProp<ViewStyle> {
  className = className || '';
  const style = className.split(' ').map((v) => hub.get(v));

  return style;
}

export { uno, hub };
