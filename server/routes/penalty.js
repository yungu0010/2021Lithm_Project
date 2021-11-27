const Study = require('../models/study');
const User = require('../models/user');
const axios = require("axios");
const cheerio = require("cheerio");
const { next } = require('cheerio/lib/api/traversing');
const getPenalty=async(req,res,next)=>{
    try{        
        const userId=res.locals.userId;
        const user=await User.findOne({where:{id:userId}})
        const studyId=user.StudyId;
        const study=await Study.findOne({where:{id:studyId}})

    }catch(err){console.error(err);next(err);}
}
module.exports={getPenalty}