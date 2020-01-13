function a(p1){
    return '$' + p1;
};
function b(p2){
    return p2.length;
};
function c(p3,p4){
    return p3 + p4;
};

// let d = a(b(c('xi','hahah')));
// console.log(d);
// function compose(fns){
//     return function(p3,p4){
//         let lastFn = fns.pop();
//         let result = fns.reduceRight((val,fn)=>{
//             return fn(val);
//         },lastFn(p3,p4));
//         return result;
//     }
// };

function compose(fns){
   return fns.reduce((pre,cur)=>{
       return function(...params){
           return pre(cur(...params))
       }
   })
};

let e = compose([a,b,c])('xi','hahah'); 
console.log(e);
// Array.prototype.Myreduce = function(fn,initVal){
//     let result = initVal ? initVal : arr.shift();
//     this.forEach((item,i,arr)=>{
//         result =  fn(result,item,i,arr);
//     });
//     return result;
// } 
// let arr = [1,2,3];
// let sum = arr.reduce((val,a)=>{
//     return val +a;
// },99);
// console.log(sum)