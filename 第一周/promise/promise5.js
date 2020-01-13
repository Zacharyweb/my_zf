/**
 * 至promise4.js已经实现了A+规范的promise
 * promise官方提供了一个测试库可以测试手写的Promise是否通过
 * 
 * 这里完善一些任存在的问题及一些Promise扩展的方法 如 
 * 问题：
 *      let p = new Promise((resolve,reject)=>{
            resolve(new Promise((resolve,reject)=>{
                resolve('fuck');
            }));
        });
        p.then((res)=>{
            console.log(res);
        });
 * 此时原生提供的Promise输出的是'fuck',
 * 但手写的直接输出了这个new的Promise，所以需要改进
 * 
 * 
 * 方法：
 * promise.catch()
 * promise.finally()
 * promise.try() 
 * 
 * Promise.resolve() 
 * Promise.reject()
 * Promise.all() 
 * Promise.race()
 */

class Promise{
    constructor(fn){ 

        this.status = 'pending';
        this.value = undefined;
        this.error = undefined;
        this.resolveCbs = [];
        this.rejectCbs = [];
        
        let resolve = (value)=>{
            // 用于处理上面注释例子存在的问题，如果resolve的值也是个Promise对象，则把这个Promise对象的then执行

            if(value instanceof Promise){
                value.then(resolve,reject);
                return;
            }
            if(this.status == 'pending'){
                this.value = value;
                this.status = 'fulfilled';
                this.resolveCbs.forEach((cb)=>{
                    cb();
                })
            }
        };

        let reject = (error)=>{
            if(this.status == 'pending'){
                this.error = error;
                this.status = 'rejected';
                this.rejectCbs.forEach((cb)=>{
                    cb();
                })
            }
        };

        try{
            fn(resolve,reject);
        }catch(err){
            reject(err);
        }
    };
    then(onResolve,onReject){
        onResolve = typeof onResolve == 'function'? onResolve: (val)=>{return val};
        onReject = typeof onReject == 'function'? onReject: (err)=>{throw new Error(err)};
        let promise2 = new Promise((resolve,reject)=>{
            if(this.status == 'fulfilled'){
                setTimeout(()=>{
                    try{
                        let x = onResolve(this.value);
                        resolvePromise(promise2,x,resolve,reject);
                    }catch(err){
                        reject(err);
                    };
                })
            };
            if(this.status == 'rejected'){
                setTimeout(()=>{
                    try{
                        let x = onReject(this.error)
                        resolvePromise(promise2,x,resolve,reject);
                    }catch(err){
                        reject(err);
                    };
                })
            };
            if(this.status == 'pending'){
          
               this.resolveCbs.push(()=>{
                    setTimeout(()=>{
                        try{
                          let x = onResolve(this.value);
                          resolvePromise(promise2,x,resolve,reject);
                        }catch(err){
                          reject(err);
                        };
                    })
                    
               });

               this.rejectCbs.push(()=>{
                    setTimeout(()=>{
                        try{
                           let x =  onReject(this.error);
                           resolvePromise(promise2,x,resolve,reject);
                        }catch(err){
                            reject(err);
                        };
                    })
                     
               });
            }
        });
        return promise2;
    };
    /**
     * promise.catch的写法可以看成then(null,(err)=>{...})的语法糖
     */

    catch(errorCb){
       return this.then(null,errorCb);

      // 以下为踩坑的错误写法我的个人见解
      /**   
       *  return this.then(null,(err)=>{
       *     errorCb(err);
       *  });
       * 
       * 不能这样写是因为这样 reject 就相当于(err)=>{ errorCb(err); return undefined})了
       * 这样catch后面再调then((res)=>{}),res拿到的就是undefined了 
       * 所以要按上面这样的写法直接传errorCb进去 errorCb里要是return了啥，下个then的res里就拿到啥
       */
    };


