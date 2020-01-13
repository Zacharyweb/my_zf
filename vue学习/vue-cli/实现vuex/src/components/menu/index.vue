<template>
    <div class="menu_wrapper">
        <zj-menu>
            <template v-for="item in list">
                <zj-sub-menu :key="item.name" v-if="item.children">
                    <template slot="title">{{item.name}}</template>
                    <template v-for="child in item.children">
                        <re-sub :item="child" :key="child.name" v-if="child.children"></re-sub>
                        <zj-menu-item :key="child.name" v-else>{{child.name}}</zj-menu-item> 
                    </template>
                </zj-sub-menu>
                <zj-menu-item :key="item.name" v-else>{{item.name}}</zj-menu-item> 
            </template>
        </zj-menu>
    </div>
</template>
<script>
import ZjMenu from './zj-menu'
import ZjSubMenu from './zj-submenu'
import ZjMenuItem from './zj-menu-item'
import ReSub from './ReSub'
export default {
    components: {
       ZjMenu,
       ZjSubMenu,
       ZjMenuItem,
       ReSub
    },
    props:{
        list:{
            type:Array,
            default(){
                return []; 
            }
        }
    }
    
}
</script>
<style lang="less" scoped>

</style>