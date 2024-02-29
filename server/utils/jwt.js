const jwt=require("jsonwebtoken")

const jwtSign=(obj)=>{
    const token=jwt.sign(obj,process.env.JWT_SECRET,{expiresIn:"1hr"})
    return token;
}

const jwtVerifyToken=(token)=>{
    try {
        const user=jwt.verify(token,process.env.JWT_SECRET)
        return user
    } catch (error) {
        return false
    }
}

const activationJwt=(obj)=>{
    const token=jwt.sign(obj,process.env.ACTIVATION_SECRET,{expiresIn:"1hr"})
    return token
}

const actionvationVerify=(token)=>{
    try {
        const user=  jwt.verify(token,process.env.ACTIVATION_SECRET,{expiresIn:'1hr'})
        return user;
    } catch (error) {
        return false
    }
}

module.exports={
    jwtSign,jwtVerifyToken,activationJwt,actionvationVerify
}