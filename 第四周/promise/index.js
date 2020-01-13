let Promise = require('./promise.js')

// let p = new Promise((resolve,reject)=>{
//     reject(new Error('ERROR啦'))
// })

// p.then((res)=>{
//     console.log('s1');
//     console.log(res);
//     throw '错啦'
// },(res)=>{
//     console.log('e1');
//     console.log(res);
// }).then((res)=>{
//     console.log('s2');
//     console.log(res);
// },(res)=>{
//     console.log('e2');
//     console.log(res);
// })


let ip = new Promise((resolve,reject)=>{
    console.log('1');
    setTimeout(()=>{
        console.log('2');
        resolve('3aa')
    },2000)
}).then((res)=>{
    console.log('444');
    return 'xixi'
})
let p = Promise.resolve(ip).then((res)=>{
     console.log('aa '+ res);
});