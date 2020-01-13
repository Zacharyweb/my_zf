
var Parent = function(){
    this.money = 1000;
}
Parent.prototype.say = function(){
    console.log(this.money);
};
let p = new Parent();

p.name="zj";
p.age=26;

p.toString = function(){
  return '111';
}

Object.defineProperty(p,'en',{
  enumerable:false,
  value:'不可枚举'
})

// 只要有 in 就能把原型上的方法属性也输出

// in 操作符会把原型上的属性也输出，甚至可判断不可枚举属性
console.log('say' in p); // ture
console.log('en' in p); // ture

// for in  会把原型上的属性也输出，结果 money name age toString say ,不会输出可枚举属性
for(let key in p){
  console.log(key);
}

// Object.keys() 不会输出原型上的属性，结果[ 'money', 'name', 'age', 'toString' ] 但只输出实例上可枚举的属性
console.log(Object.keys(p));

// Object.getOwnPropertyNames 不会输出原型上的属性，结果[ 'money', 'name', 'age', 'toString', 'en' ] 输出所有实例属性，无论它是否可枚举
console.log(Object.getOwnPropertyNames(p));



// ... 不会展开原型上的属性，结果{ money: 1000, name: 'zj', age: 26, toString: [Function]  }
console.log({...p});


// Object.assign 不会展开原型上的属性，结果{ money: 1000, name: 'zj', age: 26, toString: [Function]  }
console.log(Object.assign({},p));


// p.hasOwnProperty(),判断对象本身有没有该属性 没有返回false，原型链上有的属性也返回false,本身有的属性才返回true
console.log(p.hasOwnProperty('say')); // false
console.log(p.hasOwnProperty('name')); // true