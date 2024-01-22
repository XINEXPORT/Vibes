import {
    createBrowserRouter,
    createRoutesFromElements,
    Route
} from 'react-router-dom'
import Root from './Root.jsx'
import Home from './Home.jsx'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path = "/"
            element = {<Root/>}
        >
            <Route
            index
            element = {<Home/>}
            />
            </Route>
    )
)

export default router