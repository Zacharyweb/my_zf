
let obj = {'line':6};
let map = new Map([['age',20],[5,6]]);
map.set(1,2);
map.set(3,4);
map.set('name','zj');
// map.set(obj,'键是对象');

console.log(map);

console.log(map.size)
console.log(map.get(3))
console.log([...map.entries()])
console.log([...map.keys()])
console.log([...map.values()]);
console.log(map.has('name'))
// map.delete('name');
// map.clear();


let weakMap = new WeakMap();
weakMap.set(obj,20)
console.log(weakMap.get(obj))
console.log(weakMap.has(obj));

obj = null;