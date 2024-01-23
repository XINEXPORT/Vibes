import {
    User,
    FriendsList,
    Soundscape,
    SoundscapeSound,
    Sound,
    MyFavoriteSoundscape,
    MySound
} from '../../database/model.js';
import multer from 'multer';
import path from 'path';

async function getFriends(req, res) {
    if (req.session.user) {
        const id = req.session.user.userId;
        const myFriends = await User.findAll({
            where: {
                userId: id
            },
            include: {
                model: User,
                as: 'friend'
            }
        });
        res.status(200).json({
            myFriends: myFriends[0].friend
        });
    } else {
        res.status(401).json({success: false});
    };
};

//Fetch the Logged In User details
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
//Upload Audio
const addAudio = async (req,res) => {

    const sound = {
        sound: req.file,
        type: req.body.type
    }
    const audio = await MySound.create(info)
    res.status(200). send(audio)
    console.log(audio)

}

//Audio Controller
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb (null, 'public/audio');
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage: storage,
    limits: {fileSize: '5000000'},
    fileFilter: (req, file, cb) =>{
        const fileType = /mp3|wav|aac|ogg|flac|/
        const mimetype =fileType.test(file.mimetype)
        const extname = fileType.test(path.extname(file.originalname))

        if(mimetype && extname){
            return cb(null,true)
        }
        cb ('Provide the proper file format to upload. MP3, WAV, AACC, OGG, and FLAC are supported.')
    }
    }).array('sound', 3)

export {
    getFriends,
    getUsers,
    upload,
    addAudio
};