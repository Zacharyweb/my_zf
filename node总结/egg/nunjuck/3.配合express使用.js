const nunjucks = require('nunjucks');
const express = require('express');
const path = require('path');

const app = express();
// 更灵活配置路劲 用resolve
nunjucks.configure(path.resolve('view','demo'),{
    autoescape:true,
    express:app
}); 

app.get('/',(req,res)=>{
    res.render("demo.html",{name:'zj'})
});

app.listen(3000)