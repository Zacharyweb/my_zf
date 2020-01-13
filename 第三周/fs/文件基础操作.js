const fs = require('fs');
const path = require('path');

let copyPath = path.resolve(__dirname,'./copy.js');
let copyPath1 = path.resolve(__dirname,'./copy1.js');


// fs.readFile(copyPath,(err,data)=>{
//     console.log(data);
//     fs.writeFile(path.resolve(__dirname,'./copy1.js'),data,(err,data)=>{
//         console.log(data);
//     })
// });


// fs.rename(copyPath1,path.resolve(__dirname,'./rename.js'),(err,data)=>{
//     console.log(data);
// });


// 加点内容到文件里
// fs.appendFile(copyPath,';let b = "xixi"',()=>{})

