/**
 * 1.任意函数（不管是不是用做构造函数的函数）都有一个prototype属性指向其原型对象，其原型对象有一个constructor属性回指它。
 * 2.new调用构造函数生成的实例对象上，有一个constructor指回其构造函数，但其constructor属性其实来自原型链的继承，即来自其__proto__属性指向的原型对象上
 */

 /**
  * new操作符4步
  * 1.创建一个空对象
  * 2.把当前的this指向该空对象
  * 3.执行该函数（即里面的this.xxx = xx 这些赋值）
  * 4.返回该对象
  */

// 寄生构造函数  将无法用instanceof判断生成对象类型
function Person(name, age, job){ 
    var o = new Object(); 
    o.name = name; 
    o.age = age; 
    o.job = job; 
    o.sayName = function(){ 
        //   console.log(this.name); 
    }; 
    return o; 
} 
var friend = new Person("Nicholas", 29, "Software Engineer"); 
friend.sayName(); //"Nicholas"

/** 
 * 继承 原型链的基本思想：如果实例的原型对象是另一构造函数的实例，那么另一构造函数的原型对象上的方法与属性会继承给该原型对象，
 *                      该原型对象的方法属性又会传给其对应的构造函数生成的实例上。
 * 
 *                      function M()  --->  M.prototype 
 *                           |             /
 *                           ↓            / 
 *  function P()---> P.prototype =  new M();
 *     |            /
 *     ↓           /
 *     p = new P()  这样p上就继承了M.prototype上的属性方法
 */   


 // 1.最简单的继承
 function Animal(){
     this.cate = '动物';
 }
 Animal.prototype.say = function(){
     console.log('I am' + this.name);
 }

 function Dog(name){
    // 缺点1：无法把参数传给Animal
   this.foot = 4;
   this.name = name;
 }

 Dog.prototype = new Animal(); // 缺点2：此时Dog.prototype上有了Animal上面的cate也继承过来了，有时候可能只想继承Animal.prototype上的属性方法，并不想要Animal构造函数的属性

 Object.defineProperty(Dog.prototype,'constructor',{
     enumerable:false,
     value:Dog
 })

//  let alis = new Dog('alis'); 
//  console.log(alis.foot);
//  console.log(alis.cate);
//  alis.say();


// 2.寄生继承 可以解决缺点2
function Animal(){
    this.cate = '动物';
}
Animal.prototype.say = function(){
    console.log('I am' + this.name);
}

// 重点开始

let Fn = function(){

};
Fn.prototype = Animal.prototype;

function Dog(name){
   // 缺点：无法把参数传给Animal
  this.foot = 4;
  this.name = name;
}

Dog.prototype = new Fn(); 

// 重点结束
/** 
 * 以上可封装个函数,也就是 Object.create()的实现
 *      function create(o){
 *        function F(){};
 *        F.prototype = o;
 *        return new F();
 *      }
 */

Object.defineProperty(Dog.prototype,'constructor',{
    enumerable:false,
    value:Dog
})

// let alis = new Dog('alis'); 
// console.log(alis.foot);
// console.log(alis.cate);
// alis.say();



// 3.组合继承 可以解决缺点1
function Animal(cate){
    this.cate = cate || '动物';
}
Animal.prototype.say = function(){
    console.log('I am' + this.name);
}

function Dog(name,cate){
  Animal.call(this,cate) // 缺点：Animal执行了两次（这里执行跟下面new Animal()，下面new Animal()时），然后这实际上只是在Dog加了个 this.cate = cate，让实例上有了cate属性屏蔽了原型对象上的cate
  this.foot = 4;
  this.name = name;
}

Dog.prototype = new Animal(); // 缺点：此时Dog.prototype上有了Animal上面的cate也继承过来了，有时候可能只想继承Animal.prototype上的属性方法，并不想要Animal构造函数的属性

Object.defineProperty(Dog.prototype,'constructor',{
    enumerable:false,
    value:Dog
})

// let alis = new Dog('alis',[1,2]); 
// console.log(alis.foot);

// alis.say();

// let alis2 = new Dog('alis',[3,4]); 
// console.log(Dog.prototype.cate);
// console.log(alis.cate);
// console.log(alis2.cate);


// 4.寄生组合继承 可以解决上面全部缺点
function Animal(cate){
    this.cate = cate || '动物';
}
Animal.prototype.say = function(){
    console.log('I am' + this.name);
}

let Fn2 = function(){

};
Fn2.prototype = Animal.prototype;
let fn2 = new Fn2(); 

function Dog(name,cate){
  Animal.call(this,cate)  // 把Animal构造函数上的属性在这执行，就成了this.cate =  xxx 成了Dog构造函数里面的执行语句，那么Dog实例上就有cate属性
  this.foot = 4;
  this.name = name;
}

Dog.prototype = fn2; // 没有了调用new Animal(),Dog.prototype不会继承来Animal构造函数上的属性
Object.defineProperty(Dog.prototype,'constructor',{
    enumerable:false,
    value:Dog
})

let alis = new Dog('alis',[1,2]); 
console.log(alis.foot);

alis.say();
let alis2 = new Dog('alis',[3,4]); 
console.log(Dog.prototype.cate);
console.log(alis.cate);
console.log(alis2.cate);



