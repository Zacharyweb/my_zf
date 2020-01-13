const express = require('express');
let app = express();

// use里也可以用动态路由
app.use('/a/:name/:age',(req,res,next)=>{
    console.log('use /a/:name/:age' )
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
