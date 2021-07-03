const express = require('express');
const noticeBoard = require("../schemas/noticeBoard");
const url = require('url');
const router = express.Router();

// 글 작성 api
router.post('/writing', async function(req, res,) {
    const { writer, title, contents, password } = req.body;
    const posting = await noticeBoard.create({ writer, title, contents, password }); //db의 noticeBoard에다가.
    res.redirect('/')
    console.log(posting)
});

//글 삭제 api
router.post('/delete', async function (req, res) {
    // const { _id, writer, title, contents, password } = req.body;
    const passwordcheck = req.body.password
    const postId = Object.keys(req.body)[4]

    const targetDelete= await noticeBoard.findOne({_id : postId})
    if (targetDelete.password == passwordcheck){
        await noticeBoard.findByIdAndDelete({_id: postId})
        res.redirect('/')
    } 
});

//글 수정 api
router.post('/editing', async function(req, res) {
    const { writer, title, contents, password } = req.body;
    const passwordcheck = req.body.password //비밀번호 체크
    const postId = Object.keys(req.body)[4] //해당하는 유니크 아이디값의 자료를 바꿀거니깐.

    const targetEditing= await noticeBoard.findOne({_id : postId})
    if (targetEditing.password == passwordcheck){
        await noticeBoard.updateOne({_id : postId}, { $set: {writer, title, contents, password}});
        res.redirect('/')
    } 
});

module.exports = router;