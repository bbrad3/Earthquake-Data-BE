const { default: axios } = require('axios')
const models = require('../models')
const { user, location } = models

const hourly = 'all_hour.geojson'
const daily = 'all_day.geojson'
const weekly = 'all_week.geojson'
const geoJSON = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/'
const geoSearve = 'https://earthquake.usgs.gov/ws/geoserve/places.json?'

searchController = {}

searchController.findHourly = async (req, res) => {
    try {
        const data = await axios.get(`${geoJSON}${hourly}`)
        const quakes = parseData(data.data.features)
        const length = quakes.length
        res.json({
            status: 200,
            length,
            quakes
        })
    } catch (error) {
        res.json({
            status: 401,
            message: 'Could not retrieve hourly data.',
            error
        })
    }
}

searchController.findDaily = async (req, res) => {
    try {
        const data = await axios.get(`${geoJSON}${daily}`)
        const quakes = parseData(data)
        const length = quakes.length
        res.json({
            status: 200,
            length,
            quakes
        })
    } catch (error) {
        res.json({
            status: 401,
            message: 'Could not retrieve daily data.',
            error
        })
    }
}

searchController.findWeekly = async (req, res) => {
    try {
        const data = await axios.get(`${geoJSON}${weekly}`)
        const quakes = parseData(data.data.features)
        const length = quakes.length
        res.json({
            status: 200,
            length,
            quakes
        })
    } catch (error) {
        res.json({
            status: 401,
            message: 'Could not retrieve weekly data.',
            error
        })
    }
}

searchController.findLocation = async (req, res) => {
    try {
        const lat = req.headers.lat
        const long = req.headers.long
        const radius = req.headers.radius
        const data = await axios.get(`${geoSearve}latitude=${lat}&longitude=${long}&maxradiuskm=${radius}&limit=5`)
        console.log(data.data.geonames.features.length, 'LOG')
        const quakes = parseData(data.data.geonames.features)
        const length = quakes.length
        res.json({
            status: 200,
            length,
            quakes
        })
    } catch (error) {
        res.json({
            status: 401,
            message: 'Could not retrieve location data.',
            error
        })
    }
}

function parseData(data) {
    const features = data
    const quakes = []
    // location data does not return place, mag, type
    for(let quake of features) {
        const instance = {}
        instance.place = quake.properties.place
        instance.mag = quake.properties.mag
        instance.type = quake.properties.type
        instance.coords = [quake.geometry.coordinates[0], quake.geometry.coordinates[1]]
        instance.depth = quake.geometry.coordinates[2]
        quakes.push(instance)
    }
    console.log('LENGTH:', quakes.length)
    console.log('QUAKE 0: ', quakes[0])
    return quakes
}

module.exports = searchController