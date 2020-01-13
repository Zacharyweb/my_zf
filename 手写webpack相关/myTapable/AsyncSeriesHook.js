class AsyncSeriesHook{
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
    tapPromise(name,task){
      this.tasks.push(task);
    }

    
    callAsync(...args){
        args.length = this.args.length + 1;
        let fn = args.pop();
        let idx = 0;
        let next = ()=>{
          if(idx === this.tasks.length) return fn();
          let task = this.tasks[idx++];
          task(...args,next);
        }
        next()
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
      let [first,...others] = this.tasks;
      return others.reduce((p,next)=>{
        return  p.then(()=>{return next(...args)})
      },first(...args))
    }

 }

 let asyncSeriesHook = new AsyncSeriesHook(['name']);

// tapAsync callAsync 写法
// asyncSeriesHook.tapAsync('name',(name,cb)=>{
//   setTimeout(()=>{
//      console.log('name',name);
//      cb()
//   },1000)
// })

// asyncSeriesHook.tapAsync('age',(name,cb)=>{
//   setTimeout(()=>{
//     console.log('age:',name);
//     cb()
//   },3000)
// })

// asyncSeriesHook.callAsync('zj',()=>{
//   console.log('end');
// });

// tapPromise promise用法

asyncSeriesHook.tapPromise('name',(name)=>{
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      console.log('name',name);
      reject('11')
    },2000)
    
  })
})

asyncSeriesHook.tapPromise('age',(name)=>{
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      console.log('age:',name);
      resolve('22')
    },2000)
  })
})

asyncSeriesHook.promise('zj').then((res)=>{
  console.log('end:',res);
},(err)=>{
  console.log('err:',err)
})
