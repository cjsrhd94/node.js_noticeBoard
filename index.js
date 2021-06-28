const express = require('express');
const app = express();
const port = 3000;

const connect = require('./schemas')
connect();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('public'));

const noticeBoardRouter = require('./routers/noticeBoard');
app.use('/api',[noticeBoardRouter]);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) =>{
    res.render('main');
})

app.get('/detail', (req, res) =>{
    let id = req.query.usersId
    res.render('detail', {id}) 
})

app.get('/editing', (req, res) =>{
    res.render('editing')
})

app.get('/writing', (req, res) =>{
    res.render('writing')
})


const mongoose = require('mongoose');

//포트 접속 확인
app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
  })