import Vue from 'vue';
import AlertComp from './Alert.vue';
let vm;
function createEl(){
    vm = new Vue({
        render(h){
            return h(AlertComp)
        }
    }).$mount();
    document.body.appendChild(vm.$el);
};

const Alert = {
    show(options){
        !vm && createEl();
        vm.$children[0].show(options);
    }
};

export default {
    install(){
       let $alert = {};
       Object.keys(Alert).forEach((key)=>{
           $alert[key] = Alert[key];
       });
       Vue.prototype.$alert = $alert;
    }
};