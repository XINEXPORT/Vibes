import './AccountNav.css';
import { useDispatch, useSelector } from "react-redux";
import { BsFillGearFill } from "react-icons/bs";
import { useLoaderData } from "react-router";

export default function AccountNav() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    console.log(user)
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

    return (
        <main className="account-nav">
            <div className="account">
                <h2>{user ? user.username : 'Guest'}</h2>
                <button className="settings-btn" onClick={() => {}}><BsFillGearFill className='cog'/></button>
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