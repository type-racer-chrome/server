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


app.get('/', (req, res, next) => {
    res.send('NIH DICOBAINNN')
})

app.use(errorHandler)

io.on('connection', function(socket) {
    console.log(' user connected')

    
    socket.on('joinGame', (val) => {
        io.emit('joinGame', val)
    })

    // socket.on('startGame', payload => {
    //     socket.join('roomPlay', (err) => {
    //         console.log('tinggal jalanin gamenya')
    //         // io.to(payload.id).emit('playing', true)
    //     })
    // })

    socket.on('startGame', (msg) => {
        io.emit('gamePlay', msg)
        console.log('message: ', msg)
    })

    socket.on('backToLandingPage', (username) => {
        io.emit('deleteUser', username)
    })

    socket.on('race', (payload) => {
        socket.emit('race', payload)
    })

    socket.on('highscore', (payload) => {
        io.emit('highscore', payload)
    })

    socket.on('disconnect',()=> {
        console.log('disconnect')
    })
})


server.listen(3000, function () {
    console.log('listening on *:3000');
});
