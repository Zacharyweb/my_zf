<template>
   <zj-sub-menu>
        <template slot="title">{{item.name}}</template>
        <template v-for="child in item.children">
            <re-sub :item="child" :key="child.name" v-if="child.children"></re-sub>
            <zj-menu-item :key="child.name" v-else>{{child.name}}</zj-menu-item> 
        </template>
   </zj-sub-menu>
</template>
<script>
import ZjSubMenu from './zj-submenu'
import ZjMenuItem from './zj-menu-item'
export default {
    name:'ReSub',
    components:{
       ZjSubMenu,
       ZjMenuItem  
    },
    props:{
        item:{
            type:Object,
            require:true
        }
    }
}
</script>
<style lang="stylus">

</style>