export default {};

// 1.接口兼容性

// 如果传入的变量和声明的类型不匹配，TS就会进行兼容性检查
// 原理是Duck-Check,就是说只要目标类型中声明的属性变量在源类型中都存在就是兼容的
interface Animal {
    name:string,
    age:number
}
interface Person {
    name:string,
    age:number,
    gender:number
}

function getName(a:Animal){
    return a.name;
};
let p:Person = {
    name:'zj',
    age:18,
    gender:1
};
getName(p);




// 只有在传参的时候两个变量之间才会进行兼容性的比较，赋值的时候并不会比较,会直接报错
// let a:Animal = {
//     name:'zj',
//     age:18,
//     gender:1
// };

// 2.基本类型兼容性

let num:string |number;
let str:string = 'zj';
num = str;

// 只要有toString()方法就可以赋给字符串变量
let num2:{
    toString():string
}
let str2:string = 'zj';
num2 = str2;

// 3.类的兼容性

class Animal2{
    name:string
}
class Bird extends Animal2{
    swing:number
}
let a:Animal2;
a = new Bird();

//并不是父类兼容子类，子类不兼容父类
let b:Bird;
console.log(a);
// b = new Animal2(); // 这样会报错 想不报错有下面的方法

//如果父类和子类结构一样，也可以的
// 即：class Bird extends Animal{} 里面没有其他属性方法了

// 甚至没有关系的两个类的实例也是可以的
// 即 class Bird {name:string} 上面也不会报错


// 4.函数兼容性
// 4.1 参数兼容性  少参数可以 多参数不行

type sumFunc = (a:number,b:number) => number;
let sum1:sumFunc = function(a:number,b:number){
    return a+b;
};

// 这个报错
// let sum2:sumFunc = function(a:number,b:number,c:number){
//     return a+b;
// };

let sum3:sumFunc= function(a:number){
    return a;
};

// 4.2 返回值兼容性 多属性可以 少不行 与上面的参数刚好相反
type GetPerson = ()=>{ name:string,age:number}

let getPerson1:GetPerson;
let getPerson2:GetPerson;
let getPerson3:GetPerson;
function g1(){
   return {name:"zj",age:28}
};
function g2(){
    return {name:"zj"}
};
function g3(){
    return {name:"zj",age:28,gender:'male'}
};
getPerson1 = g1;
// getPerson2 = g2; // 报错
getPerson3 = g3;

// 4.3 函数参数斜变 参数类型比定义的多可以 少不行
type LogFunc = (a:number | string)=>void;
let log1:LogFunc;
function log(a:number | string | boolean){};
log1 = log;


// 泛型的兼容性
//接口内容为空没用到泛型的时候是可以的
//1.接口内容为空没用到泛型的时候是可以的
interface Empty<T>{
 
}
let x:Empty<string>;
let y:Empty<number>;
x = y;

//2.接口内容不为空的时候不可以
// interface NotEmpty<T>{
//   data:T
// }
// let x1:NotEmpty<string>;
// let y1:NotEmpty<number>;
// x1 = y1;

// 相当于下面这种写法
interface NotEmptyString{
    // data:string
}

interface NotEmptyNumber{
    // data:number
}
let xx2!:NotEmptyString;
let yy2!:NotEmptyNumber;
xx2 = yy2;

// 枚举兼容性

//数字可以赋给枚举
enum Color {Red,Yellow};
let c = Color.Red;
c = 3;
// c= '3'; // 字符串不行 报错

//枚举值可以赋给数字
let c2 = 1;
c2 = Color.Yellow;