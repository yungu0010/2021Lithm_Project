const express = require('express');

const auth = require('./auth');
const {makeStudy}=require('./study/makestudy');
const {getStudy}=require('./study/getStudy');
const {getProfile,postProfile}=require('./profile');
const {getPenalty}=require('./penalty');
const {login,signup,isAuth,isAuthCookie,logout }= auth;
const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.get('/private', isAuth);
router.get('/logout', isAuthCookie,logout);
router.post('/makestudy',isAuthCookie,makeStudy); //로그인 후 스터디 개설
router.get('/study/info',isAuthCookie,getStudy); //스터디 목표, 팀원들 color
router.get('/profile',isAuthCookie,getProfile);
router.get('/penalty',isAuthCookie,getPenalty);

router.post('/profile',isAuthCookie,postProfile);


router.use('/', (req, res, next) => {
    console.log(req.url);
    res.status(404).json({error : "page not found"});
})

module.exports=router;