const express = require('express');
let app = express();
app.set('views','page'); // 设置要res.render()的页面放在哪个文件夹下 第一个参数写死views，第二个为存放文件的文件夹
app.set('view engine','html');  // 设置可以解析什么文件 第一个参数view engine 第二个需要解析的文件的后缀名
app.engine('html',require('ejs').__express); // 告诉express 这样的后缀名调用什么来解析  __express是ejs专门为express写的

app.get('/',(req,res,next)=>{
 /**
  *  用render方法默认自动获取views文件夹下的文件，且文件须是.ejs后缀
  *  res.render('app.ejs',{title:'你好'}); 
  *  如不用默认须调用上面三个方法（两个set一个engine）来更改
  */
  res.render('app.html',{title:'你好'}); 
})
app.listen(3000,()=>{
    console.log('server is running at 3000')
})