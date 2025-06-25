# 🎵 Spotify Clone - Web Music Player

Welcome to the **Spotify Clone Project**, a simplified web-based music player built using **HTML, CSS, and JavaScript**.  
This clone is inspired by the core features of Spotify but uses custom logic and **local files** to simulate a music experience.

---

## 🎧 Features

### ✅ Core Functionalities

- 🎶 **Dynamic Music Fetching**  
  Songs are dynamically loaded from local folder structure using JavaScript and `fetch()`.

- 🎼 **Custom Playlists**  
  Create your own playlists with titles, descriptions, and song lists using JSON metadata.

- 📜 **Dynamic Song List Rendering**  
  Songs appear dynamically on the page based on the selected playlist.

- 🎮 **Player Controls**  
  - Play / Pause  
  - Next / Previous track  
  - Loop toggle  
  - Seekbar to navigate within the track  
  - Live display of current time / total duration  

- 🔊 **Volume Control**  
  - Volume range slider  
  - Mute / Unmute button

- ⌨️ **Keyboard Shortcuts**  
  - `Space`: Play/Pause  
  - `ArrowRight`: Next song  
  - `ArrowLeft`: Previous song  
  - `ArrowUp`: Increase volume  
  - `ArrowDown`: Decrease volume

- 🎇 **Animated Equalizer**  
  Currently playing song is highlighted with an equalizer animation.

---

## 🗂️ Folder Structure

This is the expected structure of your project:

```plaintext
Spotify/
├── assets/            
│   └── cover.jpg    
├── css/                 
│   └── styles.css
├── js/                  
│   └── script.js
├── songs/               
│   └── Chill_(mood)/    
│       ├── info.json 
|       ├── cover.jpg 
│       ├── song1.mp3    
│       └── song2.mp3    
├── favicon.ico          
└── index.html           


---

## 📝 Setup Instructions

1. **Clone or Download** this repository.
2. Run the project using a local development server like **Live Server** in VS Code: http://127.0.0.1:5500/
> ⚠️ Note: `fetch()` will not work with `file://` protocol, so Live Server is required.
3. Add your own playlist folders in the `/songs/` directory.
4. Each playlist folder must include:
- `cover.jpg`: Playlist thumbnail  
- `info.json`: Metadata for title and description  
- One or more `.mp3` files

---

## 🛠️ Technologies Used

- **HTML5** – Markup structure  
- **CSS3** – Styling and layout  
- **JavaScript (Vanilla)** – Core logic and interactivity  
- **Fetch API** – To load songs and metadata dynamically

---

## 🚀 Planned Enhancements

- 🎙️ Display actual artist names from metadata  
- 📦 Save user preferences (volume/theme) using `localStorage`  
- 📱 Improved mobile responsiveness  
- 🔄 Drag-and-drop playlist ordering  
- 🌙 Light/Dark theme toggle

---

## 💡 Educational Purpose

This project is built for **learning purposes only**. It is not affiliated with or endorsed by Spotify.

---

## 📬 Feedback / Contributions

Contributions are welcome!  
Feel free to fork the repo, open pull requests, or submit issues.

---

Enjoy your custom-built music experience! 🎶
