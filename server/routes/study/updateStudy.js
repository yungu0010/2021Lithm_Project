const User = require('../../models/user');
const Study = require('../../models/study');

const updateStudy = async(req, res, next) => { //규칙 수정
    try{
        const userId=res.locals.userId;
        const user=await User.findOne({where:{id:userId}});
        const {studyDay,studyPenalty,studySolve}=req.body;
        await Study.update({study_day:studyDay,study_solve:studySolve, study_penalty: studyPenalty},{where:{id:user.StudyId}});
        res.status(200).json({message:"Study Rules Updated"});
    }
    catch(err){
        console.error(err);
        next(err);
    }
}
module.exports={updateStudy}