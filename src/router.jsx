import axios from 'axios';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route
} from 'react-router-dom';
import App from './App.jsx';
import Room from './Pages/Room/RoomBackground.jsx';
import Settings from './Pages/AccountNav/Settings.jsx';
import RoomHeader from './Pages/Room/RoomHeader.jsx';
import socketIO from 'socket.io-client';

const socket = socketIO.connect('http://localhost:8000');

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={<App />}
            loader={async() => {
                const { data: { sounds, favs } } = await axios.get('/api/sounds');
                const { data: { myFriends, myRequests } } = await axios.get('/api/friends');
                const { data: { userSearch } } = await axios.get('/api/findfriends');
                return {
                    mySounds: sounds,
                    myFavs: favs,
                    myFriends: myFriends,
                    myRequests: myRequests,
                    userSearch: userSearch
                };
            }}
        >
            <Route
                index
                element={<RoomHeader />}
                loader={async() => {
                    const {data} = await axios.get(`/api/sounds`);
                    return {
                        sounds: data.sounds,
                        favs: data.favs,
                        params: null
                    };
                }}
            />
            <Route
                path="/:username"
                element={<RoomHeader />}
                loader={async({ params }) => {
                    const {data} = await axios.get(`/api/sounds`);
                    return {
                        sounds: data.sounds,
                        favs: data.favs,
                        params: params
                    };
                }}
            />
        </Route>
    )
);

export default router;