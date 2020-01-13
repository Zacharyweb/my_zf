<template>
    <div>
        <div class="message" v-for="(item,index) in layers" :key="item.id" :style="{top:200+ 45*index+'px'}">{{item.text+item.id}}</div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            layers:[]
        }
    },
    mounted(){
       this.id = 0;
    },
    methods:{
        add(options){
            let layer = {...options,id:++this.id};
            this.layers = [...this.layers,layer];
            layer.timer = setTimeout(()=>{
                this.remove(layer);
            },options.duration || 2000);
        },
        remove(layer){
            clearTimeout(layer.timer);
            this.layers = this.layers.filter( item => item.id !== layer.id);
        }
    }
}
</script>
<style lang="less" scoped>
    .message{
        padding:5px 10px;
        background-color: rgba(0,0,0,0.6);  
        color: #fff;
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
    }
</style>