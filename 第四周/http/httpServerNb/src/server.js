import http from'http';
import fs from'fs';
import util from'util';
import mime from'mime';
import url from'url';
import path from'path';
import ejs from'ejs';
import chalk from'chalk';
import zlib from'zlib';
import crypto from'crypto';

let stat = util.promisify(fs.stat);
let readdir = util.promisify(fs.readdir);

let template = fs.readFileSync(path.join(__dirname,'../template.html'),'utf-8');

class Server{
   constructor(options){
       this.port = options.port;
   }
   handlerRequest(req,res){
       let {pathname} = url.parse(req.url);
       pathname = decodeURIComponent(pathname);
       this.sendFile(pathname,req,res)
   }
   async sendFile(pathname,req,res){
       let filePath = path.join(process.cwd(),pathname);
       try {
             let statObj = await stat(filePath);
             if(statObj.isDirectory()){
                try {
                    let dirs = await readdir(filePath);
                    let result = ejs.render(template,{dirs,path:pathname =='/'?'':pathname});
                    // res.setHeader('Cache-Control','max-age=10');
                    res.statusCode = 200;
                    res.setHeader('Content-Type','text/html;charset=utf-8');
                    res.end(result);
                } catch (error) {
                    this.sendError(error,req,res);
                }
             }else{
                let type = mime.getType(filePath);
                res.setHeader('Content-Type',type+';charset=utf-8');
                let cache = this.cache(filePath,req,res,statObj);
                if(cache){
                   res.statusCode = 304;
                   return res.end();
                }
                
                res.statusCode = 200;
                let flag = this.gzip(filePath,req,res);
                if(flag){
                    fs.createReadStream(filePath).pipe(flag).pipe(res);
                }else{
                    fs.createReadStream(filePath).pipe(res);
                }
             }
       } catch (error) {
           this.sendError(error,req,res)
       }
   }
   gzip(filePath,req,res){
       let type = req.headers['accept-encoding'];
       if(!type) return false;
       if(type.match(/gzip/)){
            res.setHeader('Content-Encoding','gzip');
            return zlib.createGzip();
       }else if(type.match(/deflate/)){
            res.setHeader('Content-Encoding','deflate');
            return zlib.createDeflate();
       }
       return false;
   }
   cache(filePath,req,res,statObj){
        // 强缓存
        res.setHeader('Cache-Control','max-age=10'); // 新的都这么用
        // res.setHeader('Expires',new Date(+new Date()+10*1000).toGMTString()); // 老的这么写 这个为兼容老的浏览器
        // res.setHeader('Cache-Control','no-cache'); // 每次都访问服务器 但是缓存 适用于走协商缓存
        // res.setHeader('Cache-Control','no-store'); // 不走缓存 而且缓存里没有

        let Etag = crypto.createHash('md5').update(fs.readFileSync(filePath)).digest('base64');
        res.setHeader('Etag',Etag);
        let ifNoneMatch = req.headers['if-none-match'];
        console.log(Etag)
        console.log(ifNoneMatch);
        if(ifNoneMatch === Etag){
            return true;
        }

        let lastModified = statObj.ctime.toGMTString();
        res.setHeader('Last-Modified',lastModified);
        let ifModifiedSince = req.headers['if-modified-since']
        console.log(lastModified)
        console.log(ifModifiedSince);
        if(ifModifiedSince === lastModified){
            return true;
        };
        return false;
   }
   sendError(err,req,res){
       res.statusCode = 404;
       res.end('Not Found');
   }
   start(){
       let server = http.createServer(this.handlerRequest.bind(this));
       server.listen(this.port,()=>{
           console.log(`server in running at port ${chalk.yellow(this.port)}`);
       })
   }
}

export default Server;
