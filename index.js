const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    volumeSlider = document.getElementById('volume-slider'),
    background = document.getElementById('bg-img');

const music = new Audio (); 

const songs = [
    {
        path: 'Opus/Metro Boomin, John Legend - On Time (Visualizer) (152kbit_Opus).opus',
        displayName: 'On Time (with John Legend)',
        cover: 'Thumbnails/Heroes and Villains.webp',
        artist: 'Metro Boomin, John Legend',
    },
    {      
        path: 'Opus/Metro Boomin & Future - Superhero (Heroes & Villains) [Official Music Video] (152kbit_Opus).opus',
        displayName: 'Superhero (Heroes and Villains) [with Future & Chris Brown]',
        cover: 'Thumbnails/Heroes and Villains.webp',
        artist: 'Metro Boomin, Future, Chris Brown',
    },
    {      
        path: 'Opus/Metro Boomin, Future - Too Many Nights (Visualizer) ft. Don Toliver (152kbit_Opus).opus',
        displayName: 'Too Many Nights (feat Don Toliver & with Future',
        cover: 'Thumbnails/Heroes and Villains.webp',
        artist: 'Metro Boomin, Future, Don Toliver',
    },
    {      
        path: 'Opus/Metro Boomin, Travis Scott - Raindrops (Insane) (Visualizer) (152kbit_Opus).opus',
        displayName: 'Raindrops (Insane) [with Travis Scott]',
        cover: 'Thumbnails/Heroes and Villains.webp',
        artist: 'Metro Boomin, Travis Scott',
    },
    {      
        path: 'Opus/Metro Boomin, 21 Savage, Young Nudy - Umbrella (Visualizer) (128kbit_AAC).m4a',
        displayName: 'Umbrella (with 21 Savage & Young Nudy',
        cover: 'Thumbnails/Heroes and Villains.webp',
        artist: 'Metro Boomin, 21 Savage, Young Nudy',
    },
    {      
        path: 'Opus/Metro Boomin, Travis Scott, Young Thug - Trance (Visualizer) (152kbit_Opus).opus',
        displayName: 'Trance (with Travis Scott & Young Thug',
        cover: 'Thumbnails/Heroes and Villains.webp',
        artist: 'Metro Boomin, Travis Scott, Young Thug',
    },
    {
        path: 'Opus/Metro Boomin - Around Me (Visualizer) ft. Don Toliver (152kbit_Opus).opus',
        displayName: 'Around Me (feat Don Toliver)',
        cover: 'Thumbnails/Heroes and Villains.webp',
        artist: 'Metro Boomin, Don Toliver',
    },
    {
        path: 'Opus/Metro Boomin, Young Thug - Metro Spider (Visualizer) (152kbit_Opus).opus',
        displayName: 'Metro Spider (with Young Thug)',
        cover: 'Thumbnails/Heroes and Villains.webp',
        artist: 'Metro Boomin, Young Thug',
    },
    {
        path: "Opus/Metro Boomin, Future - I Can't Save You (Interlude) (Visualizer) ft. Don Toliver (128kbit_AAC).m4a",
        displayName: "I Can't Save You (interlude) [with Future, Don Toliver]",
        cover: 'Thumbnails/Heroes and Villains.webp',
        artist: 'Metro Boomin, Future, Don Toliver',
    },
    {
        path: "Opus/Metro Boomin, The Weeknd, 21 Savage - Creepin' (Visualizer) (152kbit_Opus).opus",
        displayName: "Creepin' (with The Weeknd & 21 Savage)",
        cover: 'Thumbnails/Heroes and Villains.webp',
        artist: 'Metro Boomin, The Weeknd, 21 Savage',
    },

    {
        path: 'Opus/Metro Boomin, Travis Scott, 21 Savage - Niagara Falls (Foot or 2) (Visualizer) (152kbit_Opus).opus',
        displayName: 'Niagara Falls (Foot or 2) [with Travis Scott, 21 Savage)',
        cover: 'Thumbnails/Heroes and Villains.webp',
        artist: 'Metro Boomin, Travis Scott, 21 Savage',
    },
    {
        path: "Opus/Metro Boomin, 21 Savage - Walk Em Down (Don't Kill Civilians) (Visualizer) ft. Mustafa (152kbit_Opus).opus",
        displayName: "Walk Em Down (Don't Kill Civilians) [with 21 Savage & Mustafa",
        cover: 'Thumbnails/Heroes and Villains.webp',
        artist: 'Metro Boomin, 21 Savage, Mustafa',
    },
    {
        path: "Opus/Metro Boomin, Travis Scott, Future - Lock On Me (Visualizer) (152kbit_Opus).opus",
        displayName: "Lock On Me (with Travis Scott & Future)",
        cover: 'Thumbnails/Heroes and Villains.webp',
        artist: 'Metro Boomin, Travis Scott, Future ',
    },
    {
        path: "Opus/Metro Boomin, A$AP Rocky - Feel The Fiyaaaah (Visualizer) ft. Takeoff (128kbit_AAC).m4a",
        displayName: "Feel The Fiyaaaah (with A$AP Rocky & feat Takeoff)",
        cover: 'Thumbnails/Heroes and Villains.webp',
        artist: 'Metro Boomin, A$AP Rocky, Takeoff',
    },
    {
        path: "Opus/Metro Boomin, Gunna - All The Money (Visualizer) (152kbit_Opus).opus",
        displayName: "All The Money (with Gunna) [Bonus]",
        cover: 'Thumbnails/Heroes and Villains.webp',
        artist: 'Metro Boomin, Gunna',
    },
];

let musicIndex = 0
let isPlaying = false;

function togglePlay (){
    if(isPlaying){
        pauseMusic();
    }else {
        playMusic();
    }
}

function playMusic(){
    isPlaying = true;
    
    playBtn.classList.replace('fa-play', 'fa-pause')

    playBtn.setAttribute('title', 'Pause');
    music.play();

};

function pauseMusic(){
    isPlaying = false;
    
    playBtn.classList.replace('fa-pause', 'fa-play')

    playBtn.setAttribute('title', 'Play');
    music.pause();
};

function loadMusic(song){
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    console.log('setProgressBar called');
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

function updateVolume(volume) {
    music.volume = volume;
    nextMusic.volume = volume;
}

volumeSlider.addEventListener('input', () => {
    music.volume = volumeSlider.value;
    nextMusic.volume = volumeSlider.value;
});


playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);