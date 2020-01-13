module.exports = app => {
    const {STRING,DATE,INTEGER} = app.Sequelize;
    const User = app.model.define('User',{
        id: {type:INTEGER,primaryKey:true,autoIncrement:true},
        name: STRING(30),
        age:INTEGER,
        created_at:DATE,
        updated_at:DATE
    });
    return User;
}