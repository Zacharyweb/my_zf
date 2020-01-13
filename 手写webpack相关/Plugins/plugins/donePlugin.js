class DonePlugin{
    apply(compiler){
        compiler.hooks.emit.tap('名称随意',(stats)=>{
            console.log('tap完成1');
        });
        compiler.hooks.emit.tap('名称随意',(stats)=>{
            console.log('tap完成2');
        });
        compiler.hooks.emit.tapAsync('名称随意',(stats,cb)=>{
            console.log('tapAsync完成1');
          
        });
        compiler.hooks.emit.tapPromise('名称随意',(stats)=>{
            return new Promise((resolve,reject)=>{
                console.log('tapPromise完成1');
                resolve();
            })
        });

        compiler.hooks.emit.tapPromise('名称随意',(stats)=>{
            return new Promise((resolve,reject)=>{
                console.log('tapPromise完成2');
                resolve();
            })
        })
    }
}
module.exports = DonePlugin;



let hooks = { 
    // SyncBailHook
    shouldEmit:{
      _args: [ 'compilation' ],
      taps: [],
      interceptors: [],
      call: {Function: 'lazyCompileHook'},
      promise: {Function: 'lazyCompileHook'},
      callAsync: {Function: 'lazyCompileHook'},
      _x: undefined 
    },

    // AsyncSeriesHook
    done:{
      _args: [ 'stats' ],
      taps: [],
      interceptors: [],
      call: undefined,
      promise: {Function: 'lazyCompileHook'},
      callAsync: {Function: 'lazyCompileHook'},
      _x: undefined 
    },


    // AsyncSeriesHook
    additionalPass:{
      _args: [],
      taps: [],
      interceptors: [],
      call: undefined,
      promise: {Function: 'lazyCompileHook'},
      callAsync: {Function: 'lazyCompileHook'},
      _x: undefined 
    },

    // AsyncSeriesHook
    beforeRun: {
      _args: [ 'compiler' ],
      taps: [ [Object] ],
      interceptors: [],
      call: undefined,
      promise: {Function: 'lazyCompileHook'},
      callAsync: {Function: 'lazyCompileHook'},
      _x: undefined 
    },

    // AsyncSeriesHook
    run:{
      _args: [ 'compiler' ],
      taps: [],
      interceptors: [],
      call: undefined,
      promise: {Function: 'lazyCompileHook'},
      callAsync: {Function: 'lazyCompileHook'},
      _x: undefined 
    },

    // AsyncSeriesHook
    emit:{
      _args: [ 'compilation' ],
      taps: [],
      interceptors: [],
      call: undefined,
      promise: {Function: 'lazyCompileHook'},
      callAsync: {Function: 'lazyCompileHook'},
      _x: undefined 
    },

    // AsyncSeriesHook
    assetEmitted: {
      _args: [ 'file', 'content' ],
      taps: [],
      interceptors: [],
      call: undefined,
      promise: {Function: 'lazyCompileHook'},
      callAsync: {Function: 'lazyCompileHook'},
      _x: undefined },

    // AsyncSeriesHook
    afterEmit:{
      _args: [ 'compilation' ],
      taps: [],
      interceptors: [],
      call: undefined,
      promise: {Function: 'lazyCompileHook'},
      callAsync: {Function: 'lazyCompileHook'},
      _x: undefined },

    // SyncHook
    thisCompilation:{
      _args: [ 'compilation', 'params' ],
      taps: [],
      interceptors: [],
      call: {Function: 'lazyCompileHook'},
      promise: {Function: 'lazyCompileHook'},
      callAsync: {Function: 'lazyCompileHook'},
      _x: undefined },

    // SyncHook
    compilation:{
      _args: [ 'compilation', 'params' ],
      taps: [],
      interceptors: [],
      call: {Function: 'lazyCompileHook'},
      promise: {Function: 'lazyCompileHook'},
      callAsync: {Function: 'lazyCompileHook'},
      _x: undefined },

    // SyncHook
    normalModuleFactory:{
      _args: [ 'normalModuleFactory' ],
      taps: [],
      interceptors: [],
      call: {Function: 'lazyCompileHook'},
      promise: {Function: 'lazyCompileHook'},
      callAsync: {Function: 'lazyCompileHook'},
      _x: undefined },

    // SyncHook
    contextModuleFactory:{
      _args: [ 'contextModulefactory' ],
      taps: [],
      interceptors: [],
      call: {Function: 'lazyCompileHook'},
      promise: {Function: 'lazyCompileHook'},
      callAsync: {Function: 'lazyCompileHook'},
      _x: undefined },

    // AsyncSeriesHook
    beforeCompile:{
      _args: [ 'params' ],
      taps: [],
      interceptors: [],
      call: undefined,
      promise: {Function: 'lazyCompileHook'},
      callAsync: {Function: 'lazyCompileHook'},
      _x: undefined 
    },

    // SyncHook
    compile:{
      _args: [ 'params' ],
      taps: [],
      interceptors: [],
      call: {Function: 'lazyCompileHook'},
      promise: {Function: 'lazyCompileHook'},
      callAsync: {Function: 'lazyCompileHook'},
      _x: undefined
    },

    // AsyncParallelHook
    make:{
      _args: [ 'compilation' ],
      taps: [],
      interceptors: [],
      call: undefined,
      promise: {Function: 'lazyCompileHook'},
      callAsync: {Function: 'lazyCompileHook'},
      _x: undefined 
    },

    // AsyncSeriesHook
    afterCompile:{
      _args: [ 'compilation' ],
      taps: [],
      interceptors: [],
      call: undefined,
      promise: {Function: 'lazyCompileHook'},
      callAsync: {Function: 'lazyCompileHook'},
      _x: undefined 
    },

    // AsyncSeriesHook 
    watchRun:{
      _args: [ 'compiler' ],
      taps: [],
      interceptors: [],
      call: undefined,
      promise: {Function: 'lazyCompileHook'},
      callAsync: {Function: 'lazyCompileHook'},
      _x: undefined 
    },

    // SyncHook
    failed:{
      _args: [ 'error' ],
      taps: [],
      interceptors: [],
      call: {Function: 'lazyCompileHook'},
      promise: {Function: 'lazyCompileHook'},
      callAsync: {Function: 'lazyCompileHook'},
      _x: undefined 
    },

    // SyncHook
    invalid:{
      _args: [ 'filename', 'changeTime' ],
      taps: [],
      interceptors: [],
      call: {Function: 'lazyCompileHook'},
      promise: {Function: 'lazyCompileHook'},
      callAsync: {Function: 'lazyCompileHook'},
      _x: undefined 
    },

    // SyncHook
    watchClose:{
      _args: [],
      taps: [],
      interceptors: [],
      call: {Function: 'lazyCompileHook'},
      promise: {Function: 'lazyCompileHook'},
      callAsync: {Function: 'lazyCompileHook'},
      _x: undefined 
    },

    // SyncBailHook
    infrastructureLog:{
      _args: [ 'origin', 'type', 'args' ],
      taps: [],
      interceptors: [],
      call: {Function: 'lazyCompileHook'},
      promise: {Function: 'lazyCompileHook'},
      callAsync: {Function: 'lazyCompileHook'},
      _x: undefined 
    },

    // SyncHook
    environment:{
      _args: [],
      taps: [],
      interceptors: [],
      call: {Function: 'lazyCompileHook'},
      promise: {Function: 'lazyCompileHook'},
      callAsync: {Function: 'lazyCompileHook'},
      _x: undefined 
    },

    // SyncHook
    afterEnvironment:{
      _args: [],
      taps: [],
      interceptors: [],
      call: {Function: 'lazyCompileHook'},
      promise: {Function: 'lazyCompileHook'},
      callAsync: {Function: 'lazyCompileHook'},
      _x: undefined 
    },

    // SyncHook
    afterPlugins:{
      _args: [ 'compiler' ],
      taps: [],
      interceptors: [],
      call: {Function: 'lazyCompileHook'},
      promise: {Function: 'lazyCompileHook'},
      callAsync: {Function: 'lazyCompileHook'},
      _x: undefined },

    // SyncHook
    afterResolvers:{
      _args: [ 'compiler' ],
      taps: [],
      interceptors: [],
      call: {Function: 'lazyCompileHook'},
      promise: {Function: 'lazyCompileHook'},
      callAsync: {Function: 'lazyCompileHook'},
      _x: undefined },

    // SyncBailHook
    entryOption:{
      _args: [ 'context', 'entry' ],
      taps: [],
      interceptors: [],
      call: {Function: 'lazyCompileHook'},
      promise: {Function: 'lazyCompileHook'},
      callAsync: {Function: 'lazyCompileHook'},
      _x: undefined 
    },

    // SyncBailHook
    infrastructurelog:{
      _args: [ 'origin', 'type', 'args' ],
      taps: [],
      interceptors: [],
      call: {Function: 'lazyCompileHook'},
      promise: {Function: 'lazyCompileHook'},
      callAsync: {Function: 'lazyCompileHook'},
      _x: undefined }
    }