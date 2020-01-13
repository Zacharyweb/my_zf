'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
  
      return queryInterface.bulkInsert('users', [{
        name: '1',
        age: 1,
        created_at:new Date(),
        updated_at:new Date()
      },{
        name: '2',
        age: 10,
        created_at:new Date(),
        updated_at:new Date()
      },{
        name: '3',
        age: 20,
        created_at:new Date(),
        updated_at:new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
