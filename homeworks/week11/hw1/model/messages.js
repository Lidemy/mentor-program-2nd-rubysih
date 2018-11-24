const Sequelize = require('sequelize');
const db = require('./db');
const userModel = require('./users');

const Message = db.define('message',{
    users_id: {
        type: Sequelize.INTEGER(11)
        // references: {
        //     model: userModel.User,
        //     key: 'id' 
        // }
    },
    content: {
        type: Sequelize.TEXT
    },
    date: {
        type: Sequelize.DATE //todo
    },
    parent: {
        type: Sequelize.INTEGER(11)
    },
    delete_status: {
        type: Sequelize.INTEGER(1)
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
    tableName: 'rubysih_messages'
});

Message.sync(); 

module.exports = {
    Message: Message
}
// module.exports = () => {
//     const Message = db.define('message',{
//         users_id: {
//             type: Sequelize.INTEGER(11)
//         },
//         content: {
//             type: Sequelize.TEXT
//         },
//         parent: {
//             type: Sequelize.INTEGER(11)
//         },
//         delete_status: {
//             type: Sequelize.INTEGER(1)
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
//         tableName: 'rubysih_messages'
//     });
//     Message.hasMany(userModel.User);
//     Message.sync(); 
//     return Message;
// }