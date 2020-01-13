// AOP 面向切片 装饰

Function.prototype.before = function(fn){
     return (params)=>{
        fn();
        this(params);
     }
};

function say(params){
    console.log('say ' + params);
}
let newSay = say.before(()=>{
    console.log('before');
});


newSay('xixi');