console.log(Buffer.alloc(6)); // 一般都用这个了
console.log(Buffer.allocUnsafe(6));

console.log(Buffer.from([100,120,130])); // 很少用到
console.log(Buffer.from('珠峰'));

console.log(Buffer.alloc(3).fill('珠'))


// 题外:数组里的slice是浅拷贝
let buffer = Buffer.from('珠峰');  // buffer存放的都是内存地址，如果截取某一段 改变的时候也是更改了这个内存地址
let newBuffer = buffer.slice(1); // slice包头不包尾
newBuffer[0] = 100; // 同时也会改变原buffer里的
console.log(buffer);
console.log(newBuffer);

console.log(Buffer.isBuffer(buffer)); // 是不是buffer


// 原生有copy方法 以下是自己实现的原理
Buffer.prototype.copy = function(target,targetStart,sourceStart = 0,sourceEnd = this.length){
    let source = this;
    for(let i = 0 ;i < sourceEnd - sourceStart;i++){
        target[targetStart+ i] = source[i];
    }
}

let buff = Buffer.alloc(6);
let buff1 = Buffer.from('珠');
let buff2 = Buffer.from('峰');
// 当前buffer.copy(目标buffer,目标的开始位置,源的开始，源的结束) 注：包括源开头 不包括源结尾
buff1.copy(buff,0,0,1);
buff2.copy(buff,3,0,2);
// console.log(Buffer.from('珠峰'));
// console.log(buff);

Buffer.prototype.copy = function(target,targetStart,sourceStart = 0,sourceEnd = this.length){
    let source = this;
    for(let i = 0 ;i < sourceEnd - sourceStart;i++){
        target[targetStart+ i] = source[i];
    }
}


// 原生有concat方法 自己来实现下
Buffer.prototype.concat = function(list,length = list.reduce((val,b)=> val + b.length,0)){
    let newBuff = Buffer.alloc(length);
    let offset = 0;
    list.forEach(b => {
        b.copy(newBuffer,offset);
        offset = offset + b.length;
    });
    return newBuff;
}
let newBuff = Buffer.concat([buff1,buff2]);
console.log(newBuff);


// 原生没有split 自己实现
Buffer.prototype.split = function(sep){
    let result = [];
    let length = Buffer.from(sep).length;
    let offset = 0;
    let current;
    while((current = this.indexOf(sep,offset)) !== -1){
        result.push(this.slice(offset,current));
        offset = current + length;
    }
    result.push(this.slice(offset));
    return result;
};


let buffer3 = Buffer.from(`珠峰
珠峰
珠峰`);
let sbuff = buffer3.split('\n')
console.log(sbuff)
















