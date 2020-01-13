import React from 'react';
import ReactDom from 'react-dom';

// 自己模拟实现的 React.createContext
function createContext(){
   class Provider extends React.Component{
      static value;
      constructor(props){
         super(props);
         Provider.value = props.value;
         this.state= {color:props.value}
      }
      static getDerivedStateFromProps(nextProps,preState){
         Provider.value = nextProps.value;
         return {color:nextProps.value}
      }
      render(){
         return this.props.children;
      }

   }
   class Consumer extends React.Component{
      render(){
         return this.props.children(Provider.value);
      }
   }
   return {
      Provider,
      Consumer
   }
};
// const ColorContext = createContext();

const ColorContext = React.createContext();
// React.createContext里面取值时两种用法
// 1.在类组件里声明 static contextType = ColorContext; 然后就可以通过 this.context.xx来获取，这种方法在函数组件里不能用
// 2.在函数组件里需要包裹一层 <ColorContext.Consumer></ColorContext.Consumer>,在里面就可以通过 {(value)=>{return (<div>{value.xx}</div>}} 来获取，这种方法在类组件里也可以用

class Panel extends React.Component{
   constructor(){
      super();
      this.state ={
         color:'red'
      }
   }
   setColor = (color)=>{
      this.setState({
         color:color
      })
   }
   render(){

      let value = {
         setColor:this.setColor,
         color:this.state.color
      };


      return (
         <ColorContext.Provider value={value}>
           <div style={{'border':`5px solid ${this.state.color}`,'padding':'10px'}}>
              Panel
              <Father1></Father1>
              <Father2></Father2>
              <Father3></Father3>
           </div>
         </ColorContext.Provider>
      );
   }
}

class Father1 extends React.Component{
   static contextType = ColorContext;
   render(){
      return (
         <div style={{'border':`5px solid ${this.context.color}`,'padding':'10px','marginBottom':'10px'}}>
            Father1
            <Son1></Son1>
         </div> 
      );
   }
}
class Son1 extends React.Component{
   static contextType = ColorContext;
   render(){
      return ( 
         <ColorContext.Consumer>
           {
              value => (<div style={{'border':`5px solid ${value.color}`,'padding':'10px'}}>Son1</div>)
           } 
         </ColorContext.Consumer>
      );
   }
}

class Father2 extends React.Component{
   static contextType = ColorContext;
   render(){
      return (
         <div style={{'border':`5px solid ${this.context.color}`,'padding':'10px','marginBottom':'10px'}}>
            Father2
            <Son2></Son2>
         </div> 
      );
   }
}
class Son2  extends React.Component{
   static contextType = ColorContext;
   render(){
      return (
         <div style={{'border':`5px solid ${this.context.color}`,'padding':'10px'}}>
            Son2
            <button onClick={()=>{this.context.setColor('green')}}>变绿</button>
            <button onClick={()=>{this.context.setColor('blue')}}>变蓝</button>
         </div>
      );
   }
}

function Father3(){
   return (
      <ColorContext.Consumer>
      {
         (value)=>{
            console.log(value);
            return (<div style={{'border':`5px solid ${value.color}`,'padding':'10px'}}>
               Father3
               <Son3></Son3>
            </div>)
         }
      }
      </ColorContext.Consumer>
   );
}

function Son3(){
   return (
      <ColorContext.Consumer>
         {
            (value)=>(<div style={{'border':`5px solid ${value.color}`,'padding':'10px'}}>
               Son3
               <button onClick={()=>{value.setColor('green')}}>变绿</button>
               <button onClick={()=>{value.setColor('blue')}}>变蓝</button>
            </div>) 
         }
      </ColorContext.Consumer>
   );
}

let el3 = 
  <Panel></Panel>
;

ReactDom.render(el3,document.getElementById('root'));
