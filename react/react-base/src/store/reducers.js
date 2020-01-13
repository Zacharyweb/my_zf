
import * as types from './type';
import {combineReducers} from '../redux';
// import {handleAction,handleActions} from 'redux-actions';


// function handleAction(type,reducer,defaultState){
//    return function(state = defaultState,action){
//       switch(action.type){
//          case type:
//             return reducer(state,action);
//          default:
//             return state;
//       }
//    }
// }
let initState = {number:8}
// const counter1 = handleAction(types.INCREMENT1,(state,action)=>{
//    return {...state,number: state.number + action.payload};
// },initState);

function handleActions(reducers,defaultState){
   return function(state=defaultState,action){
      let reducer = reducers[action.type];
      if(reducer){
         state = reducer(state,action);
      }
      return state;
   }
}
const counter1 = handleActions({
   [types.INCREMENT1]:(state,action)=>{
      return {...state,number: state.number + action.payload};
   },
   [types.DECREMENT1]:(state,action)=>{
      return  {...state,number: state.number - action.payload};
   },
},initState);

// function counter1(state={number:0},action){
//     switch(action.type){
//        case types.INCREMENT1:
//           return {...state,number: state.number + action.payload};
//        case types.DECREMENT1:
//           return {...state,number: state.number - action.payload};
//        default:
//           return state;
//     }
//  };
 
 function counter2(state={number:0},action){
    switch(action.type){
       case types.INCREMENT2:
          return {...state,number: state.number + action.payload};
       case types.DECREMENT2:
          return {...state,number: state.number - action.payload};
       default:
          return state;
    }
};

let reducer = combineReducers({counter1,counter2});
export default reducer;