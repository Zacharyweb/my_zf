const nunjucks = require('nunjucks');
const path = require('path');
// nunjucks.configure('view',{autoescape:true}); // 两个参数时 第一个参数为模板文件所在的文件夹名称 相对于当前目录

// 更灵活配置路劲 用resolve
nunjucks.configure(path.resolve('view','demo'),{autoescape:true}); 

let result = nunjucks.render("demo.html",{name:'zj'});
console.log(result);