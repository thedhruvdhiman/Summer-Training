const songData = [
  {
    songName: "Rolling In The Deep",
    song: "./Music/01 - Adele - Rolling in the Deep.mp3",
    songImg: "./asset/Adele.png",
    songAuthour: "Adele",
  },
  {
    songName: "Rumour Has It",
    song: "./Music/02 - Adele - Rumour Has It.mp3",
    songImg: "./asset/Adele.png",
    songAuthour: "Adele",
  },
  {
    songName: "Turning Tables",
    song: "./Music/03 - Adele - Turning Tables.mp3",
    songImg: "./asset/Adele.png",
    songAuthour: "Adele",
  },
  {
    songName: "Don't You Remember",
    song: "./Music/04 - Adele - Don't You Remember.mp3",
    songImg: "./asset/Adele.png",
    songAuthour: "Adele",
  },
  {
    songName: "Set Fire To The Rain",
    song: "./Music/05 - Adele - Set Fire to the Rain.mp3",
    songImg: "./asset/Adele.png",
    songAuthour: "Adele",
  },
  {
    songName: "He Won't Go",
    song: "./Music/06 - Adele - He Won't Go.mp3",
    songImg: "./asset/Adele.png",
    songAuthour: "Adele",
  },
  {
    songName: "Take It All",
    song: "./Music/07 - Adele - Take It All.mp3",
    songImg: "./asset/Adele.png",
    songAuthour: "Adele",
  },
  {
    songName: "I'll Be Waiting",
    song: "./Music/08 - Adele - I'll Be Waiting.mp3",
    songImg: "./asset/Adele.png",
    songAuthour: "Adele",
  },
  {
    songName: "One And Only",
    song: "./Music/09 - Adele - One and Only.mp3",
    songImg: "./asset/Adele.png",
    songAuthour: "Adele",
  },
  {
    songName: "Lovesong",
    song: "./Music/10 - Adele - Lovesong.mp3",
    songImg: "./asset/Adele.png",
    songAuthour: "Adele",
  },
  {
    songName: "Someone Like You",
    song: "./Music/11 - Adele - Someone Like You.mp3",
    songImg: "./asset/Adele.png",
    songAuthour: "Adele",
  },
  {
    songName: "If It Hadn't Been For Love",
    song: "./Music/12 - Adele - If It Hadn't Been For Love.mp3",
    songImg: "./asset/Adele.png",
    songAuthour: "Adele",
  },
  {
    songName: "Hiding My Heart",
    song: "./Music/13 - Adele - Hiding My Heart.mp3",
    songImg: "./asset/Adele.png",
    songAuthour: "Adele",
  },
  {
    songName: "I Found A Boy",
    song: "./Music/14 - Adele - I Found a Boy (Bonus Track).mp3",
    songImg: "./asset/Adele.png",
    songAuthour: "Adele",
  },
  {
    songName: "Someone Like You(Live Acoustic)",
    song: "./Music/15 - Adele - Someone Like You (Live Acoustic).mp3",
    songImg: "./asset/Adele.png",
    songAuthour: "Adele",
  },
  {
    songName: "Need You New(feat. Darius Rucker)",
    song: "./Music/16 - Adele - Need You Now (feat. Darius Rucker) (Live at CMT Artists of the Year Awards).mp3",
    songImg: "./asset/Adele.png",
    songAuthour: "Adele",
  },
  {
    songName: "Don't You Remember(Live Acoustic)",
    song: "./Music/17 - Adele - Don't You Remember (Live Acoustic).mp3",
    songImg: "./asset/Adele.png",
    songAuthour: "Adele",
  },
  {
    songName: "Turning Tables(Live Acoustic)",
    song: "./Music/18 - Adele - Turning Tables (Live Acoustic).mp3",
    songImg: "./asset/Adele.png",
    songAuthour: "Adele",
  },

];

const audioEl = document.getElementById("audio");

const prevEl = document.getElementById("prev");
const playEl = document.getElementById("play");
const forwardEl = document.getElementById("forward");
const currentTimeEl = document.getElementById("currentTime");
const totalTimeEl = document.getElementById("totalTime");
const progressFlowEl = document.getElementById("progressFlow");
const progressEl = document.getElementById("progress");

const logoEl = document.getElementById("logo");
const songNameEl = document.getElementById("songName");
const authorEl = document.getElementById("author");

// Icon

const playIcon = `<ion-icon name="play"></ion-icon>`;
const pauseIcon = `<ion-icon name="pause"></ion-icon>`;

// Functions

let songIndex = 0;
let isSongPaused = true;

function playNext() {
  songIndex = 1 + songIndex;
  if (songIndex > songData.length - 1) {
    songIndex = 0;
  }
  return updateSong(songIndex);
}

function playPrev() {
  songIndex = 1 - songIndex;
  if (songIndex < 0) {
    songIndex = songData.length - 1;
  }
  return updateSong(songIndex);
}

function updateSong(index) {
  audioEl.setAttribute("src", songData[index].song);

  logoEl.src = songData[index].songImg;
  songNameEl.innerHTML = songData[index].songName;
  authorEl.innerHTML = songData[index].songAuthour;
  audioEl.addEventListener("loadeddata", (e) => {
    return updateTime(e);
  });
  if (!isSongPaused) {
    playEl.innerHTML = pauseIcon;
    audioEl.play();
  }
}

function playMusic() {
  if (audioEl.paused) {
    audioEl.play();
    playEl.innerHTML = pauseIcon;
    isSongPaused = false;
  } else if (!audioEl.paused) {
    audioEl.pause();
    playEl.innerHTML = playIcon;
    isSongPaused = true;
  }
}

function updateTime(e) {
  const { currentTime, duration } = e.srcElement;

  // Current Time

  let currSeconds =
    JSON.parse(currentTime % 60) < 10
      ? `0${Math.floor(currentTime % 60)}`
      : `${Math.floor(currentTime % 60)}`;

  let currentMin =
    Math.floor(currentTime / 60) <= 9
      ? `0${Math.floor(currentTime / 60)}`
      : `${Math.floor(currentTime / 60)}`;

  currentTimeEl.innerHTML = `${currentMin}:${currSeconds}`;

  // Total Duration

  let totalDurationSecond =
    Math.floor(duration % 60) <= 9
      ? `0${Math.floor(duration % 60)}`
      : `${Math.floor(duration % 60)}`;

  let totalDurationMinute =
    Math.floor(duration / 60) <= 9
      ? `0${Math.floor(duration / 60)}`
      : `${Math.floor(duration / 60)}`;

  totalTimeEl.innerHTML = `${totalDurationMinute}:${totalDurationSecond}`;
}

function updateProgress(e) {
  const { currentTime, duration } = e.srcElement;

  let currentProgress = (currentTime / duration) * 100;

  progressFlowEl.style.width = `${currentProgress}%`;
}

function setProgress(e) {
  const progressWidth = this.clientWidth;
  const clickPos = e.offsetX;
  const audioDuration = audioEl.duration;
  audioEl.currentTime = (clickPos / progressWidth) * audioDuration;
}

// Change Song

forwardEl.addEventListener("click", playNext);
prevEl.addEventListener("click", playPrev);

playEl.addEventListener("click", playMusic);

audioEl.addEventListener("timeupdate", updateTime);

audioEl.addEventListener("timeupdate", updateProgress);

progressEl.addEventListener("click", setProgress);

audioEl.addEventListener("ended", playNext);

updateSong(songIndex);
