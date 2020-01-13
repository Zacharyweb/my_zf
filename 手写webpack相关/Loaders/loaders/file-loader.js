const loaderUtils = require('loader-utils');

function loader(source){
   let options = loaderUtils.getOptions(this);
   let name = options.name;

   
   // 根据内容生成md5戳的文件名称 => 835f6ff7831948466c679427d757b408.png
   let filename = loaderUtils.interpolateName(this, name || '[hash].[ext]',{content:source}); 
   this.emitFile(filename,source); // 把图片复制过去并已新生成的名字命名
 
   return `module.exports = "${filename}"`;
}

loader.raw = true;
loader.pitch = function(){
   
}
module.exports = loader;





