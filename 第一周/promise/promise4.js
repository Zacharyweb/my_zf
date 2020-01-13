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
    // 兼容Promise的穿透 
    // 例：
    //  p.then((res)=>{
    //      console.log(res);
    //      return 'ok';
    //  }).then().then((res)=>{
    //      console.log(res); // 输出ok
    //  });
    // 此时这个then()等于then((res)=>{return res},(err)=>{throw new Error(err)})
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