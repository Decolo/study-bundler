import path, { relative } from "path";
import fs from "fs";
import * as babel from "@babel/core";
import { parse } from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";

type Module = {
  path: string;
  deps: string[];
  // code: (require: Function, bundleModule: any, exports: any) => void;
  code: string;
};

const resolveCWD = (_path: string) => {
  return path.resolve(process.cwd(), _path);
};

const handlFile = (absPath: string, modules: Record<string, Module>) => {
  const filename = path.basename(absPath);
  const dirname = path.dirname(absPath);
  const relaPath = path.relative(__dirname, absPath);

  if (!absPath || !filename) return;

  const originalCode = fs.readFileSync(absPath, {
    encoding: "utf-8",
  });

  if (!modules[relaPath]) {
    let newModule: Module = {
      path: absPath,
      deps: [],
      code: "",
    };

    modules[relaPath] = newModule;

    if (path.extname(filename) === ".js") {
      const ast = parse(originalCode, {
        sourceType: "module",
      });

      traverse(ast, {
        enter(node) {
          if (node.node.type === "ImportDeclaration") {
            if (node?.node?.source?.value) {
              const newAbsPath = path.resolve(
                dirname,
                node?.node?.source?.value
              );

              if (fs.lstatSync(newAbsPath).isFile()) {
                node.node.source.value = path.relative(__dirname, newAbsPath);

                newModule.deps.push(newAbsPath);

                handlFile(newAbsPath, modules);
              } else {
                throw `This is not file: ${newAbsPath}`;
              }
            }
          }
        },
      });

      const { code: newCode } = generate(ast, {}, originalCode) as {
        code: string;
      };

      const { code: es5Code } = babel.transform(newCode, {
        presets: ["@babel/preset-env"],
      }) as { code: string };

      newModule.code = es5Code;
    }

    if (path.extname(filename) === ".css") {
      newModule = {
        path: absPath,
        deps: [],
        code: originalCode,
      };
    }
  } else {
    return;
  }
};

(async () => {
  const entryPath = "./src/index.js";
  const entryFileAbsPath = resolveCWD(entryPath);
  const entryFileRelPath = path.relative(__dirname, entryFileAbsPath);
  const modules: Record<string, Module> = {};

  handlFile(entryFileAbsPath, modules);

  fs.writeFileSync(
    resolveCWD("./publicBundle/public/app.js"),
    `
    (function (modules) {
      const cacheModuleMap = {};

      function execute(id) {
        let bundleModule = null;

        if (cacheModuleMap[id]) {
          return cacheModuleMap[id].exports;
        } else {
          cacheModuleMap[id] = bundleModule = {
            id,
            esModule: true,
            exports: {}
          }
        }

        const require = (key) => {
          return execute(key);
        }

        modules[id](require, bundleModule, bundleModule.exports)

        return bundleModule.exports;
      }

        execute("${entryFileRelPath}");
      })({
        ${Object.entries(modules)
          .map(([key, value]) => {
            return `"${key}": function(require, module, exports) {
              eval(${JSON.stringify(value.code)});
            }`;
          })
          .join(",\n")}
      })
  `
  );
})();
