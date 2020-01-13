<template>
  <div class="home">
    <h2>Home</h2>
    <transition name="box">
      <div class="box" v-show="boxShow"></div>
    </transition>
    <!-- <menu-list :list="menuList"></menu-list> -->

    <!-- <h5>
      <button @click="showMsg">Show Message</button>
    </h5>

    <h5>
      <button @click="showAlert">Show Alert</button>
    </h5>

    <h5>
      <button @click="transitionTest" v-out-click="showMsg">Transition Test</button>
    </h5> -->
    <h3>Parent Module</h3>
    <h4>state:{{this.$store.state.name}}</h4>
    <h4>getters:{{this.$store.getters.say}}</h4>
    <h5> <button @click="changeStoreState">Change Store state</button></h5>
<!-- 
    <h3>Module a</h3>
    <h4>a state:{{this.$store.state.a.aName}}</h4>
    <h4>a getters:{{this.$store.getters.aSay}}</h4> 
    <h5> <button @click="changeSonState">Change Son state</button></h5>

    
    <h3>Module c</h3>
    <h4>c state:{{this.$store.state.a.c.cName}}</h4>
    <h4>c getters:{{this.$store.getters.cSay}}</h4> 
    <h5> <button @click="changeGranSonState">Change grandSon state</button></h5>
   -->
  </div>
</template>

<script>
// @ is an alias to /src
// import MenuList from '@/components/menu/index';
import { Message } from '@/components/message/Message.js';
export default {
  name: 'home',
  components: {
    //  ZjMenu,
    //  ZjSubMenu,
    //  ZjMenuItem
    // MenuList
  },
  data(){
    return {
      // menuList:[
      //   {name:'1.菜单',children:[
      //       {
      //        name:'1.1.菜单',
      //        children:[
      //          {
      //           name:'1.1.1.菜单',
      //           children:[
      //             {name:'1.1.1.1.菜单'},
      //             {name:'1.1.1.2.菜单'}
      //           ]
      //          },
      //          {name:'1.1.2.菜单'}
      //         ]
      //       },
      //       {name:'1.2.菜单'}
      //     ]
      //   },
      //   {name:'2.菜单'}
      // ],
      boxShow:false
    }
  },

  methods:{
    
    showMsg(){
      // this.$message.success({text:'hello a'});
      Message.success({text:'hello a'})
    },
    showAlert(){
      this.$alert.show({content:'111111111'})
    },
    transitionTest(){
      this.boxShow = !this.boxShow;
    },
    changeStoreState(){
      this.$store.dispatch('changeNameAsync','dispatch change')
    },
    changeSonState(){

    },
    changeGranSonState(){
    
    }
  }
}
</script>
<style lang="less">
   .box{
     width: 60px;
     height: 60px;
     position: fixed;
     top:150px;
     left: 50%;
     margin-left: -30px;
     background-color: pink;
   }

   .box-enter-active{
      transition: all 0.3s linear;
      top:10px;
      opacity: 0;
   }
   .box-enter-to{
      top:150px;
      opacity: 1;
   }
   
   .box-leave-active{
      transition: all 0.3s linear;
      top:150px;
      opacity: 1;
   }
   .box-leave-to{
      top:10px;
      opacity: 0;
   }
</style>
