const Layer = require('./Layer');

function Route(){
    this.stack = [];
}
Route.prototype.get = function(handlers){
    handlers.forEach((handler)=>{
        let layer = new Layer('',handler)
        layer.method = 'GET';
        this.stack.push(layer);
    })
}
Route.prototype.dispatch = function(req,res,out){
    // this.stack.forEach((l)=>{
    //     if(l.method === req.method){
    //         l.handler(req,res,out);
    //     }
    // });

    let idx = 0;
    let next = ()=>{
        if(idx === this.stack.length) return out();
        let layer = this.stack[idx++];
        if(layer.method === req.method){
            layer.handler(req,res,next);
        }else{
            next();
        }
    }
    next();
}
module.exports = Route;