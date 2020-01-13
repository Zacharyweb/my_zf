function a(a,b){
    return a+b;
}

function b(str){
    return str.length;
}

function c(str){
    return '$' + str;
}
// console.log(c(b(a('hello','jb'))))


// function compose(...fns){
//     let fn = fns.pop()
//     return (...args)=>{
//         return fns.reduceRight((inner,item)=>{
//             return item(inner)
//         },fn(...args))
//     } 
// }

function compose(...fns){
    return fns.reduce((perv,next)=>{
        return function(...args){
            return perv(next(...args))
        }
    })

}


console.log(compose(c,b,a)('hello','jbsds'));