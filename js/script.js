let currentsong = new Audio();
let songs;
let songUL;
let currFolder;

function secondsToMinutesSeconds(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return "00:00";
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
}

async function getsongs(folder) {
  currFolder = folder;
  let a = await fetch(`http://127.0.0.1:5500/Spotify/${folder}/`);
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split(`/${folder}/`)[1]);
    }
  }

  //Show all the songs in the playlists
  songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0];
  songUL.innerHTML = " ";
  for (const song of songs) {
    songUL.innerHTML =
      songUL.innerHTML +
      `<li>
    <img class="invert" src="images/music.svg" alt="">
    <div class="info">
      <div>${song.replaceAll("%20", " ")}</div>
      <div>Artist</div>   
    </div>
    <div class="playnow">
      Play Now
      <img src="images/play.svg" alt="">
    </div>
    <div class="equalizer" style="display: none;">
      <span></span><span></span><span></span><span></span>
    </div>
  </li>`;
  }
  //The above div(Artist) is for the artist name update it later on!

  //Attatch and event listner to each song
  let li = document.querySelector(".songlist").getElementsByTagName("li");
  Array.from(li).forEach((e) => {
    e.addEventListener("click", (element) => {
      playMusic(e.querySelector(".info").firstElementChild.innerHTML);
    });
  });
  return songs;
}

let playMusic = (track) => {
  currentsong.src = `./${currFolder}/` + track;
  currentsong.play();
  play.src = "images/pause.svg";
  document.querySelector(".songinfo").innerHTML = decodeURIComponent(track);
  document.querySelector(".songtime").innerHTML = "00:00 / 00:00";

  //Adding the equalizer to the music svg 
  let listItems = document.querySelectorAll(".songlist ul li");
  listItems.forEach((li) => {
    li.classList.remove("playing");
    let img = li.querySelector("img");
    img.src = "images/music.svg";
    img.classList.remove("equalizer");
  });

  // Highlight the current song
  listItems.forEach((li) => {
    if (
      li.querySelector(".info").firstElementChild.innerHTML.trim() ===
      decodeURIComponent(track).trim()
    ) {
      li.classList.add("playing");
      let img = li.querySelector("img");
      img.src = "images/equalizer.gif";
      img.classList.add("equalizer");
    }
  });
};

async function displayAlbums() {
  let a = await fetch(`http://127.0.0.1:5500/Spotify/songs`);
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let anchors = div.getElementsByTagName("a");
  let cardcontainer = document.querySelector(".cardcontainer");
  let array = Array.from(anchors);
  for (let index = 0; index < array.length; index++) {
    const e = array[index];

    if (e.href.includes("/Spotify/songs/")) {
      let folder = decodeURIComponent(
        e.href.split("/Spotify/songs/")[1].replace(/\/$/, "")
      );

      //getting the meta data
      let a = await fetch(
        `http://127.0.0.1:5500/Spotify/songs/${folder}/info.json`
      );

      let response = await a.json();

      console.log(response);
      cardcontainer.innerHTML =
        cardcontainer.innerHTML +
        `<div data-folder="${folder}" class="card">
                                <div class="play">
                                    <img src="images/play.svg" alt="play">
                                </div>
                                <img src="songs/${folder}/cover.jpg" alt="${response.title}">
                                <h3>${response.title}</h3>
                                <p>${response.description}</p>
                            </div>`;
    }
  }

  //Load the playlist when card is clicked
  Array.from(document.getElementsByClassName(" card")).forEach((e) => {
    e.addEventListener("click", async (item) => {
      songs = await getsongs(`songs/${item.currentTarget.dataset.folder}`);
      playMusic(songs[0]);
    });
  });
}

