const {Controller} = require('egg');
class UsersController extends Controller{
    async index(){
        const {ctx} = this;
        ctx.body = await ctx.model.User.findAll();
    }
}
module.exports = UsersController;