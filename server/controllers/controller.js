import {
    User,
    FriendsList,
    FriendRequest,
    Soundscape,
    SoundscapeSound,
    Sound,
    MySound,
    UserSoundscape
} from '../../database/model.js';
import { Sequelize } from 'sequelize';
import multer from 'multer';
import path from 'path';

async function getFriends(req, res) {
    if (req.session.user) {
        const userId = req.session.user.userId;
        const { Friends } = await User.findOne({
            where: {userId: userId},
            include: {
                model: User,
                as: 'Friends'
            }
        });
        const { Requests } = await User.findOne({
            where: {
                userId: userId
            },
            include: {
                model: User,
                as: 'Requests'
            }
        });
        res.status(200).json({
            myFriends: Friends,
            myRequests: requests,
        });
    } else {
        res.status(200).json({myFriends: null});
    };
};

async function findFriends(req, res) {
    if (req.session.user) {
        const { userId } = req.session.user;
        const userSearch = await User.findAll({
            where: {
                [Sequelize.Op.and]: [
                    {
                        userId: {
                            [Sequelize.Op.notIn]: [
                                Sequelize.literal(`SELECT friend_id FROM friends_lists WHERE user_id = ${userId}`)
                            ]
                        }
                    },
                    {
                        userId: {
                            [Sequelize.Op.ne]: userId
                        }
                    }
                ]
            }
        });
        res.status(200).json({
            userSearch: userSearch
        });
    } else {
        res.status(200).json({success: false});
    };
};

async function requestFriend(req, res) {
    if (req.session.user) {
        const prevReq = await FriendRequest.findOne({
            where: {
                requestorId: req.session.user.userId,
                requesteeId: req.body.requesteeId
            }
        });
        if (!prevReq) {
            await FriendRequest.create({
                requestorId: req.session.user.userId,
                requesteeId: req.body.requesteeId
            });
            res.status(200).json({success: true});
        } else {
            res.status(200).json({error: 'You have already sent a request to this user.'});
        };
    } else {
        res.status(200).json({success: false});
    };
};

async function respondToRequest(req, res) {
    const { accept, requestorId } = req.body;
    const { userId } = req.session.user;
    if (accept) {
        await FriendRequest.destroy({
            where: {
                requestorId: requestorId,
                requesteeId: userId
            }
        });
        await FriendsList.create({
            userId: userId,
            friendId: requestorId
        });
        await FriendsList.create({
            userId: requestorId,
            friendId: userId
        });
        res.status(200).json({success: true});
    } else if (!accept) {
        await FriendRequest.destroy({
            where: {
                requestorId: requestorId,
                requesteeId: userId
            }
        });
        res.status(200).json({success: true});
    } else {
        res.status(200).json({success: false});
    };
};

//Fetch the Logged In User details
const getUsers = async (req, res) => {
    if(req.session.user){
        let users = await User.findOne({
            where: {
                userId: req.session.user.userId
            }
        });
        res.json(users);
    } else{
        res.json({error: 'not logged in'});
    };
};

// Fetch sound data
const getSounds = async (req, res) => {
    let favs;
    if (req.session.user) {
        const { userId } = req.session.user;
        favs = await Soundscape.findAll({
            include: {
                model: Sound
            },
            where: {
                userId: userId
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
    console.log(req.body, "<----------- this is req.body");
    const { name, isPrivate, selectedSounds: { sound1, sound2, sound3, sound4 } } = req.body;
    if (req.session.user) {
        const user = req.session.user
        const newSoundscape = await Soundscape.create({
            userId: user.userId,
            name: name,
            isPrivate: isPrivate
        });
        
        const soundSave = async(sound) => {
            if (sound) {
                await SoundscapeSound.create({
                    soundscapeId: newSoundscape.soundscapeId,
                    soundId: sound.sound.soundId,
                    // volume: sound.fx.volume
                    //REMOVED DUE TO SERVER CRASHING
                });
            } else {
                return;
            };
        };
        if (sound1.sound) {
            soundSave(sound1);
        };
        if (sound2.sound) {
            soundSave(sound2);
        };
        if (sound3.sound) {
            soundSave(sound3);
        };
        if (sound4.sound) {
            soundSave(sound4);
        };
        res.status(200).json({success: true});
    } else {
        res.status(401).json({error: 'Must be logged in to save a soundscape.'});
    };
};

const deleteFav = async(req, res) => {

}

const deleteSoundscape = async(req, res) => {
    console.log(req.params, '<--------- this is req')

    const soundscapeId = req.params.id;

    await Soundscape.destroy({
        where: {
            soundscapeId: soundscapeId
        }
    });
    res.status(200).json({success: true});
};

//Upload Audio
const addAudio = async (req,res) => {

    const sound = {
        sound: req.file.path,
        userId:req.body.userId,
        name:req.body.name,
        type: req.body.type
    }
    const audio = await Sound.create(sound)
    res.status(200). send(audio)
    console.log(audio)

}

//Audio Controller
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb (null, 'public/audio');
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024},
    fileFilter: (req, file, cb) => {
        const fileType = /\.(mp3|wav|aac|ogg|flac)$/i;
        const extname = path.extname(file.originalname).toLowerCase();

        if (fileType.test(extname)) {
            return cb(null, true);
        }

        console.log('File rejected:', file.mimetype, extname);
        cb(new Error('Provide the proper file format to upload. MP3, WAV, AAC, OGG, and FLAC are supported.'), false);
    }
}).single('audio');

export {
    getFriends,
    findFriends,
    requestFriend,
    respondToRequest,
    getUsers,
    upload,
    addAudio,
    getSounds,
    postFavSounds,
    deleteFav,
    deleteSoundscape
};