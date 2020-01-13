// obj.fn(pramas1,pramas2) => fn(obj,pramas1,pramas2)
let obj = {};

// 老调用方式
// Array.prototype.push.call(obj,'first','second');

//实现1
Function.prototype.unCurrying = function(){
    let fn = this;
    return function(obj,...args){
       return  fn.call(obj,...args);
    }
};

// 实现2
Function.prototype.unCurrying = function(){
    return  this.call.bind(this);
};

var push = Array.prototype.push.unCurrying();

// 现在这么调用
push(obj,'first','second');
console.log(obj);
