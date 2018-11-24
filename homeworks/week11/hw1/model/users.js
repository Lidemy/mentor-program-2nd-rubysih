const Sequelize = require('sequelize');
const db = require('./db');
const messageModel = require('./messages');
const User = db.define('user',{
    username: {
        type: Sequelize.STRING(16)
    },
    password: {
        type: Sequelize.TEXT
    },
    nickname: {
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
    tableName: 'rubysih_users'
});

// User.hasMany(messageModel.Message);

User.sync();
module.exports = {
    User: User
}
// module.exports = () => {
//     const User = db.define('user',{
//         username: {
//             type: Sequelize.STRING(16)
//         },
//         password: {
//             type: Sequelize.TEXT
//         },
//         nickname: {
//             type: Sequelize.STRING(64)
//         },
//         createdAt: {
//             allowNull: false,
//             type: Sequelize.DATE
//         },
//         updatedAt: {
//             allowNull: false,
//             type: Sequelize.DATE
//         }
    
//     }, {
//         tableName: 'rubysih_users'
//     });
//     User.hasMany(messageModel.Message);

//     User.sync();    
//     return User   ;
    
// }