async function main() {
  await getsongs("songs/Chill_(mood)");
  // playMusic(songs[0],true) ---- This code start the song immediately without play

  displayAlbums();

  //Attatch an event listner to play, previous and next
  play.addEventListener("click", () => {
    if (currentsong.paused) {
      currentsong.play();
      play.src = "images/pause.svg";
    } else {
      currentsong.pause();
      play.src = "images/playbar.svg";
    }
  });

  //Listen for time update event
  currentsong.addEventListener("timeupdate", () => {
    document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(
      currentsong.currentTime
    )}/${secondsToMinutesSeconds(currentsong.duration)}`;
    document.querySelector(".circle").style.left =
      (currentsong.currentTime / currentsong.duration) * 100 + "%";
  });

  // Add an event listener to seekbar
  document.querySelector(".seekbar").addEventListener("click", (e) => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentsong.currentTime = (currentsong.duration * percent) / 100;
  });

  //Add an event listner to hamburger
  document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0";
  });

  //Add an event listner for close button
  document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".left").style.left = "-120%";
  });

  //Add an event for previous button
  document.querySelector("#previous").addEventListener("click", () => {
    console.log("clicked");
    let currentTrack = decodeURIComponent(currentsong.src.split("/").pop());
    let index = songs.findIndex(
      (song) => decodeURIComponent(song) === currentTrack
    );
    if (index - 1 >= 0) {
      playMusic(songs[index - 1]);
    }
  });

  //Add an event listner to next
  document.querySelector("#next").addEventListener("click", () => {
    console.log("nextclicked");
    let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0]);
    if (index + 1 < songs.length) {
      playMusic(songs[index + 1]);
    }
  });

  //Add an event listner for the voulume seekbar
  document
    .querySelector(".range")
    .getElementsByTagName("input")[0]
    .addEventListener("change", (e) => {
      console.log("setting volume to", e.target.value, " / 100");
      currentsong.volume = parseInt(e.target.value) / 100;
    });

  document.querySelector(".volume>img").addEventListener("click", (e) => {
    if (e.target.src.includes("volume.svg")) {
      e.target.src = e.target.src.replace("volume.svg", "mute.svg");
      currentsong.volume = 0;
      document
        .querySelector(".range")
        .getElementsByTagName("input")[0].value = 0;
    } else {
      e.target.src = e.target.src.replace("mute.svg", "volume.svg");
      currentsong.volume = 0.1;
      document
        .querySelector(".range")
        .getElementsByTagName("input")[0].value = 10;
    }
  });

  //This adds the Loop controler of the songs
  currentsong.addEventListener("ended", () => {
    if (isLooping) {
      // Repeat the same song
      currentsong.currentTime = 0;
      currentsong.play();
    } else {
      // Play next song in playlist
      let currentTrack = decodeURIComponent(currentsong.src.split("/").pop());
      let index = songs.findIndex(
        (song) => decodeURIComponent(song) === currentTrack
      );
      if (index + 1 < songs.length) {
        playMusic(songs[index + 1]);
      } else {
        playMusic(songs[0]);
      }
    }
  });

  //This shows the loop svg to change when clicked
  const loopBtn = document.getElementById("loopBtn");
  let isLooping = false; // Default: loop off

  loopBtn.addEventListener("click", () => {
    isLooping = !isLooping;

    if (isLooping) {
      loopBtn.classList.add("active");
      loopBtn.title = "";
      setTimeout(() => {
        loopBtn.title = "Disable Repeat";
      }, 10);
    } else {
      loopBtn.classList.remove("active");
      loopBtn.title = "";
      setTimeout(() => {
        loopBtn.title = "Enable Repeat";
      }, 10);
    }
  });

  //Adds kyboard control event
  document.addEventListener("keydown", (e) => {
    const activeTag = document.activeElement.tagName;
    if (["INPUT", "TEXTAREA"].includes(activeTag)) return;

    switch (e.code) {
      case "Space":
        e.preventDefault(); // Prevent scrolling
        if (currentsong.paused) {
          currentsong.play();
          play.src = "images/pause.svg";
        } else {
          currentsong.pause();
          play.src = "images/playbar.svg";
        }
        break;

      case "ArrowRight":
        e.preventDefault();
        let currIndexRight = songs.findIndex(
          (song) =>
            decodeURIComponent(song) ===
            decodeURIComponent(currentsong.src.split("/").pop())
        );
        if (currIndexRight + 1 < songs.length) {
          playMusic(songs[currIndexRight + 1]);
        }
        break;

      case "ArrowLeft":
        e.preventDefault();
        let currIndexLeft = songs.findIndex(
          (song) =>
            decodeURIComponent(song) ===
            decodeURIComponent(currentsong.src.split("/").pop())
        );
        if (currIndexLeft - 1 >= 0) {
          playMusic(songs[currIndexLeft - 1]);
        }
        break;

      case "ArrowUp":
        e.preventDefault();
        currentsong.volume = Math.min(1, currentsong.volume + 0.1);
        document.querySelector(".range input").value = currentsong.volume * 100;
        break;

      case "ArrowDown":
        e.preventDefault();
        currentsong.volume = Math.max(0, currentsong.volume - 0.1);
        document.querySelector(".range input").value = currentsong.volume * 100;
        break;
    }
  });
}
main();
