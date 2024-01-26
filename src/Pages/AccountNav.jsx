import './AccountNav.css';
import Settings from './Settings.jsx';
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { BsFillGearFill } from "react-icons/bs";
import { useLoaderData } from "react-router";
import axios from 'axios';

export default function AccountNav() {
    let data;
    const dispatch = useDispatch();
    const user = useSelector(state => state.login.user);

    const [modalState, setModalState] = useState(false);
    const [sounds, setSounds] = useState();
    const [favs, setFavs] = useState();
    const [toDelete, setToDelete] = useState();

    const setInfo = async() => {
        const { data: { sounds, favs } } = await axios.get('/api/sounds');
        setSounds(sounds);
        setFavs(favs);
        setToDelete(favs[0].soundscapeId);
        setModalState(!modalState);
    };

    if (!user) {
        dispatch({type: 'modal-on'});
    };

    let mySounds = <></>;
    if (favs) {
        mySounds = favs.map((soundscape) => {
            return <option key={soundscape.soundscapeId} value={soundscape.soundscapeId}>{soundscape.name}</option>
        });
    };

    console.log(toDelete)

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
          navigate("/");
        };
    };

    return (
        <main className="account-nav">
            <div className="account">
                <h2>{user ? user.username : 'Guest'}</h2>
                <button 
                    className="settings-btn" 
                    onClick={() => setInfo()}>
                    <BsFillGearFill 
                    className='cog'/>
                </button>
                {modalState ?
                <div className = "modalBackground">
                    <div className = "modalContainer">
                        <button onClick={() => setInfo()}> X </button>
                        <label className = "title">User Settings</label>         
                        <label className = "username">Username</label>
                        <div className = "form">{user.username}</div>
                        <label className = "email">Email</label>
                        <div className = "form">{user.email}</div>
                        <div>
                            <select name="soundscape-deleter" onChange={(e) => setToDelete(e.target.value)}>
                                {mySounds}
                            </select>
                            <button onClick={async() => {
                                await axios.delete(`/api/deletesoundscape/${toDelete}`);
                            }}>Delete</button>
                        </div>
                    </div>
                </div>
                :
                <></>
                }
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