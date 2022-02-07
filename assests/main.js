const playBtn = document.querySelector('.play-inner');
const nextBtn = document.querySelector('.play-forward');
const prevBtn = document.querySelector('.play-backward');
const song = document.getElementById('song');
const timerLeft = document.querySelector('.timer__left');
const timerRight = document.querySelector('.timer__right');
const playRepeat = document.querySelector('.play-repeat');
const rangeBar = document.querySelector('.range');
const playList = document.querySelector('.playlist-list');
const shuffle = document.querySelector('.shuffle-song');
const musics = [{
        id: 0,
        number: '01',
        file: 'How Long - Charlie Puth.mp3',
        title: 'How Long',
        artist: 'Charlie Puth',
        time: '3:20',
        active: false,

    },
    {
        id: 1,
        number: '02',
        file: 'Love It When You Hate Me - Avril Lavigne.mp3',
        title: 'Love It When You Hate Me',
        artist: 'Avril Lavigne',
        time: '2:24',
        active: false,

    },
    {
        id: 2,
        number: '03',
        file: 'Shape of You - J_Fla.mp3',
        title: 'Shape of You',
        artist: 'J_Fla',
        time: '2:53',
        active: false,

    },
    {
        id: 3,
        number: '04',
        file: 'That Girl - Olly Murs.mp3',
        title: 'That Girl',
        artist: 'Olly Murs',
        time: '2:57',
        active: false,

    },
    {
        id: 4,
        number: '05',
        file: 'Toxic - BoyWithUke.mp3',
        title: 'Toxic',
        artist: 'BoyWithUke',
        time: '2:48',
        active: false,

    },
];


// ============================== Set mac dinh bai 1============================
let indexSong = 0;
song.setAttribute('src', `./assests/mp3/${musics[indexSong].file}`);




// ============================== Them bai hat ============================
for (var i = 0; i < musics.length; i++) {
    playList.insertAdjacentHTML('beforeend',
            `<div class="playlist playlist--hover ${i === indexSong ? 'active' : ''}" data-index=${musics[i].id}>
            <p class=" playlist__number">${i === indexSong? '<i class="fas fa-volume-up"></i>' : `${musics[i].number}`}</p>
            <p class=" playlist__title">${musics[i].title}</p>
            <p class=" playlist__artist">${musics[i].artist}</p>
            <p class=" playlist__time">${musics[i].time}</p>
        </div>`)
}




// ============================== Reset lai khi chon bai ============================
function resetSong(dir) {
    dir = Number (dir);
    playList.innerHTML =`
    <div class="playlist playlist-list__title">
        <p class="playlist__number">#</p>
        <p class="playlist__title">TITLE</p>
        <p class="playlist__artist">ARTIST</p>
        <p class="playlist__time">TIME</p>
    </div>`;
    for (var j = 0 ;j< musics.length; j++) {
        playList.insertAdjacentHTML( 'beforeend',
       `<div class="playlist playlist--hover ${j === dir ? 'active' : ''}" data-index=${musics[j].id}>
            <p class=" playlist__number">${j === dir? '<i class="fas fa-volume-up"></i>' : `${musics[j].number}`}</p>
            <p class=" playlist__title">${musics[j].title}</p>
            <p class=" playlist__artist">${musics[j].artist}</p>
            <p class=" playlist__time">${musics[j].time}</p>
        </div>`)
    }
}
// ============================== Phat-Dung ============================
let isPlaying = true;
playBtn.addEventListener('click', playPause)
function playPause() {
    if (isPlaying) {
        playBtn.innerHTML = `<i class="fas fa-pause-circle pause-icon main-icon main-icon--big"></i>`;
        song.play();
        isPlaying = false;
    } else{
        playBtn.innerHTML = `<i class="fas fa-play-circle play-icon main-icon main-icon--big"></i>`;
        song.pause();
        isPlaying = true;
    }
}


// ============================== Phat lai ============================
var isRepeat = false;
playRepeat.addEventListener('click',  function() {
    if(playRepeat.style.color != 'yellow') {
        playRepeat.style.color = 'yellow';
        playRepeat.style.webkitTransform = 'rotate(360deg)';
        isRepeat = true;
    }else {
        playRepeat.style.color = '#676669';
        playRepeat.style.webkitTransform = 'rotate(0)';
        isRepeat = false;
    }
});




// ============================== Doi bai ============================
nextBtn.addEventListener('click',function() {
    if (isShuffle == true) changeSong(3);
    else changeSong(1);
});
prevBtn.addEventListener('click', function() {
    if (isShuffle == true) changeSong(3);
    else changeSong(-1);
});

