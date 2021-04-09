const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001

// MIDDLEWARE
app.use(express.json())

// ROUTES
app.get('/', (req, res) => {
    res.send('Welcome to the root route!')
})

// SERVER
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})