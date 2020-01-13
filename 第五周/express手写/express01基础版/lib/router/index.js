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
}


Router.prototype.get = function(path,handlers){
    // this.stack.push({
    //     path,
    //     handler,
    //     method:'GET'
    // })

    // let layer = new Layer(path,handler);
    // this.stack.push(layer);  

    let route = this.route(path);
    route.get(handlers);
}
Router.prototype.handler_request = function(req,res,out){
    // this.stack.forEach((h)=>{
    //     let {pathname} = url.parse(req.url);
    //     if(h.path === pathname && h.method === req.method){
    //         h.handler(req,res);
    //     }
    // })
    // out()

    // this.stack.forEach((layer)=>{
    //     let {pathname} = url.parse(req.url);
    //     if(layer.match(pathname)){
    //         layer.handler(req,res);
    //     }
    // })
    // out()


    // this.stack.forEach((layer)=>{
    //     let {pathname} = url.parse(req.url);
    //     if(layer.match(pathname)){
    //         layer.handler(req,res,out);
    //     }
    // })

    let idx = 0;
    let next = ()=>{
        if(idx === this.stack.length) return out();
        let layer = this.stack[idx++];
        let {pathname} = url.parse(req.url);
        if(layer.match(pathname)){
            layer.handler(req,res,next)
        }else{
            next()
        }
    };
    next();
}
module.exports = Router;