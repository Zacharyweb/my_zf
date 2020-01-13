const nunjucks = require('nunjucks');
nunjucks.configure({autoescape:true});

// let result = nunjucks.renderString('hello {{arr}}',{arr:['a','b','c']});

// let result = nunjucks.renderString(`hello {{arr | join('-')}}`,{arr:['a','b','c']});

let result = nunjucks.renderString(`hello {{ str | replace('zj','pb')}}`,{str:'i am zj'});

console.log(result);