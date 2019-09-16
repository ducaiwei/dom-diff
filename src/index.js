import { createElement, render, renderDom } from './element';
import diff from './diff';
import patch from './patch';
const virtualDom = createElement('ul', {class: 'list'}, [
createElement('li', {class: 'item'}, ['a']),
createElement('li', {class: 'item'}, ['b']),
createElement('li', {class: 'item'}, ['c'])
]);
const virtualDom1 = createElement('ul', {class: 'list-group'}, [
    createElement('li', {class: 'item'}, ['1']),
    // createElement('li', {class: 'item'}, ['b']),
    null,
    createElement('div', {class: 'item'}, ['3'])
]);
let el = render(virtualDom);
renderDom(el, document.getElementById('root'));
// 如果平级元素有互换 那会重新渲染
// diff计算出所有有改动的补丁
let patches = diff(virtualDom, virtualDom1);
console.log(patches);
// 实际更新到原生dom上
patch(el, patches);