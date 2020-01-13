
class Store{
  constructor(options){
        this._data = new Vue({
            data(){
                return {state:options.state}
            }
        });
        

        this.getters = {};
        let getters = options.getters;
        Object.keys(getters).forEach((key)=>{
            Object.defineProperty(this.getters,key,{
                get:()=>{
                    return getters[key](this.state);
                }
            })
        });

        this.mutations = {};
        let mutations = options.mutations;
        Object.keys(mutations).forEach((key)=>{
            this.mutations[key] = (data)=>{
                mutations[key](this.state,data);
            };
        }); 


        this.actions = {};
        let actions = options.actions;
        Object.keys(actions).forEach((key)=>{
            this.actions[key] = (data)=>{
                actions[key](this,data);
            };
        }); 

  };
  dispatch = (actionName,data)=>{
      if(this.actions[actionName]){
          this.actions[actionName](data);
      }
  }
  commit = (mutationName,data)=>{
      if(this.mutations[mutationName]){
          this.mutations[mutationName](data)
      }
      
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