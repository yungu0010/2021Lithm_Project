const Study = require('../../models/study');

const makeStudy=async(req,res,next)=>{
    try {
        const {title,solve,day,penalty}=req.body;
        const titleUnique=await Study.findOne({where:{study_title:title}});
        if(titleUnique) return res.status(409).json({message: "title already exists"});
        else{
            const userId=res.locals.userId;
            const newStudy = await Study.create({
                study_master: userId,
                study_title: title,
                study_solve: solve,
                study_day: day,
                study_penalty: penalty
            });
            await newStudy.addUser(userId);
            res.status(200).json({message: "user created"});        
        }
    }catch(err){
        console.log(err);
        res.status(502).json({message: "error while creating the study"});
        next(err);
    }
};
module.exports={makeStudy};