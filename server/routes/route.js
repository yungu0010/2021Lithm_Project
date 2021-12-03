const express = require('express');

const auth = require('./auth');
const {makeStudy}=require('./study/makeStudy');
const {getStudy}=require('./study/getStudy');
const {resignStudy}=require('./study/resignStudy');
const {addMember}=require('./study/addMember');
const {updateStudy}=require('./study/updateStudy');
const {getProfile,postProfile}=require('./profile');
const {login,signup,isAuth,isAuthCookie,logout,hasStudy}= auth;
const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.get('/private', isAuth);
router.get('/logout', isAuthCookie,logout);

router.get('/hasstudy',isAuthCookie,hasStudy);
router.post('/makestudy',isAuthCookie,makeStudy); //로그인 후 스터디 개설

router.get('/study/info',isAuthCookie,getStudy); //스터디 목표, 팀원들 color
router.get('/study/resign',isAuthCookie,resignStudy); //스터디 탈퇴

router.get('/profile',isAuthCookie,getProfile);
router.post('/profile',isAuthCookie,postProfile); //프로필 수정

router.post('/study/addmember',isAuthCookie,addMember); //스터디원 추가
router.post('/study/update',isAuthCookie,updateStudy); //스터디 규칙 수정

router.use('/', (req, res, next) => {
    console.log(req.url);
    res.status(404).json({error : "page not found"});
})

module.exports=router;