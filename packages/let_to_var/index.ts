import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator"

const code = 'let foo = "foo"; let bar = "let"';
const ast = parse(code, {
  sourceType: "module",
});

traverse(ast, {
  enter(path) {
    if (
      path.type === "VariableDeclaration" &&
      path.node.type === "VariableDeclaration" &&
      path.node.kind === "let"
    ) {
      path.node.kind = "var";
    }
  },
});

const result = generate(ast, {}, code)
debugger


