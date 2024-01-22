import {Op} from 'sequelize'
import {db, User, Sound, Soundscape, SoundscapeSound, MySound, MyFavoriteSoundscape, FriendsList} from '../database/model.js'

await db.sync ({force:true})

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
}]

for (let i=0; i < arr.length; i++){
    await User.create({
        username: `user${i}`,
        email: `test${i}@email.com`, 
        password:'test', 
    })
}

//SoundSeed
//Bio Evnviromental Sounds
const rain = await Sound.create({
    sound: './public/audio//environmental/rain-ambience-1.mp3',
    type: 'Environment', 
})
const river = await Sound.create({
    sound: './public/audio//environmental/river-ambience-1.mp3',
    type: 'Environment',
})
const fireplace = await Sound.create({
    sound: './public/audio//environmental/fireplace-ambience-1.mp3',
    type: 'Environment',
})
const oceanwaves = await Sound.create({
    sound: './public/audio//environmental/ocean-ambience-1.mp3',
    type: 'Environment',
})
//Ambient Sound
const cafe = await Sound.create({
    sound: './public/audio/ambient/coffee-shop-ambience-1.mp3',
    type: 'Ambient', 
})
const traffic = await Sound.create({
    sound: './public/audio/ambient/street-ambience-1.mp3',
    type: 'Ambient', 
})
const playground = await Sound.create({
    sound: './public/audio/ambient/park-ambience-1.mp3',
    type: 'Ambient', 
})
const room = await Sound.create({
    sound: './public/audio/ambient/room-ambience-1.mp3',
    type: 'Ambient', 
})
//Music Sound
const music1 = await Sound.create({
    sound: './public/audio/music/howls-moving-castle-theme.mp3',
    type: 'Music', 
})
const music2 = await Sound.create({
    sound: './public/audio/music/whirling-in-rags-8am.mp3',
    type: 'Music', 
})
const music3 = await Sound.create({
    sound: './public/audio/music/gris-pt1.mp3',
    type: 'Music', 
})
const music4 = await Sound.create({
    sound: './public/audio/music/house-of-woodcock.mp3',
    type: 'Music', 
})