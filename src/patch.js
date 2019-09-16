import { Element, render } from "./element";
import { ATTRS, TEXT, REMOVE, REPLACE } from "./const";
import setAttr from "./setAttr";
let allPatches;
let index = 0;
/**
 *
 * @param {*} node 原生的dom节点
 * @param {*} patches 补丁数组
 */
function patch(node, patches) {
  allPatches = patches;
  walk(node);
}
function walk(node) {
  const currentPatch = allPatches[index++];
  let childNodes = node.childNodes;
  childNodes.forEach(child => walk(child));
  if (currentPatch && currentPatch.length) {
    doPatch(node, currentPatch);
  }
}
function doPatch(node, patches) {
  patches.forEach(patch => {
    switch (patch.type) {
      case ATTRS:
        // setAttr(node, patch.);
        const attrs = patch.attrs;
        for (let key in attrs) {
          setAttr(node, key, attrs[key]);
        }
        break;
      case TEXT:
        node.textContent = patch.text;
        break;
      case REMOVE:
        node.parentNode.removeChild(node);
        break;
      case REPLACE:
        let newNode =
          patch.newNode instanceof Element
            ? render(patch.newNode)
            : document.createTextNode(patch.newNode);
        node.parentNode.replaceChild(newNode, node);
        break;
      default:
        break;
    }
  });
}
export default patch;
