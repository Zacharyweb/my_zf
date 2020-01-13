const ReadStream = require('./readStream.js');
const path = require('path');

let rs = new ReadStream(path.join(__dirname,'data.md'),{
    highWaterMark:4
});


rs.on('data',(data)=>{
   console.log(data);
   rs.pause();
});

setTimeout(()=>{
    rs.resume(); 
},2000)

setTimeout(()=>{
    rs.resume(); 
},4000)

setTimeout(()=>{
    rs.resume(); 
},8000)

rs.on('end',()=>{
    console.log('rs end');
})
rs.on('close',()=>{
    console.log('rs close');
});
