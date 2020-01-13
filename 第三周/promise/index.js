

let Promise = require('./promise.js');
function fn(){
    // 可能函数中抛出了 同步错误 要通过try-catch 捕获异常
   //  throw new Error('sbwmj');
    //    return new Promise((resolve,reject)=>{
    //        setTimeout(() => {
    //         reject('xxx');
    //        }, 3000);
    //    })
}

// let p = new Promise((resolve,reject)=>{
//      resolve(fn());
// })

// p.then((res)=>{
//    console.log('s1');
//    console.log(res);
// },(err)=>{
//    console.log('e1');
//    console.log(err);
// })

let p1 = new Promise((resolve,reject)=>{
   setTimeout(()=>{
      resolve('1s');
   },1000)
});

let p2 = new Promise((resolve,reject)=>{
   setTimeout(()=>{
      reject('3s');
   },3000)
});

Promise.race([p1,p2]).then((res)=>{
  console.log(res);
},(err)=>{
   console.log(err);
})

