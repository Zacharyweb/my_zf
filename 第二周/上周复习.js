
// 柯里化

function add(a,b,c,d,e){
    return a + b + c + d + e;
}
function curring(fn,args = []){
    let length = fn.length;
    return (...params) => {
        args = [...args,...params];
        if(args.length >= length){
           return fn(...args);
        }else{
           return curring(fn,args)
        }
    }

}

let a = curring(add)(1,2)(3,4)(5);
