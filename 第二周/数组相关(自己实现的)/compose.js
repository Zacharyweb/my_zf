function a(str1,str2){
    return str1 + str2;
}

function b(str){
    return str.length;
}

function c(str){
    return '$' + str;
}
let res = c(b(a('hello','world')));
// console.log(res);

// 方式1
// function compose(...args1){
//     let fns = [...args1];
//     let fnLast = fns.pop();
//     return function(...args2){
//         let result = fns.reduceRight((val,item)=>{
//             val = item(val)
//             return val;
//         },fnLast(...args2))
//         return result;
//     }
// };

// 方式2
function compose(...args){
    return args.reduce((pre,cur)=>{
        return function(...params){
            return pre(cur(...params))
        }
    })

}
let res3 = compose(c,b,a)('hello','world')
console.log(res3);

/**
 * 第一步 pre = c ,cur = b
 *      return function(...params){
 *            return c(b(...params));
 *      }
 * 第二步 pre =  function(...params){
 *            return c(b(...params));
 *      }
 *      cur = a;
 *    
 *      return function(..params){
 *           // return pre(cur(...params))
 *           // pre()得到 c(b(...params)), ...params即传入的参数 就是 cur(...params)=> a(...params)
 *           return c(b(a(...params)))
 *      }
 * 
 * 第三步 此时reduce执行完毕 返回
 *      function(..params){
 *         return c(b(a(...params)))
 *      }
 * 
 * compose(c,b,a)('hello','world')调用就ok
 */
    
  



