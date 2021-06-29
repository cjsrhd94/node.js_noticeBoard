const express = require('express');
const noticeBoard = require("../schemas/noticeBoard");
const url = require('url');
const router = express.Router();

// router.get('/main', function(req, res, next) {
//     res.send('전체 조회 api')
// });

// router.get('/detail', function(req, res, next) {
//     res.send('상세 페이지 조회 api')
// });

router.post('/writing', async function(req, res,) {
    const { writer, title, contents, password } = req.body;
    // const noticeBoard = require("../schemas/noticeBoard");
    const posting = await noticeBoard.create({ writer, title, contents, password }); //db의 noticeBoard에다가.
    res.redirect('/')
    console.log(posting)
});

//글 삭제 api
router.post('/editing/:id', async function (req, res) {
    
    const { id } = req.params;
    const { password } = req.body;

    const isExist = await noticeBoard.find({ _id:id });
    if(isExist[0]['password']==password){
        await noticeBoard.deleteOne({ _id })
        res.send({ result: "success" })
    } else {
        res.send({ result : "failed" })
    }  
    res.redirect('/')
});

//글 수정 api
router.post('/editing/:id', async function(req, res) {

    const { id } = req.params;
    const { writer, title, contents, password } = req.body;

    const isExist = await noticeBoard.find({ _id:id });
    if(isExist[0]['password']==password){
        await noticeBoard.updateOne({ _id }, {$set: { writer, title, contents, writeDate}});
        res.send()
    }
    res.redirect('/')
});


module.exports = router;