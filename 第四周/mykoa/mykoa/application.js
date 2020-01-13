const http = require('http');
const context = require('./context');
const request = require('./request');
const response = require('./response');
const EventEmitter = require('events');
const Stream = require('stream');
class MyKoa extends EventEmitter{
    constructor(){
       super();
       this.context = context;
       this.request = request;
       this.response = response;
       this.middleWares = [];
    }
  
    use(fn){
    //    this.fn = fn;
       this.middleWares.push(fn)
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
            if(index === this.middleWares.length) return Promise.resolve()
            let middle = this.middleWares[index];
            return Promise.resolve(middle(ctx,()=>dispatch(index+1)))
        }
        return dispatch(0)
    }  
    handlerRequest(req,res){
        if(req.url == '/favicon.ico'){
           return  res.end()
        }
       let ctx = this.createContext(req,res);
       // compose()返回一个promise
       this.compose(ctx).then(()=>{
           let _body = ctx.body;
           // 这里还要给ctx.body的各种情况分类
           if(_body instanceof Stream){
               return _body.pipe(res);
           }else if(typeof _body === 'object'){
               return res.end(JSON.stringify(_body))
           }else{
               return res.end(_body);
           }
       });
    }
    listen(...arg){
        let server = http.createServer(this.handlerRequest.bind(this))
        server.listen(...arg);
    }

}

module.exports = MyKoa;