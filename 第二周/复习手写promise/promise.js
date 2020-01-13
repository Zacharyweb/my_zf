class Promsise{
    constructor(fn){
        this.status = 'pending';
        this.value = undefined;
        this.error = undefined;
        this.resolveCbs = [];
        this.rejectCbs = [];
        let resolve = (value) =>{
            if(this.status == 'pending'){
                if(value instanceof Promsise){
                    value.then(resolve,reject);
                    return;
                };
                this.value = value;
                this.status = 'fulfilled';
                this.resolveCbs.forEach((cb)=>{
                    cb();
                })
            }
        };
        let reject = (error) => {
            if(this.status == 'pending'){
                this.error = error;
                this.status = 'rejected';
                this.rejectCbs.forEach((cb)=>{
                    cb();
                })
            }
        };
        try{
            fn(resolve,reject)
        }catch(err){
            reject(err);
        };
    };
    then(onResolve,onReject){
        onResolve = typeof onResolve === 'function' ? onResolve :(value) => { return value};
        onReject = typeof onReject === 'function' ? onReject :(err) => { throw new Error(err)};
        let promise2 = new Promsise((resolve,reject)=>{
            if(this.status == 'fulfilled'){
                setTimeout(()=>{
                    try {
                        let x = onResolve(this.value);
                        reslovePromise(promise2,x,resolve,reject);
                    } catch (err) {
                        reject(err);
                    }
                },0)
            };
            if(this.status == 'rejected'){
                setTimeout(()=>{
                    try {
                        let x = onReject(this.error);
                        reslovePromise(promise2,x,resolve,reject);
                    } catch (err) {
                        reject(e);
                    }
                },0)
            };
            if(this.status == 'pending'){
                this.resolveCbs.push(()=>{
                    setTimeout(()=>{
                        try {
                            let x = onResolve(this.value);
                            reslovePromise(promise2,x,resolve,reject);
                        } catch (err) {
                            reject(err);
                        }
                    },0)
                    
                });
                this.rejectCbs.push(()=>{
                    setTimeout(()=>{
                        try {
                            let x = onReject(this.error);
                            reslovePromise(promise2,x,resolve,reject);
                        } catch (err) {
                            reject(err);
                        }
                    },0)
                })
            };
        });
        return promise2;
    };

    catch(errorCb){
       return this.then(null,errorCb);
    };

    finally(fn){
       return this.then((val)=>{
            return Promsise.resolve(fn()).then(()=>val)
       },(err)=>{
            return Promsise.reject(fn()).then(()=>{throw Error()})
       })
    };


    static resolve(value){
        return new Promsise((resolve,reject)=>{
            resolve(value);
        })
    };
    static resolve(err){
        return new Promsise((resolve,reject)=>{
            reject(err);
        })
    };

    static all(promises){
         return new Promsise((resolve,reject)=>{
            let l = promises.length;
            let result = [];
            let flag = 0;
            function resolveData(data,i){
                flag++;
                result[i] = data;
                if(flag == l){
                    resolve(result);
                }
            };
            promises.forEach((item,i)=>{
               if(isPromise(item)){
                   item.then((data)=>{
                    resolveData(data,i)
                   },reject)
               }else{
                resolveData(item,i)
               }
            })
             
         })
    };

    static race(promises){
        return new Promise((resolve,reject)=>{
            promises.forEach((item,i)=>{
                if(isPromise(item)){
                    item.then((data)=>{
                       resolve(data);
                    },reject)
                }else{
                   resolve(item);
                }
             })
        })
    }
    static try(cb){
        return new Promsise((resolve,reject)=>{
            return Promsise.resolve(cb()).then(resolve,reject)
        })
    }
};

function isPromise(x){
    if((typeof x === 'object' && x !== null) || typeof x === 'function'){
        let then = x.then;
        if(typeof then === 'function'){
           return true;
        }
    }
    return false;
};

function reslovePromise(promise2,x,resolve,reject){
    if(promise2 == x){
        reject(new TypeError('类型错误'));
        return;
    }
    if((typeof x === 'object' && x !== null) || typeof x === 'function'){
        let flag = false;
        try{
            let then = x.then;
            if(typeof then === 'function'){
                then.call(x,(y)=>{
                    if(flag) return;
                    flag = true;
                    reslovePromise(promise2,y,resolve,reject);
                },(e)=>{
                    if(flag) return;
                    flag = true;
                    reject(e);
                })
            }else{
              
                resolve(x);
            }
        }catch(err){
           if(flag) return;
           flag = true;
           reject(err);
        }
    }else{
        resolve(x);
    }
}

module.exports = Promsise;
