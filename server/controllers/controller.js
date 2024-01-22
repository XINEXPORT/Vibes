import {
    User,
    FriendsList,
    Soundscape,
    SoundscapeSound,
    Sound,
    MyFavoriteSoundscape
} from '../../database/model.js';

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

export {
    getFriends
};