const Koa = require('koa');
// const Router  = require('koa-router');
const Router  = require('./myRouter');


let app = new Koa();
let router = new Router();

router.get('/a',(ctx,next)=>{
    ctx.body = '/a';
    next()
});
router.get('/a',(ctx,next)=>{
    ctx.body = '/c';
});

router.get('/b',(ctx,next)=>{
    ctx.body = '/b';
});

app.use(router.routes());
app.listen(3003,()=>{
    console.log('running at 3003')
});
