import { threadId } from "worker_threads";
import { resolve4 } from "dns";

class Promise{
    constructor(fn){
        this.status = 'pending';
        this.value = undefined;
        this.error = undefined;
        this.resolveCbs = [];
        this.rejectCbs = [];
        let resolve = (value)=>{
            if(this.status === 'pending'){
                if(value instanceof Promise){
                    return value.then(resolve,reject);
                };
                this.value = value;
                this.status = 'fulfilled';
                this.resolveCbs.forEach((cb)=>{
                    cb()
                });
            }
        };

        let reject = (error)=>{
            if(this.status === 'pending'){
                this.error = error;
                this.status = 'rejected';  
                this.rejectCbs.forEach((cb)=>{
                    cb();
                });
            }
        };

        try {
            fn(resolve,reject);
        } catch (error) {
            reject(error);
        }
    };
    then(resolveFn,rejectFn){
        resolveFn = typeof resolveFn === 'function'?resolveFn:val=>val;
        rejectFn = typeof rejectFn === 'function'?rejectFn:(err)=>{throw err};

        let promise2 = new Promise((resolve,reject)=>{
            if(this.status === 'fulfilled'){
                setTimeout(()=>{
                    try {
                        let x = resolveFn(this.value);
                        resolvePromise(promise2,x,resolve,reject);
                    } catch (error) {
                        reject(error);
                    };
                })
            };
    
            if(this.status == 'rejected'){
                setTimeout(()=>{
                    try {
                        let x = rejectFn(this.error);
                        resolvePromise(promise2,x,resolve,reject);
                    } catch (error) {
                        reject(error);
                    };
                });
            };
    
            if(this.status == 'pending'){
                
                this.resolveCbs.push(()=>{
                    setTimeout(()=>{
                        try {
                            let x = resolveFn(this.value);
                            resolvePromise(promise2,x,resolve,reject);
                        } catch (error) {
                            reject(error);
                        };
                    });
                });
                this.rejectCbs.push(()=>{
                    setTimeout(()=>{
                        try {
                            let x = rejectFn(this.error);
                            resolvePromise(promise2,x,resolve,reject);
                        } catch (error) {
                            reject(error);
                        };
                    });
                })
            };
        });
        return promise2;
    };
    catch(errCb){
        return this.then(null,errCb);
    };
    finally(fn){
        return this.then((val)=>{
            return Promise.resolve(fn()).then(()=>{
                return val;
            })
        },(err)=>{
            return Promise.resolve(fn()).then(()=>{
                throw err;
            })
        })
         
    };
    static resolve(val){
        return new Promise((resolve,reject)=>{
            resolve(val);
        });
    };
    static reject(err){
        return new Promise((resolve,reject)=>{
            reject(err);
        });
    };
    static race(promises){
        return new Promise((resolve,reject)=>{
            promises.forEach((p)=>{
                if(isPromise(p)){
                    p.then((val)=>{
                        resolve(val);
                    },reject)
                }else{
                    resolve(p);
                }
            })
        })

    };
    static all(promises){
        return new Promise((resolve,reject)=>{
            let flag = 0;
            let result = [];
            function resolveData(data,i){
                flag++;
                result[i] = data;
                if(flag === promises.length){
                    resolve(result);
                };
            };
            promises.forEach((p,i)=>{
                if(isPromise(p)){
                    p.then((val)=>{
                        resolveData(val,i);
                    },reject)
                }else{
                    resolveData(p,i);
                }
            })
        })
    };
    static try(fn){
        return new Promise((resolve,reject)=>{
              Promise.resolve(fn()).then(resolve,reject);
        })
            
    };
};
function resolvePromise(promise2,x,resolve,reject){
    if(promise2 === x){
        return reject(new Error('循环引用'));
    };
    if(typeof x === 'function' || (typeof x === 'object' && x !== null)){
        let flag = false;
        try {
            let then = x.then;
            if(then && typeof then === 'function'){
                 then.call(x,(v)=>{
                    if(flag) return;
                    flag = true;
                    resolvePromise(v,x,resolve,reject);
                 },(e)=>{
                    if(flag) return;
                    flag = true;
                    reject(e);
                 })
            }else{
                resolve(x);
            }
        } catch (error) {
            if(flag) return;
            flag = true;
            reject(error);
        }
    }else{
        resolve(x);
    }
};

function isPromise(p){
    if(typeof p === 'function' || (typeof p === 'object' && p != null)){
        if(p.then && typeof p.then === 'function'){
            return true;
        }
    };
    return false;
};