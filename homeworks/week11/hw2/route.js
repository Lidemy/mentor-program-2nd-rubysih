const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3310;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'));

app.set('view engine', 'ejs');

//controller
const urlController = require('./controller/urlController');
const renderController = require('./controller/renderController');


//render
app.get('/', renderController.index);
//short URL
app.post('/', urlController.handleShortURL);
//goto URL
app.get('/rd/:shortURL', urlController.gotoURL);



app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});
