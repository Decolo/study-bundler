export const createElement = (type, props, children) => {
  return {
    type,
    props,
    children,
    isElement: true,
  };
};

const getPropsString = (props) => {
  return Object.entries(props)
    .map(([key, value]) => `${key}=${JSON.stringify(value)}`)
    .join(" ");
};

const isPlainObject = (node) => {
  return Object.prototype.toString.call(node) === "[object Object]";
};

export const getNodeString = (node) => {
  if (!isPlainObject(node)) {
    return node.toString();
  }


  return `
    <${node.type} ${getPropsString(node.props)}>
      ${
        node &&
        Array.isArray(node.children) &&
        node.children.filter(Boolean).length
          ? node.children.map((c) => getNodeString(c)).join("")
          : ""
      }
    </${node.type}>
  `;
};

export const render = (rootNode, container) => {
  const html = getNodeString(rootNode);
  debugger;
  container.innerHTML = html;
};
