import * as types from './type';
// import {createAction} from 'redux-actions';

function createAction(type,payloadCreator){
    return function(payload){
        return {
            type,
            payload:payloadCreator(payload)
        }
    }
}
const increment1 = createAction(types.INCREMENT1,()=>8)

// function increment1(){
//     return {type:types.INCREMENT1,payload:3}
// };
function decrement1(){
    return {type:types.DECREMENT1,payload:3}
};
function asyncIncrement1(){
    return function(getState,dispatch){
        setTimeout(()=>{
            dispatch({type:types.INCREMENT1,payload:3})
        },2000)
    }
}
function promiseIncrement1(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
          resolve({type:types.INCREMENT1,payload:11});
        },2000)
    })
}
function increment2(){
    return {type:types.INCREMENT2,payload:2}
};
function decrement2(){
    return {type:types.DECREMENT2,payload:2}
};
 
let actions = {
    increment1,
    decrement1,
    asyncIncrement1,
    promiseIncrement1,
    increment2,
    decrement2
};
export default actions;
