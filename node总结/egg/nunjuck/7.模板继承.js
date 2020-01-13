const nunjucks = require('nunjucks');
const path = require('path');
nunjucks.configure(path.resolve('view'),{autoescape:true});

let result = nunjucks.render('home.html',{name:'zj'});
console.log(result);