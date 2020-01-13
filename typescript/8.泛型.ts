//  泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性
//  泛型T作用域只限于函数内部使用

// 泛型函数
function createArray(length:number,value:any):Array<any>{
    let result:any[] = [];
    for(let i = 0; i < length;i++){
        result.push(value);
    };
    return result;
}
createArray(10,'1');
// 用泛型后

// 泛型函数
function createArray2<T>(length:number,value:T):Array<T>{
    let result:T[] = [];
    for(let i = 0; i < length;i++){
        result.push(value);
    };
    return result;
}
createArray2<string>(10,'a');

// 泛型类
class MyArray<T>{
    list:T[] = [];
    add(value:T){
        this.list.push(value);
    };
    getItemByIndex(index:number):T{
        return this.list[index];   
    }
}
let arr = new MyArray<number>();
arr.add(1);
arr.add(2);
arr.add(3);
console.log(arr.list);

// 泛型接口
// 约束函数
interface Myface<T>{
    (a:T,b:T):T
}

let my:Myface<number> = (a:number,b:number)=>{
     return a + b;
}

interface Myface2{
    <T>(a:T,b:T):T
}

let my2:Myface2 = function<T>(a:T,b:T):T{
    return a;
}

// 泛型可以同时有多个

function swap<A,B>(tuple:[A,B]):[B,A]{
    return [tuple[1],tuple[0]];
};
swap<number,string>([2,'1']);


// 默认泛型类型
function createArray3<T=number>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
      result[i] = value;
    }
    return result;
}
let result2 = createArray3(3,'xx');
console.log(result2);

// 泛型约束
// 在函数中使用泛型的时候，由于预先并不知道泛型的类型，所以不能随意访问相应类型的属性或方法

interface LengthKey{
   length:number
}
function getLength<T extends LengthKey>(k:T){
    return k.length;
};
getLength('sdsd')
getLength(['1',1]);


// 泛型接口
interface Cat<T>{
    list:T[]
}
let mimi:Cat<{name:string,age:number}> = {
    list:[{name:'zh',age:1}]
}

//泛型的类型别名 

type Mytype<T> ={
   list:T[],
   age:T
}

let mt1:Mytype<number> = {
    list:[1],
    age:1
} 


let mt2:Mytype<string> = {
    list:['1'],
    age:'1'
} 

