<template>
    <div>
        <Parent></Parent>
    </div>
</template>
<script>
import Parent from './components/Parent.js'
export default {
    mounted() {
        this.$broadcast('say')
    },
    components:{
        Parent
    },
    // render(h){
    //     return <h1>你好啊沙雕</h1>
    // }
}
</script>