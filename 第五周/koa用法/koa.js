/**
 * Koa通过利用 async 函数丢弃回调函数
 */

let koa = require('koa');
let app = new koa();

app.use((ctx,next)=>{
    ctx.body ='koa的方法 封装了res.end()方法';
})


app.listen(3000,function(){
    console.log(`server is running at 3000`);
})