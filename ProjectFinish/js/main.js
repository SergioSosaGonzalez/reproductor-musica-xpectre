const image = document.querySelector('img');
const titulo = document.getElementById('titulo');
const artista = document.getElementById('artista');

const progressContainer = document.getElementById('progressBar');
const progress = document.getElementById('progress');

const currentTimeElement = document.getElementById('tiempoActual');
const durationTime = document.getElementById('tiempoDuracion');

const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const songs = [
  {
    name: 'song1',
    displayName: 'Mon amour',
    artista: 'Zzoilo, Aitana',
  },
  {
    name: 'song2',
    displayName: 'Thunderstruck',
    artista: 'AC/DC',
  },
  {
    name: 'song3',
    displayName: 'Ya lo veia venir',
    artista: 'Moderatto',
  },
  {
    name: 'song4',
    displayName: 'Botella Tras Botella',
    artista: 'Gera MX, Christian Nodal',
  },
];

let isPlaying = false;

function playSong() {
  isPlaying = true;
  playBtn.setAttribute('name', 'pause');
  playBtn.setAttribute('titulo', 'pause');
  music.play();
}

function pauseSong() {
  isPlaying = false;
  playBtn.setAttribute('name', 'play');
  playBtn.setAttribute('titulo', 'play');
  music.pause();
}

playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
nextBtn.addEventListener('click', () => {
  nextSong();
});
prevBtn.addEventListener('click', () => {
  prevSong();
});

function loadSong(song) {
  titulo.textContent = song.displayName;
  artista.textContent = song.artista;
  music.src = `assets/${song.name}.mp3`;
  image.src = `assets/${song.name}.jpg`;
}

let songIndex = 0;
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex >= songs.length) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

loadSong(songs[songIndex]);

function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    const progressPorcent = (currentTime / duration) * 100;
    progress.style.width = `${progressPorcent}%`;
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }

    if (durationSeconds) {
      durationTime.textContent = `${
        durationMinutes < 10 ? '0' + durationMinutes : durationMinutes
      }:${durationSeconds}`;
    }
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    if (currentSeconds) {
      currentTimeElement.textContent = `${
        currentMinutes < 10 ? '0' + currentMinutes : currentMinutes
      }:${currentSeconds}`;
    }
  }
}

function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
