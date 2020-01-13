<template>
    <div>
        <h2>{{sonName}}</h2>
        <grand-son @test="test"></grand-son>
    </div>
</template>
<script>
import GrandSon from './GrandSon';
export default {
    data(){
        return {
            sonName:'Son comps'
        }
    },
    beforeCreate(){
      // console.log('before-creat-C');
    },
    created(){
      // console.log('created-C');
    },
    beforeMount(){
      // console.log('before-mount-C');
    },
    mounted(){
      // console.log('mounted-C');

    },
    components:{
      GrandSon
    },
    methods:{
      test(data){
        console.log('Son Test say:' + data);
      }
    }
  
}
</script>