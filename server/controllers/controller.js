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
        const friends = await FriendsList.findAll({
            where: {
                friendId: userId
            },
            include: {
                model: User,
                attributes: ["username", "userId"]
            }
        });
        const requests = await FriendRequest.findAll({
            where: {
                requesteeId: userId
            },
            include: {
                model: User,
                attributes: ["username", "userId"]
            }
        });
        res.status(200).json({
            myFriends: friends,
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
                                Sequelize.literal(`(SELECT friend_id FROM friends_lists WHERE user_id = ${userId})`)
                                
                            ]
                        }
                    },{
                        userId:{
                            [Sequelize.Op.notIn]:[
                                Sequelize.literal(`(SELECT requestee_id FROM friend_requests WHERE user_id = ${userId})`)
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
                userId: req.session.user.userId,
                requesteeId: req.body.requesteeId
            }
        });
        if (!prevReq) {
            await FriendRequest.create({
                userId: req.session.user.userId,
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
    const { accept, requesteeId } = req.body;
    const { userId } = req.session.user;
    if (accept) {
        await FriendRequest.destroy({
            where: {
                userId: requesteeId,
                requesteeId: userId
            }
        });
        await FriendsList.create({
            userId: userId,
            friendId: requesteeId
        });
        await FriendsList.create({
            userId: requesteeId,
            friendId: userId
        });
        const friends = await FriendsList.findAll({
            where: {
                friendId: userId
            },
            include: {
                model: User,
                attributes: ["username", "userId"]
            }
        });
        const requests = await FriendRequest.findAll({
            where: {
                requesteeId: userId
            },
            include: {
                model: User,
                attributes: ["username", "userId"]
            }
        });
        res.status(200).json({
            myFriends: friends,
            myRequests: requests,
        });
    } else if (!accept) {
        await FriendRequest.destroy({
            where: {
                userId: requesteeId,
                requesteeId: userId
            }
        });
        const friends = await FriendsList.findAll({
            where: {
                friendId: userId
            },
            include: {
                model: User,
                attributes: ["username", "userId"]
            }
        });
        const requests = await FriendRequest.findAll({
            where: {
                requesteeId: userId
            },
            include: {
                model: User,
                attributes: ["username", "userId"]
            }
        });
        res.status(200).json({
            myFriends: friends,
            myRequests: requests,
        });
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
        favs: favs ?? null
    });
};


// Post favorite sounds
const postFavSounds = async(req, res) => {
    console.log(req.body, "<----------- this is req.body");
    const { name, isPrivate, selectedSounds: { sound1, sound2, sound3, sound4 } } = req.body;

    const characters = '0123456789abcdef';
    const genSoundCode = () => {
        let result = '';
        for (let i = 0; i < 20; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        };
        return result;
    };
    const result = genSoundCode();
    console.log(result);

    if (req.session.user) {
        const user = req.session.user;
        const newSoundscape = await Soundscape.create({
            userId: user.userId,
            name: name,
            isPrivate: isPrivate,
            soundCode: result
        });
        
        const soundSave = async(sound) => {
            if (sound) {
                await SoundscapeSound.create({
                    soundscapeId: newSoundscape.soundscapeId,
                    soundId: sound.sound.soundId,
                    volume: Number(sound.fx.volume),
                    speed: Number(sound.fx.speed)
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
        if (req.body.selectedId) {
            await Soundscape.destroy({
                where: {soundscapeId: req.body.selectedId}
            });
            newSoundscape.soundCode = req.body.soundCode;
            newSoundscape.save();
        };
        res.status(200).json({success: true});
    } else {
        res.status(401).json({error: 'Must be logged in to save a soundscape.'});
    };
};

const repostFavSounds = async(req, res) => {
};

const getFav = async(req, res) => {
    const { id } = req.body;
    let mySoundscape = await Soundscape.findOne({
        where: {soundscapeId: id}
    });
    res.status(200).json({soundCode: mySoundscape.soundCode});
};

const accessFav = async(req, res) => {
    const { userId } = req.session.user;
    const { code } = req.body;
    const alreadyAccessed = await Soundscape.findOne({
        where: {
            userId: userId,
            soundCode: code
        }
    });
    if (!alreadyAccessed) {
        const myNewSound = await Soundscape.findOne({
            where: {soundCode: code},
            include: {model: Sound}
        });
        console.log(myNewSound);
        const mynewSoundscape = await Soundscape.create({
            userId: userId,
            name: myNewSound.name,
            isPrivate: myNewSound.isPrivate,
            soundCode: myNewSound.soundCode
        });
        const soundSave2 = async(sound) => {
            if (sound.sound) {
                await SoundscapeSound.create({
                    soundscapeId: mynewSoundscape.soundscapeId,
                    soundId: sound.soundId,
                    volume: Number(sound.soundscapeSound.volume),
                    speed: Number(sound.soundscapeSound.speed)
                });
            } else {
                return;
            };
        };
        if (myNewSound.sounds[0]) {
            soundSave2(myNewSound.sounds[0]);
        };
        if (myNewSound.sounds[1]) {
            soundSave2(myNewSound.sounds[1]);
        };
        if (myNewSound.sounds[2]) {
            soundSave2(myNewSound.sounds[2]);
        };
        if (myNewSound.sounds[3]) {
            soundSave2(myNewSound.sounds[3]);
        };
        res.status(200).json({success: true});
    } else {
        res.status(200).json({error: 'You have already accessed this soundscape'});
    };
};

const deleteFav = async(req, res) => {

};

const deleteSoundscape = async(req, res) => {
    console.log(req.params, '<--------- this is req');

    const soundscapeId = req.params.id;

    await Soundscape.destroy({
        where: {
            soundscapeId: soundscapeId
        }
    });
    const newFavs = await Soundscape.findAll({
        where: {userId: req.session.user.userId}
    });
    res.status(200).json({newFavs: newFavs});
};

const deleteFriend = async(req,res)=>{
    console.log(req.params, '<--------- this is req')
    const { userId } = req.session.user;
    const friendId = req.params.id

    await FriendsList.destroy({
        where: {
            userId: friendId,
            friendId: userId
        }     
    });
    
    await FriendsList.destroy({
        where:{
            userId: userId,
            friendId: friendId
        }
    })

    const friends = await FriendsList.findAll({
        where: {
            friendId: userId
        },
        include: {
            model: User,
            attributes: ["username", "userId"]
        }
    });
    console.log(friends)
    res.status(200).json({myFriends:friends});
}

//Upload Audio
const addAudio = async (req,res) => {
console.log(req.file)
    const sound = {
        sound: req.file.path ,
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
    limits: { fileSize: 10 * 4024 * 4024},
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
    repostFavSounds,
    getFav,
    accessFav,
    deleteFav,
    deleteSoundscape,
    deleteFriend
};