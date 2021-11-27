const express = require('express');
const { sequelize } = require('./models/index.js');
const router = require('./routes/route');
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.urlencoded({ extended: true}));

app.use(express.json());
app.use(cookieParser());
app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(router);

sequelize.sync({force:false})
    .then(()=>{
        console.log('데이터베이스 연결 성공');
    })
    .catch((err)=>{
        console.error(err);
    });

app.listen(5000);