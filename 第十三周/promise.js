class Promise {
    constructor(fn) {
        this.status = 'pending';
        this.value = undefined;
        this.error = undefined;
        this.resolveCbs = [];
        this.rejectCbs = [];
        let resolve = (value) => {
            if (this.status == 'pending') {
                if (value instanceof Promise) {
                    return value.then(resolve, reject);
                };
                this.status = 'fulfilled';
                this.value = value;
                this.resolveCbs.forEach(cb => {
                    cb();
                })

            }
        };
        let reject = (error) => {
            if (this.status == 'pending') {
                this.status = 'rejected';
                this.error = error;
                this.rejectCbs.forEach(cb => {
                    cb();
                })
            }
        };
        try {
            fn(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }
    then(resolveCb, rejectCb) {
        resolveCb = typeof resolveCb == 'function' ? resolveCb : val => val;
        rejectCb = typeof rejectCb == 'function' ? rejectCb : err => { throw err };
        let promsie2 = new Promise((resolve, reject) => {
            if (this.status == 'fulfilled') {
                setTimeout(() => {
                    try {
                        let x = resolveCb(this.value);
                        resolvePromise(promise2,x,resolve,reject)
                    } catch (error) {
                        reject(error);
                    }
                })
            }
            if (this.status == 'rejected') {
                setTimeout(() => {
                    try {
                        let x = rejectCb(this.error);
                        resolvePromise(promise2,x,resolve,reject)
                    } catch (error) {
                        reject(error);
                    }
                })

            }
            if (this.status == 'pending') {
                this.resolveCbs.push(() => {
                    setTimeout(() => {
                        try {
                            let x = resolveCb(this.value);
                            resolvePromise(promise2,x,resolve,reject)
                        } catch (error) {
                            reject(error);
                        }
                    })

                });
                this.rejectCbs.push(() => {
                    setTimeout(() => {
                        try {
                            let x = rejectCb(this.error);
                            resolvePromise(promise2,x,resolve,reject)
                        } catch (error) {
                            reject(error);
                        }
                    })

                })
            }
        });
        return promsie2;
    }
    catch(errCb) {
        return this.then(null,errCb);
    }
    finally(fn) {
        return this.then((val)=>{
           return Promise.resolve(fn()).then(()=>{
               return val
           })

        },(err)=>{
            return Promise.resolve(fn()).then(()=>{
                throw err;
            })
        })
    }
    static resolve(value) {
        return new Promise((resolve,reject)=>{
            resolve(value);
        });
    }
    static reject(error) {
        return new Promise((resolve,reject)=>{
            reject(error);
        });
    }
    static try(fn) {
        return new Promise((resolve,reject)=>{
            return Promise.resolve(fn()).then(resolve,reject);
        })
    }
    static all(promises) {
        return new Promise((resolve,reject)=>{
            let result = [];
            let flag = 0;
            function handleData(data,i){
                flag++;
                result[i] = data;
                if(flag === promises.length){
                    resolve(result)
                }
            }
            promises.forEach((p,index)=>{
                if(isPromise(p)){
                    p.then((v)=>{
                        handleData(v,index);
                    },reject);
                }else{
                    handleData(p,index);
                }
            })
        })

    }
    static race(promises) {
        return new Promise((resolve,reject)=>{
            promises.forEach((p,index)=>{
                if(isPromise(p)){
                    p.then((v)=>{
                      resolve(v);
                    },reject);
                }else{
                    resolve(p)
                }
            })
        })
    }
}

function resolvePromise(promise2,x,resolve,reject){
    if(promise2 == x){
       return reject(new Error('循环引用'));
    };
    if(typeof x === 'function' ||(typeof x === 'object' && x !== null)){
        let flag = false;
        try {
            let then = x.then;
            if(then && typeof then == 'function'){
                then.call(x,(y)=>{
                    if(flag) return;
                    flag = true;
                    resolvePromise(promise2,y,resolve,reject);
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
    if(typeof p === 'function' || (typeof p === 'object' && p !== null)){
        if(p.then && typeof p.then === 'function'){
            return true;
        }
    };
    return false;
};