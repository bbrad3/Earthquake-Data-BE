const data = require('./worldcities.json')

const usableData = []
data.forEach(city => {
    const result = Object.create(city)

    result.city = city.city,
    result.country = city.country,
    result.latitude = city.lat,
    result.longitude = city.lng,
    result.createdAt = new Date(),
    result.updatedAt = new Date()

    if(city.capital === 'primary'){
        usableData.push(result)
    }
});

console.log(usableData)

module.exports = usableData