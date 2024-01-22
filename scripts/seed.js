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
        email: `test${i}@email.com`, 
        password:'test', 
    })
}

//SoundSeed
//Bio Evnviromental Sounds
const rain = await Sound.create({
    sound: '',
    type: 'Environment', 
})
const frogs = await Sound.create({
    sound: '',
    type: 'Environment',
})
const fireplace = await Sound.create({
    sound: '',
    type: 'Environment',
})
const oceanwaves = await Sound.create({
    sound: '',
    type: 'Environment',
})
//Ambient Sound
const cafe = await Sound.create({
    sound: '',
    type: 'Ambient', 
})
const traffic = await Sound.create({
    sound: '',
    type: 'Ambient', 
})
const playground = await Sound.create({
    sound: '',
    type: 'Ambient', 
})
const room = await Sound.create({
    sound: '',
    type: 'Ambient', 
})
//Music Sound
const music1 = await Sound.create({
    sound: '',
    type: 'Music', 
})
const music2 = await Sound.create({
    sound: '',
    type: 'Music', 
})
const music3 = await Sound.create({
    sound: '',
    type: 'Music', 
})
const music4 = await Sound.create({
    sound: '',
    type: 'Music', 
})