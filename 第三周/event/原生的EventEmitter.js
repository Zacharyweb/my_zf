// let events = require('events');
// let e = new events.EventEmitter();
// e.on('newListener',(type)=>{
//     process.nextTick(()=>{
//         e.emit(type,'xixi');
//     })
// })
// e.on('say',(name)=>{
//     console.log('say'+name)
// });
// e.on('say',(name)=>{
//     console.log('say'+name)
// });
// 以上 sayxixi 会输出4次,因为'say'事件on一次 newListener的回调就会执行一次, 此时 newListener 的回调会执行两次
// 因为 e.emit(type,'xixi') 是在 process.nextTick中执行的 所以此时任务队列里已经有两个已注册的say的回调fn
// 所以每 次执行newListener 的回调都会执行这两个队列里的回调 所以会执行 2*2 = 4 次;

let EventEmitter = require('./events.js');
let e = new EventEmitter;

// e.on('newListener',(type)=>{
//     process.nextTick(()=>{
//         e.emit(type,'xixi');
//     })
// });

let fn = (name)=>{
    console.log('fn');
};
e.on('say',fn);
e.once('say',(name)=>{
    console.log('11');
});


let fn2 = (name)=>{
    console.log('22');
};
e.once('say',fn2);
e.off('say',fn);
e.off('say',fn2);
e.emit('say','xixi');