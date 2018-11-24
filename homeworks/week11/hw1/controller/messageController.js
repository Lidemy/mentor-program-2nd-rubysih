const Sequelize = require('sequelize');
const messageModel = require('../model/messages');
const userModel = require('../model/users');

module.exports = {
    updateMessage: (req, res) => {
        
        const userId = req.session.userId;//get userid from session
        messageModel.Message.update(
            {content: req.body.content},
            { where: 
                { 
                    id: req.body.id,  
                    users_id: userId
                } 
            }
        ).then(result => {
            console.log(result);
            res.send('success');
            
        }).catch(err =>{console.log(result);})
    },
    deleteMessage: (req, res) => {
        const userId = req.session.userId;//get userid from session
        messageModel.Message.update(
            {delete_status: 1},
            { where: 
                { 
                    id: req.body.id, 
                    users_id: userId
                } 
            }
        ).then(result => {
            console.log('result');
            //todo 
            //res.send(share.shareResp('success', data));
            // res.send({});
            res.send('success');
        }).catch(err =>{console.log(err);})
    },
    createMessage: (req, res) => {
        let parent;
        req.body.parent?parent=req.body.parent:parent=0; //set parent
        const userId = req.session.userId; //get userid from session
        //insert into db
        messageModel.Message.create({
            users_id: userId, 
            content: req.body.content, 
            parent: parent
        })
        .then(() => messageModel.Message.findOrCreate({
            where: {
                users_id: userId, 
                content: req.body.content, 
                parent: parent
            }
        }))
        .spread((message, created) => {
            const lastObj = message.get({  // 剛 insert 的資料
                plain: true
            });
            lastObj.msg = '留言成功';
            lastObj.nickname = req.session.nickname;
            if(lastObj.parent !== 0){
                messageModel.Message.find({ 
                    where: {
                        id: parent
                    } 
                }).then(Message => {
                    lastObj.same_user = (Message.dataValues.users_id === userId);
                    res.send(lastObj);
                })
            }else{
                res.send(lastObj);
            }
        }).catch(err =>{console.log(err);})
    },
    setPage: () => {
        messageModel.Message.count(
            {   
                where: {
                    parent: 0,
                    delete_status: 0
                },
                include :[
                    {association: messageModel.Message.belongsTo(userModel.User, {foreignKey: 'users_id'})
                }]
            })
            .then(count => {
                console.log(count,'setpage test');
                //這邊為何已經在 then 中寫 return，還會在 sql 執行前就回傳，導致抓不到值
                return count; 
            }).catch(err => {
                console.log(err);
            })
    }

    
}