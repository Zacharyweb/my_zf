import React,{lazy,Suspense} from 'react';
import ReactDom from 'react-dom';
import Title from './components/Title';
import Loding from './components/Loding';
// import Content from './components/Content';
const Content = lazy(()=>import(/*webpackChunkName:'zjaa'*/'./components/Content').then((res)=>{
   return new Promise((resolve,reject)=>{
      setTimeout(()=>{
         resolve(res)
      },3000)
   })

}));

class Body extends React.Component{
   constructor(){
      super();
      this.state = {
         contentShow:false,
         hasError:false
      }
   }
   static getDerivedStateFromError(){
        // 声明这个后没资源页面也不会整个崩溃了
        return {hasError:true}
   }
   componentDidCatch(err,info){
      // 异步资源加载错误后的报错信息
      console.log(err,info);
   }
   changeShow = ()=>{
      this.setState({
         contentShow:!this.state.contentShow
      })
   }
  
   render(){
      if(this.state.hasError){
         return <div>资源加载错误</div>
      }
      return (
         <div style={{'border':'1px solid #333'}}>
            {
               this.state.contentShow &&
               <Suspense fallback={<Loding/>}>
                  <Content></Content>
               </Suspense>
            }
            <button onClick={()=>{this.changeShow()}}>点我展示</button>
         </div>
      );
   }
}
class Panel extends React.Component{
   constructor(props){
      super(props);
   }

   render(){
      return (
         <>
           <Title></Title>
           <Body></Body>
           <div style={{'border':'1px solid blue'}}>我是底部</div>
         </>
      )
   }
}

let el3 = 
  <Panel></Panel>
;

ReactDom.render(el3,document.getElementById('root'));
