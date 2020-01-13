class AsyncParallelHook{
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
        // args.length = this.args.length + 1;
        let fn = args.pop();
        let i = 0;
        let cb = ()=>{
            i++;
            if( i === this.tasks.length){
                if(typeof fn === 'function'){
                    fn();
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
           return task(...args)
        })
        return new Promise((resolve,reject)=>{
            Promise.all(promises).then(()=>{
                resolve();
            })
        })
        
    }
 }

let asyncParallelHook = new AsyncParallelHook(['name']);

//   tapAsync callAsync 写法
//   asyncParallelHook.tapAsync('name',(name,cb)=>{
//     setTimeout(()=>{
//        console.log('name',name);
//        cb()
//     },1000)
//   })
  
//   asyncParallelHook.tapAsync('age',(name,cb)=>{
//     setTimeout(()=>{
//       console.log('age:',name);
//       cb()
//     },3000)
//   })
  
//   asyncParallelHook.callAsync('zzjj',()=>{
//     console.log('end');
//   });

  // tapPromise promise用法
  asyncParallelHook.tapPromise('name',(name)=>{
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
            console.log('name',name);
            resolve('11')
      },2000)
    
    })
  })
  
  asyncParallelHook.tapPromise('age',(name)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('age',name);
            resolve('22')
        },4000)
    })
  })
  
  asyncParallelHook.promise('zj').then((res)=>{
    console.log(res); 
    console.log('end');
  })

