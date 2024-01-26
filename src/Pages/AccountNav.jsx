import './AccountNav.css';
import Settings from './Settings.jsx';
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import { BsFillGearFill } from "react-icons/bs";
import { useLoaderData } from "react-router";
import axios from 'axios';

export default function AccountNav() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.login.user);
    console.log(user)

    const [openModal, setOpenModal] = useState(false)

    if (!user) {
        dispatch({type: 'modal-on'});
    };

    const data = useLoaderData();
    let myFriends = [];
    if (data) {
        myFriends = [... data.myFriends];
    };


    let friendsList = myFriends.map((friend) => {
        return <h4>{friend.username}</h4>
    });

    const logoutUser = async () => {
        const { data } = await axios.post('/api/auth/logout');
        if (data.success) {
          dispatch({ type: 'logout' });
          navigate("/")
        }
      };
  

    return (
        <main className="account-nav">
            <div className="account">
                <h2>{user ? user.username : 'Guest'}</h2>
                <button 
                    className="settings-btn" 
                    onClick={() => {setOpenModal(true)}}>
                    <BsFillGearFill 
                    className='cog'/>
                </button>
                {openModal && <Settings 
                    userId={user.userId}
                    username = {user.username}
                    email = {user.email}
                    password = {user.password}
                    closeModal={setOpenModal}/>}
                <button onClick={logoutUser}>Logout</button>
            </div>
            <div className="add-friend">
                <button className="add-friend-btn" onClick={() => {}}>Add friend</button>
            </div>
            <div className='friends-list'>
                <h4>Friends - {myFriends.length}</h4>
                <div className="friends">
                {friendsList}
                </div>
                
            </div>
        </main>
    );
};