
// 希望数据被儿子公用  不希望传递来传递去 react context Provider consumer
// 注入数据 可以 随便写 可以把父组件直接注入进去
// eventBus 定义到了全局上
// import Son1 from './Son1';
// import Son2 from './Son2';
export default {
    // mounted(){
    //     this.$refs.son1.say(); 
    // },
    // provide(){
    //     return {parent:this}
    // },
    // methods:{
    //     son(){
    //         console.log('有人点我')
    //     },
    //     change(value){
    //         this.mny = value;
    //     }
    // },
    // components:{
    //     Son1,
    //     Son2
    // },
    // data(){
    //     return {mny : 100, isSmoke:'吸烟'}
    // }
    render(){
        return <h1 on-click={this.say}>你好世界</h1>
    },
    
    methods:{
        say(){
            alert(1);
        }
    }
}
