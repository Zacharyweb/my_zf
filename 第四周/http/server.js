// next模拟自己随便写的

let ctx = {};
let f1 = (ctx,next)=>{
    console.log('f1');
    next();
}
let f2 = (ctx,next)=>{
    console.log('f2');
    next();
}
let f3 = (ctx,next)=>{
    console.log('f3');
}
let fnArr = [f1,f2,f3];


let index = 0;
function dispatch(fn){
    fn(ctx,()=>{
        dispatch(fnArr[++index])
    });
}
dispatch(fnArr[index])



function a(){
    return '123';
}

function b(){
    return a();
}

console.log(b());
