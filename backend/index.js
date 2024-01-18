const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
var cors = require('cors')
const auth = require('./routes/authRoute')
const test = require('./middlewares/authMiddleware')
const { Server } = require('socket.io');
const emailRoutes = require('./routes/emailRoute');
const authMiddleware = require('./middlewares/authMiddleware');

dotenv.config()

// db config
connectDB();
const app = express();

// middlewares
app.use(cors())
app.use(express.json());

//api 
app.use('/api/auth', auth)
app.use('/api/email', emailRoutes)
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Server is running at PORT: ${PORT}`)
})
const io = new Server(server, {
  // pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});


io.on('connection', (socket, req) => {
  console.log(`connected id is ${socket.id}`);
  socket.on('joined', async ({ roomId, username }) => {
    socket.username = username;
    socket.roomId = roomId;
    console.log("joined user is ");
    console.log(socket.username);
    socket.join(roomId);
    console.log(roomId);
    let list = []
    const sockets = await io.in(roomId).fetchSockets();

    for (let i = 0; i < sockets.length; i++) {
      list.push(sockets[i].username)
    }

    console.log(list.length);

    console.log(username);
    io.to(roomId).emit('connected', JSON.stringify(list));


    socket.on('disconnecting', async () => {
      let list = []
      const sockets = await io.in(roomId).fetchSockets();

      for (let i = 0; i < sockets.length; i++) {
        list.push(sockets[i].username)
      }

      list = list.filter((user) => user != username)
      io.to(roomId).emit('connected', JSON.stringify(list));
      console.log('user disconnected');


    })


    socket.on('codechange', (messageData) => {

      console.log(messageData.code);
      socket.to(roomId).emit('codeadded', messageData);
    })

    socket.on('message', (messageData) => {
      socket.to(roomId).emit('recieve', messageData);
    })
    socket.on('outputchange', (outputData) => {
      socket.to(roomId).emit('outputchange', outputData)
    })
    socket.on('inputchange', (inputData) => {
      socket.to(roomId).emit('inputchange', inputData)
    })

    socket.on('beginDrawing', (elements)=>{
      socket.to(roomId).emit('beginDrawingClient', elements);
    })

    socket.on('drawStroke', (elements)=>{
      socket.to(roomId).emit('drawStrokeClient', elements);
    })
    
    socket.on('undoStroke', ({elements, history})=>{
      console.log(elements[elements.length-1], history[history.length-1]);
      socket.to(roomId).emit('undoStrokeClient', {elements, history});
    })
    
    socket.on('redoStroke', ({elements, history})=>{
      socket.to(roomId).emit('redoStrokeClient', {elements, history});
    })

    socket.on('clearCanvas', ()=>{
      socket.to(roomId).emit('clearCanvasClient');
    })

  })
})
//webRTc code hosted on another server instance
const server1 = app.listen(4000, () => {
  console.log(`Server is running at PORT: 4000`)
})

const io1 = new Server(server1, {
  // pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});


//const http1 = require('http').createServer(app);
//const io1 = require('socket.io')(http1);
// http1.listen(4000, () => {
//   console.log('Socket 1 listening on *:4000');
// });
io1.on('connection', (socket1) => {
  console.log('User connected to Socket 1');
  // Handle events for the first instance
  socket1.on('room:join', data => {
    const { username, roomId } = data;
    io1.to(roomId).emit('user:joined', { username, id: socket1.id })
    socket1.join(roomId)
    io1.to(socket1.id).emit('room:join', data);
  })
  socket1.on('user:call', ({ to, offer }) => {
    io1.to(to).emit('incoming:call', { from: socket1.id, offer })
  })
  socket1.on('call:accepted', ({ to, ans }) => {
    io1.to(to).emit('call:accepted', { from: socket1.id, ans })
  })
  socket1.on('peer:nego:needed', ({ to, offer }) => {
    console.log('peer:nego:needed', offer)
    io1.to(to).emit('peer:nego:needed', { from: socket1.id, offer })

  })
  socket1.on('peer:nego:done', ({ to, ans }) => {
    console.log('peer:nego:done', ans);
    io1.to(to).emit('peer:nego:final', { from: socket1.id, ans })

  })
  // this code is for disconnecting webRTC
  socket1.on('stream-disconnect', ({ to }) => {
    io1.to(to).emit('peer-disconnect', { from: socket1.id })

  })

});




