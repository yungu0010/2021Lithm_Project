const bcryptjs = require('bcryptjs');

const jwt = require('jsonwebtoken');
const User = require('../models/user');

const signup = (req, res, next) => { //회원가입
    // checks if email already exists
    User.findOne({ where : {
        user_email: req.body.email, 
    }})
    .then(dbUser => {
        if (dbUser) {//기존 user존재
            return res.status(409).json({message: "email already exists"});
        } else if (req.body.name && req.body.email && req.body.password && req.body.bjid ) {//생성
            // password hash
            bcryptjs.hash(req.body.password, 12, (err, passwordHash) => {
                if (err) {
                    return res.status(500).json({message: "couldn't hash the password"});    //비밀번호 암호화 불가
                } else if (passwordHash) {
                    return User.create(({           //유저 생성
                        user_nick: req.body.name,
                        user_pw: passwordHash,
                        user_email: req.body.email,
                        bj_id: req.body.bjid,       
                    }))
                    .then(() => {
                        res.status(200).json({message: "user created"});        
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(502).json({message: "error while creating the user"});
                    });
                };
            });
        } else if (!req.body.password) {
            return res.status(400).json({message: "password not provided"});
        } else if (!req.body.email) {
            return res.status(400).json({message: "email not provided"});
        } else if (!req.body.name) {
            return res.status(400).json({message: "name not provided"});
        };
    })
    .catch(err => {
        console.log('error', err);
    });
};

const login = (req, res, next) => {//토큰 생성해서 client에게 보냄
    // checks if email exists
    User.findOne({ where : { user_email: req.body.email}})
    .then(dbUser => {
        if (!dbUser) {
            return res.status(404).json({message: "user not found"});
        } else { //존재
            // password hash
            bcryptjs.compare(req.body.password, dbUser.user_pw, (err, compareRes) => {
                if (err) { // error while comparing
                    res.status(502).json({message: "We got a wrong password"}); 
                } else if (compareRes) { // password match(성공), 로그인하면 1시간 동안 유지
                    const token = jwt.sign({userId:dbUser.id}, 'secret', {expiresIn: '7d'});
                    //res.cookie('dbUser',token);
                    res.status(200).json({message: "user logged in", token});
                } else { // password doesn't match
                    res.status(401).json({message: "invalid credentials"});
                };
            });
        };
    })
    .catch(err => {
        console.log('error', err);
    });
};

const logout = (req, res, next) => {
    User.findOne({ where : { user_email: req.body.email}})
    .then 
}

const isAuth = (req, res, next) => {//client로부터 받은 토큰 검증
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        return res.status(401).json({ message: 'not authenticated' });
    };
    const token = authHeader.split(' ')[1];
    //const token=req.cookies.dbUser;
    let decodedToken; 
    try {
        decodedToken = jwt.verify(token, 'secret');     //토큰 확인
    } catch (err) {
        return res.status(500).json({ message: err.message || 'could not decode the token' });
    };
    if (!decodedToken) { //인증x
        res.status(401).json({ message: 'unauthorized' });
    } else { //로그인한 상태->message와 userId 넘겨줌
        res.locals.userId=decodedToken.userId;
        res.status(200).json({ message: 'authorized',decodedToken});
    };
};


module.exports = { signup, login, isAuth };