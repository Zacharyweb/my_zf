const koa = require('koa');
const KoaRouter = require('koa-router');

let app = new koa();
let router = new KoaRouter();

router.get('/',(ctx,next)=>{
    ctx.body = '/';
});

router.get('/:name/:age',(ctx,next)=>{
    console.log(ctx.params);
    ctx.body = '/:name/:age';
});

router.get('/a/:name/:age',(ctx,next)=>{
    console.log(ctx.params);
    ctx.body = '/a/:name/:age';
});

// 把router实例注册进koa实例中
app.use(router.routes());

app.listen(3000,()=>{
    console.log(`server is running at 3000`)
})