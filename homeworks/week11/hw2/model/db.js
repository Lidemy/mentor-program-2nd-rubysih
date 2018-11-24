const Sequelize = require('sequelize');
const settings = require('../settings');
const sequelize = new Sequelize(settings.db, settings.username, settings.password, {
  host: settings.host,
  dialect: settings.dialect
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


    