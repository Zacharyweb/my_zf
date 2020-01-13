

let p1 = new Promise((resolve,reject) =>{
      setTimeout(()=>{
          resolve(22);
      },2000)
})

let p2 = new Promise((resolve,reject) =>{
    setTimeout(()=>{
        reject(33);
    },3000)
})


function *gen(){
    try {
        let a = yield p1;
        let b = yield p2;
        return a + b; 
    } catch (error) {
        console.log('来自it.throw')
        console.log(error);
    }
}

// let it = gen();
// it.next();
// it.throw('错了');

 /**
  * 需要这么执行 不行！！！用co
  */
// let fn = gen();
// fn.next().value.then((res)=>{
//     fn.next(res).value.then((res)=>{
//         console.log(fn.next(res));
//     })
// })


function co(fn){
   return new Promise((resolve,reject)=>{
      let it = fn();
      function next(data){
          let obj = it.next(data);
          if(!obj.done){
              obj.value.then((res)=>{
                next(res);
              },(err)=>{
                it.throw(err)
                reject(err);
              })
          }else{
            resolve(obj.value);
          }
      }
      next(null);
   })
};

co(gen).then((res)=>{
    console.log(res);
},(err)=>{
    console.log('出错啦' + err);
})




