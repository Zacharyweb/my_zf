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
                 value.then(resolve,reject);
                 return;
             }
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

        try {
            fn(resolve,reject);
        } catch (error) {
            reject(error);
        };
    }
    then(onResolve,onReject){
        onResolve = typeof onResolve == 'function'? onResolve : (val) => val;
        onReject = typeof onReject == 'function'? onReject : (err) => { throw new Error(err)};

        let promise2 = new Promise((resolve,reject)=>{
            if(this.status == 'fulfilled'){
                setTimeout(()=>{
                    try {
                        let x = onResolve(this.value);
                        resolvePromise(promise2,x,resolve,reject);
                    } catch (err) {
                        reject(err);
                    }
                })
            
            };

            if(this.status == 'rejected'){
                setTimeout(()=>{
                    try {
                        let x = onReject(this.error);
                         resolvePromise(promise2,x,resolve,reject);
                    } catch (err) {
                        reject(err)
                    } 
                })
            };

            if(this.status == 'pending'){
                this.resolveCbs.push(()=>{
                    setTimeout(()=>{
                        try {
                            let x = onResolve(this.value);
                             resolvePromise(promise2,x,resolve,reject); 
                        } catch (err) {
                            reject(err); 
                        }
                    })
                });
                this.rejectCbs.push(()=>{
                    setTimeout(()=>{
                        try {
                            let x = onReject(this.error);
                             resolvePromise(promise2,x,resolve,reject); 
                        } catch (err) {
                            reject(err);
                        }
                    })
                })
            }
        });

        return promise2;
    };
    catch(errorCb){
        return this.then(null,errorCb);
    };

    finally(fn){
        return this.then((value)=>{
            Promise.resolve(fn()).then(()=>{
               return value;
            })
        },(err)=>{
            Promise.resolve(fn()).then(()=>{
                throw err;
            })
        })
    };

    static try(fn){
        return new Promise((resolve,reject)=>{
            return Promise.resolve(fn()).then(resolve,reject);
        })
    };

    static resolve(val){

        return new Promise((resolve,reject)=>{
            resolve(val);
        })
       
    };
    static reject(err){
        return new Promise((resolve,reject)=>{
            reject(err);
        })
    };

    static all(promises){
        return new Promise((resolve,reject)=>{
            let result = []
            let flag = 0;
            function resolveData(data,index){
                result[index] = data;
                flag++;
                if(flag == promises.length){
                    resolve(result);
                }
            };
            promises.forEach((p,i)=>{
                if(isPromise(p)){
                    p.then((res)=>{
                        resolveData(res,i);
                    },(err)=>{
                        reject(err);
                    })
                }else{
                    resolveData(p,i);
                }
            })
        })
    };

    static race(promises){
        return new Promise((resolve,reject)=>{
            promises.forEach((p)=>{
                if(isPromise(p)){  
                    p.then((res)=>{
                        resolve(res);
                    },(err)=>{
                        reject(err);
                    })
                }else{
                    resolve(p);
                }
            })

        })
    };
}
function isPromise(obj){
    if((typeof obj === 'object' && obj !== null) || typeof obj === 'function'){
        if(obj.then && typeof obj.then === 'function'){
            return true;
        }
    }
    return false;

}

function resolvePromise(promise2,x,resolve,reject){
    if(promise2 == x){
        reject(new TypeError('类型相同'));
        return;
    }
    if((typeof x === 'object' && x !== null) || typeof x === 'function'){
        let flag = false;
        try {
            let then = x.then;
            if(typeof x.then === 'function'){
                then.call(x,(v)=>{
                    if(flag) return;
                    flag = true;
                    resolvePromise(promise2,v,resolve,resolve);
                },(e)=>{
                    if(flag) return;
                    flag = true;
                    reject(e);
                });
            }else{
                resolve(x);
            };
        } catch (err) {
            if(flag) return;
            flag = true;
            reject(err);  
        }
    }else{
        resolve(x);
    }
};

module.exports = Promise;