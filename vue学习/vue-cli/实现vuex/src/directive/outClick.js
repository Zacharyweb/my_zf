export default{
    install(_Vue){
        // _Vue.directive('outClick',function(el,building,newVNode,oldVNode){
        //     // 默认在指令的bind 跟 update 钩子里执行
        //     console.log(el);
        //     console.log(building);
        //     console.log(newVNode);
        //     console.log(oldVNode);
        // })

        _Vue.directive('outClick',{
            bind(el,building,vnode){
                console.log(el.parentNode);
            },
            inserted(el,building,vnode){
                el.fn = (e)=>{
                   if(el.contains(e.target)){
                    //  通过 vnode.context 上下文可调用指令所在的实例上的方法
                    building.value();
                    // vnode.context['showMsg']();
                   }
                };
                document.addEventListener('click',el.fn)
            },
            update(){
             
            },
            componentUpdated(){
                // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
            },
            unbind(el){
                document.removeEventListener('click',el.fn)
            }
        })

    }
}