//server.js

const express = require('express');
const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//New imports
const http = require('http').Server(app);
const cors = require('cors');

app.use(cors());

const socketIO = require('socket.io')(http, {
  cors: {
    origin: '*'
  }
});

//Add this before the app.get() block
socketIO.on('connection', (socket: { id: any; on: (arg0: string, arg1: () => void) => void; }) => {
  console.log(`: ${socket.id} user just connected!`);

  socket.on('disconnect', () => {
    console.log(': A user disconnected');
  });
});

app.post('/api', (req: { body: { name: any; message: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { name: any; message: any; }): void; new(): any; }; }; }) => {
  const { name, message } = req.body;
  socketIO.emit('notification', { name, message });
  console.log(name, message);

  res.status(200).json({ name, message });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
