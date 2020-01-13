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
         // 对比各项的state有没有发生变化，有就返回新的state，没有就返回老的state
         let nextState = {};
         let hasChanged = false;
         for(let key in reducers){
            let preState = state[key];
            let nowState = reducers[key](state[key],action);
            nextState[key] = nowState;
            hasChanged = hasChanged || preState != nowState;
         };
         return hasChanged?nextState:state;
    }
};



function compose(...fns){
    if(fns.length == 0){
        return args => args;
    }
    if(fns.length == 1){
        return fns[0];
    }
    return fns.reduce((pre,cur)=>{
        return (...args)=>{
           return pre(cur(...args));
        }
    })
};

function applyMiddleWare(...middleWares){
    return function(createStore){
        return function(reducers){
            let store = createStore(reducers);
            let dispatch;
            let storeObj = {
                getState:store.getState,
                dispatch:(...args)=>dispatch(...args)
            };
            middleWares = middleWares.map(middleWare => middleWare(storeObj));
            dispatch = compose(...middleWares)(store.dispatch);
    
            return {
                ...store,
                dispatch
            };
        }
    }
};
export {
    createStore,
    bindActionCreators,
    combineReducers,
    compose,
    applyMiddleWare
}