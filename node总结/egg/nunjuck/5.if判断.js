const nunjucks = require('nunjucks');
nunjucks.configure({autoescape:true});
const result = nunjucks.renderString(`
      {% if score > 90 %}
      优秀
      {% elseif score >60 %}
      良好
      {% else %}
      不及格
      {% endif %}    
`,{score:78});
console.log(result)