const models = require('../models')
const { user, location } = models
const jwt = require('jsonwebtoken')

const locationController = {}

locationController.findAll = async (req, res) => {
    try {
        const allLocations = await location.findAll()
        res.json({
            status: 200,
            length: allLocations.length,
            locations: allLocations
        })
    } catch (error) {
        res.json({
            status: 404,
            message: 'Can not find all locations'
        })
    }
}

locationController.associateUser = async (req, res) => {
    try {
        const encryptedId = req.body.headers.authorization
        const decryptedId = await jwt.verify(encryptedId, process.env.JWT_SECRET)

        const foundUser = await user.findOne({
            where: { id: decryptedId.userId }
        })

        const foundLocation = await location.findOne({
            where: { id: req.body.headers.local.id }
        })

        const association = await foundUser.addLocation(foundLocation)
        console.log('ASSOCIATED', association)
        res.json({
            status: 200,
            message: 'Association completed successfuly',
            association: association
        })
    } catch (error) {
        res.json({
            status: 400,
            message: 'Can not perform association',
            error
        })
    }
}

locationController.unassociateUser = async (req, res) => {
    try {
        console.log(req.body);
        const encryptedId = req.headers.authorization
        const decryptedId = await jwt.verify(encryptedId, process.env.JWT_SECRET)
        console.log('decryptedId', decryptedId)

        const foundUser = await user.findOne({
            where: { id: decryptedId.userId }
        })
        // console.log('foundUser', foundUser)
        const foundLocation = await location.findOne({
            where: { id: req.headers.local.id } // WHERE IS LOCAL?
        })
        console.log('foundLocation', foundLocation)
        // const association = await foundUser.removeLocation(foundLocation)
        console.log('UN-ASSOCIATED', association)
        res.json({
            status: 200,
            message: 'Un-Association completed successfuly',
            association: association
        })
    } catch (error) {
        res.json({
            status: 400,
            message: 'Can not perform un-association',
            error
        })
    }
}

module.exports = locationController