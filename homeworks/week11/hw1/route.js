const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'));
// app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));
app.use(session({
    secret: 'keyboard cat',
    cookie: { maxAge: 60000 },
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
app.set('view engine', 'ejs');

//controller 
const userController = require('./controller/userController');
const renderController = require('./controller/renderController');
const messageController = require('./controller/messageController');

//render
app.get('/', renderController.index);
app.get('/login', renderController.login);
app.get('/logout', renderController.logout);
app.get('/register', renderController.register);
//login
app.post('/login', userController.handleLogin);
//register
app.post('/register', userController.handleRegister);
//delete message
app.delete('/message', messageController.deleteMessage);
//update message
app.put('/message', messageController.updateMessage); 
//create message
app.post('/message', messageController.createMessage); 


app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});