    /**
     * 
     * promise.finally效果
     *  let p = new Promise((resolve,reject)=>{
          resolve('fuck');
        });
        
        p.then((res)=>{
          console.log('成功');
          console.log(res);
        },(err)=>{
          console.log('失败');
          console.log(err);
        }).finally((res)=>{
          console.log('最终')
          console.log(res);
          return '来自最终'
        }).then((res)=>{
          console.log(res);
        }) 

        结果：
            成功
            fuck
            最终
            undefined
            undefined
     */
    finally(fn){
        return this.then((data)=>{
            fn();
        },(err)=>{
            fn();
        });
    }

    // 挂载静态方法 即挂载在Promise本身上 等于Promise.resolve = xxx; 实例上不会继承这个方法。
    // static resolve(data){
    //     return new Promise((resolve,reject)=>{
    //         resolve(data);
    //     })
    // }
    static try(fn){
        return new Promise((resolve,reject)=>{
            Promise.resolve(fn()).then(resolve,reject);
        })
    }
};


function resolvePromise(promise2,x,resolve,reject){
    if(promise2 == x){
        return reject(new TypeError('类型错误'));
    };
    if((typeof x == 'object' && x !== null) || typeof x == 'function'){
        let flag; 
        try{
            let then = x.then;
            if(typeof then == 'function'){
                then.call(x,(v)=>{
                    if(flag) return;
                    flag = true;
                    resolvePromise(promise2,v,resolve,reject);

                },(r)=>{
                    if(flag) return;
                    flag = true;
                    reject(r);
                })
            }else{
                
                resolve(x);
            }
        }catch(e){ 
            if(flag) return;
            flag = true;
            reject(e); 
        }
    }else{
        resolve(x);
    }
};


/** 这样的写法
 *  Promise.resolve('123').then((res)=>{
      console.log('成功');
      console.log(res);
    },(err)=>{
      console.log('失败');
      console.log(err);
    })
 */

 /**
  * 这样的方法也可写在class内部 用static resolve(){}这样的写法，详见上面类中注释的static resolve部分；
  */
Promise.resolve = (data)=>{
    return new Promise((resolve,reject)=>{
        resolve(data);
    })
}


Promise.reject = (err)=>{
    return new Promise((resolve,reject)=>{
        reject(err);
    })
}

/**
 * 使用 Promise.all([promise1,promise2,promise3]).then((data)=>{ 得到的data是个数组，对应各个promise的返回内容})
 * 注意的点：如果all的参数数组里有常量项，将会直接返回该项，如[promise1,'1',promise3]将返回[promise1.then()后的值,'1',promise3.then()后的值]
 */
let isPromsise = (p)=>{
    if((typeof p == 'object' && p !== null) || typeof p == 'function'){
        let x = p.then;
        if(x  && typeof x == 'function'){
            return true;
        }
    }
    return false;
}

Promise.all = (promiseArr)=>{
    return new Promise((resolve,reject)=>{
        let resultArr = [];
        let len = promiseArr.length;
        let flag = 0;
        let  resolveData = (index,data)=>{
            flag++;
            resultArr[index] = data;
            if(flag == len){
                /**
                 * 不能用resultArr.length == len来判断，
                 * 因为例如当all([promise1,promise2，'1'])这样时，
                 * 异步的promise1与promise2的结果都还没返回，但常量'1'直接返回，
                 * 这样resultArr[2] = '1',resultArr.length就已经等于len了
                 * 所有定义个i来判断
                 */
                resolve(resultArr)
            }
        };

        promiseArr.forEach((p,i)=>{
            if(isPromsise(p)){
                p.then((res)=>{
                    resolveData(i,res)
                },reject)
            }else{
                resolveData(i,p)
            }
            
        })
    })
};


// 自己实现的race
Promise.race = (promiseArr)=>{
    return new Promise((resolve,reject)=>{
        let flag = false;
        let  resolveData = (index,data)=>{
            if(flag) return;
            flag = true;
            resolve(data)
        };

        promiseArr.forEach((p,i)=>{
            if(isPromsise(p)){
                p.then((res)=>{
                    resolveData(i,res)
                },reject)
            }else{
                resolveData(i,p)
            }
            
        })
    })
};

module.exports = Promise;