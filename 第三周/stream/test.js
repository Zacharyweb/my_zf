const fs = require('fs');
const path = require('path');
let rs = fs.createReadStream(path.join(__dirname,'data.md'),{
    highWaterMark:4
});
let ws = fs.createWriteStream(path.join(__dirname,'copy.md'),{
    highWaterMark:2
});

// rs.pipe(ws); // 原生pipe ws写完了会触发emitws的close事件

// rs.on('data',(data)=>{
//    console.log(data);
//    let flag = ws.write(data);
//    if(!flag){
//        rs.pause();
//    }
// });

// ws.on('drain',()=>{
//     console.log('干了');
//     rs.resume();
// });

// ws.on('close',()=>{
//     console.log('ws close');
// });

// rs.on('end',()=>{
//     console.log('rs end');
// })
