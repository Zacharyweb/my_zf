let {
   SyncHook,
   SyncBailHook, 
   SyncLoopHook, 
   SyncWaterfallHook,

   AsyncParallelHook, // 并行
   AsyncParallelBailHook,

   AsyncSeriesHook, // 串行
   AsyncSeriesBailHook,
   AsyncSeriesWaterfallHook
} = require('tapable');


let asyncSeriesWaterfallHook= new AsyncSeriesWaterfallHook(['name']);

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

