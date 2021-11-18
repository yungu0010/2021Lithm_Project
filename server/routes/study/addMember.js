const Study = require('../../models/study');
const User = require('../../models/user');

const addMember=async(req,res,next)=>{ //추가하면서 color부여
    try {
        const {email}=req.body;
        const userId=res.locals.userId;
        const me=await User.findOne({where:{id:userId}}); //스터디장
        const studyId=me.StudyId;  
        const study=await Study.findOne({where:{id:studyId}});
        const user=await User.findOne({where:{user_email:email}}); //추가할 유저
        if(!user) return res.status(400).json({message: "user not found"});
        else if (user.StudyId) return res.status(401).json({message:"already in a study"})
        else{
            const users=await User.findAll({where:{StudyId:studyId},attributes:['id','user_color'], raw: true})
            let color;
            while(true){
                color="#"+Math.round(Math.random()*0xffffff).toString(16);
                let samecolor=users.filter((user)=>(user['user_color']==color))
                if(samecolor.length==0){break} //같은 색상이 없을 때 break
            }
            await User.update({user_color:color},{where:{user_email:email}})
            await study.addUser(user.id);
            res.status(200).json({message: "member added to the study"});        
        }
    }catch(err){
        console.log(err);
        res.status(502).json({message: "error while adding member to the study"});
        next(err);
    }
};
module.exports={addMember};