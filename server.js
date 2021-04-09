const express = require('express')
const app = express()
const cors = require('cors')

const routesReport = require('rowdy-logger').begin(app)

// MIDDLEWARE
app.use(cors())
app.use(express.json())

// ROUTES
app.get('/', (req, res) => {
    res.send('Welcome to the root route!')
})

const userRouter = require('./routers/userRouter')
app.use('/user', userRouter)

// SERVER
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    routesReport.print()
    console.log(`Server listening on port ${PORT}`)
})