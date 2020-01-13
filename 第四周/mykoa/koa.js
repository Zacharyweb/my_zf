const koa = require('koa');
let app = new koa;
app.use(async (ctx,next)=>{
    ctx.body = 'hello';
    await next()
})

app.use(async (ctx,next)=>{
    new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('8888')
            ctx.body = '3000';
        },3000)
    })
});

app.listen(3001,()=>{
    console.log('server is running at 3001');
});
