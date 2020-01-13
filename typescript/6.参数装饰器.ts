export default {};
// 参数装饰器 参数装饰器可为类的原型增加一些元数据 三个参数
// 第1个参数对于静态成员是类的构造函数，对于实例成员是类的原型对象 第2个参数是方法名称 第3个参数在函数列表中的索引
interface Person{
  age:number
}
function addAge(target:any,methodName:string,paramsIndex:number){
    console.log(target);
    console.log(methodName);
    console.log(paramsIndex);
    target.age = 10;
};
class Person{
    login(username:string,@addAge password:string){
        console.log(this.age,username,password);
    }
}
let p = new Person();
p.login('zj','123');