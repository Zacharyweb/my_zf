// let a =require('./a');


let fnbody = "let a = require('./a');console.log(a);"
let fn = new Function('require',fnbody);
fn(require);

// let fn2 = function(){
//     let a = require('./a');console.log(a);
// }
// fn2();