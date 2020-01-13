class Promise{
    constructor(fn){
        this.status = 'pending';
        this.value = undefined;
        this.error = undefined;
        this.resolveCbs = [];
        this.rejectCbs = [];
        let resolve = (value)=>{
            if(this.status == 'pending'){
                if(value instanceof Promise){
                   return value.then(resolve,reject);
                };
                this.status = 'fulfilled';
                this.value = value;
                this.resolveCbs.forEach((cb)=>{
                    cb();
                })
            }
        };

        let reject = (error)=>{
            if(this.status == 'pending'){
                this.status = 'rejected';
                this.error = error;
                this.rejectCbs.forEach((cb)=>{
                    cb();
                })
            }
        };

        try {
            fn(resolve,reject);
        } catch (error) {
            reject(error)
        };
    }
    then(resolveCb,rejectCb){
        resolveCb = typeof resolveCb == 'function'? resolveCb:(val)=>val;
        rejectCb = typeof rejectCb == 'function'? rejectCb:(err)=>{throw err};

        let promise2 = new Promise((resolve,reject)=>{
            if(this.status == 'fulfilled'){
                setTimeout(()=>{
                    try {
                        let x = resolveCb(this.value);
                        resolvePromise(promise2,x,resolve,reject);
                    } catch (error) {
                        reject(error);
                    };
                });
            };
            if(this.status == 'rejected'){
                setTimeout(()=>{
                    try {
                        let x = rejectCb(this.error);
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
                           let x = resolveCb(this.value); 
                           resolvePromise(promise2,x,resolve,reject);
                        } catch (error) {
                            reject(error);
                        };
                    });
                });
                this.rejectCbs.push(()=>{
                    setTimeout(()=>{
                        try {
                            let x = rejectCb(this.error);
                            resolvePromise(promise2,x,resolve,reject);
                        } catch (error) {
                            reject(error);
                        };
                    });
                });
            };
        });
        return promise2;
    }
    catch(errorCb){
        return this.then(null,errorCb);
    }
    finally(fn){
        return this.then((v)=>{
            return Promise.resolve(fn()).then(()=>{
                return v;
            })
        },(e)=>{
            return Promise.resolve(fn()).then(()=>{
                throw e
            })
        })

    }
    static resolve(cb){
        return new Promise((resolve,reject)=>{
            resolve(cb);
        })
    }
    static reject(cb){
        return new Promise((resolve,reject)=>{
            reject(cb);
        })
    }
    static try(fn){
        return new Promise((resolve,reject)=>{
            Promise.resolve(fn()).then(resolve,reject);
        })
    }
    static race(promises){
        return new Promise((resolve,reject)=>{
            promises.forEach((p)=>{
                if(isPromise(p)){
                    p.then((v)=>{
                        resolve(v)
                    },reject)
                }else{
                    resolve(p)
                }
            })
        })
    }
    static all(promises){
        return new Promise((resolve,reject)=>{
            let flag = 0;
            let result = [];
            let l = promises.length;
            function handelerData(data,index){
                flag++;
                result[index] = data;
                if(flag == l){
                    resolve(result);
                }
            };
            promises.forEach((p,i)=>{
                if(isPromise(p)){
                   p.then((v)=>{
                    handelerData(v,i)
                   },reject)
                }else{
                    handelerData(p,i)
                }
            })
        })
    }
};

function resolvePromise(promise2,x,resolve,reject){
    if(promise2 === x){
        return reject(new Error('不能相等'));
    };
    if(typeof x === 'function' || (typeof x === 'object' && x !== null)){
        let flag = false;
        try {
            let then = x.then;
            if(then && typeof then == 'function'){
                then.call(x,(v)=>{
                    if(flag) return;
                    flag = true;
                    resolvePromise(promise2,v,resolve,reject);
                },(e)=>{
                    if(flag) return;
                    flag = true;
                    reject(e);
                });
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
    };
};

function isPromise(p){
    if(typeof p === 'function' || (typeof p === 'object' && p !== null)){
        let then = p.then;
        if(p.then && typeof p.then === 'function'){
            return true;
        }
    }
    return false;

}

module.exports = Promise;