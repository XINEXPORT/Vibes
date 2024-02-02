import ViteExpress from 'vite-express';
import morgan from 'morgan';
import session from 'express-session';
import express from 'express';
import {Server} from 'socket.io'
import {
    login,
    logout,
    checkStatus,
    register,
} from './controllers/authController.js';
import { 
    getFriends,
    findFriends,
    requestFriend,
    respondToRequest,
    getUsers,
    upload,
    addAudio,
    getSounds,
    postFavSounds,
    getFav,
    deleteFav,
    deleteSoundscape
 } from './controllers/controller.js';

const app = express();
const port = '8000';

//Socket
import cors from 'cors';

app.use(cors());

app.get('/api', (req, res) => {
    res.json({
      message: 'Hello world',
    });
  });

//Audio Files Folder
app.use('../public/audio', express.static('.public/audio'));

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({secret: 'this is a secret', saveUninitialized: true, resave:false}));

ViteExpress.config({ printViteDevServerHost: true });

//Endpoints:
app.get('/api/friends', getFriends);
app.get('/api/findfriends', findFriends);
app.post('/api/request', requestFriend);
app.post('/api/respond', respondToRequest);
app.get('/api/user', getUsers);
app.get('/api/sounds', getSounds);

app.post('/api/favs', postFavSounds);
app.get('/api/getfav', getFav);
app.delete('/api/deletefav', deleteFav);
app.delete('/api/deletesoundscape/:id', deleteSoundscape);
app.post('/api/sounds', upload, addAudio);


//Auth Endpoints
app.get('/api/auth/status', checkStatus);
app.post('/api/auth/login', login);
app.post('/api/auth/logout', logout);
app.post('/api/auth/register', register);

const server = ViteExpress.listen(app, port, () => console.log(`Server is listening on http://localhost:${port}`));

const io = new Server( server , {
  cors: {
      origin: "http://localhost:8000",
      methods: ["GET", "POST"]
  }
});
io.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("join_room", (data) => {
    console.log(`user has joined ${data}`)
    socket.join(data.roomName);
    socket.to(data.roomName).emit("userhasjoined", data.userJoin);

  });

//sends the message to all the users on the server
  socket.on("sendMessage", (data) => {
    socket.broadcast.emit("receiveMessage", data);
  });

  socket.on('message', (data) => {
    socket.broadcast.emit('messageResponse', data);
  });

  socket.on ('broadcast_playstate', (data) => {
    socket.to(data.room).emit('receive_playstate', data);
  });

  socket.on ('broadcast_sound', (data) => {
    console.log(`${data.room} is broadcasting a sound`);
    socket.to(data.room).emit('receive_sound', data);
    console.log(`socket has sent`);
  });

  socket.on('disconnect', () => {
    console.log('❌: A user disconnected');
  });
});