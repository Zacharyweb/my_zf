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
            this.status = 'fulfilled';
            this.value = value;
            this.resolveCbs.forEach(cb =>{
              cb();
            })
        }
    }
    let reject = (error)=>{
        if(this.status === 'pending'){
            this.status = 'rejected'
            this.error = error;
            this.rejectCbs.forEach(cb =>{
                cb()
            })
        }
    }
    try {
        fn(resolve,reject);
    } catch (error) {
        reject(error);
    }
   }
   then(onResolve,onReject){
       onResolve = typeof onResolve === 'function' ? onResolve : val => val;
       onReject = typeof onReject === 'function' ? onReject : err => {throw err};

       let promise2 = new Promise((resolve,reject)=>{
            if(this.status === 'fulfilled'){
                setTimeout(()=>{
                    try {
                       let x = onResolve(this.value); 
                       resolvePromise(promise2,x,resolve,reject);
                    } catch (error) {
                       reject(error)
                    }  
                })
            }
            if(this.status === 'rejected'){
                setTimeout(()=>{
                    try {
                        let x = onReject(this.err);
                        resolvePromise(promise2,x,resolve,reject);
                    } catch (error) {
                        reject(error)
                    }
                })
            }
            if(this.status === 'pending'){
                this.resolveCbs.push(()=>{
                    setTimeout(()=>{
                        try {
                            let x = onResolve(this.value);
                            resolvePromise(promise2,x,resolve,reject);
                        } catch (error) {
                            reject(error)
                        }
                    })
                })
                this.rejectCbs.push(()=>{
                    setTimeout(()=>{
                        try {
                            let x =  onReject(this.error);
                            resolvePromise(promise2,x,resolve,reject);
                        } catch (error) {
                            reject(error)
                        }
                    })
                }) 
            }
       })
       return promise2;
   }
    catch(errorCb){
        return this.then(null,errorCb);
    }
    finally(fn){
        return this.then((val)=>{
            return Promise.resolve(fn()).then(()=>{
                return val
            })
        },(err)=>{
            return Promise.resolve(fn()).then(()=>{
               throw err;
            })
        });
    }
    static resolve(val){
        return new Promise((resolve,reject)=>{
            resolve(val)
        })
    }
    static reject(err){
         return new Promise((resolve,reject)=>{
             reject(err)
         })
    }
    static try(fn){
        return new Promise((resolve,reject)=>{
            Promise.resolve(fn()).then(resolve,reject);
        })
    }
    static all(promises){
        return new Promise((resolve,reject)=>{
            let flag = 0;
            let result = [];
            function handlerData(val,i){
                flag++;
                result[i] = val;
                if(flag === promises.length){
                    resolve(result);
                }
            };
            promises.forEach((p,i)=>{
                if(isPromise(p)){
                    p.then((val)=>{
                        handlerData(val,i);
                    },reject);
                }else{
                    handlerData(p,i);
                }
                
            })
        })
    }
    static race(promises){
        return new Promise((resolve,reject)=>{
            promises.forEach((p,)=>{
                if(isPromise(p)){
                    p.then((val)=>{
                        resolve(val);
                    },reject);
                }else{
                    resolve(p);
                }
            })
        })
    }
}
function resolvePromise(promise2,x,resolve,reject){
    if(promise2 === x){
        return reject(new Error('自己等自己啦'))
    }
    if((typeof x === 'object' && x !== null) || typeof x === 'function'){
        let flag = false;
        try {
            let then = x.then;
            if(typeof then === 'function'){
               then.call(x,(y)=>{
                   if(flag) return;
                   flag = true;
                   resolvePromise(promise2,y,resolve,reject);
               },(err)=>{
                    if(flag) return;
                    flag = true;
                    reject(err);
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
}
function isPromise(p){
    if((typeof p === 'object' && p !== null) || typeof p === 'function'){
        if(p.then && typeof p.then === 'function'){
            return true;
        }
    }
    return false;
}
module.exports = Promise;