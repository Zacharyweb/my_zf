const {Controller} = require('egg');

class HomeController extends Controller{
    async home(){
        // this.ctx.body = 'Hello Waston';
        await this.ctx.render('index');
    }
}

module.exports = HomeController;