const {Service} = require('egg');
class newsService extends Service{
    async news(limit){
        
        // 请求别人的服务
        // let url = this.config.url.news;
        // let result = await this.ctx.curl(url,{
        //     method:'get',
        //     data:{limit},
        //     dataType:'json'
        // });
        // return result.data.data;

        // 自己请求数据库
        let result = await this.app.mysql.query('select * from news');
        return result;
    };
};
module.exports = newsService;