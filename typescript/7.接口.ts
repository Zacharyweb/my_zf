import { type } from "os";

export default {};
// 接口中各项用,;或不用分隔符分隔都可以
// 1.用于定义对象的形状
interface Obj{
    name:string,
    age:number
};

let obj:Obj = {
    name:'zj',
    age:11
};

// 2.用于定义行为的抽象
interface Beh{
    say():void;
    eat():void;
}
let beh:Beh = {
    say(){

    },
    eat(){

    }
}

// 不确定还有哪些属性时 可以用 [propName:string]:any 指代还可加入其他任意属性
interface Person{
    name:string
    say():void
    [propName:string]:any
}

let p:Person = {
    name:'zj',
    say(){

    },
    age:26,
    money:true
}

// 接口之间也可以继承

interface Obj2 extends Obj{
    speak():void
}

let obj2:Obj2 = {
    name:'',
    age:1,
    speak(){

    }
}
// 类继承接口
class Animal implements Obj{
    name:string;
    age:number;
}

let dog = new Animal();
dog.age = 11


// readonly
interface Person2{
    readonly id:number;
    name:string
}
let tom:Person2 = {
  id :1,
  name:'zhufeng'
}
// tom.id = 1; 报错



// 函数类型接口 对方法传入的参数和返回值进行约束

interface Fnface{
    (name:string):number
}
let fn:Fnface = function (name:string){
    return 1;
}
fn('zj');

// 之前用type直接定义函数的写法
type FnType = (name:string) => number;
let fn2:FnType = function (name:string){
    return 1;
}
fn2('zj');


// 可索引接口 对数组和对象进行约束

interface arrLikeFace{
    [index:number]:string
}
let arr:arrLikeFace = ['1','2'];
let objLike:arrLikeFace = {
    3:'1',
    2:'2' 
}
interface arrLikeFace2{
    [index:string]:string
}
// let arr2:arrLikeFace2 = ['1','2']; 报错
let objLike2:arrLikeFace2 = {
    3:'1',
    2:'2',
    'aa':'xixi'
}

// 接口约束类
interface Speakable{
    name:string,
    speak(word:string):string
}
class Speaker implements Speakable{
    name!:string;
    speak(word:string){
        return word;
    }
}
let jack = new Speaker();
jack.speak('chinese');

// 接口描述类 特殊的new关键字


interface catFace{
    new(name:string):Cat
};

class Cat{
    constructor(public name:string){

    }
}

let Mimi:catFace = Cat; // 新类融合了 Cat与catFace
let mini = new Mimi('mimi');

// 接口与类型别名的区别
// interface只能定义对象类型 type声明的方式可以定义组合类型，交叉类型和原始类型
// interface方式可以实现接口的extends/implements，而type 不行
// interface可以实现接口的merge，但是type不行

type An = string | true;
let a:An = true;