let loaderUtils = require('loader-utils');
let validateOptions = require('schema-utils');
let fs = require('fs');
function loader(source) {
  this.cacheable && this.cacheable() // 启用缓存   不启用缓存this.cacheable(false)，每次打包都重新获取
  let options = loaderUtils.getOptions(this);
  let cb = this.async();
  let schema = {
    type:'object',
    properties:{
      text:{
        type:'string',
      },
      filename:{
        type:'string'
      }
    }
  }
  validateOptions(schema, options,'banner-loader');
  if(options.filename){
    this.addDependency(options.filename); // 自动的添加文件依赖,就是开发时这个文件变化后也热重载重写打包
    fs.readFile(options.filename,'utf8',function (err,data) {
      cb(err, `/**${data}**/${source}`);
    });
  }else{
    cb(null, `/**${options.text}**/${source}`);
  }
}
module.exports = loader;