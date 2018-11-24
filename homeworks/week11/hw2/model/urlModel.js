const Sequelize = require('sequelize');
const db = require('./db');
const URLs = db.define('URLs',{
    long_URL: { 
        type: Sequelize.STRING
    },
    short_URL: {
        type: Sequelize.STRING(64)
    },
    createdAt: {
        allowNull: false,
        type: Sequelize.DATE
    },
    updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
    }

}, {
    tableName: 'URLs'
});


URLs.sync();
module.exports = {
    URLs: URLs
}

