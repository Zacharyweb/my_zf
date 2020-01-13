export default {}
class Person{
    name:string;
    getName():void{
        console.log(this.name);
    }
};

let p1 = new Person;
p1.name = 'zhujian';
p1.getName();


class User{
    name:string;
    constructor(name:string){
        this.name = name;
    }
    getName(){
        return this.name;
    }
    setName(name:string){
        this.name = name;
    }
}
let u1 = new User('zj');
console.log(u1. name);

// 参数属性 User
// public声明了的属性，就会自动在类内部声明，相当于上面User里声明name了
// readonly like: string; 只读
// public name: string;  //类里面 子类 其它任何地方外边都可以访问
// protected age: number; //类里面 子类 都可以访问,其它任何地方不能访问
// private money: number; //类里面可以访问， 子类和其它任何地方都不可以访问

class User2{
    readonly like:string
    public name:string
    constructor(name:string,public age:number){
        this.name = name;
    }
    getName(){
        return this.name;
    }
    setName(name:string){
        this.name = name;
    }
}
let u2 = new User2('sbzzzjjj',19);


console.log(u2.name);

class Son extends User2{
    no:number;
    constructor(name:string,age:number,no:number){
      super(name,age);
      this.no = no;
    }
}

let son1 = new Son('zzh',18,1);

// static静态属性静态方法
class Father{
    public money:number;
    static className = 'Father';
    static getMoney(){
        // 不能访问到 this.money
        return Father.className;
    }
    constructor(money:number){
        this.money = money;
    }
};
Father.getMoney();
Father.className;

// 抽象类
// 抽象描述一种抽象的概念，无法被实例化，只能被继承
// 无法创建抽象类的实例
// 抽象方法不能在抽象类中实现，只能在抽象类的具体子类中实现，而且必须实现
abstract class Animal {
    name:string;
    abstract speak():void;
}
class Cat extends Animal{
    speak(){
        console.log('喵喵喵');
    }
}
let cat = new Cat();
cat.speak();