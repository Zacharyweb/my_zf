let Vue;

// let Plugin = {
//     install: (_Vue)=>{
//         Vue = _Vue;
//         Vue.mixin({
//             methods:{
//                 say(){
//                     Vue.util.defineReactive(this,'text','Hrdsadsad')
//                     console.log('Fuck');
//                 }
//             }
//         })
//     }
// }

class Plugin{
    constructor(routeMap){
        

    }
}

Plugin.install = (_Vue)=>{
    Vue = _Vue;
    Vue.mixin({
        beforeCreate(){
          if(this.$options){
              console.log(this.$options)
          }
           
           Vue.component('nav-span',{
               props:{
                   to:String
               },
               render(h){
                  return <a href={`#${this.to}`}>{this.$slots.default}</a>
               }
           })

           Vue.component('nav-page',{
            render(h){
               return h('')
            }
        })
        }
    })

}

export default Plugin;