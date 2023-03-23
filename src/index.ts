export { UnoStyled, uno, hub as default } from './hoc';
import { Icon as IconX, IconNotImplement } from './hoc';

let Icon = IconX;
try {
  require.resolve('react-native-svg');
} catch (e: any) {
  console.error('react-native-svg not installed');
  Icon = IconNotImplement;
}

export { Icon };
