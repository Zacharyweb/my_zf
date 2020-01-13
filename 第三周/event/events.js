class EventEmitter{
  constructor(){
      this.events = Object.create(null);
  }
  on(name,cb){
    if(!this.events) this.events = Object.create(null);
    if(name !== 'newListener'){
        this.emit('newListener',name)
    }
    if(this.events[name]){
        this.events[name].push(cb);
    }else{
        this.events[name] = [cb];
    }
  }
  once(name,cb){
    let one = (...args)=>{
        cb(args);
        this.off(name,one)
    };
    one.l = cb; // 用于直接调用off解绑 once 注册的事件 
    this.on(name,one);
  }
  off(name,fn){
      if(this.events[name]){
          this.events[name] = this.events[name].filter((cb)=>{
              return cb != fn && cb.l != fn;
          })
      }
  }
  emit(name,...args){ 
      if(this.events[name]){
        this.events[name].forEach(cb => {
            cb(...args);
        });
      }
  }
}
module.exports = EventEmitter;