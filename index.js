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


app.get('/', async (req, res) =>{
    const mainList = await noticeBoard.find().sort({writeDate: 'descending'})
    res.render('main', {mainList})
    // console.log(mainList)
})

app.get('/detail', async (req, res) =>{
    const detailPage = await noticeBoard.find()
    res.render('detail', {detailPage})
    console.log(detailPage)
})

app.get('/editing/:id', async(req, res) =>{
    const editingPage = await noticeBoard.findOne({_id:req.params.id})
    res.render('editing', {editingPage})
    console.log(editingPage)
})

app.get('/writing', (req, res) =>{
    res.render('writing')
})

const mongoose = require('mongoose');
const noticeBoard = require('./schemas/noticeBoard');

//포트 접속 확인
app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
  })