

// let arr = [1,2,3];

// let a = arr.reduce(function(result,item,index,arr){
//     return result + item;
// },0)

// console.log(a);

// Array.prototype.reduce2 = function(fn,initVal){
//     this.forEach((item,index,arr)=>{
//         initVal = fn(initVal,item,index,arr);
//     })
//     return initVal;
// }

// let b = arr.reduce2(function(result,item,index,arr){
//     return result + item;
// },0)

// console.log(b);


async function a(){
    let b = await c();
    console.log(b);
}

async function c(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
           resolve('jwm')
        },2000)
    }).then((res)=>{
        return res;
    })
}

a();