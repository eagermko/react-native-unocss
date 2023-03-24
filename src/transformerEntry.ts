// @ts-ignore
import upstreamTransformer from 'metro-react-native-babel-transformer';
import transform from './transformer';

const unoTransformer = {
  async transform(info: any) {
    let { filename, options, src, plugins } = info;
    if (!filename.startsWith('node_modules')) {
      src = await transform(src, options);
    }
    return upstreamTransformer.transform({ filename, options, src, plugins });
  },
};

export = unoTransformer;
