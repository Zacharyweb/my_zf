class SyncBailHook{
    constructor(args){
       this.args = args;
       this.tasks = [];
    }
    tap(name,task){
        this.tasks.push(task);
    }
    call(...args){
      args.length = this.args.length;
      let idx = 0;
      let flag = undefined;
      do {
          flag = this.tasks[idx++](...args);
      } while (idx < this.tasks.length && flag === undefined);
    }
 }
 let syncBailHook = new SyncBailHook(['name']);
 
 syncBailHook.tap('name',(name)=>{
     console.log('name:',name);
 })
 
 syncBailHook.tap('age',(age)=>{
     console.log('age:',age);
 })
 
 syncBailHook.call('zzjj')