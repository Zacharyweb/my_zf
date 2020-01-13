// let EventEmitter = require('events');
// let fs = require('fs');
// class WriteStream extends EventEmitter{
//     constructor(path,options){
//         super();
//         this.path = path;
//         this.highWaterMark = options.highWaterMark;
//         this.offset = 0;
//         this.writing = false;
//         this.needDrain = false;
//         this.cache = []
//         this.open();
//     }
//     open(){
//         fs.open(this.path,'w',(err,fid)=>{
//             this.fid = fid;
//             this.emit('open',fid);
//         })
//     }
//     write(buffer,callback){
//         buffer = Buffer.isBuffer(buffer)? buffer:Buffer.from(buffer);
//         let length = buffer.length;
//         let flag = length < this.highWaterMark;
//         this.needDrain = !flag;
//         if(this.writing){
//             this.cache.push[{buffer,callback}]
//         }else{
//             this.writing = true;
//             this._write(buffer,()=>{
//                 if(callback){
//                     callback();
//                 }
//                 this.clearCache();
//             })
//         }
//     }
//     _write(buffer,callback){
//         if(typeof this.fid != 'number'){
//             return this.once('open',()=>{
//                 this._write(buffer,callback);
//             });
//         };
//         buffer = Buffer.isBuffer(buffer)? buffer:Buffer.from(buffer);
//         let length = buffer.length;
//         fs.write(this.fid,buffer,0,length,this.offset,(err,writeBetys)=>{
//             this.offset = this.offset + writeBetys;
//             callback()
//         })
//     }
//     clearCache(){
//         let obj = this.cache.shift();
//         if(obj){
//             this._write(obj.buffer,()=>{
//                 obj.callback && obj.callback();
//                 this.clearCache();
//             })
//         }else{
//             if(this.needDrain){
//                 this.needDrain = false;
//                 this.writing = false;
//                 this.emit('drain');
//             }
//         }

//     }
//     end(){
//         this.close();
//     }
//     close(){
//         if(typeof this.fid != 'number'){
//             return this.once('open',()=>{
//                 this.close();
//             });
//         };
//         fs.close(this.fid,(err)=>{
//             this.emit('close');
//         })
//     }

// }
// module.exports = WriteStream;

let EventEmitter = require('events');
let fs = require('fs');

class WriteStream extends EventEmitter{
    constructor(path,options){
       super();
       this.path = path;
       this.highWaterMark = options.highWaterMark || 16*1024;
       this.cache = [];
       this.offset = 0;
       this.writing = false;
       this.needDrain = false;
       this.len = 0;
       this.open();
    }
    open(){
        fs.open(this.path,'w',(err,fd)=>{
            this.fd = fd;
            this.emit('open')
        })
    }
    write(buffer,callback){
        buffer = Buffer.isBuffer(buffer)?buffer:Buffer.from(buffer);
        this.len = this.len + buffer.length;
        let flag = undefined;
        if(this.len < this.highWaterMark){
            flag = true;

            // 杯里水没满

            this.needDrain = false;
        }else{
            flag = false;

            // 杯里水满了
            this.needDrain = true;
        }
        if(this.writing){
            this.cache.push({buffer,callback});
        }else{
            this.writing = true;
            this._write(buffer,()=>{
                callback && callback();
                this.clearCache();
            })
        }
        return flag;

    }
    _write(buffer,callback){
        if(typeof this.fd != 'number'){
            return this.on('open',this._write(buffer,callback));
        }  
        let length = buffer.length;
        fs.write(this.fd,buffer,0,length,this.offset,(err,writeBetys)=>{
            this.offset = this.offset + writeBetys;
            this.len = this.len - writeBetys;
            callback && callback();
        })
    }
    clearCache(){
        let obj = this.cache.shift();
        if(obj){
            this.writing = true;
            this._write(obj.buffer,()=>{
                obj.callback && obj.callback();
                this.clearCache();
            })
        }else{
            
            if(this.needDrain){
                // 杯里水喝完了
                this.needDrain = false;
                this.writing = false;
                this.emit('drain');
            }
        }

    }
    end(){
       this.close();
    }
    close(){
        if(typeof this.fd != 'number'){
            return this.on('open',this.close);
        }
        fs.close(this.fd,()=>{
            this.emit('close');
        })

    }
};
module.exports = WriteStream;

