const Layer = require('./Layer');

function Route(){
    this.stack = [];
    this.methods = {};
};

['get','post','delete','put'].forEach((method)=>{
    Route.prototype[method] = function(handlers){
        handlers.forEach((handler)=>{
            let layer = new Layer('',handler)
            this.methods[method.toUpperCase()] = true;
            layer.method = method.toUpperCase();
            this.stack.push(layer);
        })
    }
})
Route.prototype.dispatch = function(req,res,out){
    let idx = 0;
    let next = (err)=>{
        if(idx === this.stack.length) return out();
        let layer = this.stack[idx++];
        if(err){
            return out(err);
        }
        if(layer.method === req.method){
            layer.handler(req,res,next);
        }else{
            next();
        }
    }
    next();
}
module.exports = Route;