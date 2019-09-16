### dom-diff
简易的react dom-diff实现<br/>
### 原理
手动实现createElement生成虚拟dom, 手动创建两个有差异的虚拟dom<br/>
调用diff方法，diff方法内部采用深度优先遍历算法，比较每个节点的属性和子节点<br/>
如果有变动的节点会返回当前节点变更的补丁(一个对象{attrs: {class: "list-group"}
type: "ATTRS"})<br/>
所有的变更补丁会以patches数组返回，然后再调用patch方法把所有的补丁更新到原生dom上.