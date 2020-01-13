import Vue from 'vue';
import MessageComp from './Message.vue'

let vm;
function createEl(){
    vm = new Vue({
        render(h){
            return h(MessageComp);
        }
    }).$mount();
    document.body.appendChild(vm.$el);
};

const Message = {
    success(options){
        !vm && createEl();
        console.log(vm.$children[0]);
        vm.$children[0].add({
            ...options,
            type:'success'
        });
    }
}
export {
    Message
}

export default{
    install(){
        let $message = {};
        Object.keys(Message).forEach((key)=>{
            $message[key] = Message[key]
        });
        Vue.prototype.$message = $message;
    }
}