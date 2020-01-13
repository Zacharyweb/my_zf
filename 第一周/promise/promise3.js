/**
 * 基础版Promise上加链式调用 稍微进阶点的版本 即加上 resolvePromise方法 
 *   关键在于在Promise原型的then方法里面再返回一个new Promise
 *   Promise规范里面规定：
 * 
 *   1.then里面必须要return一个值 如果没有return 则默认 return undefined
 * 
 *   2.链式调用时不管上一个then执行的是onResolve还是onReject，下一个then默认都会执行onResolve，
 *     要想执行下一个then的onReject则需要上一个then中throw Error或者返回一个promise对象并且这对象走reject();
 * 
 *   3.then里面如果return的是一个promise对象或throw new Error则另外处理，其他值直接返回给then里面返回的new Promise来resolve；
 * 
 *   4.如果then里面throw new Error，则try catch里给then里面返回的new Promise来reject(err)以交给这个promise的then中（即下一个promise）来处理；
 * 
 *   5.如果then里面return的是一个promise对象，则需要判断这个promise对象是否与Promise原型的then返回的promise对象相等
 *     例：
 *        let p = new Promise(...);
 *        let promise2 = p.then(()=>{
 *             return promise2;
 *        });
 *        promise2.then(()=>{},(err)=>{console.log(err)});
 *        如上，则需要抛出一个死循环调用的类型错误。
 */
let i = 0;
class Promise{
    constructor(fn){ 

        this.status = 'pending';
        this.value = undefined;
        this.error = undefined;
        this.resolveCbs = [];
        this.rejectCbs = [];
        
        let resolve = (value)=>{
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

        let promise2 = new Promise((resolve,reject)=>{
            if(this.status == 'fulfilled'){
                // 前一个then的onResolve或onReject回调里throw new Error时直接走返回的new Promise的reject(err) 以走到它的then里的onReject
                setTimeout(()=>{
                    try{
                        let x = onResolve(this.value);
                        // 因为直接传promise2进去此时promise2还是undefined，还没有把new Promise赋值上去，所以外面要套个setTimeout
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
    }
};

// resolvePromise用于解析 then的onResolve或onReject回调中return的内容，
// promise2：then执行后返回的新的promise实例
// x: then的onResolve或onReject回调中return的内容
// resolve：then执行后返回的新的promise实例的resolve
// reject：then执行后返回的新的promise实例的reject
function resolvePromise(promise2,x,resolve,reject){
    if(promise2 == x){
        return reject(new TypeError('类型错误'));
    };
    if((typeof x == 'object' && x !== null) || typeof x == 'function'){
        let flag; // 为了严谨，防止别人返回他自己写的Promise对象里调了resolve后又调了reject
        try{
            // 以防取then时就报错，比如有人x.then = ()=>{return new Error('我捣乱的')}，所以加个try catch
            let then = x.then;
            if(typeof then == 'function'){
                // 代表返回的x是个promise
                // 就执行它的then方法里取到value或者error进行resolve或者reject

                // x.then((v)=>{
                //     resolve(v);
                // },(r)=>{
                //     reject(r);
                // })

                // 但因为再取then可能还会报错，如有人代码里写第二次取then就抛出的捣乱代码，所以用call的方法执行then;
                then.call(x,(v)=>{
                    // 本来这么写就ok 
                    // resolve(v);
                    // 但是

                    // v可能也是个promise
                    // 例 
                    // p.then((res)=>{
                    //     return new Promise((resolve,reject)=>{
                    //         resolve(new Promise((resolve,reject)=>{
                    //             resolve(res)
                    //         }));
                    //     })
                    // }).then((res)=>{
                    //     console.log('成功2:'+ res);
                    // },(err)=>{
                    //     console.log('错误2:'+ err);
                    // });

                    // 此时递归调用resolvePromise就Ok
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
        }catch(err){ 
            if(flag) return;
            flag = true;
            reject(x); 
        }
    }else{
        resolve(x);
    }
};

module.exports = Promise;