const http = require('http');
const url = require('url')
const querystring = require('querystring');
/**
 * req是一个可读流 所以需要记住的方法有 
 * req.on('data',fn)
 * req.on('end',fn)
 * Buffer.contact([buffer1,buffer2...]);
 * 
 * res是一个可写流 所以可以有 res.write() res.end()方法
 * 一般都直接用res.end(data) 这样可传完数据后自己关闭
 */

 /**
  *  http.createServer 的函数参数可以写在
  * server.on('request',fn) 即fn
  *  
  */ 
let server = http.createServer((req,res)=>{
    let dataArr = [];
    console.log(req.method);
    console.log(req.url);
    req.on('data',(data)=>{
        dataArr.push(data);
    })
    req.on('end',()=>{
        let buffer = Buffer.concat(dataArr);
        let content = buffer.toString();
        let type = req.headers['content-type'];
        if(type === 'application/json'){
            return res.end(content);
        }else if(type === 'application/x-www-form-urlencoded'){
            // 表单post提交时默认Content-Type时application/x-www-form-urlencoded
            // 此时得到的data是 a=xxx&b=xxx，用querystring模块转化下
            let result = querystring.parse(content);
            return res.end(JSON.stringify(result));
        }
        res.end(content);
    })
});

let port = 8080;

server.listen(port,'172.20.13.247',()=>{
    console.log(`serve is running at ${port}`)
})

server.on('error',(err)=>{
    if(err.code == 'EADDRINUSE'){
        server.listen(++port);
    }
})