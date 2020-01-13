const http = require('http');
const url = require('url')
let server = http.createServer((req,res)=>{
    console.log(req.method); // 大写
    let urlObj = url.parse(req.url,true)
    console.log(urlObj);
    console.log(urlObj.pathname);
    console.log(urlObj.query.code);
    // console.log(req.headers); 
    res.end('hello world');
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

