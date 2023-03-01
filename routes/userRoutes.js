const userRouter = require('express').Router()

const { getAllTheUsers, 
        createUser, 
        getAUser, 
        updateUser, 
        deleteUser, 
        loginUser} = require('../controllers/userControllers')

userRouter.get('/', getAllTheUsers);

userRouter.post('/', createUser);
userRouter.post('/login', loginUser)

userRouter.get('/:id', getAUser);

userRouter.put('/', updateUser)

userRouter.delete('/:id', deleteUser)

module.exports = userRouter;