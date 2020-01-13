'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      let {INTEGER,STRING,DATE} =  Sequelize;
      return queryInterface.createTable('users', { 
        id: {type:Sequelize.INTEGER,primaryKey:true,autoIncrement:true},
        name: STRING(30),
        age:INTEGER,
        created_at:DATE,
        updated_at:DATE
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('users');
  }
};
