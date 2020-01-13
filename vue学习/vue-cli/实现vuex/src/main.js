import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Message from '@/components/message/Message.js';
import Alert from '@/components/alert/Alert.js';
Vue.use(Message);
Vue.use(Alert);

import OutClick from '@/directive/outClick.js';
Vue.use(OutClick);
Vue.config.productionTip = false
Vue.prototype.$dispatch = function(eventName,data){
  let parent = this.$parent;
  this.$emit(eventName,data);
  while(parent){
    parent.$emit(eventName,data);
    parent = parent.$parent;
  }
};

Vue.prototype.$broadcast = function(eventName,data){
  let children = this.$children;
  function broad(children){
    children.forEach(child => {
      child.$emit(eventName,data);
      if(child.$children){
        broad(child.$children)
      }
    });
  }
  broad(children);
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
