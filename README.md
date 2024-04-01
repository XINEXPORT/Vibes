# Vibes is a create your own soundscape web application for networked, social engagement . It consist of 4 main parts:
- Sound Mixer
- Navigation
- Room
- Login and Registrations

## Login and Registrations
A user is prompted by a login and registeration modal upon entering the website. 

## Sound Mixer
The sound mixer in which we call the "Room Header" contains all of the sound components, such as
- playback
- pause
- reset sounds
- sound selection
- sound categories
- fx
- volume
- opening a live room

The sound mixer also includes a panel in which sounds can be saved into a playlist for saving, loading pre-saved soundscapes,loading friend's soundscaped, and editing a pre-existing soundscape.

## Navigation
The navigation bar is located on the right side of the page. It contains several components related to social engagement, such as:
- A search bar to look for all of the users on Vibes
- Adding Friends
- Viewing a friends list
- Seeing a friend's live room
- Chatroom for live rooms

The navigation bar also contains User Settings and a Logout button.

## User Settings
The User settings contains Account settings available to a logged in user. It displays a username and email account at the top of the panel. A drop down list of a person's saved soundscapes can be deleted from the user settings. As user can also retrieve a code for their soundscape, in which they can share to their friends. This soundscape code can be then loaded into the Sound mixer panel and retrieve all of their friend's sound data and settings. Other actions that can be perfrmed in the user settings include:
-uploading a sound file
-assigning a sound file with a filename
-assigning a sound category
-upload button


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