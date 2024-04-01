![navigation](https://github.com/AdamSydnor/Vibes/assets/40744735/bbe750a0-6f13-4958-9ed6-441bc1ef198a)# Vibes is a create-your-own soundscape web application for networked, social engagement. 
It consists of 4 main parts:
- Sound Mixer
- Navigation
- Room
- Login and Registrations

## Login and Registrations
![vibes-login](https://github.com/AdamSydnor/Vibes/assets/40744735/35b8b625-133a-4ec2-84f7-722e80821275)
A user is prompted by a login and registration modal upon entering the website.

## Sound Mixer
![header](https://github.com/AdamSydnor/Vibes/assets/40744735/7549d7c2-a93f-40ca-ae2f-84afcf690bfc)

The sound mixer which we call the "Room Header" contains all of the sound components, such as
- playback
- pause
- reset sounds
- sound selection
- sound categories
- fx
- volume
- opening a live room

The sound mixer also includes a panel in which sounds can be saved into a playlist for saving, loading pre-saved soundscapes, loading a friend's soundscape, and editing a pre-existing soundscape.
![soundpanel](https://github.com/AdamSydnor/Vibes/assets/40744735/d517c13f-0702-43dc-999e-a258ed3aa24b)

## Navigation
![navigation](https://github.com/AdamSydnor/Vibes/assets/40744735/b1ab4a52-987f-427f-a427-5982d631dc7f)

The navigation bar is located on the right side of the page. It contains several components related to social engagement, such as:
- A search bar to look for all of the users on Vibes
- Adding Friends
- Viewing a friends list
- Seeing a friend's live room
- Chatroom for live rooms

The navigation bar also contains User Settings and a Logout button.

## User Settings
![vibes-setting](https://github.com/AdamSydnor/Vibes/assets/40744735/3f1fe230-1188-48b8-8646-01d7c50d5dd1)

The User settings contain Account settings available to a logged-in user. It displays a username and email account at the top of the panel. A drop-down list of a person's saved soundscapes can be deleted from the user settings. The user can also retrieve a code for their soundscape, which they can share with their friends. This soundscape code can be then loaded into the Sound mixer panel and retrieve all of their friend's sound data and settings. Other actions that can be performed in the user settings include:
- uploading a sound file
- assigning a sound file with a filename
- assigning a sound category
- upload button


## Developer Instructions
- npm i
- createdb vibes
- npm run dev

## Resources
- https://css-tricks.com/lets-create-a-custom-audio-player/
- https://www.youtube.com/watch?v=ZCvemsUfwPQ
- https://react.dev/reference/react/useRef
- https://novu.co/blog/building-a-chat-app-with-socket-io-and-react/
- https://www.youtube.com/watch?v=djMy4QsPWiI&t=679s
- https://codepen.io/andernunes/pen/VwBOvKN
- https://youtu.be/iCWZi1YeOes?si=7x1gknFfCr1A9YRV
