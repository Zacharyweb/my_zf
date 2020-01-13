// const express = require('express');
const express = require('./express');
const path = require('path');
let app = express();

// let router1 = express.Router();
// let router2 = express.Router();

// router1.get('/a1',(req,res,next)=>{
//     res.end('/a1');
// });
// router1.get('/a2',(req,res,next)=>{
//     res.end('/a2');
// });

// router2.get('/b1',(req,res,next)=>{
//     res.end('/b1');
// });
// router2.get('/b2',(req,res,next)=>{
//     res.end('/b2');
// });

// app.use('/a',router1);
// app.use('/a',router2);
// app.use('/b',router2);

// app.param('name',(req,res,next,value,key)=>{
//     if(value == 'a1'){
//        next(); 
//     }else{
//         res.end('no a1');
//     }
    
// })

// app.param('age',(req,res,next,value,key)=>{
//     if(value < 10){
//       req.params.age += 10;
//     }
//     next(); 
// })

// app.get('/',(req,res,next)=>{
//      next()
// });

// app.get('/a/:name/:age',(req,res,next)=>{
//     res.end('/a/:name/:age');
// });

app.set('views','page'); // 设置要res.render()的页面放在哪个文件夹下 第一个参数写死views，第二个为存放文件的文件夹

app.set('view engine','html');  // 设置可以解析什么文件 第一个参数view engine 第二个需要解析的文件的后缀名
app.engine('html',require('ejs').__express); // 告诉express 这样的后缀名调用什么来解析  __express是ejs专门为express写的

app.get('/',(req,res,next)=>{
   //  res.render('app.html',{title:'你好'}); // 用render方法默认自动获取views文件夹下的文件，文件须是.ejs结尾（如不用默认须在上面app.set()里更改配置）
   res.sendFile(path.join(__dirname,'page','app.html'));
})

app.use((err,req,res,next)=>{
    res.end(JSON.stringify(err));
})
app.listen(3000,()=>{
    console.log('server is running at 3000')
})
