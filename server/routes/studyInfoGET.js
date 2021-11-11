const Study = require('../models/study');
const User = require('../models/user');
const Problem = require('../models/problem');
const axios = require("axios");
const cheerio = require("cheerio");
const { next } = require('cheerio/lib/api/traversing');

const studyInfo=async(req,res,next)=>{
    try{
        const userId=res.locals.userId;
        const user=await User.findOne({where:{id:userId},attributes:['id','bj_id','user_nick','user_color','user_penalty','StudyId']}); //내 정보
        const studyId=user.StudyId;   
        const users=await User.findAll({ where:{studyId:studyId},attributes:['id','bj_id','user_nick','user_color']}) //스터디 팀원들
        const study=await Study.findOne({where:{id:studyId},attributes:['study_title','study_master','study_solve','study_day','study_penalty']});
        let problems=[];
        users.map((usr)=>{ //팀원별로 기존의 문제들 저장
            const userId=usr.id;
            const bj_id=usr.bj_id;
            const prob=Problem.findAll({where:{userId:userId}});
            problems.push(prob);
            crawl(bj_id);
        })
        res.status(200).json({user, study, users, problems, message: "studyInfoGET success!"});
    }
    catch(error){
        console.error(error);
        next(error);
    }
}
const crawl=async(bj_id)=>{
    try{
        const html=await axios.get(`https://www.acmicpc.net/user/${bj_id}`);
        const $=cheerio.load(html.data);
        let success=[];
        let fail=[];
        $(".row .col-md-9 .panel-default").eq(1)
        .find("problem-list") //result-ac (성공 문제)
        .find("result-ac")
        .each((idx,el)=>{
            success.push($(this).text().trim())
        })
        $(".row .col-md-9 .panel-default").eq(2)
        .find("problem-list") //result-wa (실패 문제)
        .find("result-wa")
        .each((idx,el)=>{
            fail.push($(this).text().trim())
        })
        console.log(success);
    }
    catch(err){
        console.log(err);
        next(err);
    }
}
module.exports={studyInfo};