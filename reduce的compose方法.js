function add1(str){
    return str + '1';
}
function add2(str){
    return str + '2';
}
function add3(str){
    return str + '3';
};

let result = add3(add2(add1('zj')));
console.log(result);

function compose(...fns){
    return fns.reduce((pre,cur)=>{
        return function(...args){
            return pre(cur(...args))
        }
    })
};

let result2 = compose(add3,add2,add1)('pbb');
console.log(result2);

/**
 * 第一次执行 pre => add3   cur => add2   return function(...args){ return add3(add2(...args))}
 * 第二次执行 pre => function(...args){ return add3(add2(...args))} 
 *           cur => add1
 *           此时pre里的参数是 cur(...args) 了 即 add1(...args)
 *           最后 return function(...args){ return add3(add2(add1(...args)))}
 */