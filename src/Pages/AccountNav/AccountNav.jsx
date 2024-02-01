import './AccountNav.css';
import Settings from './Settings.jsx';
import AddFriendModal from './AddFriendModal.jsx';
import FriendRequests from './FriendRequests.jsx'
import Chatroom from './Chatroom.jsx';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { useState } from 'react';
import { BsFillGearFill, BsThreeDots } from "react-icons/bs";
import { useLoaderData, useNavigate } from "react-router";
import axios from 'axios';
import socketIO from 'socket.io-client';

const socket = socketIO.connect('http://localhost:8000');

export default function AccountNav() {
    const { mySounds, myFavs, myFriends, userSearch, myRequests } = useLoaderData();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.login.user);

    const [modalState, setModalState] = useState(false);
    const [friendRequestModalState, setFriendRequestModalState] = useState(false);
    const [sounds, setSounds] = useState(mySounds ? mySounds : null);
    const [favs, setFavs] = useState(myFavs ? myFavs : null);
    const [toDelete, setToDelete] = useState(myFavs ? myFavs[0] ? myFavs[0].soundscapeId : null : null);
    const [searchInput, setSearchInput] = useState();
    const [friendReqList, setFriendReqList] = useState([]);
    const [friendslist, setFriendslist] = useState([]);


    if (!user) {
        dispatch({type: 'modal-on'});
    };

    const setFriendsListHandler = (newFriendsList)=>{
    setFriendslist(newFriendsList)
        }

        useEffect(()=>{
            if (myFriends){
                setFriendslist(myFriends)
            } else{
                setFriendslist([])
            }
        },[myFriends])


//Friendslist

        let friendsListMapped = friendslist.map((friend) => {
            return <div className='friendname'>{friend.user.username}
                        <button
                            onClick={() => {
                                socket.emit("join_room", friend.user.username);
                                navigate(`/${friend.user.username}/room`)
                            }}
                        >Join</button>
                        <BsThreeDots />
                    </div>
        });

//Logout
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
                }}>Logout</button>

            </div>
            <div className="add-friend">
                <button className="add-friend-btn" 
                        onClick={setFriendRequestModalState}>
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
                    friendRequestModalState = {friendRequestModalState} 
                    setFriendRequestModalState = {setFriendRequestModalState}
                    />
                    :
                    <></>
                }
            </div>

            <div className="">
            { user ? (<FriendRequests
                user = {user}
                myRequests = {myRequests}
                myFriends = {myFriends}
                setFriendsList = {setFriendsListHandler}
            />) : (
                <></>
            )}
            </div>

            
            <div className='friends-list'>
                <h4>Friends - {friendsListMapped.length}</h4>
                <div className="friends">
                    {friendsListMapped}
                </div>
                  
                  
            <div className = "chatbox">
            <h1 className= "chatroom-title">Chatroom</h1>
            { user ? (<Chatroom
                user = {user}
                />) : (<></>)}
            </div>
            </div>
        </main>
    );
};