const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const userModel = require('../model/users');
const messageModel = require('../model/messages');
const messageController = require('../controller/messageController');
const Op = Sequelize.Op;
const page_limit = 10;

/* not using
const setPage = () => {
    messageModel.Message.count(
        {   
            where: {
                parent: 0,
                delete_status: 0
            },
            include :[
                {association: messageModel.Message.belongsTo(userModel.User, {foreignKey: 'users_id'})
            }]
        }
    ).then(count => {
        console.log(count,'setpage test');
        //這邊為何已經在 then 中寫 return，還會在 sql 執行前就回傳，導致抓不到值
        if(count)return count; 
    }).catch(err => {
        console.log(err);
    })
}
*/

module.exports = {
    
    index: (req, res) => {

        let page_start = (req.query.page)?(req.query.page-1)*10:0;
        const userId = req.session.userId;
        const nickname = req.session.nickname;
        let parent_arr = [], child_arr = [],parentId_arr = [],page;
        // console.log('page now ',page_start);
        console.log('page now ',req.query.page);
        //set page (傳值問題，先寫在裡面，之後想要拆出去成一個 function)
        messageModel.Message.count(
            {   
                where: {
                    parent: 0,
                    delete_status: 0
                },
                include :[
                    {association: messageModel.Message.belongsTo(userModel.User, {foreignKey: 'users_id'})
                }]
            }
        ).then(count => {
            page = Math.ceil(count/10);
            console.log(page,'page123');
            if(count)return count; 
        }).catch(err => {
            console.log(err); 
        })


        // get parent message
        messageModel.Message.findAll(
            { 
                where: {
                    parent: 0,
                    delete_status: 0
                },
                limit: page_limit,
                offset: page_start,
                include :[
                    // {association: messageModel.Message.hasOne(userModel.User, {foreignKey:'id'}) 
                    
                    {association: messageModel.Message.belongsTo(userModel.User, {foreignKey: 'users_id'})
                }],
                'order': [
                    ['date', 'DESC']
                ]
            })
            .then(Message => {
                // console.log(Message[0].dataValues,'wwwasssw');
                // console.log(Message[1].dataValues,'sdfs');
                // console.log(Message[0].dataValues.user.nickname ,' name'); //left join 終於成功
                for(let i=0;i<Message.length;i++){
                    parent_arr[i] = Message[i].dataValues;
                    parent_arr[i].user = Message[i].user.nickname;
                    parentId_arr[i] = Message[i].dataValues.id;
                }

                //get child message
                messageModel.Message.findAll(
                    { 
                        where: {
                            parent: {
                                [Op.in]: parentId_arr
                                },
                            delete_status: 0
                        },
                        include :[
                            {association: messageModel.Message.belongsTo(userModel.User, {foreignKey: 'users_id'})
                        }],
                        order: [
                            ['date', 'DESC']
                        ]
                    })
                    .then(Message => {
                        for(let i=0;i<Message.length;i++){
                            child_arr[i] = Message[i].dataValues;
                            child_arr[i].user = Message[i].user.nickname;

                        }
                        res.render('index',{
                            userId,
                            nickname,
                            parent_arr,
                            child_arr,
                            page,
                            pageNow: (req.query.page)?req.query.page:1,
                            title: '留言版'
                        })
                    })
                    .catch(err => {
                        console.error('message query failed: ',err);
                    })

            })
            .catch(err => {
                console.error('message query failed: ',err);
            });
    

       
        // res.render('index',{
        //     userId,
        //     nickname,
        //     parent_arr,
        //     child_arr,
        //     title: '留言版'
        // })
    },
    login: (req, res) => { 
        res.render('login',{
            title: '登入',
            error: ''
        })
    },
    logout: (req, res) => {
        req.session.destroy();
        res.redirect('/');
    },
    register: (req, res) => {
        res.render('register',{
            title: '註冊'
        })
    }
}