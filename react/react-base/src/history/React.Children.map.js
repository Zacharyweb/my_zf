import React from 'react';
import ReactDom from 'react-dom';


function map(children,mapFn){
   let result;
   if(!children){
      result = []
   }else if(!Array.isArray(children)){
      result = [children];
   }else{
      result = children;
   }
   return result.map(mapFn);
}

class Counter extends React.Component{
   render(){
      console.log(this.props.children);
      return (
         <ul>
            {/* {this.props.children.map((item,index)=><li key={index}>{item}</li>)} */}
            {React.Children.map(this.props.children,(item,index)=>[<li key={index+'1'}>{item}</li>,<li key={index+'2'}>{item}</li>])}

         </ul>
      )
   }
}
let el3 = 
   <Counter>
      <span>11</span>
      <span>22</span>
   </Counter>
;

ReactDom.render(el3,document.getElementById('root'));
