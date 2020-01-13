// tsc --init 生成tsconfig.json文件
// 声明了export default {}  ts就把当前文件当模块处理了 不然ts会把所有的ts文件当成一个模块 容易有命名冲突
export default {}
let a:string = '1';
let b:boolean = true;
let c:number = 1;

let arr:Array<string> = ['1','2'];
let arr2:string[] = ['1','2'];

let tuple:[string,number] = ['1',2]; // 元组：长度跟每项类型都确定的数组

enum Gender{
    GIRL,
    BOY
}
// 枚举等同于
// Gender[Gender["GIRL"] = 0] = "GIRL";
// Gender[Gender["BOY"] = 1] = "BOY";

// 常量枚举 
const enum Colors{
    Red,
    Green 
};
let color = [Colors.Red,Colors.Green];

// 此时编译后直接就如下了 因为const声明后续不可更改了
// var color = [0 /* Red */, 1 /* Green */];

let jquery:any = 1;
jquery = '2';


// tsconfig.json里的strictNullChecks为true会报错，设置为false后就不会报错了
let x: number;
x = 1;
x = undefined;    
x = null;   

let y: number | null | undefined;
y = 1;
y = undefined;   
y = null;   


// void 表示没有任何类型
function fn():void {
    console.log('1');
}

// never (null undefined)的子类型，代表不会出现的值，用于一些不会正常执行的函数
function error(message: string): never {
    throw new Error(message);
}

// 由类型推论得到返回值为 never
function fail() {
    return error("Something failed");
}

// 返回never的函数 必须存在 无法达到（ unreachable ） 的终点
function infiniteLoop(): never {
    while (true) {}
};

let v:void = null;
let und:void = undefined;
// let nene:never = null; // 报错

// 断言
let dy:string | number;
(dy as string).toLocaleLowerCase();
(dy as number).toFixed(2);

// 自定义类型
type Lucky = 1 | 'One' | true;
let lu:Lucky = 1;