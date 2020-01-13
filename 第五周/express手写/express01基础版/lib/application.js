const http = require('http');
const router = require('./router')
function Application(){
    // this.handlers = [];

    this.router = new router();
}
Application.prototype.get = function(path,...handlers){
    this.router.get(path,handlers);
}
Application.prototype.listen = function(...args){
    // let server = http.createServer((req,res)=>{
    //     this.handlers.forEach((h)=>{
    //         let {pathname} = url.parse(req.url);
    //         if(h.path === pathname && h.method === req.method){
    //             h.handler(req,res);
    //         }
    //     })
    // });

    let server = http.createServer((req,res)=>{
        function done(){
            res.statusCode = 404;
            res.end('Not Founnnnnnnnnnd');
        }
        this.router.handler_request(req,res,done);
    });

    server.listen(...args)

}
module.exports = Application;