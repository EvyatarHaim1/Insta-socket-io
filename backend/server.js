const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const api = require('./Routes/api')
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')
const mongoose = require('mongoose')
require('dotenv').config()

app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
app.use(bodyParser.text({ type: 'text/html' }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With'
  )
  next()
})

// Enable CORS with options
app.use(cors())
app.use(express.json())
app.use('/', api)

const server = http.createServer(app)

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    dbName: 'instagram',
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to DB', process.env.MONGO_URI)

    server.listen(process.env.PORT, function () {
      console.log(`express server is running on port ${process.env.PORT}`)
    })
  })
  .catch((err) => {
    console.log(err)
  })

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
    allowedHeaders: ['Access-Control-Allow-Origin'],
    transports: ['websocket', 'polling'],
  },
  allowEIO3: true,
})

io.on('connection', async (socket) => {
  console.log(`User Connected: ${socket.id}`)
  socket.on('join_room', (room) => {
    const currentRoom = io.sockets.adapter.rooms.get(room)
    if (currentRoom) {
      // Check if socket ID exists in the room
      if (currentRoom.has(socket.id)) {
        // Socket ID already exists in the room, don't join
        socket.emit('alreadyJoined', 'You have already joined this room.')
      } else {
        // Join the room
        socket.join(room)
        socket.emit('join_room', 'You have successfully joined the room.')
      }
    } else {
      socket.join(room)
      socket.emit(
        'join_room',
        `User with ID: ${socket.id} joined room: ${room}`
      )
      console.log(`User with ID: ${socket.id} joined room: ${room}`)
    }
  })

  socket.on('send_message', (data) => {
    if (data && data?.room) {
      console.log('working', data)
      io.in(data?.room).emit('receive_message', data)
    }
  })

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id)
  })
})
