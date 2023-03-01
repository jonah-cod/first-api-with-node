const sql = require('mssql');
const bcrypt = require('bcrypt');


const { config } = require('../sqlconfig');
const { getUser } = require('../services/getUserService');


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

            // bcrypt synchronous 
            // generating salt in different functions

            // bcrypt.genSalt(8, (err, salt)=>{
            //       if(err){
            //             console.log(err)
            //       }else{
            //             bcrypt.hash(details.password, salt, async(err, hashed_pwd)=>{
            //                   if (err) {
            //                         console.log(err)
            //                   }else{
            //                         try{
            //                               console.log(hashed_pwd)
            //                               await sql.connect(config);
            //                               let results = await sql.query`INSERT INTO users VALUES(${details.name}, ${details.profession}, ${hashed_pwd})`
                                    
            //                               if(results.rowsAffected.length) res.json({success: true, message: 'user created successfully'})
                                          
            //                               } catch(error){
            //                                     console.log(error)
            //                               }
            //                   }
            //             })
                        
            //       }
            // })

            // auto-generating salt

            // bcrypt.hash(details.password, 8, async(err, hashed_pwd)=>{
            //       if (err) {
            //             console.log(err)
            //       }else{
            //             try{
            //                   console.log({...details, password: hashed_pwd})
            //                   await sql.connect(config);
            //                   let results = await sql.query`INSERT INTO users VALUES(${details.name}, ${details.profession}, ${hashed_pwd})`
                        
            //                   if(results.rowsAffected.length) res.json({success: true, message: 'user created successfully'})
                              
            //                   } catch(error){
            //                         console.log(error)
            //                   }
            //       }
            // })

            /// using bcrypt asynchonous
            let hashed_pwd = await bcrypt.hash(details.password, 8);
      
            try{
            await sql.connect(config);
            let results = await sql.query`INSERT INTO users VALUES(${details.name}, ${details.profession}, ${hashed_pwd})`
      
            if(results.rowsAffected.length) res.json({success: true, message: 'user created successfully'})
            
            } catch(error){
                  console.log(error)
            }
      },

      loginUser: async(req, res)=>{
            // implementation of login using bcrypt
            let credentials  = req.body;
            let user = await getUser(credentials.id)
            if(user){
                  let match =  await bcrypt.compare(credentials.password, user.password)
                  match? res.json({success: true, message: 'login successful'}): res.json({success: false, message: 'check your credentials'})
            }else{
                  res.status(404).json({message: "user doesn't exist"})
            }

      },

      getAUser: async (req, res)=>{
            const {id} = req.params
            
            try {
                  let user = await getUser(id)
                  if (user) {
                        res.json(user)
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