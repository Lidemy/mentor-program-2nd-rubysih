const Sequelize = require('sequelize');
const settings = require('../settings');
const sequelize = new Sequelize('comments', 'root', settings.password, {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize
    .authenticate()
    .then(() => {
        console.log('connect successed');
    })
    .catch(err => {
        console.error('connect failed',err);
    });

module.exports = sequelize;


    