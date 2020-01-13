<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  data(){
    return {
      plainData:[
        {pid:-1,id:1,name:'购物车'},
        {pid:1,id:2,name:'物品列表'},
        {pid:2,id:3,name:'手机'},
        {pid:2,id:4,name:'跑车'}
      ]
    }
  },
  created(){
      this.getThress(this.plainData);
  },
  methods:{
    getThress(list){
      let obj = {};
      let result = [];
      list.forEach((item)=>{
          item.children = [];
          obj[item.id] = item;
          if(item.pid == -1){
            result.push(item);
          }else{
            if(item.pid == obj[item.pid].id){
              obj[item.pid].children.push(item); 
            }
          }
      });
      // console.log(obj);
      // console.log(result);
         
    }
  }
}



</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
