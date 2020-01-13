// const EventEmitter = require('events');
// const fs = require('fs');
// class ReadStream extends EventEmitter{
//     constructor(path,options){
//         super();
//         this.path = path;
//         this.highWaterMark = options.highWaterMark;
//         this.offset = 0;
//         this.flowing = null;
//         this.open();
//         this.on('newListener',(type)=>{
//             if(type == 'data'){
//                 this.flowing = true;
//                 this.read();
//             }
//         })
//     }
//     open(){
//       fs.open(this.path,'r',(err,fid)=>{
//           if(err) return;
//           this.fid = fid;
//           this.emit('open',fid);
//       })
//     }
//     read(){
//         if(typeof this.fid !== "number"){
//             return this.once('open',(fid)=>{
//                 this.read()
//             })
//         }
    
//         let buffer = Buffer.alloc(this.highWaterMark);
//         fs.read(this.fid,buffer,0,this.highWaterMark,this.offset,(err,bytesRead)=>{
//             this.offset += bytesRead;
//             if(bytesRead > 0){
//                 if(bytesRead < this.highWaterMark){
//                     buffer = buffer.slice(0,bytesRead);
//                 }
//                 this.emit('data', buffer);
//                 this.flowing && this.read();
//             }else{
//                 this.emit('end')
//                 this.close()
//             }
//         })
//     }
//     close(){
//         fs.close(this.fid,()=>{
//             this.emit('close');
//         })
//     }
//     pause(){
//         this.flowing = false;
//     }
//     resume(){
//         this.flowing = true;
//         this.read();
//     }
 
// }

// module.exports = ReadStream;

const EventEmitter = require('events');
const fs = require('fs');
class ReadStream extends EventEmitter{
    constructor(path,options){
        super();
        this.path = path;
        this.highWaterMark = options.highWaterMark || 64*1024;
        this.offset = 0;
        this.flowing = false;
        this.on('newListener',(type)=>{
            if(type == 'data'){
                this.flowing = true;
                this.read();
            }
        })
        this.open();
    }
    open(){
        fs.open(this.path,'r',(err,fid)=>{
            if(err) return;
            this.fid = fid;
            this.emit('open');
        })
    }
    read(){
        if(typeof this.fid !== 'number'){
            return this.once('open',this.read);
        };
        let buffer = Buffer.alloc(this.highWaterMark);
        fs.read(this.fid,buffer,0,this.highWaterMark,this.offset,(err,readBytes)=>{
            this.offset =  this.offset + readBytes;
            if(readBytes > 0){
                this.emit('data',buffer);
                if(this.flowing){
                    this.read();
                }
            }else{
                this.emit('end')
                this.close();
            }
        })
    }
    close(){
        fs.close(this.fid,(err)=>{
            this.emit('close');
        }) 
    }
    pause(){
        this.flowing = false;
    }
    resume(){
        this.flowing = true;
        this.read();
    }
}

module.exports = ReadStream;