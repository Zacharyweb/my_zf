export default {}
// 1.Partial
interface Animal{
    name:string,
    age:number,
    say?(str:string):void
};
let a:Animal = {
    name:'',
    age:1
}

// 实现 但ts已内置实现 不用我们自己实现了
// type Partial<T> ={
//     [key in keyof T]?:T[key]
// }
type AnimalPart = Partial<Animal>;
let a1:AnimalPart = {name:'zzjj'};

// 2.Required 把接口里面的可选属性也变成必填属性  -?代表去掉?就是必填了
// 一个 readonly 或 ? 修饰符在一个映射类型里可以用前缀 + 或-来表示这个修饰符应该被添加或移除
// 实现 已内置
// type Required<T> ={
//     [key in keyof T]-?:T[key]
// }

type AnimalRequired = Required<Animal>;
let a2:AnimalRequired = { name:'', age:10, say(){}};

// 3.Readonly 把各项都变成只读的
// 实现
// type Readonly<T> = {
//     readonly [key in keyof T]:T[key]
// }
type AnimalReadonly = Readonly<Animal>;
let a3:AnimalReadonly = {
    name:'zh',
    age:10
}
a3.name
// a3.name = 'z';

// 4.Pick 从传入的属性中摘取某一项返回
// 实现 
// type Pick<T,K extends keyof T> = {
//     [P in K]:T[P]
// };
type AnimalPick = Pick<Animal,'name' | 'age'>;
let a4:AnimalPick = {name:'zj',age:1};