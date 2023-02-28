const express = require('express');
require('dotenv').config()
const sql = require('mssql');
const { config } = require('./sqlconfig')


const app = express();
app.use(express.json())

// CRUD = CREATE(POST), READ(GET), UPDATE(PUT/PATCH), DELETE(DELETE)
app.get('/', (req, res)=>{
      //handling requests
      res.send("Hello, Welcome!")
})

app.get('/users', async(req, res)=>{
      try {
            await sql.connect(config)
            let users = await sql.query`SELECT * FROM users`;
            
            res.json(users.recordset)
      } catch (error) {
            console.log(error)
      }   
})

app.post('/users', async(req, res)=>{
      //reading the request body
      const details = req.body;

      try{
      await sql.connect(config);
      let results = await sql.query`INSERT INTO users VALUES(${details.name}, ${details.profession}, ${details.password})`

      if(results.rowsAffected.length) res.json({success: true, message: 'user created successfully'})
      
      } catch(error){
            console.log(error)
      }
})

app.get('/users/:id', async (req, res)=>{
      const {id} = req.params
      
      try {
            await sql.connect(config);
            let results = await sql.query`SELECT * FROM users WHERE id = ${id}`
            res.json(results.recordset[0])
      } catch (error) {
            
      }
})

app.put('/users', async(req, res)=>{
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
})

app.delete('/users/:id',async(req, res)=>{
      const {id} = req.params;
      
      try {
            await sql.connect(config)
            let results = await sql.query`DELETE FROM users WHERE id = ${id}`
            if(results.rowsAffected.length) res.json({success: true, message: 'user deleted successfully'})
      } catch (error) {
            console.log(error)
      }
})

//starting the server and listening to requests
const port = process.env.PORT || 4080;
app.listen(port, ()=>{console.log(`Server listening on port: ${port}`)})