const express = require('express');

const auth = require('./auth');
const initial=require('./initial');

const {login,signup,isAuth,isAuthCookie,logout }= auth;
const {makeStudy}=initial;
const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.get('/private', isAuth);
router.post('/logout', isAuthCookie,logout)
router.post('/makestudy',isAuthCookie,makeStudy); //로그인 후 스터디 개설
// will match any other path
router.use('/', (req, res, next) => {
    res.status(404).json({error : "page not found"});
});

module.exports=router;