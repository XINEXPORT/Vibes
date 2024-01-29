import './AddFriendModal.css'

const AddFriendModal = ({searchInput, setSearchInput, friendReqList, setFriendReqList, userId, username})=>{


    return(
        <div>
        <label>Search Friends</label>
        <input
        placeholder="type friend name"
        onChange = {()=>{}}
        ></input>
        <button>Send Friend Request</button>
        <button>Cancel</button>
        </div>
    )
}

export default AddFriendModal