const userRouter = require('express').Router()

const { getAllTheUsers, 
        createUser, 
        getAUser, 
        updateUser, 
        deleteUser } = require('../controllers/userControllers')

userRouter.get('/', getAllTheUsers);

userRouter.post('/', createUser);

userRouter.get('/:id', getAUser);

userRouter.put('/', updateUser)

userRouter.delete('/:id', deleteUser)

module.exports = userRouter;