const express = require('express');
const postsRouter = require('./routes/postsRouter');
require('dotenv').config()

const userRouter = require('./routes/userRoutes')


const app = express();
app.use(express.json())

// CRUD = CREATE(POST), READ(GET), UPDATE(PUT/PATCH), DELETE(DELETE)
app.get('/', (req, res)=>{
      //handling requests
      res.send("Hello, Welcome!")
})
app.use('/users', userRouter)
app.use('/posts', postsRouter)

//starting the server and listening to requests
const port = process.env.PORT || 4080;
app.listen(port, ()=>{console.log(`Server listening on port: ${port}`)})