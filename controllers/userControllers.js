const sql = require('mssql');
const bcrypt = require('bcrypt');
const validateCreateUserSchema = require('../model/usersSchema')


const { config } = require('../sqlconfig');
const { getUser } = require('../services/getUserService');
const { createToken, verifyToken } = require('../services/jwtServices');


module.exports = {
      getAllTheUsers: async (req, res) => {
            try {
                  await sql.connect(config)
                  let users = await sql.query`SELECT * FROM users`;

                  res.json(users.recordset)
            } catch (error) {
                  console.log(error)
            }
      },

      createUser: async (req, res) => {
            //reading the request body
            const details = req.body;


            try {
                  /// validate data
                  let value  = await validateCreateUserSchema(details)
                  
                        /// using bcrypt asynchonous
                        let hashed_pwd = await bcrypt.hash(value.password, 8);

                        /// connecting to database
                        await sql.connect(config);
                        let results = await sql.query`INSERT INTO users VALUES(${value.name}, ${value.profession}, ${hashed_pwd})`

                        if (results.rowsAffected.length) res.json({ success: true, message: 'user created successfully' })


            } catch (error) {
                  res.status(400).json(error)
            }
      },

      loginUser: async (req, res) => {
            // implementation of login using bcrypt
            let credentials = req.body;
            let user = await getUser(credentials.id)
            if (user) {
                  let match = await bcrypt.compare(credentials.password, user.password)

                  let token = await createToken({ full_names: user.full_names, id: user.id })

                  match ? res.json({ success: true, message: 'login successful', token }) : res.json({ success: false, message: 'check your credentials' })
            } else {
                  res.status(404).json({ message: "user doesn't exist" })
            }

      },

      getAUser: async (req, res) => {
            const { id } = req.params

            try {
                  let user = await getUser(id)
                  if (user) {
                        res.json(user)
                  } else {
                        res.status(404).json({ message: 'user not found' })
                  }

            } catch (error) {

            }
      },

      updateUser: async (req, res) => {
            const user_details = req.body
            try {
                  await sql.connect(config);
                  let results = await sql.query`UPDATE users  
                                                      SET full_names =${user_details.name},
                                                      profession = ${user_details.profession}
                  WHERE id=${user_details.id}`
                  if (results.rowsAffected.length) res.json({ success: true, message: 'user updated successfully' })
            } catch (error) {
                  console.log(error)
            }
      },

      deleteUser: async (req, res) => {
            const { id } = req.params;

            try {
                  await sql.connect(config)
                  let results = await sql.query`DELETE FROM users WHERE id = ${id}`
                  if (results.rowsAffected.length) res.json({ success: true, message: 'user deleted successfully' })
            } catch (error) {
                  console.log(error)
            }
      },

      userAuthenticate: async (req, res) => {
            let token = req.headers["authorization"]
            token = token.split(" ")[1]
            try {
                  let data = await verifyToken(token);
                  res.json(data)
            } catch (error) {
                  res.json(error)
            }


      }
}