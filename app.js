const path = require('path');

const express = require('express');

const raizDir = require('./utils/path');

const bodyParser = require('body-parser')

// cookieParser
const cookieParser= require('cookie-parser')
// from class

//from project
const usuarioRouter = require('./routes/usuario')
const ecommerceRouter = require('./routes/ecommerce')


const adminRouter = require('./routes/admin');


const app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(raizDir, 'public')));


// cookie parser
app.use(cookieParser())

app.use('/admin', adminRouter);

app.use('/usuario',usuarioRouter)
app.use(ecommerceRouter);



app.use((req, res, next) => {
    res.status(404).sendFile(path.join(raizDir, 'views', '404.ejs'));
})
const port=3000;
app.listen(port,(e)=>{console.log(`...running port ${port}`)});