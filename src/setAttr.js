export default function setAttr(node, key, value) {
    switch(key) {
        case 'value':
            let tagName = node.tagName.toUpperCase();
            if (tagName === 'INPUT' || tagName === 'TEXTAREA') {
                node.value = value;
            } else {
                node.setAttribute(key, value);
            }
            break;
        case 'style':
            node.style.cssText = value;
            break;
        default:
            node.setAttribute(key, value);
    }
}