
var Parent = function(){
    this.money = 1000;
}
Parent.prototype.say = function(){
    console.log(this.money);
};
let p = new Parent();

let arr = [1,'2',true,{a:'haha'},[2,8],/\d/,new Date(),function(){ var a = 99},p,null,undefined];
let type = [Number,String,Boolean,Object,Array,RegExp,Date,Function,Object];

// Object.prototype.toString.call(),缺点:不能识别自建的类，返回的是Object
function getType1(content){
    return Object.prototype.toString.call(content).slice(8,-1);
};


// typeof 缺点：除了 number string boolean undefined function外其余都是object （只有这个出来的类型首字母小写，其余都是大写）
function getType2(content){
    return typeof content;
};

// xxx.constructor 可判断所有引用类型报错自建类及Number,String,Boolean类，缺点：null,undefined没有构造函数，所以调他们的.constructor会报错
// 判断时一般这么写，例 content.constructor == Xxx
function getType3(content,type){
    return content.constructor == type;
};

//  xxx instanceof Xxx 缺点：无法判断值类型（即无法判断Number,String,Boolean，判断Null,Undefined会报错），只能判断引用类型（可判断所有引用类型包括自建类）
function getType4(content,type){
    return content instanceof type;
};

arr.forEach((item,i) => {
    // console.log(getType4(item,type[i]))
});