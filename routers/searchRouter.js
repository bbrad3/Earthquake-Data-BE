const express = require('express')
const searchRouter = express.Router()

const searchController = require('../controllers/searchController')

searchRouter.get('/hourly', searchController.findHourly)
searchRouter.get('/daily', searchController.findDaily)
searchRouter.get('/weekly', searchController.findWeekly)
searchRouter.get('/location', searchController.findLocation)

module.exports = searchRouter