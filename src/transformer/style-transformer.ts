import { genStyle } from './style-processor';

export default async function styleTransformer(
  source: string
): Promise<string> {
  const style = await genStyle(source);
  if (!style.size) return source;

  const buf = ['import __unonative__ from "unonative"'];
  buf.push(source);
  buf.push(`__unonative__.register(${style.text})`);
  return buf.join('\n');
}
