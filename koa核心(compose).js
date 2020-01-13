function compose(tasks){
    function next(index){
        console.log(index == tasks.length);
        if(index == tasks.length) return Promise.resolve()
        let fn = tasks[index];
        return Promise.resolve(fn(()=>next(index+1)));
    }
    return next(0);
};

let ctx ={body:1};
async function fn1(next){
    await next();
    console.log(ctx.body);
};

async function fn2(next){
    await next();
};

function fn3(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            ctx.body = 'xixi';
            resolve();
        },2000)
    })
};
let tasks = [fn1,fn2,fn3];
compose(tasks);