const http = require('http');
const router = require('./router')
function Application(){
    // this.handlers = [];
    this.router = new router();
};

['get','post','delete','put'].forEach((method)=>{
    Application.prototype[method] = function(path,...handlers){
        this.router[method](path,handlers);
    }
})

Application.prototype.use = function(path,handler){
    if(typeof handler !== 'function'){
        handler = path;
        path = '/';
    }
    this.router.use(path,handler);
}

Application.prototype.listen = function(...args){
   
    let server = http.createServer((req,res)=>{
        if(req.url === '/favicon.ico'){
            return res.end();
        }
        function done(){
            res.statusCode = 404;
            res.end('Not Founnnnnnnnnnd');
        }
        this.router.handler_request(req,res,done);
    });
    server.listen(...args);
}
module.exports = Application;