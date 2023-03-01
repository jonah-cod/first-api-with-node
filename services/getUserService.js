const sql = require('mssql');
const { config } = require('../sqlconfig')

module.exports = {
      getUser: async(id)=>{
            await sql.connect(config);
            let user = await sql.query`SELECT * FROM users WHERE id = ${id}`
            user = user.recordset
            if (user.length) {
                  return user[0]
            }else{
                  return undefined
            }
            
      }
}