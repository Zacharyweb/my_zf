// 一定时间内只执行一次
let timer = null;
function jl(){
    if(timer){
        return;
    }
    timer = setTimeout(()=>{
        doSomething()
    },3000);
}

jl();
jl();
jl();
jl();
setTimeout(()=>{
    jl();
},1000);

function doSomething(){
    console.log('执行')
}