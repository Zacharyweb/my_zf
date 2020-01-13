function createStore(reducer){
    let state;
    let listeners = [];
    function getState(){
        return state;
    };
    function dispatch(action){
       state = reducer(state,action);
       this.listeners.forEach(ls=>ls());
    };
    dispatch({type:'@@REDUX/INIT'});
    function subscribe(listener){
        listeners.push(listener);
        return function(){
            listeners = listeners.filter(item => item!=listener);
        }
    };
    return {
        getState,
        dispatch,
        subscribe
    }

};

let initState = {};
function reducer(state=initState,action){
    switch(action.type){
        case 'AA':
            return {};
        default:
            return state;
    }

};

createStore(reducer);