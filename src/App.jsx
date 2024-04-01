import './App.css';
import { Outlet} from "react-router-dom";
import AccountNav from './Pages/AccountNav/AccountNav.jsx';
import RoomHeader from './Pages/Room/RoomHeader.jsx';
import Room from './Pages/Room/RoomBackground.jsx';
import LoginPage from './Login/LoginPage.jsx';
import socketIO from 'socket.io-client';
import { useState } from 'react';

const socket = socketIO.connect('http://localhost:8000');

function App() {
  return (
    <div>
      <AccountNav
        socket={socket}
      />
      <LoginPage/>
      <Outlet context={{socket}}/>
    </div>
  )
}


export default App;