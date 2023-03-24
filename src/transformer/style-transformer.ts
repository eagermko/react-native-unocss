import { genStyle } from './style-processor';

export default async function styleTransformer(
  source: string,
  context: { projectRoot: string }
): Promise<string> {
  const style = await genStyle(source, context.projectRoot);
  if (!style.size) return source;

  const buf = ['import __unonative__ from "unonative"'];
  buf.push(source);
  buf.push(`__unonative__.register(${style.text})`);
  return buf.join('\n');
}
