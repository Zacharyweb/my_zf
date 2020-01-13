import Loading from '@/components/loading';

export  const loadable = (asyncFn)=>{
    const component = () =>({
        component:asyncFn(),
        loading:Loading
    });
    return {
        render(h){
           return h(component);
        }
    }
};
