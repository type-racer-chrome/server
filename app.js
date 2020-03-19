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
    io.emit('hi', 'INI LOH MASOOOKK')
    // socket.on('joinRoom', (val) => {
    //     socket.join('roomPlay', () => {
    //         // io.emit('broadcast', 'ini masuk cuy')
    //         socket.broadcast.emit('roomPlay', 'ini masuk')
    //         console.log('user has join')
    //     })
    // })

    // socket.on('startGame', payload => {
    //     socket.join('roomPlay', (err) => {
    //         console.log('tinggal jalanin gamenya')
    //         // io.to(payload.id).emit('playing', true)
    //     })
    // })

    socket.on('chat', (msg) => {
        io.emit('message', msg)
        console.log('message: ', msg)
    })
})


server.listen(3000, function () {
    console.log('listening on *:3000');
});
