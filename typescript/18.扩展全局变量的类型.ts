// export default {};
interface String {
    double():string;
}

// 全局变量指String Window这些内置对象 这个时候不能写 export default
String.prototype.double = function(){
    return this+'+'+this;
}
console.log(('hello').double());

// nterface Window{
//    myname:string
// 
// indow.myname = '22';
// onsole.log(window.myname);