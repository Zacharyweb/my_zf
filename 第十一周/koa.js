const http = require('http');


class Koa {
    constructor(){
        this.handlers = [];
    }
    use(fn){
        this.handlers.push(fn);
    }
    compose(ctx){
        let next = (index)=>{
            if(index == this.handlers.length){
                return Promise.resolve();
            };
            let hd = this.handlers[index];
            return Promise.resolve(hd(ctx,()=>{return next(index+1)}))
        };
        return next(0);
    }
    requestHandler(req,res){
        if(req.url == '/favicon.ico'){
           return res.end();
        };
        let ctx = {
            req,
            res
        };
        this.compose(ctx).then(()=>{
            res.end(ctx.body);
        })

    }
    listen(...args){
       let serve = http.createServer(this.requestHandler.bind(this));
       serve.listen(...args);
    }
};


let app = new Koa();
app.use(async (ctx,next)=>{
    ctx.body = 'heh';
    await next();
});
app.use((ctx,next)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve();
            ctx.body = 'xixixxxxxxxxxxxxxxx';
        },1000); 
    })
});

app.listen(3000,()=>{
    console.log('serve is running at 3000')
});
