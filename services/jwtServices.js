const jwt = require('jsonwebtoken');
require('dotenv').config()


const secret = process.env.SECRET;

module.exports = {
      createToken: async(data)=>{
            
            try {
                 let token = await jwt.sign(data, secret, {expiresIn: '15s'});
                 return token
            } catch (error) {
                  console.log(error);
            }
      },

      verifyToken: async(token)=>{
            try {
                  let data = await jwt.verify(token, secret)
                  return data
            } catch (error) {
                  return (error.message)
            }
            
      }
}