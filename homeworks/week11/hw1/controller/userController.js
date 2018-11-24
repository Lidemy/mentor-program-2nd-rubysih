
const userModel = require('../model/users');
const bcrypt = require('bcrypt');

module.exports = {
    handleLogin: (req,res) => {
        userModel.User.find({ 
            where: {
                    username: req.body.username
            } 
        }).then(User => {
            console.log(User.dataValues,'wwww');
            //check password
            if(bcrypt.compareSync(req.body.password, User.dataValues.password)){
                console.log('login success');
                //login
                req.session.nickname = User.dataValues.nickname;
                req.session.userId = User.dataValues.id;
                console.log(req.session.nickname,User.dataValues.nickname,req.session.userId);

                res.redirect('/');
                // res.render('index',{
                //     userId,
                //     nickname,
                //     title: '留言版'
                // });
            }else{
                console.log('login failed: 密碼錯誤');
                res.render('login',{
                    error: '密碼錯誤',
                    title: '登入'
                });
            }
        })
        .catch(err => {
            console.error('login failed: ',err);
            res.render('login',{
                error: '登入失敗',
                title: '登入'
            });
        });
    },
    handleRegister: (req,res) => {
        userModel.User.create({
            username: req.body.username, 
            password: bcrypt.hashSync(req.body.password, 10), 
            nickname: req.body.nickname
        })
        .then(() => userModel.User.findOrCreate({where: {username: req.body.username}}))
        .spread((user, created) => {
            const lastObj = user.get({  // 剛 insert 的資料
                plain: true
            });
            req.session.nickname = lastObj.nickname;
            req.session.userId = lastObj.id;
            res.redirect('/');
        })
    }
}