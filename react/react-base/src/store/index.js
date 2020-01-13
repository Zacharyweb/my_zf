import {createStore,bindActionCreators,applyMiddleWare} from '../redux';
import reducers from './reducers';
import actions  from './actions';

import {persistReducer,persistStore} from '../react-persist';
import storage from '../react-persist/lib/storage'

// redux-logger中间件
function logger({getState,dispatch}){
    return function(next){
        return function(action){
            // console.log('%c prev state','font:bold;color:pink',getState());
            // console.log('%c action','font:bold;color:green',action);
            next(action);
            // console.log('%c next state','font:bold;color:blue',getState());
        }
    }
};

// redux-thunk 中间件
function reduxThunk({getState,dispatch}){
    return function(next){
        return function(action){
            if(typeof action === 'function'){
              return  action(getState,dispatch);
            }
            next(action);
        }
    }

};

// redux-promise中间件
function reduxPromise({getState,dispatch}){
    return function(next){
        return function(action){
           if(action.then && typeof action.then === 'function'){
               return action.then(dispatch);
           }
           next(action);
        }
    }
};

// 只能用单个中间件的老版写法
// function applyMiddleWare(middleWare){
//     return function(createStore){
//         return function(reducers){
//             let store = createStore(reducers);
//             let dispatch;
//             let storeObj = {
//                 getState:store.getState,
//                 dispatch:(...args)=>dispatch(...args)
//             };
//             dispatch = middleWare(storeObj)(store.dispatch);
//             return {
//                 ...store,
//                 dispatch
//             };
//         }
//     }
// };

const persistConfig = {
    key:'reactCache',
    storage
};
const persistedRecucer  = persistReducer(persistConfig,reducers);

let store = applyMiddleWare(reduxPromise,reduxThunk,logger)(createStore)(persistedRecucer);
const persistor = persistStore(store);

const boundActions = bindActionCreators(actions,store.dispatch);
export default store;
export {boundActions,persistor}