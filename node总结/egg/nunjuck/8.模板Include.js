const nunjucks = require('nunjucks');
const path = require('path');
nunjucks.configure(path.resolve('view'),{autoescape:true});

let result = nunjucks.render('user.html',{list:[
    {id:1,name:'zj'},
    {id:2,name:'pd'},
]});
console.log(result);