
let util = {
    arr:[],
    eventSet:{},
    on(event,fn){
        if(!this.eventSet[event]){
            this.eventSet[event] = [];
        }
        this.eventSet[event].push(fn)

    },
    emit(event){
       if(!this.eventSet[event]){
           console.log('未注册事件！')
           return;
       }
       this.eventSet[event].forEach((fn)=>{
           fn();
       })
       this.eventSet = [];
    }
}

util.on('a',()=>{
    console.log('你好')
});


util.on('a',()=>{
    console.log('啊')
});

util.on('b',()=>{
    console.log('b啊')
});

util.emit('a')

util.on('a',()=>{
    console.log('哈哈')
});

util.emit('a')


