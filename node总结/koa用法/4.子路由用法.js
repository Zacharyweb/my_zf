const koa = require('koa');
const KoaRouter = require('koa-router');

let app = new koa();
let parentRouter = new KoaRouter();

let childRouter1 = new KoaRouter();
let childRouter2 = new KoaRouter();

childRouter1.get('/',(ctx,next)=>{
    ctx.body = 'childRouter1';
});

childRouter2.get('/',(ctx,next)=>{
    ctx.body = 'childRouter2';
});

parentRouter.use('/a',childRouter1.routes());
parentRouter.use('/b',childRouter2.routes());

// 把router实例注册进koa实例中
app.use(parentRouter.routes());

app.listen(3000,()=>{
    console.log(`server is running at 3000`)
})