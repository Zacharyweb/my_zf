module.exports = (app)=>{
    let config = {};
    config.sequelize = {
        dialect:'mysql',
        host:'localhost',
        port:3306,
        username:'root',
        password:'123',
        database:'cms-test'
    };
    return config;
}