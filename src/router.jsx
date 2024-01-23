import {
    createBrowserRouter,
    createRoutesFromElements,
    Route
} from 'react-router-dom';
import App from './App.jsx';
import Room from './Pages/Room.jsx';
import Settings from './Pages/Settings.jsx';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App/>}>
            <Route
                index
                element={<Room/>}
            />
            <Route
                path="/room"
                element={<Room/>}
                loader={async({ params }) => {
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