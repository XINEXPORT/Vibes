import {
    User,
    FriendsList,
    Soundscape,
    SoundscapeSound,
    Sound,
    MyFavoriteSoundscape
} from '../../database/model.js';
import multer from 'multer'
import path from 'path'

async function getFriends(req, res) {
    if (req.session.user) {
        const myFriends = await FriendsList.findAll({
            where: {userId: req.session.user.userId},
            include: {model: User}
        });
        res.status(200).json({
            myFriends: myFriends
        });
    } else {
        res.status(401).json({success: false});
    };
};

//Fetch the Logged In user details
const getUsers = async (req,res) => {
    if(req.session.user){
        let users = await User.findOne(
            {where:{
                userId: req.session.user.userId
            }}
        )
        res.json(users)
    } else{
        res.json({error: 'not logged in'})
    }
}

export {
    getFriends,
    getUsers
};