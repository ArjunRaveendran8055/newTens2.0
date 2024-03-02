const bcrypt = require("bcryptjs");

const encryptPassword=(password)=>{
    const hash=bcrypt.hashSync(password,10)
    return hash;
}

const comparePassword=(password,hash)=>{
    const same= bcrypt.compareSync(password,hash)
    return same;
}

module.exports={
    encryptPassword,
    comparePassword
}
