const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uuidV4 } = require('uuid')
const port = process.env.PORT || 3000
const ExpressPeerServer = require("peer").ExpressPeerServer

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use("/peerjs",ExpressPeerServer(server,{debug:true}))

app.get('/', (req, res) => {
  res.redirect(`/${uuidV4()}`)
})

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})

io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected', userId)

    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', userId)
    })

    socket.on("user_message",(roomId,message)=>{
      console.log(roomId," ",message)
      socket.to(roomId).broadcast.emit("send-message",message)
    })

  })
})

server.listen(port)