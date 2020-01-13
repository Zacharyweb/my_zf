const express = require('express');
let app = express();

/**
 * 可以用app.param()对路径参数做拦截处理
 * 该方法有5个参数，底层就是发布订阅来实现
 */
app.param('name',(req,res,next,value,key)=>{
    if(value == 'zj'){
       next(); 
    }else{
        res.end('no zj');
    }  
})

app.param('age',(req,res,next,value,key)=>{
    if(value < 10){
      req.params.age += 10;
    }else{
      req.params.age -= 10;
    }
    next(); 
})

app.use('/a/:name/:age',(req,res,next)=>{
    console.log('use /a/:name/:age' )
    console.log(req.params) // {name:'xx',age:'xxx'}
    next()
});
app.get('/a/:name/:age',(req,res,next)=>{
    console.log('get /a/:name/:age' )
    console.log(req.params) // {name:'xx',age:'xxx'}
    res.end('/a/:name/:age');
});

app.listen(3000,()=>{
    console.log('server is running at 3000')
})
