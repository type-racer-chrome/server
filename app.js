const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server)
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

app.use(errorHandler)

io.on('connection', function(socket) {
    console.log(' user connected')
})