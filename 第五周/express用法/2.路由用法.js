const express = require('express');
let app = express();

// 基础用法
app.use('/path',(req,res,next)=>{
    res.send('use path')
});
app.get('/path1',(req,res,next)=>{
    res.send('get path1')
});
app.post('/path2',(req,res,next)=>{
    res.send('post path2')
});
app.delete('/path3',(req,res,next)=>{
    res.send('delete path3')
});
app.put('/path4',(req,res,next)=>{
    res.send('put path4')
});

// 二级路由用法
let router1 = express.Router();
let router2 = express.Router();

router1.get('/a1',(req,res,next)=>{
   res.send('/a1')
})
router1.get('/a2',(req,res,next)=>{
   res.send('/a2')
})

router2.get('/b1',(req,res,next)=>{
    res.send('/b1')
})
router2.get('/b2',(req,res,next)=>{
    res.send('/b2')
})

app.use('/a',router1);
app.use('/b',router2);

app.listen(3000,()=>{
    console.log('server is running at 3000')
})
