<script>
export default {
    data(){
        return {
            sonName:'Grand Son comps'
        }
    },
    beforeCreate(){
      // console.log('before-creat-G');
    },
    created(){
      // console.log('created-G');
    },
    beforeMount(){
      // console.log('before-mount-G');
    },
    mounted(){
      // console.log('mounted-G');
    },  
    render(h){
      return <h2>xixi</h2>
    },
    methods:{
      dispatch(){
        this.$dispatch('test','hello a')
      }
    }

  
}
</script>