import {
    User,
    FriendsList,
    Soundscape,
    SoundscapeSound,
    Sound,
    MySound,
    UserSoundscape
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
        );
        res.json(users);
    } else{
        res.json({error: 'not logged in'});
    };
};

// Fetch sound data
const getSounds = async (req, res) => {
    const user = req.session.user;
    let favs;
    if (user) {
        favs = await Soundscape.findAll({
            include: {
                model: Sound
            },
            where: {
                userId: user.userId
            }
        });
    };

    const sounds = [
        {
            type: "Ambient",
            sounds: await Sound.findAll({
                where: {
                    type: "Ambient"
                }
            })
        },
        {
            type: "Environment",
            sounds: await Sound.findAll({
                where: {
                    type: "Environment"
                }
            })
        },
        {
            type: "Music",
            sounds: await Sound.findAll({
                where: {
                    type: "Music"
                }
            })
        }
    ];
    console.log(favs)
    res.status(200).json({
        success: true,
        sounds: sounds,
        favs: favs
    });
};

// This is how soundscape data should come in to be saved as a favorite soundscape:
// let selectedSounds = {
//     name: 'my favorite soundscape',
//     isPrivate: false,
//     userId: 1,
//     sounds: {
//         sound1: {
//             sound: {
//                 soundId: 1,
//                 sound: 'file-path',
//                 name: 'name',
//             },
//             fx: {
//                 volume: 100
//             }
//         },
//         sound2: {
//             sound: {},
//             fx: {}
//         },
//         sound3: {
//             sound: {},
//             fx: {}
//         },
//         sound4: {
//             sound: {},
//             fx: {}
//         },
//     }
// }

// Post favorite sounds
const postFavSounds = async(req, res) => {
    const { name, isPrivate, userId, sounds: { sound1, sound2, sound3, sound4 } } = req.selectedSounds;
    const newSoundscape = await Soundscape.create({
        userId: userId,
        name: name,
        isPrivate: isPrivate
    });
    const soundSave = async(sound) => {
        if (sound) {
            await SoundscapeSound.create({
                soundscapeId: newSoundscape.soundscapeId,
                soundId: sound.sound.soundId,
                volume: sound.fx.volume
            });
        } else {
            return;
        };
    };
    soundSave(sound1);
    soundSave(sound2);
    soundSave(sound3);
    soundSave(sound4);
    res.status(200).json({success: true});
};

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
    addAudio,
    getSounds,
    postFavSounds
};