const { Controller } = require('egg');
class NewsController extends Controller {
    async index() {
        let limit = this.ctx.query.limit?this.ctx.query.limit:5;
        let list = await this.service.news.news(limit);
        if(!Array.isArray((list))){
            list = [list];
        };
        let title = this.app.cache ? this.app.cache.title :'客户端';
        await this.ctx.render('news',{list,title})
    }
}
module.exports = NewsController;