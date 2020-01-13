const koa = require('koa');
const KoaRouter = require('koa-router');
const bodyParser = require('koa-bodyparser');
const static = require('koa-static');
const fs = require('fs');
const util = require('util');
const path = require('path');
const ejs = require('ejs');

let readFile = util.promisify(fs.readFile); 
let app = new koa();
let router = new KoaRouter();

// static调用
app.use(static(__dirname)); // static调用多次的话，如果从这个路径下没找到，则会继续到下一个static指定的路径下找
app.use(static(path.join(__dirname,'static')));

// bodyParse调用
app.use(bodyParser());

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

router.post('/login',async (ctx,next)=>{
    // ctx.request.body需要调用app.use(bodyParser())后才有
    // 也不支持content-type为multipart/form-data的
    // 转换的结果没有放到ctx.req.body上，它仍是undefined
    console.log(ctx.request.body); // { name: 'zj', age: '23' }
    ctx.body = '/login';
});

app.use(router.routes());

app.listen(3000,()=>{
    console.log(`server is running at 3000`)
});