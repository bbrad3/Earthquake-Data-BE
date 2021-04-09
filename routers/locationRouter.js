const express = require('express')
const locationRouter = express.Router()

const locationController = require('../controllers/locationController')

locationRouter.get('/all', locationController.findAll)

module.exports = locationRouter