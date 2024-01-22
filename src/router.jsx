import {
    createBrowserRouter,
    createRoutesFromElements,
    Route
} from 'react-router-dom'
import Root from './Root.jsx'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path = "/"
            element = {<Root/>}
        >

        </Route>
    )
)

export default router