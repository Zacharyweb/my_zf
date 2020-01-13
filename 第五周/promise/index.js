const Promise = require('./promise.js');

let p = new Promise((resolve,reject)=>{
    resolve('a');
})
p.then((res)=>{
    console.log('s1');
    console.log(res);
},(err)=>{
    console.log('e1');
    console.log(err);
}).then((res)=>{
    console.log('s2');
    console.log(res);
},(err)=>{
    console.log('e2');
    console.log(err);
})