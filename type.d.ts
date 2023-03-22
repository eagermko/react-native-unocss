declare module 'cssom' {
  interface Ast {
    cssRules: {
      selectorText: string;
      style: { cssText: string };
    }[];
  }

  function parse(str: string): Ast;

  export { parse };
}

declare module "@babel/helper-module-imports" {
  export function addNamed(path: unknown, name: string, source: string): void;
}