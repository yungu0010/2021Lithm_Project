const Study = require('../models/study');
const User = require('../models/user');
const axios = require("axios");
const cheerio = require("cheerio");
const { next } = require('cheerio/lib/api/traversing');

const getProfile = async(req, res, next) => { //프로필 조회
    try{
        const userId=res.locals.userId;
        const user=await User.findOne({where:{id:userId}});
        const StudyId=user.StudyId;
        const study=await Study.findOne({where:{id:StudyId}});
        const count=await User.count({where:{StudyId}});
        let result;
        crawl(user.bj_id,study.createdAt).then((problems)=>{
            result=Object.assign(user,problems);
        }).then(()=>{
            return res.status(200).json({user, study, count, result, message: "profileGET success!"}); 
        });
    }
    catch(err){console.log(err); next(error);}
}
const crawl=async(bj_id,createdAt)=>{ 
    try{
        const html=await axios.get(`https://www.acmicpc.net/status?user_id=${bj_id}`);
        const $=cheerio.load(html.data);
        let success=[];
        let fail=[];
        let idx,name;
        let SF=[]; //성공 여부
        let time=[]
        $('tbody>tr>td:nth-child(9)>a').each((index, item) => { //제출 시간
            if(new Date(item.attribs.title) > createdAt){ //createdAt 이후 푼 문제의 idx 저장
                idx=index;
                time.push(new Date(item.attribs.title)) //시간 저장
            }
          });
        $('tbody>tr>td:nth-child(4)>span').each((index, item) => { // 성공 여부
            if(index<=idx){ //createdAt 이후 푼 문제들의 성공 여부
                name = item.attribs.class;
                SF.push(name);
            }
        });
       $('tbody>tr>td:nth-child(3)>a').each((index, item) => { // 문제 번호
            if(index<=idx){ //createdAt 이후 푼 문제들만 저장
                if(SF[index].includes('result-ac')){ //성공
                    success.push(item.attribs.href.substr(9))
                }
                else{ //실패
                    if(!success.includes(item.attribs.href.substr(9))){ //success에 문제가 없을 경우에만
                        fail.push(item.attribs.href.substr(9))
                    }
                }
            }
          });
        return {success,fail}
    }
    catch(err){
        console.log(err);
        next(err);
    }
}
const postProfile = async(req, res, next) => { //프로필 조회
    try{
        const userId=res.locals.userId;
        const user=await User.findOne({where:{id:userId}});
        const newNick=req.body.nick;
        await User.update({user_nick:newNick},{where:{id:userId}});
        res.status(200).json({nick:newNick});
    }
    catch(err){
        console.error(err);
        next(err);
    }
}
module.exports={getProfile,postProfile}