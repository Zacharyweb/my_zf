const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const mime = require('mime');// 第三方需安装
const ejs = require('ejs'); // 第三方需安装
const uuid = require('uuid'); // 第三方需安装 生成唯一id用 如上传的文件名
const querystring = require('querystring');
const crypto = require('crypto');
const zlib = require('zlib');
let app = http.createServer()
let formPath = path.resolve(__dirname,'form.html') // 获取项目根目录还有个process.cwd();

let util = require('util');
let stat = util.promisify(fs.stat);
let readFile = util.promisify(fs.readFile);


Buffer.prototype.split = function(sep){
    let len = Buffer.from(sep).length; // 分割符的长度
    let offset = 0;
    let result = [];
    let current;
    // 把找到的位置赋给current  看一下是否为-1
    while((current = this.indexOf(sep,offset))!==-1){
        result.push(this.slice(offset,current)); // 把每次的记过push到数组中
        offset = current + len // 增加查找偏移量
    }
    result.push(this.slice(offset)); // 最后一段追加进去
    return result;
};

app.on('request',async (req,res)=>{
    // req可读流 所以可触发data end事件
    // res可写流 所以有write() end()方法，因为end()方法传的参也可当作最后一次写入并close()掉，所以一般只用res.end(）返回内容并直接结束掉请求
    if(req.url === '/favicon.ico'){
        res.end();
        return;
    };

    // 缓存 一般缓存设置强缓存 强缓存到期后请求再后端走协商缓存 
    // 协商缓存一般也是Etag跟Lats-Modified结合使用，先走Etag再走Last-Modified  
    // Etag一般只读取文件部分内容做摘要来生成，所以可能内容更改不一定变，Last-Modified单位是到秒的 一秒内可能改多次

    // 强缓存 
    res.setHeader('Cache-Control','max-age=10');
    // res.setHeader('Expires',new Date(+new Date()+10*1000).toGMTString()); // max-age比Expires优先级高 Expires是为了兼容IE老浏览器
    // Tue, 17 Sep 2019 06:31:01 GMT
    // res.setHeader('Cache-Control','no-cache'); // 每次都请求服务器，用于协商缓存,会缓存
    // res.setHeader('Cache-Control','no-store'); // 强制不缓存

    // 协商缓存见handlerStatic方法里

    await handlerStatic(req,res);

    let {pathname,query} = url.parse(req.url,true); // 后面为true可以把query转为对象 不然是 name=zj&age=26这样的格式
    if(pathname == '/form' && req.method == 'GET'){
        res.setHeader('Content-Type','text/html;charset=utf-8');
        // 可读流pipe 可写流 用法
        // fs.createReadStream(formPath).pipe(res); 

        // ejs写法
        let template = fs.readFileSync(formPath,'utf-8');
        let htmlContent = ejs.render(template,{name:'测试表格'})
        res.end(htmlContent);
    }else if(pathname == '/login' && req.method == 'POST'){
        let header =  req.headers['content-type']; // 返回的header都是小写的
        if(header === 'application/x-www-form-urlencoded'){
            let dataArr = [];
            req.on('data',(chunk)=>{
                dataArr.push(chunk);
            });
            req.on('end',()=>{
                let buffer = Buffer.concat(dataArr);
                let data = querystring.parse(buffer.toString());
                res.end(JSON.stringify(data));
            });
        }else if(header.includes('multipart/form-data')){
            let dataArr = [];
            req.on('data',(chunk)=>{
                dataArr.push(chunk);
            });
            req.on('end',()=>{
                let buffer = Buffer.concat(dataArr);
                let result = handlerFormData(header,buffer)
                res.setHeader('Content-Type','text/plain;charset=utf-8');
                res.end(result);
            });
        }else if(header === 'application/json'){
            
        }else{
            res.end('/login')
        }
    }else{
        // res.setHeader('Content-Type','text/plain;charset=utf-8');
        // res.end('res.end()只能返回字符串或者Buffer'); 
        res.statusCode = 404;
        res.end('Not Found');  
    }
});

// 处理content-type为 multipart/form-data的数据
function handlerFormData(header,buffer){
    let boundary = header.split('=')[1]; 
    boundary = '--'+  boundary;
    let lines = buffer.split(boundary).slice(1,-1);
    let obj = {};
    lines.forEach(item=>{
        let [topStr,value] = item.split('\r\n\r\n'); //FormData数据的格式靠'\r\n\r\n'分割头部字段跟value
        topStr = topStr.toString();
        value = value.slice(0,-2); // FormData数据的格式value后面会多出/r/n 所以要裁掉
        let name = topStr.match(/name="(.+?)"/)[1];
        if(topStr.includes('filename')){
            // 处理文件数据
            let extName = topStr.match(/filename="(.+?)"/)[1].split('.').pop(); // 获取后缀名
            let filename = uuid.v4() + '.' + extName;
            fs.writeFileSync(path.resolve(__dirname,'upload',filename),value);
            obj[name] = filename;
        }else{
           obj[name] = value.toString();
        }
    })
    return JSON.stringify(obj);
};

async function handlerStatic(req,res){
    let {pathname} = url.parse(req.url,true);
    let filePath = path.join(__dirname,pathname);
    try {
        let statObj = await stat(filePath);
        if(statObj.isDirectory()){
            filePath = path.join(filePath,'index.html');
            try {
                await stat(filePath);
                let content = await readFile(filePath);
                res.setHeader('Content-Type','text/html;charset=utf-8');
                res.end(content)
            } catch (error) {
               return false;
            }
        }else{
            let content = await readFile(filePath);
            let type = mime.getType(filePath);
            res.setHeader('Content-Type',type + ';charset=utf-8');
          
            // 协商缓存
            let ifNoneMatch = req.headers['if-none-match'];
            let ifModifiedSince = req.headers['if-modified-since'];
            let Etag = crypto.createHash('md5').update(content).digest('base64');
            let modifiedTime = statObj.ctime.toGMTString();
            res.setHeader('Last-Modified',modifiedTime);
            res.setHeader('Etag',Etag);
            if(ifNoneMatch && ifModifiedSince){
                // 只有两个都相等才304
                if(ifNoneMatch === Etag &&  ifModifiedSince === modifiedTime){
                    res.statusCode = 304;
                    res.end();
                    return false;
                }
            }
            // res.end(content);
            fs.createReadStream(filePath).pipe(res);
         
            // 压缩 先获取服务端支持的压缩模式
            
            let acceptType = req.headers['accept-encoding'];
            
            // 异步流写法 因为这里逻辑异步所以可能先会走到后面的404逻辑 所以这里不先这么写
            // let zlibType = null;
            // if(acceptType.includes('gzip')){
            //     res.setHeader('Content-Encoding','gzip');
            //     zlibType = zlib.createGzip()
            // }else if(acceptType.includes('deflate')){
            //     res.setHeader('Content-Encoding','deflate');
            //     zlibType = zlib.createDeflate()
            // }
            // if(zlibType){
            //    fs.createReadStream(filePath).pipe(zlibType).pipe(res);
            // }else{
            //    fs.createReadStream(filePath).pipe(res);
            // }
         

            if(acceptType.includes('gzip')){
                res.setHeader('Content-Encoding','gzip');
                content = zlib.gzipSync(content);
            }else if(acceptType.includes('deflate')){
                res.setHeader('Content-Encoding','deflate');
                content = zlib.deflateSync(content);
            }
            res.end(content);
            
         
        }
    } catch (error) {
        return false;
    }
}



app.listen(3000,()=>{
    console.log(`server is running at 3000`);
})