class SyncWaterFullHook{
    constructor(args){
       this.args = args;
       this.tasks = [];
    }
    tap(name,task){
        this.tasks.push(task);
    }
    call(...args){
      args.length = this.args.length;
      let firstTask = this.tasks.shift();
      this.tasks.reduce((p,task)=>{
          console.log(p);
          if(p === undefined){
              return task(...args)
          }else{
            return task(p)
          }

      },firstTask(...args))
      
    }
 }
 let syncWaterFullHook = new SyncWaterFullHook(['name']);
 
 syncWaterFullHook.tap('name',(name)=>{
     console.log('name:',name);
     return name + '-26';
 })
 
 syncWaterFullHook.tap('age',(data)=>{
     console.log('age:',data);
 })
 
 syncWaterFullHook.call('zj')