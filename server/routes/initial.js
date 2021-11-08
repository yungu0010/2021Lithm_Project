const Study = require('../models/study');

const makeStudy=async(req,res,next)=>{
    try {
        const titleUnique=await Study.findOne({where:{study_title:title}});
        if(titleUnique) return res.status(409).json({message: "title already exists"});
        else{
            const {title,solve,day,penalty}=req.body;
            const newStudy = await Study.create({
                study_master: req.user.id,
                study_title: title,
                study_solve: solve,
                study_day: day,
                study_penalty: penalty
            });
            await newStudy.addUser(req.user.id);
        }
    }catch(err){
        console.log(err);
        next(err);
    }
};
module.exports={makeStudy};