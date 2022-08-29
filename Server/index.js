const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/routes');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const io = require('socket.io')(3003, {
    path: '/socket.io',
    serveClient: false,
    cors:{
      origin: ["http://localhost:3000","http://localhost:3002"],
      methods: ["GET", "POST"],
    },
    // below are engine.IO options
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false
  });

const app = express()

app.use(router)
app.use(cors())

const server = http.createServer(app)

//Communication part using socket.io
io.on("connection",(socket)=>{
    socket.on('send_CounterValue',(data,client,err)=>{
      if(err)console.log(err)
      console.log(client)
      socket.broadcast.emit('send_Counterback',data) 
    })
})


//Initializes DB connection
mongoose.connect('mongodb://localhost:27017/counterApp',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },(err)=>{
     if (err) throw err;
     console.log('db connected')
  }
);



app.listen(3001,()=>{
    console.log('listening at 3001')
})