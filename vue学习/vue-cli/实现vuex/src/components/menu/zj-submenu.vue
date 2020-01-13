<template>
    <li>
        <div class="sub_menu_title" @click="show">
            <slot name="title"></slot>   
        </div> 
        <ul class="sub_menu_content" v-show="extend">
            <slot></slot>
        </ul>
        
    </li>
</template>
<script>
export default {
    data(){
       return {
           extend:false
       }
    },
    methods:{
        show(){
            this.extend = !this.extend;
        }

    }
}
</script>

<style lang="less" scoped>
   .sub_menu_title{
        list-style: none;
        text-align: left;
        width: 150px;
    }
    .sub_menu_content{
        list-style: none;
        padding-left: 15px;

    }  
</style>