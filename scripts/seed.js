import {Op} from 'sequelize';
import {db, User, Sound, Soundscape, SoundscapeSound, MySound, UserSoundscape, FriendsList} from '../database/model.js';

await db.sync ({force: true});

//Users Seed
let arr = [{
    username: 'jsmith',
},{
    username: 'hsmith',
},{
    username: 'asmith',
},{
    username: 'csmith',
},{
    username: 'asydnor',
}, {
    username: 'choang'
}];

for (let i=0; i < arr.length; i++){
    await User.create({
        username: arr[i].username,
        email: `test${i}@email.com`,
        password:'test',
    });
};

const guyFieti = await User.create({
    username: 'Guy Fieri',
    email: `Guy@email.com`,
    password:'DD&Dives',
});

await FriendsList.create({
    userId: 1,
    friendId: 2
});

await FriendsList.create({
    userId: 2,
    friendId: 1
});

await FriendsList.create({
    userId: 2,
    friendId: 3
});

await FriendsList.create({
    userId: 3,
    friendId: 2
});

await FriendsList.create({
    userId: 3,
    friendId: 4
});

await FriendsList.create({
    userId: 4,
    friendId: 3
});

await FriendsList.create({
    userId: 4,
    friendId: 5
});

await FriendsList.create({
    userId: 5,
    friendId: 4
});


//SoundSeed
//Bio Evnviromental Sounds
const rain = await Sound.create({
    sound: './public/audio//environmental/rain-ambience-1.mp3',
    name: 'Rain 1',
    type: 'Environment', 
})
const river = await Sound.create({
    sound: './public/audio//environmental/river-ambience-1.mp3',
    name: 'River 1',
    type: 'Environment',
})
const fireplace = await Sound.create({
    sound: './public/audio//environmental/fireplace-ambience-1.mp3',
    name: 'Fireplace 1',
    type: 'Environment',
})
const oceanwaves = await Sound.create({
    sound: './public/audio//environmental/ocean-ambience-1.mp3',
    name: 'Ocean 1',
    type: 'Environment',
})
//Ambient Sound
const cafe = await Sound.create({
    sound: './public/audio/ambient/coffee-shop-ambience-1.mp3',
    name: 'Cafe 1',
    type: 'Ambient', 
})
const traffic = await Sound.create({
    sound: './public/audio/ambient/street-ambience-1.mp3',
    name: 'Traffic 1',
    type: 'Ambient', 
})
const playground = await Sound.create({
    sound: './public/audio/ambient/park-ambience-1.mp3',
    name: 'City Park 1',
    type: 'Ambient',
})
const room = await Sound.create({
    sound: './public/audio/ambient/room-ambience-1.mp3',
    name: 'Room 1',
    type: 'Ambient', 
})
//Music Sound
const music1 = await Sound.create({
    sound: './public/audio/music/howls-moving-castle-theme.mp3',
    name: 'HMC',
    type: 'Music', 
})
const music2 = await Sound.create({
    sound: './public/audio/music/whirling-in-rags-8am.mp3',
    name: 'Whiling-in-Rags 8am',
    type: 'Music', 
})
const music3 = await Sound.create({
    sound: './public/audio/music/gris-pt1.mp3',
    name: 'Gris Pt-1',
    type: 'Music', 
})
const music4 = await Sound.create({
    sound: './public/audio/music/house-of-woodcock.mp3',
    name: 'House of Woodcock',
    type: 'Music', 
})

const guySoundscape1 = await guyFieti.createSoundscape({
    name: 'Flavortown 1',
    isPrivate: false
});

const guySoundscape2 = await guyFieti.createSoundscape({
    name: 'Flavortown 2',
    isPrivate: false
});

const guySoundscape3 = await guyFieti.createSoundscape({
    name: 'Flavortown 3',
    isPrivate: false
});

const guySoundscape4 = await guyFieti.createSoundscape({
    name: 'Flavortown 4',
    isPrivate: false
});

const guySoundscape5 = await guyFieti.createSoundscape({
    name: 'Flavortown 5',
    isPrivate: false
});

await SoundscapeSound.create({
    soundscapeId: guySoundscape1.soundscapeId,
    soundId: music4.soundId
});

await SoundscapeSound.create({
    soundscapeId: guySoundscape1.soundscapeId,
    soundId: fireplace.soundId
});

await SoundscapeSound.create({
    soundscapeId: guySoundscape1.soundscapeId,
    soundId: rain.soundId
});

await SoundscapeSound.create({
    soundscapeId: guySoundscape2.soundscapeId,
    soundId: music2.soundId
});

await SoundscapeSound.create({
    soundscapeId: guySoundscape2.soundscapeId,
    soundId: oceanwaves.soundId
});

await SoundscapeSound.create({
    soundscapeId: guySoundscape3.soundscapeId,
    soundId: music1.soundId
});

await SoundscapeSound.create({
    soundscapeId: guySoundscape3.soundscapeId,
    soundId: cafe.soundId
});

await SoundscapeSound.create({
    soundscapeId: guySoundscape4.soundscapeId,
    soundId: music3.soundId
});

await SoundscapeSound.create({
    soundscapeId: guySoundscape4.soundscapeId,
    soundId: river.soundId
});

await SoundscapeSound.create({
    soundscapeId: guySoundscape5.soundscapeId,
    soundId: playground.soundId
});

await SoundscapeSound.create({
    soundscapeId: guySoundscape5.soundscapeId,
    soundId: traffic.soundId
});

await SoundscapeSound.create({
    soundscapeId: guySoundscape5.soundscapeId,
    soundId: room.soundId
});