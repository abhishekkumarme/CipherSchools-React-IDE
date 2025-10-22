export const findNodeByPath = (node, pathParts) => {
  if (!pathParts.length) return node;
  if (!node.children) return null;
  const next = node.children.find((c) => c.name === pathParts[0]);
  if (!next) return null;
  return findNodeByPath(next, pathParts.slice(1));
};

export const updateFileContent = (node, pathParts, newContent) => {
  const target = findNodeByPath(node, pathParts);
  if (target && target.type === "file") target.content = newContent;
};

export const addNode = (node, pathParts, newNode) => {
  if (!pathParts.length) {
    node.children.push(newNode);
    return;
  }
  const next = node.children.find((c) => c.name === pathParts[0]);
  if (next) addNode(next, pathParts.slice(1), newNode);
};

export const deleteNode = (node, pathParts) => {
  if (pathParts.length === 1) {
    node.children = node.children.filter((c) => c.name !== pathParts[0]);
    return;
  }
  const next = node.children.find((c) => c.name === pathParts[0]);
  if (next) deleteNode(next, pathParts.slice(1));
};
