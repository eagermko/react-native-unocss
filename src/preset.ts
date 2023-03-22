import { presetReactNative } from './preset-react-native';
import remToPxPreset from './transformer/style-processor';

export const preset = [presetReactNative(), remToPxPreset()];
