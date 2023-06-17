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

const connectedRooms = [];

io.on('connection', async (socket) => {
  socket.on('join_room', (room, userId, messages) => {
    socket.join(room);
    const roomObject = connectedRooms.find((item) => item.room === room);

    if (roomObject) {
      if (roomObject.users.includes(userId)) {
        socket.emit('alreadyJoined', 'You have already joined this room.');
        console.log('alreadyJoined', 'You have already joined this room.');
      } else {
        if (roomObject.users.length < 2 && !roomObject.users.includes(userId)) {
          roomObject.users.push(userId);
          console.log('currentRoom', roomObject);
          socket.emit('join_room', 'You have successfully joined the room.');
        } else {
          socket.emit('roomFull', 'The room is already full.');
          console.log('roomFull', 'The room is already full.');
        }
      }
    } else {
      const newRoomObject = { room: room, users: [userId] };
      connectedRooms.push(newRoomObject);
      socket.emit('join_room', `User with ID: ${userId} joined room: ${room}`);
      console.log(`User with ID: ${userId} joined room: ${room}`);
    }

    // Populate connectedRooms array from messages
    messages.forEach((message) => {
      const roomObject = {
        room: message.room,
        users: [userId, message.otherUserId]
      };

      connectedRooms.push(roomObject);
    });
  });

  socket.on('send_message', (data) => {
    if (data && data.room) {
      const roomObject = connectedRooms.find((item) => item.room === data.room);
      if (roomObject && roomObject.users.includes(data.userId)) {
        console.log('all rooms', connectedRooms)
        io.in(data.room).emit('receive_message', data);
      }
    }
  });

  socket.on('disconnect', () => {
    const disconnectedRooms = connectedRooms.filter((roomObject) => {
      if (roomObject.users.includes(socket.id)) {
        roomObject.users.splice(roomObject.users.indexOf(socket.id), 1);
        return roomObject.users.length > 0;
      }
      return true;
    });

    connectedRooms.length = 0;
    connectedRooms.push(...disconnectedRooms);
    console.log('User Disconnected', socket.id);
  });
});

