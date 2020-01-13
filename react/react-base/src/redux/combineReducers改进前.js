function createStore(reducer){
    let state;
    let listeners = [];
    function getState(){
        return state;
    };
    function dispatch(action){
        state = reducer(state,action);
        listeners.forEach((ls)=>{
            ls();
        })
    };
    function subscribe(listener){
        listeners.push(listener);
        return function(){
            listeners = listeners.filter(item=>item!==listener);
        }
    };
    dispatch({type:'@@REDUX/INIT'});
    return {
        getState,
        dispatch,
        subscribe
    }

};

function bindActionCreator(actionCreate,dispatch){
    return function(){
       return dispatch(actionCreate());
    } 
 };
 function bindActionCreators(actionCreators,dispatch){
    if(typeof actionCreators === 'function'){
       return bindActionCreator(actionCreators,dispatch)
    }
    const boundActionCreators = {};
    for(let key in actionCreators){
       const actionCreator = actionCreators[key];
       if(typeof actionCreator === 'function'){
          boundActionCreators[key] = bindActionCreator(actionCreator,dispatch);
       }
    }
    return boundActionCreators;
 };

function combineReducers(reducers){
    return function(state={},action){
         let nextState = {};
         for(let key in reducers){
            nextState[key] = reducers[key](state[key],action)
         };
         return nextState;
    }
};
export {
    createStore,
    bindActionCreators,
    combineReducers
}