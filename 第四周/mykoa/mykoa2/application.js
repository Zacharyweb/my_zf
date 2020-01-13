let context = require('./context.js');
let request = require('./request.js');
let response = require('./response.js');
let http = require('http');
let EventEmitter = require('events');
let Stream = require('stream');
class MyKoa extends EventEmitter{
    constructor(){
        super();
        this.context = context;
        this.request = request;
        this.response = response;
        this.middleWares = [];
    }
    use(fn){
        this.middleWares.push(fn);
    }
    createContext(req,res){
        let context = Object.create(this.context);
        context.request = Object.create(this.request);
        context.response = Object.create(this.response);
        context.req = req;
        context.res = res;
        context.request.req = req;
        context.response.res = res;
        return context;
    }
    compose(ctx){
        let dispatch = (index)=>{
            if(index === this.middleWares.length) return Promise.resolve();
            let middle = this.middleWares[index];
            return Promise.resolve(middle(ctx,()=>{
                return dispatch(index+1);
            }));
        }
        return dispatch(0);
    
    }
    handlerRequest(req,res){
        if(req.url == '/favicon.ico'){
            return res.end();
        }
        let ctx = this.createContext(req,res)
        this.compose(ctx).then(()=>{
            let _body = ctx.body;
            if(_body instanceof Stream){
                return _body.pipe(res);
            }else if(typeof _body === 'object'){
                return res.end(JSON.stringify(_body));
            }else{
                res.end(_body);
            }
        },(err)=>{
            this.emit('error',err)
        });
    }
    listen(...args){
        let server = http.createServer(this.handlerRequest.bind(this));
        server.listen(...args);
    }

}
module.exports = MyKoa;