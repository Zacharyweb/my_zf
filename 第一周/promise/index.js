// let Promise = require('./promise6.js');

// let p = new Promise((resolve,reject)=>{
//   resolve('fuck');
// });

// p.then((res)=>{
//   console.log('成功');
//   console.log(res);
// },(err)=>{
//   console.log('失败');
//   console.log(err);
// }).finally((res)=>{
//   console.log('最终')
//   console.log(res);
//   return '来自最终'
// }).then((res)=>{
//   console.log(res);
// })


// let p1 = new Promise((resolve,reject)=>{
//   setTimeout(()=>{
//     resolve('fuck');
//   },1000)
// });

// let p2 = new Promise((resolve,reject)=>{
//   setTimeout(()=>{
//     resolve('wmj');
//   },1500)
// });

// let p3 = new Promise((resolve,reject)=>{
//   setTimeout(()=>{
//     resolve('zj');
//   },500)
// });

// Promise.race([p1,p2,p3]).then((res)=>{
//   console.log(res);
// },(err)=>{
//   console.log(err);
// })


// p.then((res)=>{
//     console.log(res);
//     throw new Error('手写的错误')
// }).catch((err)=>{
//   console.log('错误啦');
//   console.log(err);
//   return 2;  
// }).then((res)=>{
//     console.log(res)
// });

// p.then((res)=>{
//     console.log(res);
//     throw new Error('手写的错误')
// }).then(null,(err)=>{
//    console.log('错误啦');
//    console.log(err);
//    return 2;  
// }).then((res)=>{
//    console.log(res)
// });

// p.then((res)=>{
//   console.log('成功1:'+ res);
// },(err)=>{
//   console.log('错误1:'+ err);
// }).then((res)=>{
//    console.log('成功2:'+ res);
// },(err)=>{
//   console.log('错误2:'+ err);
// })
// let promise2 = p.then(()=>{
//     return promise2;
// })
// promise2.then(()=>{},(err)=>{
//     console.log('错啦：' + err);
// })

// p.then((res)=>{
//     return new Promise((resolve,reject)=>{
//         resolve(new Promise((resolve,reject)=>{
//             resolve('ok')
//         }));
//     })
// }).then((res)=>{
//     console.log('成功2:'+ res);
// },(err)=>{
//     console.log('错误2:'+ err);
// });


// p.then((res)=>{
//     console.log(res);
//     return 'ok';
// }).then().then((res)=>{
//     console.log(res);
// });

let Promise = require('./promise6.js');
// 自己手写的测试一下

let p = new Promise((resolve,reject)=>{
 
  setTimeout(()=>{
    resolve('ok');
    // reject('no ok');
  },1000)

});

p.then((res)=>{
  console.log('成功')
  console.log(res);
  return 111;
},(err)=>{
  console.log('失败')
  console.log(err);
}).then((res)=>{
  console.log(res);
})

