const nunjucks = require('nunjucks');
nunjucks.configure({autoescape:true});
// 循环时内置对象loop
const result = nunjucks.renderString(`
    <ul>
      {% for item in list%}
        <li>{{loop.index}}{{item.name}}</li>
        <li>{{loop.index0}}{{item.name}}</li>
      {% endfor %}
    </ul>
`,{list:[
    {id:1,name:'zj'},
    {id:2,name:'pd'},
]});

console.log(result)