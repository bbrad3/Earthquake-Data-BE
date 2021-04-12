const express = require('express')
const userRouter = express.Router()

const userController = require('../controllers/userController')

userRouter.post('/new', userController.new)
userRouter.post('/login', userController.checkAuth)
userRouter.get('/find', userController.findOne)

module.exports = userRouter