import './AccountNav.css';
import Settings from './Settings.jsx';
import AddFriendModal from './AddFriendModal.jsx';
import FriendRequests from './FriendRequests.jsx'
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import { BsFillGearFill } from "react-icons/bs";
import { useLoaderData, useNavigate } from "react-router";
import axios from 'axios';

export default function AccountNav() {
    const { mySounds, myFavs, myFriends, userSearch, myRequests } = useLoaderData();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.login.user);
    const loggedIn = useSelector((state) => state.loggedIn);

    const [modalState, setModalState] = useState(false);
    const [friendRequestModalState, setFriendRequestModalState] = useState(false);
    const [sounds, setSounds] = useState(mySounds ? mySounds : null);
    const [favs, setFavs] = useState(myFavs ? myFavs : null);
    const [toDelete, setToDelete] = useState(myFavs ? myFavs[0] ? myFavs[0].soundscapeId : null : null);
    const [searchInput, setSearchInput] = useState();
    const [friendReqList, setFriendReqList] = useState([]);


    if (!user) {
        dispatch({type: 'modal-on'});
    };

    let friends = [];
    if (myFriends) {
        friends = [... myFriends];
    };

    let friendsList = friends.map((friend) => {
        return <h4>{friend.user.username}</h4>
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
                    onClick={() => setModalState(!modalState)}>
                    <BsFillGearFill 
                    className='cog'/>
                </button>
                
                {modalState ?
                <Settings
                    favs={favs}
                    toDelete={toDelete}
                    setToDelete={setToDelete}
                    userId = {user.userId}
                    username = {user.username}
                    email = {user.email}
                    modalState = {modalState}
                    setModalState = {setModalState}
                />
                :
                <></>
                }
                <button onClick={() => {
                    logoutUser();
                    navigate('/');
                }}>Logout</button>

            </div>
            <div className="add-friend">
                <button className="add-friend-btn" 
                        onClick={() => setFriendRequestModalState(!friendRequestModalState)}>
                        Add friends
                </button>

                {friendRequestModalState ?
                <AddFriendModal
                    userId = {user.userId}
                    username = {user.username}
                    searchInput  = {searchInput}
                    setSearchInput = {setSearchInput}
                    friendReqList = {friendReqList}
                    setFriendReqList = {setFriendReqList}
                    userSearch = {userSearch}
                    />
                    :
                    <></>
                }
            </div>

            <div className="">
            {loggedIn ? ( <FriendRequests
                user = {user}
                myRequests = {myRequests}
            />) : (
                <></>
            )}
           
            </div>

            <div className='friends-list'>
                <h4>Friends - {friends.length}</h4>
                <div className="friends">
                {friendsList}
                </div>
                
            </div>
        </main>
    );
};