const Study = require('../../models/study');
const User = require('../../models/user');
const axios = require("axios");
const cheerio = require("cheerio");
const { next } = require('cheerio/lib/api/traversing');

const getStudy=async(req,res,next)=>{
    try{
        const userId=res.locals.userId;
        const user=await User.findOne({where:{id:userId},attributes:['id','bj_id','user_nick','user_color','user_penalty','StudyId']}); //내 정보
        const studyId=user.StudyId;   
        const users=await User.findAll({ where:{studyId:studyId},attributes:['id','bj_id','user_nick','user_color'], raw: true}) //스터디 팀원들
        const study=await Study.findOne({where:{id:studyId},attributes:['study_title','study_master','study_solve','study_day','study_penalty','createdAt']}); //스터디 정보
        const members=await User.findAll({ where:{studyId:studyId},attributes:['user_nick'], raw: true}) //스터디 팀원들
        let result=[];
        await users.map((usr,index)=>{ //팀원별로 문제들 저장
            const bj_id=usr.bj_id;
            const problems=crawl(bj_id,study.createdAt).then((problems)=>{ //스터디 가입한 후 푼 문제번호 가져옴
                let userProblems=Object.assign(usr,problems);
                result.push(userProblems)
                return index
            }).then((index)=>{
                if (index==users.length-1){
                    return res.status(200).json({user, study, result, members, message: "studyInfoGET success!"}); 
                }})
        })
    }
    catch(error){
        console.error(error);
        next(error);
    }
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
                    success.push([item.attribs.href.substr(9),time[index]])
                }
                else{ //실패
                    if(!success.includes(item.attribs.href.substr(9))){ //success에 문제가 없을 경우에만
                        fail.push([item.attribs.href.substr(9),time[index]])
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

module.exports={getStudy};