function changeSong(dir) {
    if (dir === 1) { //next
        indexSong++;
        if (indexSong >= musics.length) {
            indexSong = 0;
        }
    } else if (dir === -1) { //prev
        indexSong--;
        if (indexSong < 0) {
            indexSong = musics.length-1;
        }
    } else if(dir === 3) {
        indexSong = Math.floor(Math.random() * 5);  
    }
    resetSong(indexSong);
    playBtn.innerHTML = `<i class="fas fa-pause-circle pause-icon main-icon main-icon--big"></i>`;
    song.setAttribute('src', `./assests/mp3/${musics[indexSong].file}`); 
    song.play();
}



//============================== Set tg phat nhac============================
function displayTimer() {
   
    const { duration, currentTime } = song;
    timerRight.textContent = formatTimer(duration);
    timerLeft.textContent = formatTimer(currentTime);
    rangeBar.max = duration;
    rangeBar.value = currentTime;
}




// ==============================Format lai thoi gian chay============================
function formatTimer(number) {
    const minutes = Math.floor(number / 60);
    const seconds = Math.floor(number - minutes * 60);
    if (seconds < 10) return `${minutes}:0${seconds}`;
    else return `${minutes}:${seconds}`;
}


// ============================== Thay doi khi click ============================
rangeBar.addEventListener('change',changeBar);
function changeBar() {
    song.currentTime = rangeBar.value; 
}


// ============================== Phat bai tiep khi ket thuc ============================
song.addEventListener('ended', function() {
    if (isRepeat == true) { // Phát lại bài hát
        isPlaying = true;
        playPause();
    } else changeSong(1); // Phát tiếp
});



// ============================== Chon bai trong danh sach ============================
playList.onclick = function(e) {
    
    const songNote = e.target.closest('.playlist--hover:not(.active)'); 
    let songNoteindex = songNote.getAttribute('data-index'); // lấy data-index
    indexSong = songNoteindex ;
    isPlaying = false;
    
    playBtn.innerHTML = `<i class="fas fa-pause-circle pause-icon main-icon main-icon--big"></i>`;
    song.setAttribute('src', `./assests/mp3/${musics[indexSong].file}`); 
    song.play();
    resetSong(songNoteindex);

};



//  ==============================Xoa Bai Hat ============================

shuffle.addEventListener('click', shuffleSong);
var isShuffle = false;
function shuffleSong() {
    if (isShuffle == false) {
        isShuffle = true;
        shuffle.style.color = 'yellow';
        changeSong(3);
    }
    else{
        isShuffle = false;
        shuffle.style.color = '#676669';

    }
}




//   ============================== Tim ============================

const heartBtn = document.getElementById('heart');
heartBtn.addEventListener('click', function() {
    if (heartBtn.className == 'far fa-heart') {
        heartBtn.className = 'fas fa-heart';
        heartBtn.style.color = 'red';
    } else {
        heartBtn.className = 'far fa-heart';
        heartBtn.style.color = '#676669';
    }
})


displayTimer();
rangeBar.value = 0;
setInterval(displayTimer , 200); // cập nhật lại thời gian




//   ============================== Dark theme ============================

const ball = document.querySelector('.ball');
const blackThemeBtn = document.querySelector('.check');
const blackThemeCanvas = document.getElementById('container');
blackThemeBtn.addEventListener('click', function() {
    if (blackThemeCanvas.classList.contains('dark-theme')) {
        blackThemeCanvas.classList.remove('dark-theme');
        ball.style.left = '2px';
    }
    else  {
        blackThemeCanvas.classList.add('dark-theme');
        ball.style.left = '22px'
    }
});




//   ============================== MB js ============================


const barLeft = document.querySelector('.bars-left');
const barRight = document.querySelector('.bars-right');
const sideBar = document.querySelector('#sidebar');
const navBar = document.querySelector('#navbar');
const hideNavBar = document.querySelector('.js-hide-navbar');
const hideSideBar = document.querySelector('.js-hide-sidebar');

barLeft.addEventListener('click', function() {
    navBar.classList.add('active');
    if (sideBar.classList.contains('active')) {
        sideBar.classList.remove('active');
    }
})
hideNavBar.addEventListener('click', function() {
    navBar.classList.remove('active')
})
barRight.addEventListener('click', function() {
    sideBar.classList.add('active');
    if (navBar.classList.contains('active')) {
        navBar.classList.remove('active');
    }
})
hideSideBar.addEventListener('click', function() {
    sideBar.classList.remove('active');
})