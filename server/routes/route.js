const express = require('express');

const auth = require('./auth');
const {makeStudy}=require('./initial');
const {studyInfo}=require('./studyInfoGET');
const {login,signup,isAuth,isAuthCookie,logout }= auth;

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.get('/private', isAuth);
router.get('/logout', isAuthCookie,logout);
router.post('/makestudy',isAuthCookie,makeStudy); //로그인 후 스터디 개설
// router.post('/calendar');
// will match any other path
router.get('/study/info',isAuthCookie,studyInfo); //스터디 목표, 팀원들 color
router.use('/', (req, res, next) => {
    res.status(404).json({error : "page not found"});
});

module.exports=router;