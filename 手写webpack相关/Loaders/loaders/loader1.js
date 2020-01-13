const loaderUtils = require('loader-utils');
const babel = require('@babel/core');
function loader(source){
   // console.log(this.resourcePath);
   // console.log(loaderUtils.getOptions(this));
   
   let options = loaderUtils.getOptions(this);
   let cb = this.async(); // 异步用法调用cb() 同步用法最后 return source;
   babel.transform(source,{
      ...options,
      sourceMap:true,
      filename: this.resourcePath.split('/').pop() // 报错时错误源文件的文件名,不写这个就来自unkonw.js了
   },(err,result)=>{
      cb(err,result.code,result.map)
   })
   // return source;
}
loader.pitch = function(){
   
}
module.exports = loader;