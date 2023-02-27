const express = require('express');

const app = express();

app.use(express.json())
const users = [
      {
            name: "mahesh",
            password: "password1",
            profession: "teacher",
            id: 1
      },
      {
            name: "suresh",
            password: "password2",
            profession: "librarian",
            id: 2
      },
      {
            name: "ramesh",
            password: "password3",
            profession: "clerk",
            id: 3
      }
]
// CRUD = CREATE(POST), READ(GET), UPDATE(PUT/PATCH), DELETE(DELETE)
app.get('/', (req, res)=>{
      //handling requests
      res.send("Hello, Welcome!")
})

app.get('/users', (req, res)=>{
      res.json(users)
})

app.post('/users', (req, res)=>{
      //reading the request body
      const details = req.body;
      users.push(details);
      res.json(users)
})

app.get('/users/:id', (req, res)=>{
      const {id} = req.params
      const user = users.find(user=> user.id === Number(id))
      res.json(user);
})

app.put('/users', (req, res)=>{
      const user_details = req.body
      users.map(user=>{
            if (user.id === user_details.id) {
                  user.name=user_details.name
                  user.profession=user_details.profession
                  return user
            } else {
                  return user
            }
      })
      res.json(users);
})

app.delete('/users/:id', (req, res)=>{
      const {id} = req.params
      let new_users = users.filter(user=> user.id !== Number(id))
      res.json(new_users);
})

//starting the server and listening to requests
const port = 4040;
app.listen(port, ()=>{console.log(`Server listening on port: ${port}`)})