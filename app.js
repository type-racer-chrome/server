const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server)
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const PORT = process.env.PORT || 3000


app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())


app.get('/', (req, res, next) => {
    res.send('NIH DICOBAINNN')
})

app.use(errorHandler)

io.on('connection', function(socket) {
    console.log(' user connected')

    
    socket.on('joinGame', (val) => {
        // socket.open()
        io.emit('joinGame', val)
    })

    socket.on('startGame', (msg) => {
        io.emit('gamePlay', msg)
        console.log('message: ', msg)
    })

    socket.on('backToLandingPage', (username) => {
        console.log(username)
        io.emit('deleteUser', username)
    })

    socket.on('race', (payload) => {
        console.log(payload, 'inin payload')
        socket.emit('race', payload)
    })

    socket.on('highscore', (payload) => {
        io.emit('highscore', payload)
    })

    socket.on('resetPlayer', () => {
        console.log('KE TRIGGER RESETTTT')
        io.emit('resetPlayer')
    })
    
    socket.on('score', (payload) => {
        io.emit('score', payload)
    }) 

    socket.on('disconnect',()=> {
        console.log('disconnect')
    })
})


server.listen(PORT, function () {
    console.log('listening on *:3000');
});
