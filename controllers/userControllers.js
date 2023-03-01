const sql = require('mssql');
const { config } = require('../sqlconfig')


module.exports = {
      getAllTheUsers : async(req, res)=>{
            try {
                  await sql.connect(config)
                  let users = await sql.query`SELECT * FROM users`;
                  
                  res.json(users.recordset)
            } catch (error) {
                  console.log(error)
            }   
      },

      createUser: async(req, res)=>{
            //reading the request body
            const details = req.body;
      
            try{
            await sql.connect(config);
            let results = await sql.query`INSERT INTO users VALUES(${details.name}, ${details.profession}, ${details.password})`
      
            if(results.rowsAffected.length) res.json({success: true, message: 'user created successfully'})
            
            } catch(error){
                  console.log(error)
            }
      },

      getAUser: async (req, res)=>{
            const {id} = req.params
            
            try {
                  await sql.connect(config);
                  let results = await sql.query`SELECT * FROM users WHERE id = ${id}`
                  if (results.recordset.length) {
                        res.json(results.recordset[0])
                  }else{
                        res.status(404).json({message: 'user not found'})
                  }
                  
            } catch (error) {
                  
            }
      },

      updateUser: async(req, res)=>{
            const user_details = req.body
            try {
                  await sql.connect(config);
                  let results = await sql.query`UPDATE users  
                                                      SET full_names =${user_details.name},
                                                      profession = ${user_details.profession}
                  WHERE id=${user_details.id}`
                  if(results.rowsAffected.length) res.json({success: true, message: 'user updated successfully'})
            } catch (error) {
                  console.log(error)
            }
      },

      deleteUser: async(req, res)=>{
            const {id} = req.params;
            
            try {
                  await sql.connect(config)
                  let results = await sql.query`DELETE FROM users WHERE id = ${id}`
                  if(results.rowsAffected.length) res.json({success: true, message: 'user deleted successfully'})
            } catch (error) {
                  console.log(error)
            }
      }
}