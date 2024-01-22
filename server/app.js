import ViteExpress from 'vite-express';
import morgan from 'morgan';
import express from 'express';
import {
    login,
    logout,
    checkStatus,
    register
} from './controllers/authController.js'
import { getFriends, getUsers } from './controllers/controller.js';

const app = express();
const port = '8000';

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(session({secret: 'this is a secret', saveUniinitialized: true, resave:false}))
ViteExpress.config({ printViteDevServerHost: true });

ViteExpress.config({printCiteDevServerHost:true})

//Endpoints:
app.get('/api/friends/:username', getFriends);
app.get('/api/user', getUsers);

//Auth Endpoints
app.get('/api/auth/status', checkStatus)
app.post('/api/auth/login', login)
app.post('/api/auth/logout', logout)
app.post('/api/auth/register', register)

ViteExpress.listen(app, port, () => console.log(`Server is listening on http://localhost:${port}`));