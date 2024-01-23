import axios from 'axios';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route
} from 'react-router-dom';
import App from './App.jsx';
import Room from './Pages/Room/Room.jsx';
import Settings from './Pages/Settings.jsx';
import RoomHeader from './Pages/Room/RoomHeader.jsx';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App/>}>
            <Route
                index
                element={<RoomHeader />}
                loader={async()=>{
                    const {data} = await axios.get(`/api/sounds`);
                    return{
                        data: data
                    }
                }}
            />
            <Route
                path="/room"
                element={<Room/>}
                loader={async() => {
                    const { data } = await axios.get(`/api/friends`);
                    return {
                        data: data
                    };
                }}
            />
            <Route
                path="/settings"
                element={<Settings/>}
            />
        </Route>
    )
);

export default router;