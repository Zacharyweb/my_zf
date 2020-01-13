const http = require('http');
const url = require('url');
const Layer = require('./Layer');
const Route = require('./Route');
function Router(){
   this.stack  = [];
}
Router.prototype.route = function(path){
    let route = new Route();
    let layer = new Layer(path,route.dispatch.bind(route));
    layer.route = route;
    this.stack.push(layer);  
    return route;
};

['get','post','delete','put'].forEach((method)=>{
    Router.prototype[method] = function(path,handlers){
        let route = this.route(path);
        route[method](handlers);
    }
})
Router.prototype.use = function(path,handler){
   let layer = new Layer(path,handler);
   this.stack.push(layer);
}
Router.prototype.handler_request = function(req,res,out){
    let idx = 0;
    let next = (err)=>{
        // console.log(err);
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
                        layer.handler(req,res,next)
                    }else{
                        next()
                    }
                }else{
                    if(layer.handler.length !== 4){
                        layer.handler(req,res,next)
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