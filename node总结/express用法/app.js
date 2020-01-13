const express = require('express');
 /**
  * express也是洋葱模型
  * next()前一般不写await
  * koa中的next()前需要加上await 或return 
  * */
let app = express();
app.get('/a',async (req,res,next)=>{
    console.log('a1');
    await next();
    // res.end('1')
    console.log('a2');
})
app.get('/a',async (req,res,next)=>{
    console.log('b1');
    await next();
    console.log('b2');
})
app.get('/a',async (req,res,next)=>{
    console.log('c1');
    await new Promise((resolve,reject)=>{
        setTimeout(()=>{
         resolve('3333')
        },2000)
    }).then((val)=>{
        res.end(val);
    })
    // res.end('3333');
    console.log('c2');
})

app.listen(3001,()=>{
    console.log('server is running at 3001')
})