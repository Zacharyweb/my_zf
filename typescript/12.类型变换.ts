import { prependOnceListener } from "cluster";

export default {};
//1. & 交叉类型
interface Bird{
    name:string,
    fly():void
}
interface Person{
    name:string,
    talk():void
}

type BirdPerson  = Bird & Person;

let p:BirdPerson = {
    name:'',
    fly(){},
    talk(){}
}


// 2.typeof
// 先定义类型，再定义变量
type People = {
    name:string,
    age:number,
    gender:string
};

let people:People = {
    name:'zj',
    age:10,
    gender:''
}

//先定义变量，再定义类型
let people2 ={
    name:'zj',
    age:10,
    gender:''
}
type People2 = typeof people2;

let people3:People2;
console.log(people3.age);
console.log(people3.gender);
console.log(people3.name);

// 3.索引

interface Animal{
    name:string,
    age:number,
    msg:{
      home:string
    },
    say(str:string):void
}

let dog:Animal['age'] = 10;
let cat:Animal['msg'] = {home:'g'};


type Animal2 = {
    name:string,
    age:number,
    msg:{
      home:string
    },
    say(str:string):void
}
let dog2:Animal2['age'] = 10;
let cat2:Animal2['msg'] = {home:'g'};

// 4.keyof
type Animal3 = keyof Animal; // 'name' | 'age' | 'msg' | 'say'
let dog3:Animal3 = 'age';

// 5.in 比如把Animal接口中的属性都变成可选的
type Animal4 = {
    [key in keyof Animal]?:Animal[key]
}
let dog4:Animal4 = {name:'z'};

// 例子：Part实现
type Part<T> = {
    [key in keyof T]:T[key]
}
type Animal5 = Part<Animal>;