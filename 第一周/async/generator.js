// function * gen(){
//     var a = yield 8;
//     var b = yield 9;
//     console.log(a+b);
//     /**
//      * 如果最后有个 return x,
//      * 那么最后执行next(11)会输出 { value: x, done: true }
//      * 后续再调用next()都是输出 { value: undefined, done: true }
//      */
// }
// var g = gen();
// console.log(g.next()); // 第一次即使传参也不会产生任何作用， 输出 { value: 8, done: false }
// console.log(g.next(13)); // 第二次传参后 a 的值等于13，输出 { value: 9, done: false }
// console.log(g.next(11)); // 第二次传参后 b 的值等于11， a+b就等于24，输出 { value: undefined, done: true }


// function *foo(x) {
//     let y = 2 * (yield (x + 1))
//     let z = yield (y / 3)
//     return (x + y + z)
// }

// let it = foo(5)
// console.log(it.next())   // {value:'6',done:false}
// console.log(it.next(12))  // y = 2*12 = 24 {value:8,done false}
// console.log(it.next(13))  // z = 13  24 + 13 + 5 = 42 {value:42,done:true}


let p1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
       resolve('xigua')
    },1000)
})

let p2 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
       reject('错爱啦')
    },2000)
})

function *fn() {
    try{
        let a = yield p1;
        let b = yield p2;
        return a+b;
    }catch(err){
       console.log('erro' + err);
    }
}


    // let it = fn();
    // it.next().value.then((data)=>{
    //     it.next(data).value.then((data)=>{
    //         console.log(it.next(data).value);
    //     })
    // })
// 上面这段可以用co库实现 co(fn).then(res=>{ console.log(res);});


// const co = require('co');

// 自己实现co库
function co(fn){
    let it =  fn();
    return new Promise((resolve,reject)=>{
        function ex(data){
            let obj = it.next(data);
            if(!obj.done){
                obj.value.then((res)=>{
                    ex(res);
                },(err)=>{
                   it.throw(err);
                })
            }else{
                resolve(obj.value);
            }
        }
        ex()
    })
}


co(fn).then(res=>{
    console.log('成功');
    console.log(res);
},(err)=>{
    console.log('错误');
    console.log(err);
});


  