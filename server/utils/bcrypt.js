const bcryptjs=require("bcryptjs")

const encryptPass= (password)=>{
    const hash= bcryptjs.hashSync(password,10)
    return hash
}

const comparePass=(password,hash)=>{
    const equal=bcryptjs.compare(password,hash)
    return equal
}

module.exports={encryptPass,comparePass}