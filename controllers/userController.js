const models = require('../models')
const { user, location } = models

userController = {}

userController.new = async (req, res) => {
    try {
        const newUser = await user.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        })
        res.json({
            user: newUser
        })
    } catch (error) {
        res.json({
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
        if(foundUser.password === req.body.password){
            res.json({
                message: 'User authorized',
                user: foundUser
            })
        } else {
            res.json({
                message: 'Wrong password, try again.'
            })
        }
    } catch (error) {
        res.json({
            message: 'Could not login user',
            error
        })
    }
}

module.exports = userController