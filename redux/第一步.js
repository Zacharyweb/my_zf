let appState = {
    title:{text:'我是标题',color:'red'},
    content:{text:'我是内容',color:'blue'}
};
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

