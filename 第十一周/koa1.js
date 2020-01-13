let http = require('http');

class Koa{
    constructor(){
       this.handlers = [];
    }
    use(fn){
        this.handlers.push(fn);
    }
    compose(ctx){

        let next = (index) => {
            if(index === this.handlers.length){
                return  Promise.resolve();
            };
            let hd = this.handlers[index];
            return Promise.resolve(hd(ctx.req,ctx.res,()=>{ return next(index+1) }))
        };
        return next(0);
     
    }
    handlerRequest(req,res){
        if(req.url == '/favicon.ico'){
            return res.end();
        };
        let ctx = {
            req,
            res
        };
        this.compose(ctx).then((data)=>{
             res.end(data)
        })
        
    }
    listen(...params){
        let server = http.createServer(this.handlerRequest.bind(this));
        server.listen(...params);
    }
}

let app = new Koa();

app.use((req,res,next)=>{
    console.log('222');
    next();
})
app.use((req,res)=>{
    
})
app.listen(3000,()=>{
    console.log('server is running at 3000')
})
