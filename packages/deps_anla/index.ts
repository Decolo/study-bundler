import path from 'path';
import fs from 'fs';
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
// import generate from "@babel/generator"

const projectPath = process.cwd();

const map: Record<string, {
  path: string;
  deps: string[];
  code: string;
}> = {};
const rootFilePath = './src/a.js';
const rootFileAbsPath = path.resolve(projectPath, rootFilePath);

const handlFile = (absPath: string) => {
  const filename = path.basename(absPath);
  const dirname  = path.dirname(absPath);

  if (!filename) return;

  const orginalCode = fs.readFileSync(absPath, {
    encoding: 'utf-8'
  });
  if (!map[filename]) {
    map[filename] = {
      path: absPath,
      deps: [],
      code: orginalCode
    };
  } else {
    return;
  }



  const ast = parse(orginalCode, {
    sourceType: 'module'
  })

  traverse(ast, {
    enter(node) {
      // debugger
      if (
        // node.type === 'ImportDeclaration'
      // &&
      node.node.type === 'ImportDeclaration') {
        if (node?.node?.source?.value) {
          const newAbsPath = path.resolve(dirname, node?.node?.source?.value);
          // debugger
          if(fs.lstatSync(newAbsPath).isFile()) {
            map[filename].deps.push(newAbsPath);

            handlFile(newAbsPath)
          }

        }
      }
    }
  })

}

handlFile(rootFileAbsPath);

debugger





