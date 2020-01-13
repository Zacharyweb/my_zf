 // 调用方法 组件上 v-lock-click="methods.bind(this,params)"
 // 传间隔时间 v-lock-click:1000="methods.bind(this,params)" 默认是500ms
export default{
    install(_Vue){
        _Vue.directive('lockClick',{
            inserted(el,building,vnode){
              let duration = building.arg*1;
              if(!duration || typeof duration != 'number'){
                  duration = 500;
              };
              el.fn = (e)=>{
                if(building.value && typeof building.value == 'function'){
                  if(!el.start){
                    building.value();
                  };
                  el.start = el.start || +new Date();
                  let nowTime = +new Date();
                  if(nowTime - el.start > duration){
                    el.start = nowTime;
                    building.value();
                  };
                };
              };
              el.addEventListener('click',el.fn);
            },
            unbind(el){
              el.removeEventListener('click',el.fn);
            }
        })

    }
}

