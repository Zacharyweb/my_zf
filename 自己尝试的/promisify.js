let path = require('path')
let fs = require('fs');
let util = require('util');

let ncp = require('ncp');


function promisify(fn){
    return (...args)=>{
        return new Promise((resolve,reject)=>{
            fn(...args,(err,data)=>{
                if(err){
                    reject(err);
                }
                resolve(data);
            })
        })
    }
};

// ncp = util.promisify(ncp);
// fs.readFile = util.promisify(fs.readFile);

ncp = promisify(ncp);
fs.readFile = promisify(fs.readFile);

let filePath = path.resolve(__dirname,'a.js');

(async function(){
    await ncp(filePath,path.resolve(__dirname,'a3.js'));
    let result = await fs.readFile(filePath,'utf-8');
    console.log(result);
    console.log('ok');
})()

// fs.readFile(filePath,'utf-8',(err,data)=>{
//     console.log(data);
// })

