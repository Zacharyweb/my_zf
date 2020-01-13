import Vue from 'vue'
// import Vuex from 'vuex'
import Vuex from './vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name:'parent'
  },
  getters:{
     say(state){
       return 'hello I am ' + state.name;
     }
  },
  mutations: {
    changeName(state,data){
      state.name = data;
    }
  },
  actions: {
    changeNameAsync({commit},data){
      setTimeout(()=>{
        commit('changeName',data);
      },2000)
    }
  },
  modules: {
    a:{
      state:{
        aName:'son A'
      },
      getters:{
        aSay(state){
          return 'hello I am ' + state.aName;
        }
      },
      commit:{
        changeAName(state,data){
          state.aName = data;
        }
      },

      modules:{
        c:{
          state:{
            cName:'son C'
          },
          getters:{
            cSay(state){
              return 'I am ' + state.cName
            }
          }
        }
      }
    },
    b:{
      state:{
        bName:'Son B'
      }
    }

  }
})
