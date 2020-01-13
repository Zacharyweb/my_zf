const koa = require('koa');
const fs = require('fs');
const util = require('util');
const path = require('path');
const ejs = require('ejs');
let readFile = util.promisify(fs.readFile); // 把方法promise化

/**
 * 注: koa导出的是一个类所以需要new来调用创建一个实例
 *     koa基于async await promise封装了node httpServer部分的功能
 *     express导出的是已经new好的实例所以不用再new了
 */
let app = new koa();

/**
 * koa的实例只有use方法，没有get这些方法
 * get这些方法需要自己引第三发插件koa-router来扩展
 */
app.use(async (ctx,next)=>{
    /**
     * use的回调函数里只有两个参数 ctx next
     * ctx上挂载了req,res 还额外挂载了request response即自己封装的一些方法与属性
     * ctx.body封装了res.end()方法，当给ctx.body复制会调用res.end()
     * koa基于async await promise封装了node httpServer部分的功能
     * 没个回调函数都会返回一个promise对象 为了保证所写的逻辑正确
     * 最好每次调next()方法前需要加await 或者return 以保证当前回调执行完毕后再回到上层洋葱模型接下来的逻辑
     * 不然如果next中的函数有异步逻辑需要处理 上层洋葱模型接下来的逻辑并不会等待它执行完再执行 这样ctx.body赋值没赋上 就会Not Found
     */
    if(ctx.path == '/favicon.ico'){
        return ctx.body = '/favicon.ico';
    }
    await next();
});

app.use(async (ctx,next)=>{
    // throw 'errorrrrr';
    if(ctx.path == '/form'){
        let fileContent =  await readFile(path.join(__dirname,'form.ejs'),'utf-8');
        let content = ejs.render(fileContent,{title:'Hello a'});
        ctx.body = content;
    }
})


/**
 * koa的错误统一处理采用发布订阅的模式来抓取
 * express中则通过4个参数的中间件（第一个参数为err的那个）
 */
app.on('error',(err)=>{
    console.log(err)
})


app.listen(3000,()=>{
    console.log(`server is running at 3000`)
})