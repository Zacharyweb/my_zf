const nunjucks = require('nunjucks');
nunjucks.configure({autoescape: true}); // flase: hello <span>朱坚</span>  true：hello &lt;span&gt;朱坚&lt;/span&gt;
let result = nunjucks.renderString("hello {{name}}",{name:'<span>朱坚</span>'});
console.log(result);
