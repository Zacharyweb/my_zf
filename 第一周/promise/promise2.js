/**
 * 基础版Promise上加链式调用 基础2版 
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
                // 前一个then的onResolve或onReject里throw new Error时直接走返回的new Promise的reject(err) 以走到它的then里的onReject
                try{
                    let x = onResolve(this.value);
                    resolve(x);
                }catch(err){
                    reject(err);
                };
            }
            if(this.status == 'rejected'){
                try{
                    let x = onReject(this.error)
                    resolve(x);
                }catch(err){
                    reject(err);
                };
            }
            if(this.status == 'pending'){
          
               this.resolveCbs.push(()=>{
                    try{
                      let x = onResolve(this.value);
                      resolve(x);
                    }catch(err){
                      reject(err);
                    };
               });

               this.rejectCbs.push(()=>{
                    try{
                       let x =  onReject(this.error);
                       resolve(x);
                    }catch(err){
                        reject(err);
                    }; 
               });
            }
        });

        return promise2;
    }
};

module.exports = Promise;