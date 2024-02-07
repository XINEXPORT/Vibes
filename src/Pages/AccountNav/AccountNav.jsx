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
import { IoMdLogOut } from "react-icons/io";
import axios from 'axios';
import socketIO from 'socket.io-client';

const socket = socketIO.connect('http://localhost:8000');

export default function AccountNav() {
    console.log(socket);
    const { sound, myFavs, myFriends, userSearch, myRequests } = useLoaderData();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.login.user);

    const [modalState, setModalState] = useState(false);
    const [friendRequestModalState, setFriendRequestModalState] = useState(false);
    const [sounds, setSounds] = useState(sound ? sound : null);
    const [mySounds, setMySounds] = useState(myFavs ? myFavs : null);
    const [toDelete, setToDelete] = useState(myFavs ? myFavs[0] ? myFavs[0].soundscapeId : null : null);
    const [searchInput, setSearchInput] = useState();
    const [friendReqList, setFriendReqList] = useState([]);
    const [friendslist, setFriendslist] = useState([]);
    const [joinFailed, setJoinFailed] = useState(false);


    if (!user) {
        dispatch({type: 'modal-on'});
    };

    const setFriendsListHandler = (newFriendsList) => {
        setFriendslist(newFriendsList);
    };

    useEffect(() => {
        if (myFriends) {
            setFriendslist(myFriends);
        } else {
            setFriendslist([]);
        };
    }, [myFriends]);


//Friendslist
        let friendsListMapped = friendslist.map((friend) => {
            return <div key={friend.user.username} className='friendname'>{friend.user.username}
                        <button
                            onClick={() => {
                                navigate(`/${friend.user.username}`);
                            }}
                        >Join</button>
                        <button><BsThreeDots 
                        onClick={async()=>{
                            let {data} = await axios.delete(`/api/deletefriend/${friend.user.userId}`)
                            setFriendslist(data.myFriends)
                        }}
                        /></button>
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

//joinfail


    return (
        <main className="account-nav">
            <div className="account">
                <div className='username'>
                    <h2>{user ? user.username : 'Guest'}</h2>
                </div>
                <div className='logout-and-settings'>
                    <button
                        className='logout-btn'
                        onClick={() => logoutUser()}>
                        <IoMdLogOut
                            className='exit-door'
                        />
                    </button>
                    <button 
                        className="settings-btn"
                        onClick={() => setModalState(!modalState)}>
                        <BsFillGearFill 
                            className='cog'
                        />
                    </button>
                </div>
            </div>
            {modalState ?
            <Settings
                mySounds={mySounds}
                setMySounds={setMySounds}
                toDelete={toDelete}
                setToDelete={setToDelete}
                userId = {user.userId}
                username = {user.username}
                email = {user.email}
                modalState = {modalState}
                setModalState = {setModalState}
            />
            :
            <div className='friends-div'>
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
                    {user && myRequests ? myRequests[0] ? <FriendRequests
                        user = {user}
                        myRequests = {myRequests}
                        myFriends = {myFriends}
                        setFriendsList = {setFriendsListHandler}
                    />
                    :
                    <></>
                    :
                    <></>
                    }
                </div>
                <div className='friends-list'>
                    <h4>Friends - {friendsListMapped.length}</h4>
                    <div className="friends">
                        {friendsListMapped}
                    </div>
                </div>
                {joinFailed && <p>Room is not available. Please try again.</p>}
            </div>
            }
            <div className="chatbox">
                <h1 className="chatroom-title">Chatroom</h1>
                {user ?
                <Chatroom
                    user={user}
                />
                :
                <></>
                }
            </div>
        </main>
    );
};