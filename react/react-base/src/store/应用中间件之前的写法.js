import {createStore,bindActionCreators} from '../redux';
import reducers from './reducers';
import actions  from './actions';

let store = createStore(reducers);
const boundActions = bindActionCreators(actions,store.dispatch);

export default store;

export {boundActions}