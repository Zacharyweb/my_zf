/**
 * 封装个简单的静态服务器
 */

const http = require('http');
const fs = require('fs');
const url = require('url');
const mime = require('mime');
const path = require('path');
/**
 * 自己写的
 */
// class HttpServer{
//     constructor(){
//         this.server = http.createServer();
//         this.request()
//     }
//     request(){
//         this.server.on('request',(req,res)=>{
//            let {pathname} = url.parse(req.url);
//            let filePath = path.join(__dirname,pathname);
//            fs.stat(filePath,(err,statObj)=>{
//                if(err){
//                    this.sendError(res);
//                }else{
//                    if(statObj.isDirectory()){
//                        filePath = path.join(filePath,'index.html');
//                        fs.access(filePath,(err)=>{
//                            if(err){
//                                this.sendError(res);
//                            }else{
//                                this.sendFile(filePath,res)
//                            }
//                        })
//                    }else{
//                       this.sendFile(filePath,res)
//                    }
//                }
//            })
//         })
//     }
//     sendFile(filePath,res){
//         let type = mime.getType(filePath);
//         res.setHeader('Content-Type',type+';charset=utf-8');
//         res.statusCode = 200;
//         fs.createReadStream(filePath).pipe(res);
//     }
//     sendError(res){
//         res.statusCode = 404;
//         res.end('Not found');
//     }
//     start(...args){
//         this.server.listen(...args)
//     }
// }


class HttpServer{
    constructor(){

    }
    handlerRequest(req,res){
        let {pathname} = url.parse(req.url);
        let filePath = path.join(__dirname,pathname);
        fs.stat(filePath,(err,statObj)=>{
            if(err){
                this.sendError(res);
            }else{
                if(statObj.isDirectory()){
                    filePath = path.join(filePath,'index.html');
                    fs.access(filePath,(err)=>{
                        if(err){
                            this.sendError(res);
                        }else{
                            this.sendFile(filePath,res)
                        }
                    })
                }else{
                   this.sendFile(filePath,res)
                }
            }
        })
    }

    sendFile(filePath,res){
        let type = mime.getType(filePath);
        res.setHeader('Content-Type',type+';charset=utf-8');
        res.statusCode = 200;
        fs.createReadStream(filePath).pipe(res);
    }
    sendError(res){
        res.statusCode = 404;
        res.end('Not found');
    }

    start(...args){
        let server = http.createServer(this.handlerRequest.bind(this));
        server.listen(...args)
    }
};

let hs = new HttpServer();
hs.start(3000, () => {
  console.log(`server start`);
});