import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import Plugin from './plugin'
// Vue.use(Plugin);
// var a = new Plugin();


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
