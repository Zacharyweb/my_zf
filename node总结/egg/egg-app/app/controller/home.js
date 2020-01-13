const {Controller} = require('egg');

class HomeController extends Controller{
    async home(){
        // this.ctx.body = 'Hello Waston';
        let {ctx} = this;
        ctx.body = ctx.__('Email') + ctx.__('Welcome back,%s','zhujian') + ctx.__('Hello {0},I am {1}',['zj','pbb']);
 
    }
}

module.exports = HomeController;