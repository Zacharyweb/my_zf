/**
 * 自己重新手写下
 */
class Promise{
    constructor(fn){
        this.value = undefined;
        this.error = undefined;
        this.status = 'pending';
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

        let reject = (err)=>{
            if(this.status == 'pending'){
                this.error = err;
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
        onResolve = typeof onResolve == 'function'?onResolve : (val) => val;
        onReject = typeof onReject == 'function'? onReject : (err) => { throw new Error(err) };

        let promise2 = new Promise((resolve,reject)=>{
            if(this.status == 'fulfilled'){
                let x = onResolve(this.value);
                resolvePromise(promise2,x,resolve,reject);
            }
            if(this.status == 'rejected'){
                let x = onReject(this.error);
                resolvePromise(promise2,x,resolve,reject);
            }
            if(this.status == 'pending'){
                this.resolveCbs.push(()=>{
                    let x = onResolve(this.value);
                    resolvePromise(promise2,x,resolve,reject);
                })
                this.rejectCbs.push(()=>{
                    let x = onReject(this.error);
                    resolvePromise(promise2,x,resolve,reject);
                })
            }
        })
        return promise2;
    };
    catch(errorCb){
       return this.then(null,errorCb)
    };
    finally(fn){
      return this.then((val)=>{
        fn(val);
      },(err)=>{
        fn(rr);
      })
    };
    static all(promises){
        return new Promise((resolve,reject)=>{
            let resultArr = [];
            let len = promises.length;
            let  flag = 0;
            let  resolveData = (index,data)=>{
                resultArr[index] = data;
                flag++;
                if(flag == len){
                    resolve(resultArr);
                }
            }
            promises.forEach((p,i)=>{
                if(isPromise(p)){
                     p.then((res)=>{
                        resolveData(res)
                     },(err)=>{
                       reject(err);
                     })
                }else{
                    resolveData(i,p)
                }
            })
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
    }
};

function isPromise(obj){
    if((typeof obj == 'object' && obj !== null) || typeof obj == 'function'){
        if(typeof obj.then == 'function'){
            return true;
        }
    };
    return false;
}

function resolvePromise(promise2,x,resolve,reject){
    if(promise2 == x){
        reject(new Error('类型错误'));
        return;
    }
    if((typeof x == 'object' && x !== null) || typeof x == 'function'){
        let flag = false;
        try {
            let then = x.then;
            if(typeof then == 'function'){
                then.call(x,(v)=>{
                    if(flag) return;
                    flag = true;
                    resolvePromise(promise2,v,resolve,reject);
                },(err)=>{
                    if(flag) return;
                    flag = true;
                    reject(err);
                })
            }else{
              resolve(x)
            }
        } catch (err) {
            if(flag) return;
            flag = true;
            reject(err);
        }
    }else{
        resolve(x);
    }
}

module.exports = Promise;

