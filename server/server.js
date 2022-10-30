const http = require('http')
const express = require('express')
const app = express()
const { Server } = require('socket.io')
const cors = require('cors')

app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*"
    }
})

io.on("connection", (socket) => {
    console.log(`User id: ${socket.id}`)

    socket.on("join_room", (data) => {
        socket.join(data)
    })

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("recieve_message", data.message)
    })

})

server.listen(3001, () => {
    console.log('Server running on port 3001')
})