/** 
 * 处理静态资源
 */
let http = require('http');
let mime = require('mime');
let url = require('url');
let fs = require('fs');
let path = require('path');

let server = http.createServer();

server.on('request',(req,res)=>{
    let {pathname} = url.parse(req.url);
    let filePath = path.join(__dirname,pathname);
    fs.stat(filePath,(err,statObj)=>{
        if(err){
            res.statusCode = 404;
            res.end('Not found')
        }else{
            if(statObj.isDirectory()){
                filePath = path.join(filePath,'index.html');
                fs.access(filePath,(err)=>{
                    if(err){
                        res.statusCode = 404;
                        res.end('Not found')
                    }else{
                        let type = mime.getType(filePath);
                        res.setHeader('Content-Type',type+';charset=utf-8')
                        fs.createReadStream(filePath).pipe(res)
                    }
                })
            }else{
                let type = mime.getType(filePath);
                res.setHeader('Content-Type',type+';charset=utf-8')
                fs.createReadStream(filePath).pipe(res);
            }
            
        }
                
    }) 
})

server.listen(4000,()=>{
    console.log('server is running in 4000')
})