const express = require('express');
const app = express();
const port = 3000;

const connect = require('./schemas')
connect();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('public'));


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/main', (req, res) =>{
    res.render('main');
})

app.get('/detail', (req, res) =>{ //주소창에서의 detial
    res.render('detail') //views에 들어있는 파일명 detail
})

app.get('/editing', (req, res) =>{
    res.render('editing')
})

app.get('/writing', (req, res) =>{
    res.render('writing')
})

const noticeBoardRouter = require('./routers/noticeBoard');
app.use('/api',[noticeBoardRouter]);


const mongoose = require('mongoose');


//몽고DB 접속 확인용 get method
app.get('/mongodb', async (req, res) => {
    await mongoose.connect('mongodb://localhost/noticeBoard', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true
    });

    const { Schema } = mongoose
    const noticeBoardSchema = new Schema({
        usersId:{
            type: Number,
            required: true,     //필수로 들어가는 정보인가
            unique: true,   //유니크 값이 있어야하는가(겹치면 안되는가?)
        },
        writer:{
            type: String,
            required: true
        },
        title:{
            type: String,
            required: true,
        },
        contents:{
            type: String,
            required: true
        },
        password:{
            type: String,
            required: true
        },
        writeDate:{
            type: Date,
            default: Date.now
        }

    });

    let writing = mongoose.model("writing", noticeBoardSchema)
    
    await writing.create({
        usersId: 101,
        writer: "테스트 작성자",
        title: "테스트 제목",
        contents: "배고픈 하루였다",
        password: "1414"
    })

		res.send('ok');
})

//포트 접속 확인
app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
  })