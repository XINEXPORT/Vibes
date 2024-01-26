import ViteExpress from 'vite-express';
import morgan from 'morgan';
import session from 'express-session';
import express from 'express';
import {
    login,
    logout,
    checkStatus,
    register,
} from './controllers/authController.js';
import { 
    getFriends, 
    getUsers,
    upload,
    addAudio,
    getSounds,
    postFavSounds,
    deleteFav,
    deleteSoundscape
 } from './controllers/controller.js';

const app = express();
const port = '8000';

//Audio Files Folder
app.use('../public/audio', express.static('.public/audio'));

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({secret: 'this is a secret', saveUniinitialized: true, resave:false}));

ViteExpress.config({ printViteDevServerHost: true });

//Endpoints:
app.get('/api/friends', getFriends);
app.get('/api/user', getUsers);
app.get('/api/sounds', getSounds);

app.post('/api/favs', postFavSounds);
app.delete('/api/deletefav', deleteFav);
app.delete('/api/deletesoundscape/:id', deleteSoundscape);
app.post('/api/sounds', upload, addAudio);




//Auth Endpoints
app.get('/api/auth/status', checkStatus);
app.post('/api/auth/login', login);
app.post('/api/auth/logout', logout);
app.post('/api/auth/register', register);

ViteExpress.listen(app, port, () => console.log(`Server is listening on http://localhost:${port}`));