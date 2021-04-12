const models = require('../models')
const { user, location } = models

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

module.exports = locationController