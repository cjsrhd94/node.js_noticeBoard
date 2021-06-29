const express = require('express');
const app = express();
const port = 3000;

const connect = require('./schemas')
connect();

const mongoose = require('mongoose');
const noticeBoard = require('./schemas/noticeBoard');

app.use(express.urlencoded({extended: true}));
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
    const detailPage = await noticeBoard.find({_id : Object.keys(req.query)[0]})
    res.render('detail', {detailPage})
    // console.log(detailPage)
    // console.log(Object.keys(req.query)[0])
})

app.get('/editing', async(req, res) =>{
    const editingPage = await noticeBoard.find({_id : Object.keys(req.query)[0]})
    res.render('editing', {editingPage})
    // const editingPage = await noticeBoard.findOne({_id:req.params.id})
    // res.render('editing', {editingPage})
    // console.log(editingPage)
})

app.get('/writing', (req, res) =>{
    res.render('writing')
})

//포트 접속 확인
app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
  })