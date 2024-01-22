import { useSelector } from "react-redux";
import { BsFillGearFill } from "react-icons/bs";
import { useLoaderData } from "react-router";

export default function AccountNav() {
    let user = useSelector(state => state.user);
    console.log(useLoaderData());
    const data = useLoaderData()
    console.log(data);
 
    if(!data){
        const myFriends=[{username: "you have no friends"}]
    } else{
        const {myFriends} = data;

    }
    const friendsList = myFriends.map((friend) => {
        const { username } = friend;
        return <p>{username}</p>
    });

    return (
        <main className="account-nav">
            <div className="account">
                <h2>{user.username}</h2>
                <button className="settings-btn" onClick={() => {}}><BsFillGearFill/></button>
            </div>
            <div className="add-friend">
                <button className="add-friend-btn" onClick={() => {}}>Add friend</button>
            </div>
            <div className="friends-list">
                {friendsList}
            </div>
        </main>
    );
};