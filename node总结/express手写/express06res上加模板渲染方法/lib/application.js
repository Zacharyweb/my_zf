const http = require('http');
const router = require('./router')
const fs = require('fs')
const path = require('path')
const STATUS_CODES = require("statuses").STATUS_CODES;
function Application(){
    // this.router = new router();
    this.engines = {

    };
    this.settings ={
        'views': "views",
        "view engine": "ejs"
    }
};

Application.prototype.lazy_route = function(){
    if(!this.router){
        this.router = new router();
        this._init();
    }
    
};
Application.prototype._init = function(){
     this.use('/',(req,res,next)=>{
        res.sendFile = (file)=>{
            try {
                console.log(file);
                fs.createReadStream(file).pipe(res);
            } catch (err) {
                next(err);
            }
        };
        res.json = (value)=>{
            res.setHeader('Content-Type','application/json')
            res.end(JSON.stringify(value));
            
        };
        res.send = (value)=>{
            if(typeof value === 'object'){
                res.end(JSON.stringify(value));
            }else if(typeof value === 'number'){
                res.statusCode = value;
                res.end(STATUS_CODES[value]);
            }else{
                res.end(value);
            }
            
        };
        res.render = (filename,obj)=>{
            let views = this.get('views');
            let viewEngine = this.get('view engine');
            let render = this.engines[viewEngine];
            let filePath = '';
            if(filename.includes('.')){
               filePath =  path.join(views,filename);
            }else{
               viewEngine = viewEngine.startsWith('.')?viewEngine:'.'+viewEngine;
               filePath =  path.join(views,filename) + viewEngine; 
            }
            render(filePath,obj, function(err,content) {
                if(err){
                    return next(err);
                }
                res.end(content);
            });
        }
        next();
     })
};
Application.prototype.set = function(key,value){
    if(arguments.length == 1){
        return this.settings[key]
    };
    this.settings[key] = value;
};

Application.prototype.engine = function(extname,render){
    this.engines[extname] =  render;
};

['get','post','delete','put'].forEach((method)=>{
    Application.prototype[method] = function(path,...handlers){
        if(method == 'get'){
            if(arguments.length == 1){
                return this.set(path);
            }
        }
        this.lazy_route()
        this.router[method](path,handlers);
    }
});
Application.prototype.param = function(key,handler){
    this.lazy_route();
    this.router.param(key,handler);
};

Application.prototype.use = function(path,handler){
    this.lazy_route()
    if(typeof handler !== 'function'){
        handler = path;
        path = '/';
    }
    this.router.use(path,handler);
};

Application.prototype.listen = function(...args){
    this.lazy_route();
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
};
module.exports = Application;