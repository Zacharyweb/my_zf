
/**
 * process.stdin 可读流
 * process.stdout 可写流
 */
//  process.stdin.on('data',(data)=>{
//      process.stdout.write(data);
//  })
//  可写成  process.stdin.pipe(process.stdout);

 const {Transform} = require('stream');
 class MyTransform extends Transform{
     _transform(chunk,encoding,callback){
         chunk = chunk.toString().toUpperCase();
         this.push(chunk);
         callback();
     }

 }
 let myTransform = new MyTransform();
 process.stdin.pipe(myTransform).pipe(process.stdout);

