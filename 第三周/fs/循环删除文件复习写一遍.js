const fs = require('fs');
const path= require('path');

/**
 * 
 * 先序 深度 串联删除 即一条线删完再删另一条
 */

// function deepRmdir(dir,callback){
//     fs.stat(dir,(err,obj)=>{
//         if(obj.isFile()){
//             fs.unlink(dir,callback);
//         }else{
//             fs.readdir(dir,(err,dirs)=>{
//                 dirs = dirs.map((item)=>{return path.join(dir,item)});
//                 let index = 0;
//                 function next(){
//                     if(index === dirs.length) return fs.rmdir(dir,callback);
//                     let subDir = dirs[index];
//                     index++;
//                     deepRmdir(subDir,next); // 精髓语句 记住记熟
//                 }
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
//             fs.readdir(dir,(err,dirs)=>{
//                 dirs = dirs.map((item)=>{return path.join(dir,item)});
//                 if(dirs.length == 0) return fs.rmdir(dir,callback);
//                 let index = 0;
//                 function done(){
//                     index++;
//                     if(dirs.length == index) return fs.rmdir(dir,callback);
//                 }
//                 dirs.forEach((item)=>{
//                     deepRmdir(item,done);
//                 })
//             })
//         }
//     })
// };

// deepRmdir('./a',()=>{
//     console.log('删除成功~');
// })



/**
 * promise改写
 */

// function deepRmdir(dir){
//     return new Promise((resolve,reject)=>{
//         fs.stat(dir,(err,obj)=>{
//             if(obj.isFile()){
//                 fs.unlink(dir,resolve);
//             }else{
//                 fs.readdir(dir,(err,dirs)=>{
//                     dirs = dirs.map((item)=>{return deepRmdir(path.join(dir,item))});
//                     Promise.all(dirs).then(()=>{
//                         fs.rmdir(dir,resolve)
//                     })
                  
//                 })
//             }
//         }) 
//     })
// };


/**
 * async await
 */
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
        dirs = dirs.map((item)=>{
            return deepRmdir(path.join(dir,item));
        })
        await Promise.all(dirs);
        await rmdir(dir);
    }
};



deepRmdir('./a').then(()=>{
    console.log('删除成功~');
})
