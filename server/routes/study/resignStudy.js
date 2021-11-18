const Study = require('../../models/study');
const User = require('../../models/user');

const resignStudy=async(req,res,next)=>{
    try {
        const userId=res.locals.userId;
        const user=await User.findOne({where:{id:userId}}); //내 정보
        await User.update({user_color:null},{where:{id:userId}}) //color삭제
        const studyId=user.StudyId;   
        const study=await Study.findOne({where:{id:studyId}}); //스터디 정보
        if(!study) return res.status(400).json({message: "cannot find study"});
        else{
            await study.removeUser(userId);
            res.status(200).json({message: "user resigned from the study"});        
        }
    }catch(err){
        console.log(err);
        res.status(502).json({message: "error while resigning from the study"});
        next(err);
    }
};
module.exports={resignStudy};