const koa = require('koa');
// const koa = require('./mykoa/application.js');
// const static = require('koa-static');

// const bodyParser = require('koa-bodyparser');
const router = require('koa-router');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const uuid = require('uuid');
const mime = require('mime');
Buffer.prototype.split = function(sep){
    let len = Buffer.from(sep).length; // 分割符的长度
    let offset = 0;
    let result = [];
    let current;
    // 把找到的位置赋给current  看一下是否为-1
    while((current = this.indexOf(sep,offset))!==-1){
        result.push(this.slice(offset,current)); // 把每次的记过push到数组中
        offset = current + len // 增加查找偏移量
    }
    result.push(this.slice(offset)); // 最后一段追加进去
    return result;
}

let app = new koa();

// function bodyParser(){
//     return async (ctx,next)=>{  // 异步的回调不放回Promise的话就不会等待回调执行 源码中的comsose(ctx).then中的then就直接执行了 此时ctx.request.body还没赋上值
//         await new Promise((resolve,reject)=>{  
//             let dataArr = [];
//             ctx.req.on('data',(chunk)=>{
//                 dataArr.push(chunk);
//             });
//             ctx.req.on('end',async ()=>{
//                 let buffer = Buffer.concat(dataArr);
//                 let type = ctx.get('content-type');
//                 if(type === 'application/x-www-form-urlencoded'){
//                     ctx.request.body =qs.parse(buffer.toString());  
//                 }else if(type.includes('multipart/form-data')){
//                    let boundary = type.split('=')[1];
//                    boundary = '--' + boundary;
//                    let lines = buffer.split(boundary).slice(1,-1);
//                    let obj = {};
//                    lines.forEach(item =>{
//                      let [head,content] = item.split('\r\n\r\n');
//                      head = head.toString();
//                      let key = head.match(/name="(.+?)"/)[1];
//                      if(head.includes('filename')){
//                          let filename = uuid.v4();
//                          let contentType = head.match(/filename="(.+?)"/)[1];
//                          let extendName = contentType.split('.').pop();
//                          fs.writeFileSync(path.join(__dirname,'upload',filename+'.'+ extendName),content.slice(0,-2),'utf-8');
//                          obj[key] = filename+'.'+ extendName;
//                      }else{
//                          obj[key] = content.slice(0,-2).toString();
//                      }
//                    });
//                    ctx.request.body = obj;  
//                 }else{
//                    ctx.request.body = buffer.toString();  
//                 }
//                 resolve();
//             })
//         })
//         await next(); 
//     }
// };
// app.use(bodyParser());

function static(dirname){
    return async (ctx,next)=>{
        filepath = path.join(dirname,ctx.path);
        await new Promise((resolve,reject)=>{
            fs.stat(filepath,async (err,statObj)=>{
                if(err){
                   await next(); // 文件不存在则交给下一个中间件
                   resolve()
                }else{
                    if(statObj.isDirectory()){
                        filepath = path.join(filepath,'index.html');
                        fs.access(filePath,async (err)=>{
                            if(err){
                                await next(); // 文件不存在则交给下一个中间件
                                resolve()
                            }else{
                                ctx.body = fs.createReadStream(filepath);
                                resolve()
                            }
                        });
                    }else{
                        ctx.body = fs.createReadStream(filepath);
                        resolve()
                    }
                }
            })
        })
    }
}

// function static(dirname){
//   return async (ctx,next)=>{
//     try{
//       let filePath = path.join(dirname,ctx.path);
//       let statObj = await fs.stat(filePath);
//       if(statObj.isDirectory()){
//         filePath = path.join(filePath,'index.html');
//         await fs.access(filePath);
//       }
//      ctx.set('Content-Type',mime.getType(filePath)+';charset=utf-8')
//      ctx.body = createReadStream(filePath);
//     }catch(e){
//       await next();
//     }
//   }
// }


app.use(static(path.resolve(__dirname,'static'))); // html里面静态资源地址不用写static前缀了

// app.use(static(__dirname))
app.use(async (ctx,next)=>{
    if(ctx.path == '/form' && ctx.method == 'GET'){
        // ctx.set('Content-Disposition','attachment;filename=down.html'); // 默认走的下载
        ctx.set('Content-Type','text/html;charset=utf-8');
        ctx.body = fs.createReadStream(path.join(__dirname,'./form.html'));

    }
    if(ctx.path == '/login' && ctx.method == 'POST'){
        ctx.set('Content-Type','text/plain;charset=utf-8');
        ctx.body = ctx.request.body;

    }
    // let type = mime.getType(path.join(__dirname,ctx.path));
    // ctx.set('Content-Type',type+';charset=utf-8')
    // ctx.body = fs.createReadStream(path.join(__dirname,ctx.path));
});

app.listen(3001,()=>{
    console.log('server is running at 3001');
});
