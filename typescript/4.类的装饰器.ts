export default{};
// 装饰器是一种特殊类型的声明，它能够被附加到 类声明、方法、属性、参数 上，可以修改类的行为
// 为了不报错需要在tsconfig.json中开启"experimentalDecorators": true  

// 类装饰器 只有一个参数 参数是构造函数
// 注：定义的接口与声明的类同名时 两个会合并
interface Person {
    eat:any;
    name:string;
}
function enhancer(target:any){
    target.prototype.name = 'zj';
    target.prototype.eat = function(){
        console.log('eat');
    }
};
@enhancer

class Person{
    constructor(){

    }
}
let p:Person = new Person();
console.log(p.name);

// 类装饰器 需要传其他参数时
interface Person2{
    eat:any;
    name:string;
};
function enhancer2(name:string){
    return (target:any)=>{
        target.prototype.name = name;
        target.prototype.eat = function(){
            console.log('eat');
        }
    }
};
@enhancer2('zzjj')
class Person2{
    constructor(){

    }
}
let p2 = new Person2();
console.log(p2.name);

// 返回新类
interface Person3 {
    name: string;
    eat: any
}
function enhancer3(target: any) {
    return class {
        name: string = 'jiagou'
        eat() {
            console.log('吃饭饭');
        }
    }
}
@enhancer3
class Person3 {
    constructor() { }
}
let p3: Person3 = new Person3();
console.log(p3.name);
p3.eat();