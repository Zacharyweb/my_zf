// 同一名称的两个独立声明会被合并成一个单一声明
// 合并后的声明拥有原先两个声明的特性
// 类既可以作为类型使用，也可以作为值使用，接口只能作为类型使用

declare const Dd:{
   name:string;
}

// 关键字	    作为类型使用	作为值使用
// class	       yes	        yes
// enum	           yes	        yes
// interface	   yes	        no
// type	           yes	        no
// function    	   no	        yes
// var,let,const   no	        yes

class Person{
    name:string=''
}
//作为类型使用
let p1:Person = {
    name:'d'
};

//作为值使用
let p2 = new Person();

interface Animal{
    name:string
}
let a1:Animal;

// let a2 = Animal;//接口类型不能用作值

type Ty = string | number;
let t1:Ty;
type Ty2 = Ty;


//  合并类型声明
interface Animal3{
    age:number
}

interface Animal3{
    name:string
}
let a3:Animal3={name:'zhufeng',age:10};
console.log(a3.name);
console.log(a3.age);

export default {};