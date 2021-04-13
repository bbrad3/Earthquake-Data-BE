const express = require('express')
const locationRouter = express.Router()

const locationController = require('../controllers/locationController')

locationRouter.get('/all', locationController.findAll)
locationRouter.post('/associate', locationController.associateUser)
locationRouter.delete('/un-associate', locationController.unassociateUser)

module.exports = locationRouter