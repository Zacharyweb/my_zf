const express = require('express');
const bodyParser = require('body-parser'); // 第三方插件需要npm i 

let app = express();

app.use(express.static('public')); // static处理静态资源的方法已由express集成进来 直接这样调用

/**
 * bodyParser.json():用来处理post请求且Content-type:application/json的请求体数据
 * bodyParser.urlencoded({extended:true}):用来处理post请求且Content-type:application/x-www-form-urlencoded的请求体数据 本来格式是name=zj&password=123
 * 注：bodyParser不支持处理contentType: multipart/form-data
 */

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended:true})); 
                                
app.get('/form',(req,res,next)=>{
    res.render('app.ejs',{title:'Heloo'});
})
app.post('/login',(req,res,next)=>{
    console.log(req.body); // 需要用第三方插件bodyParser处理转换后才有req.body
    res.json(req.body)
})

app.listen(3000,()=>{
    console.log('server is running at 3000')
})
