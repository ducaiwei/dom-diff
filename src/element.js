import setAttr from './setAttr';
class Element {
    constructor(type, props, children) {
        this.type = type;
        this.props = props;
        this.children = children;
    }
}

/**
 * 创建虚拟dom
 * @param {string} type 
 * @param {object} props 
 * @param {array} children 
 */
const createElement = (type, props, children) => {
    return new Element(type, props, children);
}
// render方法将虚拟dom转换为真实dom
function render(elObj) {
    let el = document.createElement(elObj.type);
    for(let key in elObj.props) {
        setAttr(el, key, elObj.props[key]);
    }
    elObj.children.forEach(child => {
        child = child instanceof Element ? render(child) :
        document.createTextNode(child);
        el.appendChild(child);
    });
    return el;
}
function renderDom(el, target) {
    target.appendChild(el);
}
// DOM diff比较两个虚拟DOM区别，比较两个对象的区别
// dom diff作用 根据两个虚拟对象创建补丁 描述改变的内容，将这个补丁用来更新dom
// 先序深度遍历
export { createElement, render, renderDom, Element }