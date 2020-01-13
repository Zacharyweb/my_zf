export default{};
// 条件类型
// 在定义泛型的时候能够添加进逻辑分支，以后泛型更加灵活
interface Fish{
    fish:string
}
interface Water{
    water:string
}
interface Bird{
    bird:string
}
interface Sky{
    sky:string
}
// 1.定义条件类型
type Condition<T> = T extends Fish? Water:Sky;
let fish:Condition<Fish> = {water:'水'};

// 2.条件类型的分发
let condition1:Condition<Fish | Bird> = {water:'水'};
let condition2:Condition<Fish | Bird> = {sky:'天空'};

// 3.内置条件类型
// 3.1 Exclude 从 T 可分配给的类型中排除 
type E1 = Exclude<string | number,number>;
let e1:E1 = '1'; // e1就只能是字符串类型了

// 3.2 Extract 从 T 可分配的类型中提取 U
type E2 = Extract<string | number,number>;
let e2:E2 = 1; // e2就只能是数字类型了

// 3.3 NonNullable 从 T 中排除 null 和 undefined
type E3 = NonNullable<string | number | null |undefined>;
let e3:E3 = '1';

// 3.4 ReturnType 获取函数类型的返回类型
function getUserMsg(){
    return {name:'zj',age:27};
}
type E4 = ReturnType<typeof getUserMsg>;
let e4:E4 = {name:'pbb',age:1};

// 3.5 InstanceType 获取构造函数的实例类型
class Person{
    name:string;
    constructor(){

    };
    getName(){
        return this.name;
    }
}
type E5 = InstanceType<typeof Person>;
let e5:E5 = {name:'zj',getName(){return 'xixi'}};


