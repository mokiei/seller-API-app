//Entry point to the server
const express = require('express')//backend web framework
const colors = require('colors')
const dotenv = require('dotenv').config()// environment variables, config() allows to have a .env file with our variables in it
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/seller', require('./routes/sellerRoutes'))
app.use(errorHandler)

app.listen(port, () => console.log(`server started on port ${port}`))