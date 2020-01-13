const fs = require('fs')
const path = require('path');

// let aPath = path.resolve(__dirname,'./a');

// fs.rmdir(aPath,(err,data)=>{
//     console.log(err);
// })

let aPath = './a';
fs.readdir(aPath,(err,data)=>{
    if(err){
        return;
    }
    let paths = data.map((f)=>{
       return path.join(aPath,f);
    })
    paths.forEach((f)=>{
        // 判断文件类型
        fs.stat(f,(err,obj)=>{
            if(obj.isFile()){
            }
            if(obj.isDirectory()){
            }
        })
    })
});

// fs.mkdir('d/e/f/g',(err)=>{
//     if(err){
//         console.log(err);
//         return;
//     }
// });

/**
 * mkdir不能直接创建'./d/e/f/g'这样的文件夹
 * 因为创建子文件夹时需要父文件夹存在
 */

 // 循环创建文件夹
 function deepMkdir(paths){
     let pathArr = paths.split('/');
     let dirpath = path.join(pathArr[0]);
     let index = 0;
     function next(){
        fs.access(dirpath,(err)=>{
            if(err){
                // 如果文件夹不存在则创建
                fs.mkdir(dirpath,(err,data)=>{
                    if(err){
                       return;
                    }
                    index++;
                    if(pathArr[index]){
                        dirpath = path.join(dirpath,pathArr[index]);
                        next(); 
                    }
                })
            }else{
                // 如果文件夹已存在则直接走下一个
                index++;
                if(pathArr[index]){
                    dirpath = path.join(dirpath,pathArr[index]);
                    next(); 
                }
            }
        })
     };
     next();
 };
 deepMkdir('d/e/f/g')


