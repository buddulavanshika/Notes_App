

import ratelimit from "../config/upstash.js";

const rateLimiter= async (req,res,next)=>{
    try{
        const {success} = await ratelimit.limit("my-limit-key"); //we have just used a staticstring key here, but this can be the 
        // ip address of the user or user id from the auth token in real world apps
        if(!success){
            return res.status(429).json({
            error: "Too many requests"
        })
        }
        next();
    }catch(error){
        console.log("Rate limit error",error)
        next(error);
    }
     
}

export default rateLimiter;