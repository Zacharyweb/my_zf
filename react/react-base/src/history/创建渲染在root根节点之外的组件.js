import React from 'react';
import ReactDom from 'react-dom';

class Portal extends React.Component{
   render(){
      return ReactDom.createPortal(<span>不在root里渲染的组件</span>,document.getElementById('otherContainer'));
   }
}

class Panel extends React.Component{
   constructor(props){
      super(props);
   }

   render(){
      return (
         <>
           <Portal></Portal>
           <div style={{'border':'1px solid blue'}}>我是root里的</div>
         </>
      )
   }
}

let el3 = 
  <Panel></Panel>
;

ReactDom.render(el3,document.getElementById('root'));
