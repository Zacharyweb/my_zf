// const koa = require('koa');

const koa = require('./mykoa2/application.js');

let app = new koa;

app.use(async (ctx,next)=>{
    await next();
})
app.use(async (ctx,next)=>{
    await next();
    await new Promise((resolve,reject)=>{
        setTimeout(()=>{
            ctx.body = '2000';
            resolve()
        },2000)
    })
    
})
app.use((ctx,next)=>{
    ctx.body = 'hello A'
})
app.listen(3000)