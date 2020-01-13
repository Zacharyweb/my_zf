function persistReducer(persistConfig,reducers){
    let initalized = false;
    let {storage,key} = persistConfig;
    return function(state,action){
        switch(action.type){
            case 'PERSIST_INIT':
                initalized = true;
                let value = storage.getValue(key);
                if(value){
                    state = {...state,...JSON.parse(value)};
                };
                return state;
            default:
                if(initalized){
                   state = reducers(state,action);
                   storage.setValue(key,JSON.stringify(state));
                   return state;
                }else{
                    return reducers(state,action);
                }
        }

    }

};
function persistStore(store){
    let persistor = {
        ...store,
        initState(){
            persistor.dispatch({type:'PERSIST_INIT'}); 
        }
    }
    return persistor;
};
export {
    persistReducer,
    persistStore
}