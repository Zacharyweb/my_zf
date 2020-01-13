// let Promise = require('./promise.js');

// 如何中断一个Promise链
// 方法： 在then里返回一个不resolve也不reject的new Promise,这样链就卡这了

let p1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('1')
    },1000)

})
let p2 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('2')
    },3000)
})

// Promise.all([p1,p2,'ab']).then((res)=>{
//     console.log(res);
// })

// Promise.race([p1,p2]).then((res)=>{
//     console.log(res);
// })


// 如何放弃一个Promise的结果，比如一个接口如果需要5秒才返回，定一个如果接口超过3秒没返回，就不要这个结果了
// 方法： 用Promise.race()包装一下


// let p3 = new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         resolve('5秒')
//     },5000)
// })


// function wrap(p1){
//     let fail = null;
//     let p2 = new Promise((resolve,reject)=>{
//         fail = reject;
//     });
//     let p  = Promise.race([p1,p2]);
//     p.abort = fail;
//     return p;
// };

// let rc = wrap(p3);

// setTimeout(()=>{
//     rc.abort('超时3秒没返回');
// },3000);

// rc.then((res)=>{
//     console.log(res);
// },(err)=>{
//     console.log(err)
// });

// 2.finally 实现
Promise.prototype.finally = function(callback){
    // callback 直接放到失败里 会导致无法继承上一次的失败
    // return this.then(callback,callback);
    return this.then((val)=>{
        // 等待finally中的函数执行完毕 继续执行 finally函数可能返还一个promise 用Promise.resolve等待返回的promise执行完
  
        return Promise.resolve(callback()).then(()=>val);
        //return val; // 如果上一个then是成功就将这个成功向下传递
    },(err)=>{
        return Promise.resolve(callback()).then(()=>{throw err});
        //throw err; // 如果上一个then是失败就将这个失败继续向下抛
    })
}





