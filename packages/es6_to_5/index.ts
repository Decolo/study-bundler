import { transformFromAstSync } from '@babel/core';
import { parse } from '@babel/parser';

const code = 'let foo = "foo"; let bar = "let"';

const ast = parse(code, { sourceType: 'module' });

const result = transformFromAstSync(ast, code, {
  presets: ['@babel/preset-env']
})

debugger