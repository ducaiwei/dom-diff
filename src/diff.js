import { ATTRS, TEXT, REMOVE, REPLACE } from './const';
function diff(oldTree, newTree) {
    let patches = {};
    // 当节点类型相同时，看一下属性是否相同，产生一个属性的补丁包{type: 'ATTRS', attrs: {class: 'list-group'}}
    // 新的dom节点不存在{type: 'REMOVE', index: xxxx}
    let index = 0;
    // 递归树 比较后的结果中放到patches中
    walk(oldTree, newTree, index, patches);
    return patches;
}
function isString(node) {
    return Object.prototype.toString.call(node) === '[object String]';
}
/**
 * 
 * @param {objet} oldNode 老节点
 * @param {*} newNode 新节点
 * @param {*} index 当前节点的索引
 * @param {*} patches 大补丁
 */
function walk(oldNode, newNode, index, patches) {
    // 每个节点都有自己对应的补丁
    let currentPatch = [];
    if(!newNode) { // 如果新节点中删除了老节点
        currentPatch.push({type: REMOVE, index: index});
    } else if(isString(oldNode) && isString(newNode)) { // 判断文本是否一致 
        if(oldNode !== newNode) {
            currentPatch.push({type: TEXT, text: newNode})
        }
    } else if (oldNode.type === newNode.type) {
        // 比较属性是否有更改
        let attrs = diffAttr(oldNode.props, newNode.props);
        if (Object.keys(attrs).length > 0) {
            currentPatch.push({type: ATTRS, attrs});
        }
        // 如果有子节点 还需要遍历子节点
        diffChildren(oldNode.children, newNode.children, index , patches)
    } else { // 节点被替换了
        currentPatch.push({type: REPLACE, newNode});
    }
    // 当前元素确实有补丁  将元素和补丁对应起来放入大补丁包中
    if(currentPatch.length > 0) {
        patches[index] = currentPatch;
    }
}
function diffAttr(oldAttrs, newAttrs) {
    let patch = {};
    for(let key in oldAttrs) {
        // 判断老的属性中和新的属性的关系
        if (oldAttrs[key] !== newAttrs[key]) {
            patch[key] = newAttrs[key]; // 有可能是undefined
        }
    }
    for (let key in newAttrs) {
        // 新节点新增加的属性
        if(!oldAttrs.hasOwnProperty(key)) {
            patch[key] = newAttrs[key];
        }
    }
    return patch;
}
let Index = 0;
function diffChildren(oldChildren, newChilren, index, patches) {
    // 比较老的第一个和新的第一个
    oldChildren.forEach((child, idx) => {
        // 索引不应该是index-----
        //index每次传递给walk时 index是递增的 所有的子节点都基于一个索引来递归
        walk(child, newChilren[idx], ++Index, patches);
    });
}
export default diff;