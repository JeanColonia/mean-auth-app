const jwt = require('jsonwebtoken');



const  generateJWT = (uid, name)=>{

const payload = {uid, name}

return new Promise((resolve, reject)=>{

  jwt.sign(payload, process.env.SECRET_TOKEN_SEED, {
    expiresIn:'24h'

  }, (error, token)=>{

    if(error){
      reject(error);
    }
    else{
      resolve(token)
    }

  })
});


}


module.exports = {
  generateJWT
}