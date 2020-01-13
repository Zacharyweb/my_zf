function loader(source){
   console.log('loader1~~')
   console.log('--------------------------------')
   return source;
}
loader.pitch = function(){
    console.log('--------------------------------')
    console.log('pitch1')
}
module.exports = loader;