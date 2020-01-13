const UPDATE_TITLE_TEXT = 'UPDATE_TITLE_TEXT';
const UPDATE_TITLE_COLOR = 'UPDATE_TITLE_COLOR';
const UPDATE_CONTENT_TEXT = 'UPDATE_CONTENT_TEXT';
const UPDATE_CONTENT_COLOR = 'UPDATE_CONTENT_COLOR';

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
        listeners.push(listener)
        return function(){
            listeners = listeners.filter(item=>item != listener);
        }
    };
    // 创建时自动调用一次 reducer 给state赋上默认值
    dispatch({type:'@@REDUX/INIT'});
    return {
        getState,
        dispatch,
        subscribe
    }
};

let initState =　{
    title:{text:'我是标题',color:'red'},
    content:{text:'我是内容',color:'blue'}
};

function reducer(state=initState,action){
    switch(action.type){
        case UPDATE_TITLE_TEXT:
            return {...state,title:{...state.title,text:action.payload}};
        case UPDATE_TITLE_COLOR:
            return {...state,title:{...state.title,color:action.payload}};
        case UPDATE_CONTENT_TEXT:
            return {...state,content:{...state.content,text:action.payload}};
        case UPDATE_CONTENT_COLOR:
            return {...state,content:{...state.content,color:action.payload}};
        default:
            return state;
    }
};

let store = createStore(reducer);

function renderTitle(state){
    let el = document.getElementById('title');
    el.style.color = state.color;
    el.innerHTML = state.text;
};

function renderContent(state){
    let el = document.getElementById('content');
    el.style.color = state.color;
    el.innerHTML = state.text;
};

function renderApp(){
    renderTitle(store.getState().title);
    renderContent(store.getState().content);
};

renderApp();
let unsubscribe = store.subscribe(renderApp);

setTimeout(()=>{
    store.dispatch({type:UPDATE_TITLE_TEXT,payload:'新标题'});
    unsubscribe();
    store.dispatch({type:UPDATE_CONTENT_COLOR,payload:'green'});
},3000)

