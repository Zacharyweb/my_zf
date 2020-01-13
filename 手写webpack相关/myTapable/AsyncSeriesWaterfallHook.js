class AsyncSeriesWaterfallHook{
    constructor(args){
       this.args = args;
       this.tasks = [];
    }
    tap(name,task){
        this.tasks.push(task);
    }
    tapAsync(name,task){
        this.tasks.push(task);
    }
    callAsync(...args){
        args.length = this.args.length + 1;
        let fn = args.pop();
        let idx = 0;
        let next = (err,data)=>{
          let task = this.tasks[idx];
          if(!task || err){
            if(err){
              fn(err);
            }else{
              fn(null,data);
            }
          }else{
            if(idx == 0){
              task(...args,next);
            }else{
              task(data,next);
            }
            idx++;
          }
        }
        next()
    }

    tapPromise(name,task){
      this.tasks.push(task);
    }
    // 自己的写法
    // promise(...args){
    //     let promises = this.tasks.map(task=>{
    //        return () => { return task(...args)};
    //     })
    //     return new Promise((resolve,reject)=>{
    //       let idx = 0;
    //       let next = ()=>{
    //         promises[idx++]().then(()=>{
    //           if(idx === this.tasks.length){
    //             resolve();
    //           }else{
    //             next()
    //           }
    //         },reject);
    //       };
    //       next()
    //     });
    // }
    // 姜老师的
    promise(...args){
      let first = this.tasks.shift();
      return this.tasks.reduce((p,next)=>{
        return  p.then((val)=>{return next(val)})
      },first(...args))
    }

 }

 let asyncSeriesWaterfallHook = new AsyncSeriesWaterfallHook(['name']);

// tapAsync callAsync 写法
// asyncSeriesWaterfallHook.tapAsync('name',(name,cb)=>{
//   setTimeout(()=>{
//      console.log('name',name);
//      cb(null,'11111111')
//   },1000)
// })

// asyncSeriesWaterfallHook.tapAsync('age',(data,cb)=>{
//   setTimeout(()=>{
//     console.log('age:',data);
//     cb(null,'22222')
//   },3000)
// })

// asyncSeriesWaterfallHook.callAsync('zj',(err,data)=>{
//   console.log(err);
//   console.log(data);
//   console.log('end');
// });

// tapPromise promise 用法

asyncSeriesWaterfallHook.tapPromise('name',(name)=>{
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      console.log('name',name);
      reject('11')
    },2000)
  })
})

asyncSeriesWaterfallHook.tapPromise('age',(data)=>{
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      console.log('age:',data);
      resolve('22')
    },2000)
  })
})

asyncSeriesWaterfallHook.promise('zj').then((res)=>{
  console.log('end:',res);
},(err)=>{
  console.log('err:',err)
})
