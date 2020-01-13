const http = require('http');
const url = require('url');
const Layer = require('./Layer');
const Route = require('./Route');
function Router(){
    let router =  function(res,req,next){
        router.handler_request(res,req,next);
    };
    router.stack = [];
    router.paramCallbacks = {};
    router.__proto__ = proto;
    return router;
}

let proto = {};

proto.route = function(path){
    let route = new Route();
    let layer = new Layer(path,route.dispatch.bind(route));
    layer.route = route;
    this.stack.push(layer);  
    return route;
};

['get','post','delete','put'].forEach((method)=>{
    proto[method] = function(path,handlers){
        //app.js中直接调用 route.get时handlers就只是一个函数 不是数组了
        if(!Array.isArray(handlers)){
            handlers= [handlers];
        }
        let route = this.route(path);
        route[method](handlers);
    }
});

proto.param = function(key,handler){
   if(this.paramCallbacks[key]){
       this.paramCallbacks[key].push(handler);
   }else{
       this.paramCallbacks[key] = [handler];
   }
};

proto.process_param = function(req,res,layer,done){
    let paramCbs = this.paramCallbacks;
    let keys = layer.keys.map((item)=>{ return item.name});
    if(!keys || keys.length == 0){
        return done();
    }
    let idx = 0;
    let cbs;
    let key;
    let value;
    let next = ()=>{
       if(idx == keys.length) return done();
       key = keys[idx++];
       value = layer.params[key];
       if(paramCbs[key]){
        cbs = paramCbs[key];
        processCallback(next);
       }else{
          next()
       }
    }
    next();

    function processCallback(out){
        let idx = 0;
        let next = ()=>{
            console.log(key);
            if(idx === cbs.length) return out();
            let handler = cbs[idx++];
            if(handler){
                handler(req,res,next,value,key);
            }else{
                next()
            }
        }
        next()
    }
}

proto.use = function(path,handler){
   let layer = new Layer(path,handler);
   this.stack.push(layer);
}


proto.handler_request = function(req,res,out){
    let idx = 0;
    let cutPath = '';
    let next = (err)=>{
        if(cutPath.length > 0){
            req.url = cutPath +req.url;
            cutPath = '';
        }
        if(idx === this.stack.length) return out();
        let layer = this.stack[idx++];
        let {pathname} = url.parse(req.url);
        if(err){
            if(!layer.route && layer.handler.length === 4){
                layer.handler(err,req,res,next)
            }else{
                next(err);
            }
        }else{
            
            if(layer.match(pathname)){
                if(layer.route){
                    // 匹配route上有没有这次请求的方法
                    if(layer.route.methods[req.method]){
                        req.params = layer.params || {};
                        this.process_param(req,res,layer,()=>{
                            layer.handler(req,res,next)
                        })
                    }else{
                        next()
                    }
                }else{
                    if(layer.handler.length !== 4){
                        if(layer.path !== '/'){
                            cutPath = layer.path;
                            req.url = req.url.slice(cutPath.length)
                        }
                        req.params = layer.params || {};
                        this.process_param(req,res,layer,()=>{
                            layer.handler(req,res,next);
                        })
                    }
                }
            }else{
                next()
            }
        }
       
    };
    next();
}

module.exports = Router;