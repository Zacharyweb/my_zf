<template>
  <div class="about">
    <h1>This is an {{name}} page</h1>
    <button @click="changeName">change</button>
    <son @test="test"></son>
    <h6>
      <button @click="broadcastTest">broadcastTest from Parent</button>
    </h6>
  </div>
  
</template>
<script>
import Son from './Son';
export default {
  data(){
     return {
       name:'a'
     }
  },
  beforeCreate(){
    // console.log('before-creat-P');
    // 挂载以下方法与$parent属性
    // console.log(this.$emit)
    // console.log(this.$on);
    // console.log(this.$off);
    // console.log(this.$parent);
  },
  created(){
    // console.log('created-P');
    // console.log(this.$children);
  },
  beforeMount(){
    // console.log('before-mount-P');
    // console.log(this.$children); // 此时还为空数组
  },
  mounted(){
    // console.log('mounted-P');
    // console.log(this.$children); // 此时才有
    
  },
  beforeUpdate(){
    console.log('before-update')
  },
  updated(){
    console.log('updated');
  },
  beforeDestroy(){
    console.log('before-destroy');
  },
  destroyed(){
    console.log('destroyed');
  },

  components:{
    Son
  },
  methods:{
    changeName(){
      this.name = 'b';
    },
    test(data){
      console.log('Parent Test say:' + data);
    },
    broadcastTest(){
      this.$broadcast('test','Hi a');
    }
  }
}
</script>
