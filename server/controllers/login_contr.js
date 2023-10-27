import { SignUpTab } from '../models/newUserSchema.js';

const login = async(req, res)=>{
    try {
        const password = req.body.password;
        const email = req.body.email;
        const userAcnt = await SignUpTab.findOne({email : email})
        if (userAcnt) {
            if(userAcnt.password === password){
                res.status(200).json("Access Granted");
            }else{
                console.log("Access Denied");
                res.status(201).json("Access Denied")
            }
            }else{
                res.status(402).json("No Account Found");
        }
    } catch (error) {
        res.status(402).json(`Backend: Error While Login, ${error.message}`);
    }
}

export { login }