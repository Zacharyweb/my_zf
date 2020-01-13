// 解决状态在外部可以被随意更改的问题 引入管理员的概念
let appState = {
    title:{text:'我是标题',color:'red'},
    content:{text:'我是内容',color:'blue'}
};


const UPDATE_TITLE_TEXT = 'UPDATE_TITLE_TEXT';
const UPDATE_TITLE_COLOR = 'UPDATE_TITLE_COLOR';
const UPDATE_CONTENT_TEXT = 'UPDATE_CONTENT_TEXT';
const UPDATE_CONTENT_COLOR = 'UPDATE_CONTENT_COLOR';

function dispatch(action){
    switch(action.type){
        case UPDATE_TITLE_TEXT:
            appState.title.text = action.payload;
            break;
        case UPDATE_TITLE_COLOR:
            appState.title.color = action.payload;
            break;
        case UPDATE_CONTENT_TEXT:
            appState.content.text = action.payload;
            break;
        case UPDATE_CONTENT_COLOR:
            appState.content.color = action.payload;
            break;
        default:
            break;
    }
}


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

function renderApp(appState){
    renderTitle(appState.title);
    renderContent(appState.content);
};

renderApp(appState);

setTimeout(()=>{
    dispatch({type:UPDATE_TITLE_TEXT,payload:'新标题'});
    dispatch({type:UPDATE_CONTENT_COLOR,payload:'green'});
    renderApp(appState);
},3000)

