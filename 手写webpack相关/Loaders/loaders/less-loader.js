const less = require('less');
function loader(source){
   let css;
   less.render(source,(err,result)=>{
      css = result.css;
   });
   console.log('111111111111111111111111111111111111111111111111111111111111');
   return css;
};
module.exports = loader;