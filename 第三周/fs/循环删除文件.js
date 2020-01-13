const fs = require('fs');
const path= require('path');

// function deepRmdir(root){

//     function next(dirPath){
//         let flag = 0;
//         fs.readdir(dirPath,(err,data)=>{
//             if(!data.length){
//                 fs.rmdir(dirPath,()=>{});
//                 return;
//             }
//             let paths = data.map((f)=>{
//                 return path.join(dirPath,f);
//             })
//             console.log(paths);
//             paths.forEach((f)=>{
//                 fs.stat(f,(err,fObj)=>{
//                     if(fObj.isFile()){
//                         fs.unlink(f,(err)=>{});
//                     }else{
//                         next(f);
//                     }
//                 })
//             })
//         })
//     };
//     next(root);
// }

/**
 * 
 * 先序 深度 串联删除 即一条线删完再删另一条
 */

// function deepRmdir(dir,callback){
//     fs.stat(dir,(err,obj)=>{
//         if(obj.isFile()){
//             fs.unlink(dir,callback);
//         }else{
//             fs.readdir(dir,(err,paths)=>{
//                 paths = paths.map((p)=>{return path.join(dir,p)});
//                 let index = 0;
//                 function next(){
//                     if(index === paths.length) return fs.rmdir(dir,callback);   
//                     deepRmdir(paths[index++],next);
//                 };
//                 next();
//             })
//         }
//     })
// };

/**
 * 并联删 即找到n个子文件夹后各自去删各自的线
 */

// function deepRmdir(dir,callback){
//     fs.stat(dir,(err,obj)=>{
//         if(obj.isFile()){
//             fs.unlink(dir,callback);
//         }else{
//             fs.readdir(dir,(err,paths)=>{
//                 paths = paths.map((p)=>{return path.join(dir,p)});
//                 if(paths.length == 0) return fs.rmdir(dir,callback);
//                 let index = 0;
//                 function done(){
//                    index++;
//                    if(index == paths.length) return fs.rmdir(dir,callback);
//                 }

//                 paths.forEach((p)=>{
//                      deepRmdir(p,done);
//                 })
//             })
//         }
//     })
// };

/**
 * promise改写
 */

// function deepRmdir(dir){
//     return new Promise((resolve,reject)=>{
//         fs.stat(dir,(err,obj)=>{
//             if(obj.isFile()){
//                 fs.unlink(dir,resolve);
//             }else{
//                 fs.readdir(dir,(err,paths)=>{
//                     paths = paths.map((p)=>{return deepRmdir(path.join(dir,p))});
//                     Promise.all(paths).then(()=>{
//                         fs.rmdir(dir,resolve)
//                     })

//                 })
//             }
//         })
//     })
// };

let util = require('util');

let unlink = util.promisify(fs.unlink);
let readdir = util.promisify(fs.readdir);
let stat = util.promisify(fs.stat);
let rmdir = util.promisify(fs.rmdir);

async function deepRmdir(dir){
    let statObj = await stat(dir);
    if(statObj.isFile()){
        await unlink(dir); 
    }else{
        let dirs = await readdir(dir);
        dirs = dirs.map((p)=>{return deepRmdir(path.join(dir,p))});
        await Promise.all(dirs);
        await rmdir(dir);
    }
};




// deepRmdir('./a',()=>{
      
// })

deepRmdir('./a').then(()=>{
    console.log('删除成功~');
})
