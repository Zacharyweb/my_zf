class ModuleCollection{
    constructor(options){
       this.register([],options)
    }
    register(path,rootModule){
 
        let module = {
            _rawModule:rootModule,
            _children:{},
            state:rootModule.state
        }
        if(path.length == 0){
            this.root = module;
        }else{
            // 递归都用reduce方法   // 通过_children 属性进行查找
            // console.log(path);
            let parent = path.slice(0,-1).reduce((root,current)=>{
                return root._children[current]
            },this.root);
            parent._children[path[path.length-1]] = module;

        };

        if(rootModule.modules){
            Object.keys(rootModule.modules).forEach((key)=>{
                this.register(path.concat(key),rootModule.modules[key]);
            })
        };
    }
}

const installModule = (store,rootState,paths,rootModule) => {
    if(paths.length > 0){
        let parent = paths.slice(0,-1).reduce((root,path)=>{
            return root[path];
        },rootState);
        Vue.set(parent,paths[paths.length -1],rootModule.state);
        // parent[paths[paths.length-1]] = rootModule.state;
    };
    
    let getters = rootModule._rawModule.getters;
    if(getters){
        Object.keys(getters).forEach((key)=>{
            Object.defineProperty(store.getters,key,{
                get(){
                    return getters[key](rootModule.state)
                }
            })
        });
    };
   
    let mutations = rootModule._rawModule.mutations;
    if(mutations){
        Object.keys(mutations).forEach((key)=>{
            let ms = store.mutations[key] || [];
            ms.push((data)=>{
                mutations[key](rootModule.state,data);
                store._subscribes.forEach(fn=>fn({type:key,payload:data},rootState));
            });
            store.mutations[key] = ms;
        }); 
    };
    
    let actions = rootModule._rawModule.actions;
    if(actions){
        Object.keys(actions).forEach((key)=>{
            let ms = store.actions[key] || [];
            ms.push((data)=>{
                actions[key](store,data)
            });
            store.actions[key] = ms;
        });
    };
    
  
    Object.keys(rootModule._children).forEach((child)=>{
        installModule(store,rootState,paths.concat(child),rootModule._children[child])
    });
}


class Store{
  constructor(options){
        this._data = new Vue({
            data(){
                return {state:options.state}
            }
        });

        this.getters = {};
        this.mutations = {};
        this.actions = {};
        this._subscribes = [];
        this._modules = new ModuleCollection(options);
        installModule(this,this.state,[],this._modules.root);
        options.plugins.forEach(p=>p(this));
        // this.getters = {};
        // let getters = options.getters;
        // Object.keys(getters).forEach((key)=>{
        //     Object.defineProperty(this.getters,key,{
        //         get:()=>{
        //             return getters[key](this.state);
        //         }
        //     })
        // });

        // this.mutations = {};
        // let mutations = options.mutations;
        // Object.keys(mutations).forEach((key)=>{
        //     this.mutations[key] = (data)=>{
        //         mutations[key](this.state,data);
        //     };
        // }); 

        // this.actions = {};
        // let actions = options.actions;
        // Object.keys(actions).forEach((key)=>{
        //     this.actions[key] = (data)=>{
        //         actions[key](this,data);
        //     };
        // }); 
  };

  dispatch = (actionName,data)=>{
      if(this.actions[actionName]){
            this.actions[actionName].forEach((fn)=>{
                fn(data);
            }) 
      }
  };
  
  commit = (mutationName,data)=>{
        if(this.mutations[mutationName]){
            this.mutations[mutationName].forEach((fn)=>{
                fn(data);
            })
        }
  };
  subscribe(fn){
    this._subscribes.push(fn);
  }

  get state(){
    return this._data.state;
  }
}

let Vue;

let install = (_Vue)=>{
    Vue = _Vue;

    Vue.mixin({
        beforeCreate(){
            if(this.$options && this.$options.store){
                this.$store = this.$options.store;
            }else{
                this.$store = this.$parent && this.$parent.$store;
            };
        }
    })

}

export default {
   install,
   Store
}

