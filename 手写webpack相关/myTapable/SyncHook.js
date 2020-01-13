class SyncHook{
   constructor(args){
      this.args = args;
      this.tasks = [];
   }
   tap(name,task){
       this.tasks.push(task);
   }
   call(...args){
     args.length = this.args.length;
     this.tasks.forEach((task)=>task(...args))
   }
}
let hook = new SyncHook(['name']);
hook.tap('one',(name)=>{
    console.log(name)
})

hook.tap('two',(name)=>{
    console.log(name)
})
hook.call('zzjj')