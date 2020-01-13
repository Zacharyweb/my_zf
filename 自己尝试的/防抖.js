// 短时间内多次触发只执行一次 一般最后一次执行

let timer = null;
function fd(){
    if(timer){
        clearTimeout(timer);
    }
    timer = setTimeout(()=>{
        doSomething()
    },3000);
    console.log(timer);
};

fd();
setTimeout(()=>{
    fd();
},2000)


function doSomething(){
    console.log('执行')
}