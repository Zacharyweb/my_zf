class SyncLoopHook{
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
          flag = this.tasks[idx](...args);
          if(flag === undefined){
              idx++;
          }
      } while (idx < this.tasks.length);
    }
 }
 
 let syncLoopHook = new SyncLoopHook(['name']);
 
 let i = 0 ;

 syncLoopHook.tap('name',(name)=>{
     console.log('name:',name);
     if( i < 5){
         i++;
         return '11';
     }
 });
 
 syncLoopHook.tap('age',(name)=>{
     console.log('age:',name+'26');
 });
 
 syncLoopHook.call('zzjj')