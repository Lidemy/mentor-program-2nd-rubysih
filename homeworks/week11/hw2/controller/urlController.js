const urlModel = require('../model/urlModel');
const crypto = require('crypto');

module.exports = {
    handleShortURL: (req, res) => {
        const shortURL = crypto.randomBytes(32).toString('hex').substr(0, 8);
        urlModel.URLs.findOrCreate({where: {long_URL: req.body.longURL}, defaults: {short_URL: shortURL}})
        .spread((url, created) => {
            const lastObj = url.get({  // 剛 insert 的資料
                plain: true
            });
            console.log(lastObj);
            lastObj.msg = 'success';
            lastObj.host = 'http://localhost:3310/rd/';
            res.send(lastObj);
        })
    },
   
   
    gotoURL: (req, res) => {
        urlModel.URLs.find(
            {   
                where: {
                    short_URL: req.params.shortURL
                }
            })
            .then(URLs => {
               console.log(URLs);
               res.redirect(URLs.long_URL);
            }).catch(err => {
                console.log(err);
            })
    }

    
}