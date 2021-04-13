const models = require('../models')
const { user, location } = models
const jwt = require('jsonwebtoken')

userController = {}

userController.new = async (req, res) => {
    try {
        const newUser = await user.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })

        const encryptedId = jwt.sign({userId: newUser.id}, process.env.JWT_SECRET)

        res.json({
            status: 200,
            user: newUser,
            userId: encryptedId
        })
    } catch (error) {
        res.json({
            status: 400,
            message: 'Could not create user',
            error
        })
    }
}

userController.checkAuth = async (req, res) => {
    try {
        const foundUser = await user.findOne({
            where: { email: req.body.email }
        })
        console.log(foundUser.dataValues, process.env.JWT_SECRET)
        const encryptedId = jwt.sign({userId: foundUser.id}, process.env.JWT_SECRET)

        if(foundUser.password === req.body.password){
            res.json({
                status: 200,
                message: 'User authorized',
                user: foundUser,
                userId: encryptedId
            })
        } else {
            res.json({
                status: 401,
                message: 'Wrong password, try again.'
            })
        }
    } catch (error) {
        res.json({
            status: 400,
            message: 'Could not login user',
            error
        })
    }
}

userController.findOne = async (req, res) => {
    try {
        const encryptedId = req.headers.authorization
        const decryptedId = await jwt.verify(encryptedId, process.env.JWT_SECRET)
        
        const foundUser = await user.findOne({
            where: { id: decryptedId.userId },
            include: location
        })
        
        // console.log('foundUser', foundUser.dataValues)

        res.json({
            status: 200,
            message: 'Here is your user info',
            user: foundUser
        })
    } catch (error) {
        res.json({
            status: 404,
            message: 'Could not find user',
            error
        })
    }
}

userController.update = async (req, res) => {
    try {
        const encryptedId = req.body.authorization
        const decryptedId = await jwt.verify(encryptedId, process.env.JWT_SECRET)

        const foundUser = await user.findOne({
            where: {id: decryptedId.userId}
        })

        const updatedUser = await foundUser.update({
            username: req.body.username,
            email: req.body.email
        })

        res.json({
            status: 200,
            message: 'User info updated',
            updatedUser
        })
    } catch (error) {
        res.json({
            status: 400,
            message: 'Could not update user',
            error
        })
    }
}

userController.destroy = async (req, res) => {
    try {
        const encryptedId = req.headers.authorization
        const decryptedId = await jwt.verify(encryptedId, process.env.JWT_SECRET)

        const destroyedUser = await user.destroy({
            where: { id: decryptedId.userId }
        })
        res.json({
            status: 200,
            message: 'User has been eliminated',
            destroyedUser
        })
    } catch (error) {
        res.json({
            status: 400,
            message: 'Could not destroy user',
            error
        })
    }
}

module.exports = userController