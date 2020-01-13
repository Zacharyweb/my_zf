export default {}
// 属性装饰器
// 接受两个参数  
// 第一个参数对于静态成员来说是类的构造函数，对于实例成员是类的原型对象 第二个参数是属性的名称

// 方法装饰器
// 接受三个参数  第一个参数对于静态成员来说是类的构造函数，对于实例成员是类的原型对象 第二个参数是属性的名称 第三个参数是方法描述符

interface Animal{
    eat:any;
    name:string;
};
function attrDec(target:any,prototypeKey:string){
    console.log(target); // 原型对象 Animal {}
    console.log(prototypeKey);
};

function staticDec(target:any,prototypeKey:string){
    console.log(target); // 构造函数 [Function: Animal]
    console.log(prototypeKey);
};

function methodDec(target:any,prototypeKey:string,descriptor:PropertyDescriptor){
    console.log(target); // 构造函数 [Function: Animal]
    console.log(prototypeKey);
    console.log(descriptor);
    descriptor.enumerable = false; // 变成不可枚举
};

class Animal{
    @attrDec
    name:string = 'zhujian';
    @staticDec
    static age:number;
    constructor(){

    }
    @methodDec
    getName(){
       console.log(this.name);
    }
}
let a = new Animal();

console.log(Object.keys(a)); // [ 'name' ]

for(let key in a){
    console.log(key);  // name 若getName不用@methodDec 则 name getName
}
