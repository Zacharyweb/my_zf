<template>
    <li class="menu_item">
        <slot></slot>
    </li>
</template>
<script>
export default {
    
}
</script>

<style lang="less" scoped>
    .menu_item{
        list-style: none;
        text-align: left;
        width: 150px;
    }
</style>