let p1 = function(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('1')
        },1000)
    })
};

let p2 = function(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('2')
        },2000)
    })
};

function *test(){
    let a = yield p1();
    let b = yield p2();
    console.log(a+b);
    return a+b;
};

// let it = test();
// it.next().value.then((res)=>{
//     it.next(res).value.then((res)=>{
//         it.next(res);
//     })
// })

function co(fn){
    let it = fn();
    return new Promise((resolve,reject)=>{
        function next(data){
            let itObj = it.next(data);
            if(!itObj.done){
               Promise.resolve(itObj.value).then((res)=>{
                    next(res);
               },(err)=>{
                   it.throw(err);
               });
            }else{
                resolve(itObj.value)
            }
        };
        next();
    })
};

co(test);




