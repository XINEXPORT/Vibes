import axios from 'axios';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route
} from 'react-router-dom';
import App from './App.jsx';
import Room from './Pages/Room/RoomBackground.jsx';
import Settings from './Pages/Settings.jsx';
import RoomHeader from './Pages/Room/RoomHeader.jsx';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={<App/>}
            loader={async() => {
                const { data: { sounds, favs } } = await axios.get('/api/sounds');
                const { data: { myFriends } } = await axios.get('/api/friends');
                const { data: { userSearch } } = await axios.get('/api/findfriends');
                return {
                    mySounds: sounds,
                    myFavs: favs,
                    myFriends: myFriends,
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
                        favs: data.favs
                    };
                }}
            />
        </Route>
    )
);

export default router;