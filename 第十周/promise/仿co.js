// import Promise from './promise';
const Promise = require('./promise');
let p = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(1)
    },2000)
});

p.then((res)=>{
    console.log(res);
},(err)=>{
    console.log(err);
});


