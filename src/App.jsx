import './App.css';
import { Outlet} from "react-router-dom";
import AccountNav from './Pages/AccountNav.jsx';
import RoomHeader from './Pages/Room/RoomHeader.jsx';
import Room from './Pages/Room/Room.jsx';
import LoginPage from './Login/LoginPage.jsx';


function App() {
  return (
    <div>
      <AccountNav/>
      <LoginPage/>
      <Room/>
      <Outlet/>
    </div>
  )
}

export default App;