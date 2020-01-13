const express = require('express');
const path = require('path');
let app = express();  // express不用new Koa需要new express()执行返回的就是一个new的实例

/**
 * use方法接受两个参数，第一个路径，第二个回调函数，在请求到相应的路径时执行
 * 当use方法只有一个参数时，该参数需要为回调函数，默认路径为 '/'
 * use路径参数可匹配以这个路径开头的所有路径 如 '/a' 可匹配 '/a' 也可匹配到 /a/b
 * 使用一些第三方插件用如app.use(express.static('相应静态资源文件夹名'))
 */
app.use('/',(req,res,next)=>{
    console.log('所有请求都经过这里~');
    next();
    // next('errMsg'); // 如果next中带参数则会直接走到下面的错误处理函数中
})


app.get('/end',(req,res,next)=>{
    res.end('end'); // 原生的发送数据并结束请求,只能发送字符串或者Buffer,下面几个方法基于res.end封装
});

app.get('/send',(req,res,next)=>{
    /**
     * express扩展的方法，设参数为x
     * 如果参数是对象，则会JSON.toStringfy(x)后再发送
     * 如果是数字则会把res.statusCode = x再res.end('对应的状态描述')
     * 其他则直接传给res.end(x)方法中
     */
    // res.send('send'); 
    // res.send(404); 
    res.send({name:'zj',age:10})
});

app.get('/render',(req,res,next)=>{
    res.render('app.ejs',{title:'Heloo'}); // express扩展的方法，内部集成了ejs
});

app.get('/sendFile',(req,res,next)=>{
    res.setHeader('Content-Type','text/plain;charset=utf-8'); // 不设置这个头部则会走下载文件取了
    res.sendFile(path.join(__dirname,'views','app.ejs')); // express扩展的方法，会流传输文件，即fs.createReadStream(file).pipe(res);
});

// 可以传递多个回调函数，当请求到来时会按顺序执行
app.use('/fn',(req,res,next)=>{
    console.log('use fn1');
    next();
},(req,res,next)=>{
   console.log('use fn2');
   next();
})

app.get('/fn',(req,res,next)=>{
    console.log('get fn1');
    next();
},(req,res,next)=>{
   console.log('get fn2');
   res.end('fn')
})

/**
 * 四个参数的use就是node的统一错误处理函数，
 * 前面各个中间件中只要next()中带参数，即next('errMsg'),
 * 就会跳过后面所有三个参数的中间件
 * 直接到这个错误处理函数中
 */
app.use((err,req,res,next)=>{
     console.log(err);
     next();
});

/**
 * 错误处理函数中如果调用了next()则会还会继续走下来
 */
app.use((req,res,next)=>{
    res.send('error end')
});
app.listen(3000,()=>{
    console.log('server is running at 3000')
})
