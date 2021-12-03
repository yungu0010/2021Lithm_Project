const Study = require('../../models/study');
const User=require('../../models/user');

const makeStudy=async(req,res,next)=>{
    try {
        const {title,solve,day,penalty}=req.body;
        if(!title) return res.status(400).json({message:"null title value"});
        const titleUnique=await Study.findOne({where:{study_title:title}});
        if(titleUnique) return res.status(409).json({message: "title already exists"});
        else{
            const color="#"+Math.round(Math.random()*0xffffff).toString(16);
            const userId=res.locals.userId;
            const newStudy = await Study.create({
                study_master: userId,
                study_title: title,
                study_solve: solve,
                study_day: day,
                study_penalty: penalty
            });
            await newStudy.addUser(userId);
            await User.update({user_color:color},{where:{id:res.locals.userId}})
            res.status(200).json({message: "study created"});        
        }
    }catch(err){
        console.log(err);
        res.status(502).json({message: "error while creating the study"});
        next(err);
    }
};
module.exports={makeStudy};
