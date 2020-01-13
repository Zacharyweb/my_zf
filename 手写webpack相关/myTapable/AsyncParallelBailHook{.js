class AsyncParallelBailHook{
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
        let flag = false;
        let i = 0;

        let cb = (err)=>{
            i++;
            if( i === this.tasks.length || err !== undefined){
                if(typeof fn === 'function'){
                    if(flag) return;
                    fn();
                    flag = true;
                }
            }
        };

        this.tasks.forEach((task)=>{
            task(...args,cb)
        })
    
    }

    tapPromise(name,task){
        this.tasks.push(task);
    }

    promise(...args){
        let promises = this.tasks.map(task=>{
           return task(...args);
        })
        return Promise.all(promises);
    }
 }

let asyncParallelBailHook = new AsyncParallelBailHook(['name']);
//   tapAsync callAsync 写法
//   asyncParallelBailHook.tapAsync('name',(name,cb)=>{
//     setTimeout(()=>{
//        console.log('name',name);
//        cb('222')
//     },1000)
//   })
  
//   asyncParallelBailHook.tapAsync('age',(name,cb)=>{
//     setTimeout(()=>{
//       console.log('age:',name);
//       cb()
//     },3000)
//   })
  
//   asyncParallelBailHook.callAsync('wmj',()=>{
//     console.log('end');
//   });

// tapPromise promise用法

asyncParallelBailHook.tapPromise('name',(name)=>{
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      console.log('name',name);
      resolve('11')
    },3000)
    
  })
});

asyncParallelBailHook.tapPromise('age',(name)=>{
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      console.log('age',name);
      reject('22')
    },5000)
  })
});

asyncParallelBailHook.promise('zj').then((res)=>{
  console.log('end:',res);
},(err)=>{
  console.log('err:',err)
});