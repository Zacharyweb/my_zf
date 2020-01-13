const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const mime = require('mime');
let indexPage = path.join(__dirname,'index.ejs')
let template = fs.readFileSync(indexPage,'utf-8');
let server = http.createServer();

server.on('request',(req,res)=>{
    let {pathname} = url.parse(req.url);
    pathname = decodeURIComponent(pathname);
    let filePath = path.join(__dirname,pathname);
    fs.stat(filePath,(err,statObj)=>{
        if(err){
            res.statusCode = 404;
            res.end('Not Found');
        }else{
            if(statObj.isDirectory()){
                fs.readdir(filePath,(err,dirs)=>{
                    let finalTemp = ejs.render(template,{dirs,path:pathname == '/'?'':pathname})
                    res.statusCode = 200;
                    res.end(finalTemp);  
                })
            }else{
                res.statusCode = 200;
                let type = mime.getType(filePath);
                res.setHeader('Content-Type',type+';charset=utf-8')
                fs.createReadStream(filePath).pipe(res);
            }
        }
    })
});

server.listen(3001,()=>{
    console.log('server is running at 3001');
})

