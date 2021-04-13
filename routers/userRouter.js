const express = require('express')
const userRouter = express.Router()

const userController = require('../controllers/userController')

userRouter.post('/new', userController.new)
userRouter.post('/login', userController.checkAuth)
userRouter.get('/find', userController.findOne)
userRouter.post('/update', userController.update)
userRouter.delete('/destroy', userController.destroy)

module.exports = userRouter