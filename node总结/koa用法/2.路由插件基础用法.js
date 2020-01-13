const koa = require('koa');
const KoaRouter = require('koa-router');
const fs = require('fs');
const util = require('util');
const path = require('path');
const ejs = require('ejs');
let readFile = util.promisify(fs.readFile); 

let app = new koa();
let router = new KoaRouter(); // 创建一个router实例，可以传一个对象参数，如{prefix:'/xx'}

/**
 * let router = new KoaRouter({prefix:'/a'});
 * prefix属性指定接下来该实例上的处理函数触发的路径前都要加个该前缀
 * 如下面'/form'需要请求'/a/form'才能访问
 */

app.use(async (ctx,next)=>{
    if(ctx.path == '/favicon.ico'){
        return ctx.body = '/favicon.ico';
    }
    await next();
});

// 在router实例上挂载处理函数
router.get('/form',async (ctx,next)=>{
    let fileContent =  await readFile(path.join(__dirname,'form.ejs'),'utf-8');
    let content = ejs.render(fileContent,{title:'Hello a'});
    ctx.body = content;
});

// 把router实例注册进koa实例中
app.use(router.routes());

app.listen(3000,()=>{
    console.log(`server is running at 3000`)
})