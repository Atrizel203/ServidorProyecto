const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
require('dotenv').config({path:'variables.env'})

mongoose.Promise=global.Promise
mongoose.connect(process.env.DB_URL)
  .then(() => console.log('Connected!'));

const app=express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const whiteList=[process.env.FRONTEND_URL]
const corOpttions={
  origin:(origin,callback)=>{
    const existe = whiteList.some(dominio=> dominio === origin);
    if(existe){
      callback(null,true);
    }else{
      callback(new Error('No permitido por CORS'));
    }
  }
}

app.use(cors(corOpttions));
app.use('/',routes())
app.use(express.static('uploads'))

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado')
  socket.on('disconnect', () => {
    console.log('Cliente desconectado')
  });
});

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 5000

server.listen(port,host,()=>{
  console.log('El servidor está corriendo')
})
