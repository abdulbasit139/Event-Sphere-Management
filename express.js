const express = require('express')
require('dotenv').config()
const cors = require('cors')
const connectDB = require('./Config/db')
const errorHandler = require('./Middlewares/errorHandler')

const app = express()

app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
    console.log(req.url, req.method)
    next()
})

app.use('/api/auth', require('./Routes/authRoutes'))

app.use(errorHandler)

app.listen(process.env.PORT, ()=> {
    console.log(`Listening to port ${process.env.PORT}`)
    connectDB()
})