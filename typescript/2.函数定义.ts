export default {}
// 函数定义 加?表示可选参数  =后面是给参数默认赋值
function hello(name:string='zhujian',age?:number):void{
    console.log('hello'+name);
};
hello('pbb');

// ...剩余参数
function sum(...number:Array<number>){
    console.log(number); // [1,2,3]
};
sum(1,2,3);

// 定义函数类型
type fnType = (name:string) => number;

let fn1:fnType = (a)=>{
    return 1;
};
fn1('1');

// 函数重载
// 以下定义了attr参数只能是string或者number，需要紧紧写在函数上面，其中间不能有其他语句
let obj:any = {};
function attr(val:string):void;
function attr(val:number):void;
function attr(val:any):void{
    if(typeof val == "number"){
        obj.age = val;
    }else{
        obj.name = val;
    }
}
attr('zj');
attr(16);