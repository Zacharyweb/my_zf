// exports.keys = 'zfpx';

module.exports = (app)=>{
    let config = {};
    config.keys = 'zfpx';

    config.view = {
        defaultExtension:'.html',
        defaultViewEngine:'nunjucks',
        mapping:{
            '.html':'nunjucks'
        }
    };

    config.url ={
        news:'http://localhost:3030/news'
    };
    
    config.cache = {
        title:'http://localhost:3030/title'
    }

    config.mysql ={
        client:{
            host:'localhost',
            port:'3306',
            user:'root',
            password:'123',
            database:'cms'
        },
        app:true, // 是否加载到 app 上，默认开启
        agent: false,
    }

    return config;
}