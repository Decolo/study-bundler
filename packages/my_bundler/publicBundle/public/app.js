
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

        execute("src/index.js");
      })({
        "src/index.js": function(require, module, exports) {
              eval("\"use strict\";\n\nvar _childA = require(\"src/components/childA.js\");\n\nvar _childB = require(\"src/components/childB.js\");\n\nvar _childD = require(\"src/components/childD.js\");\n\nvar _common = require(\"src/common.js\");\n\nrequire(\"src/style.css\");\n\nvar rootNode = (0, _common.createElement)('div', {}, [_childA.childA, _childB.childB, _childD.childD]);\n(0, _common.render)(rootNode, document.getElementById('root'));");
            },
"src/components/childA.js": function(require, module, exports) {
              eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.childA = void 0;\n\nvar _common = require(\"src/common.js\");\n\nvar childA = (0, _common.createElement)('h2', {}, ['Title']);\nexports.childA = childA;");
            },
"src/common.js": function(require, module, exports) {
              eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.render = exports.getNodeString = exports.createElement = void 0;\n\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== \"undefined\" && arr[Symbol.iterator] || arr[\"@@iterator\"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nvar createElement = function createElement(type, props, children) {\n  return {\n    type: type,\n    props: props,\n    children: children,\n    isElement: true\n  };\n};\n\nexports.createElement = createElement;\n\nvar getPropsString = function getPropsString(props) {\n  return Object.entries(props).map(function (_ref) {\n    var _ref2 = _slicedToArray(_ref, 2),\n        key = _ref2[0],\n        value = _ref2[1];\n\n    return \"\".concat(key, \"=\").concat(JSON.stringify(value));\n  }).join(\" \");\n};\n\nvar isPlainObject = function isPlainObject(node) {\n  return Object.prototype.toString.call(node) === \"[object Object]\";\n};\n\nvar getNodeString = function getNodeString(node) {\n  if (!isPlainObject(node)) {\n    return node.toString();\n  }\n\n  return \"\\n    <\".concat(node.type, \" \").concat(getPropsString(node.props), \">\\n      \").concat(node && Array.isArray(node.children) && node.children.filter(Boolean).length ? node.children.map(function (c) {\n    return getNodeString(c);\n  }).join(\"\") : \"\", \"\\n    </\").concat(node.type, \">\\n  \");\n};\n\nexports.getNodeString = getNodeString;\n\nvar render = function render(rootNode, container) {\n  var html = getNodeString(rootNode);\n  debugger;\n  container.innerHTML = html;\n};\n\nexports.render = render;");
            },
"src/components/childB.js": function(require, module, exports) {
              eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.childB = void 0;\n\nvar _common = require(\"src/common.js\");\n\nvar _childC = require(\"src/components/childC.js\");\n\nvar childB = (0, _common.createElement)('div', {}, [_childC.childC]);\nexports.childB = childB;");
            },
"src/components/childC.js": function(require, module, exports) {
              eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.childC = void 0;\n\nvar _common = require(\"src/common.js\");\n\nvar childC = (0, _common.createElement)('span', {}, ['foo']);\nexports.childC = childC;");
            },
"src/components/childD.js": function(require, module, exports) {
              eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.childD = exports.baz = void 0;\n\nvar _common = require(\"src/common.js\");\n\nvar _childE = require(\"src/components/childE.js\");\n\nvar baz = 'baz';\nexports.baz = baz;\nvar childD = (0, _common.createElement)('div', {\n  \"class\": 'd'\n}, ['bar', _childE.childE]);\nexports.childD = childD;");
            },
"src/components/childE.js": function(require, module, exports) {
              eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.childE = void 0;\n\nvar _common = require(\"src/common.js\");\n\nvar _childD = require(\"src/components/childD.js\");\n\nvar childE = (0, _common.createElement)('div', {}, [_childD.baz]);\nexports.childE = childE;");
            },
"src/style.css": function(require, module, exports) {
              eval("");
            }
      })
  