const loaderUtils = require('loader-utils');
const mime = require('mime')
function loader(source){
   let options = loaderUtils.getOptions(this);
   let limit = options.limit;
   if(limit && limit > source.length){
      return `module.exports = "data:${mime.getType(this.resourcePath)};base64,${source.toString('base64')}"`
   }else{
      let fileLoader = require('./file-loader');
      return fileLoader.call(this,source);
   }


}

loader.raw = true;
loader.pitch = function(){
   
}
module.exports = loader;





