/**
 * 基础版Promis
 * 可以多个then
 * 例： let p = new Promise(...);
 *      p.then(...);
 *      p.then(...);
 * 
 */

class Promise{
    constructor(fn){ 
        this.status = 'pending';
        this.value = undefined;
        this.error = undefined;
        this.resolveCbs = [];
        this.rejectCbs = [];
        
        // 需用箭头函数，如用声明式函数或匿名函数 函数内部的this指向会存在问题
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
            // try catch是应对new Promise的fn里直接throw new Error
            reject(err);
        }
    };
    then(onResolve,onReject){
        if(this.status == 'fulfilled'){
           onResolve(this.value)
        }
        if(this.status == 'rejected'){
           onReject(this.error)
        }
        if(this.status == 'pending'){
            // pending时任务先发布 
            // 达到终态时会订阅这些任务执行
           this.resolveCbs.push(()=>{
               onResolve(this.value);
           });
           this.rejectCbs.push(()=>{
               onResolve(this.error);
           });
        }
    }
}

module.exports = Promise;