const express = require('express');
const noticeBoard = require("../schemas/noticeBoard");

const router = express.Router();


router.get('/main', function(req, res, next) {
    res.send('Main api')
});


router.get('/writing', function(req, res, next) {
    res.send('글 쓰기 api')
});


router.get('/detail', function(req, res, next) {
    res.send('상세 조회 api')
});


router.get('/editing', function(req, res, next) {
    res.send('글 수정 api')
});


module.exports = router;