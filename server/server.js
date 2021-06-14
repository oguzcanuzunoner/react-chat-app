const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
})

io.on('connection', socket => {
    console.log('connection made successfully')
    socket.on('message', payload => {
        console.log('message received on server : ', payload)
        io.emit('message', payload)
    })
})


server.listen(process.env.PORT || 7000, () => {
    console.log('i am listening at post : 7000')
})