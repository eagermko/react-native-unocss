import styleTransformer from './style-transformer';
import svgTransformer from './svg-transformer';

export const pipeline = [styleTransformer, svgTransformer];

export default async function transform(
  source: string,
  context: { projectRoot: string }
) {
  let result = source;
  for (const trans of pipeline) {
    result = await trans(result, context);
  }
  return result;
}

export { styleTransformer, svgTransformer };
