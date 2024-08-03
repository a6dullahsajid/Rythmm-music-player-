const logo = document.getElementsByClassName("logo");
window.addEventListener('click',()=>{
    document.getElementsByClassName("left")[0].style.left=`0%`;
    document.getElementsByClassName("right")[0].style.top=`0%`;
    logo[0].style.bottom = `0%`;
    logo[0].style.left = `0%`;
    // const inlogo = document.createElement("div");
    // inlogo.innerHTML = logo.innerHTML;
    // const smallogo = inlogo.getElementsByTagName("img");
    // smallogo[0].style.width = `50px`;
}) 
let ch=0;
function change() {
  const theme = document.getElementsByClassName("themechanger");
  const root = document.documentElement;  // Define the root variable
  ch = (ch + 2) % 4;
  if (ch == 0) {
      const bgtheme = document.querySelectorAll(".bg-theme")
      bgtheme.forEach(element => {
          element.style.backgroundColor = 'z';
      });
      theme[0].innerHTML = '<img class="invert" src="assets/svgs/dark.svg" alt="">';
      theme[0].style.color = 'orange';
      theme[0].style.filter = 'invert(0)';
      root.style.setProperty('--bgdiv', 'rgb(22, 0, 49)');
      root.style.setProperty('--theme-color', 'rgb(19 133 218)');
      root.style.setProperty('--theme-text', 'rgb(255, 235, 255)');
      logo[0].style.filter = `invert(0)`;
      logo[1].style.filter = `invert(0)`;
      document.querySelector(".lib-logo").innerHTML = `<img class="invert" src="assets/svgs/lib.svg" alt="Lib" />Your
              Library`;
      document.querySelector(".aleft").innerHTML = `<img class="invert" src="assets/svgs/leftarrow.svg" alt="" />`;
      document.querySelector(".aright").innerHTML = `<img class="invert" src="assets/svgs/leftarrow.svg" alt="" />`;
      document.body.style.backgroundColor = `black`;
    } else {
        const bgtheme = document.querySelectorAll(".bg-theme")
        bgtheme.forEach(element => {
            element.style.backgroundColor = 'rgb(230 212 238)';
        });
        theme[0].innerHTML = '<img class="invert" src="assets/svgs/light.svg" alt="">';
        theme[0].style.color = 'white';
        theme[0].style.filter = 'invert(1)';
        root.style.setProperty('--bgdiv', '#aa71c6');
        root.style.setProperty('--theme-color', 'rgb(19 133 218)');
        root.style.setProperty('--theme-text', 'black');
        logo[0].style.filter = `invert(1)`;
        logo[1].style.filter = `invert(1)`;
        document.querySelector(".lib-logo").innerHTML = `<img src="assets/svgs/lib.svg" alt="Lib" />Your
                  Library`;
        document.querySelector(".aleft").innerHTML = `<img src="assets/svgs/leftarrow.svg" alt="" />`;
        document.querySelector(".aright").innerHTML = `<img src="assets/svgs/leftarrow.svg" alt="" />`;    
        document.body.style.backgroundColor = `transparent`;
  }
}
function back() {
    document.history.back();
}
function forward() {
    document.history.forward();
}
let ham = document.getElementsByClassName("left");
// for hamburger slidingout
function slideout() {
    ham[0].style.zIndex = `4`;
}
// for hamburger closing
function closeWin() {
    ham[0].style.zIndex = `0`;
}
let bollysongs = [];
let bsnames = [];
let bollyimg = [];
let rapsongs = [];
let rapnames = [];
let rapimg = [];
let index = 0;
let audio = new Audio();
let songs;
let songno;
let imgaddress;
let songname;
// Main function
async function main() {
    // fetching bollywood songs
    let bsongfetch = await fetch("http://127.0.0.1:5500/assets/bsongs/");
    let bsresponse = await bsongfetch.text();
    let bollydiv = document.createElement("div");
    bollydiv.innerHTML = bsresponse;
    let bollylinks = bollydiv.getElementsByTagName("a");
    let bollyspans = bollydiv.getElementsByTagName("span");
    for (let i = 0; i < bollyspans.length; i++) {
        if (bollyspans[i].className == "name") {
            if (bollyspans[i].innerHTML.endsWith(".mp3")) {
                const element = bollyspans[i].innerHTML;
                bsnames.push(element.slice(0, element.length - 4));
            }
        }
    }
    // loop for getting links of bollywood songs in an array
    for (let i = 0; i < bollylinks.length; i++) {
        if (bollylinks[i].href.endsWith(".mp3")) {
            bollysongs.push(bollylinks[i].href);
        }
    }
    // fetching bollywood song images
    let bimgfetch = await fetch("http://127.0.0.1:5500/assets/bimgs/");
    let bimgresponse = await bimgfetch.text();
    let bollyimgdiv = document.createElement("div");
    bollyimgdiv.innerHTML = bimgresponse;
    let bollyimglinks = bollyimgdiv.getElementsByTagName("a");
    // loop for getting links of bollywood imgs in an array
    for (let i = 0; i < bollyimglinks.length; i++) {
        const element = bollyimglinks[i];
        if (element.href.endsWith(".jfif")) {
            bollyimg.push(element.href);
        }
    }

    // fetching rap songs
    let rapfetch = await fetch("http://127.0.0.1:5500/assets/rapsongs/");
    let rapresponse = await rapfetch.text();
    let rapdiv = document.createElement("div");
    rapdiv.innerHTML = rapresponse;
    let raplinks = rapdiv.getElementsByTagName("a");
    let rapspans = rapdiv.getElementsByTagName("span");
    for (let i = 0; i < rapspans.length; i++) {
        if (rapspans[i].className == "name") {
            if (rapspans[i].innerHTML.endsWith(".mp3")) {
                const element = rapspans[i].innerHTML;
                rapnames.push(element.slice(0, element.length - 4));
            }
        }
    }
    // loop for getting links of rap songs in an array
    for (let i = 0; i < raplinks.length; i++) {
        if (raplinks[i].href.endsWith(".mp3")) {
            rapsongs.push(raplinks[i].href);
        }
    }
    // fetching rap song images
    let rapimgfetch = await fetch("http://127.0.0.1:5500/assets/rapimgs/");
    let rapimgresponse = await rapimgfetch.text();
    let rapimgdiv = document.createElement("div");
    rapimgdiv.innerHTML = rapimgresponse;
    let rapimglinks = rapimgdiv.getElementsByTagName("a");
    // loop for getting links of rap imgs in an array
    for (let i = 0; i < rapimglinks.length; i++) {
        const element = rapimglinks[i];
        if (element.href.endsWith(".jfif")) {
            rapimg.push(element.href);
        }
    }
}
async function showtime() {
    await new Promise((resolve) => {
        audio.addEventListener('loadedmetadata', resolve);
    });
    // Get the duration
    let duration = audio.duration.toFixed(0);
    let durationinm = Math.floor(duration / 60);
    let durationins = Math.floor(duration % 60);
    document.getElementsByClassName("songlength")[0].innerHTML = `${durationinm}:${durationins}`;
}
async function showcurrentime() {
    let duration = audio.duration.toFixed(0);
    const playedtime = (audio.currentTime.toFixed(0) / duration * 100).toFixed(3);
    let durationinm = Math.floor(audio.currentTime.toFixed(0) / 60);
    let durationins = Math.floor(audio.currentTime.toFixed(0) % 60);
    document.getElementsByClassName("current")[0].innerHTML = `${durationinm}:${durationins}`;
    document.getElementsByClassName("played")[0].style.width = `${playedtime}%`;
}
function showplaybar() {
    const playbarcard = `<div class="song-card">
        <div class="simgname">
            <img src="${imgaddress[index]}" alt="" />
            <div class="songname">${songname[index]}</div>
        </div>
    </div>`;
    document.querySelector(".pbleft").innerHTML = playbarcard;
}
function playpause() {
    if(audio.paused){
        songplaying();
        document.getElementsByClassName("play")[0].innerHTML = `<img src="assets/svgs/pause.svg" alt="" />`;
        audio.play();
    }
    else{
        songpaused();
        document.getElementsByClassName("play")[0].innerHTML = `<img src="assets/svgs/pplay.svg" alt="" />`;
        audio.pause();
    }
}
songno = document.getElementsByClassName("song-card");
async function songpaused(){
    songno[index].querySelector(".playing").style.display = `none`;
}
async function songplaying() {
    songno[index].querySelector(".playing").style.display = `block`;
}
async function nextsong() {
    songpaused();
    index++;
    if (index >= songs.length) {
        index = 0; // Wrap around to the first song if the index is out of bounds
    }
    audio.src = songs[index];
    document.getElementsByClassName("play")[0].innerHTML = `<img src="assets/svgs/pause.svg" alt="" />`;
    audio.play();
    await showtime();
    showplaybar();
    songplaying();
}
async function prevsong() {
    audio.pause();
    audio.currentTime = 0;
    await songpaused();
    index--;
    if (index < 0) {
        index = songs.length - 1; // Wrap around to the first song if the index is out of bounds
    }
    audio.src = songs[index];
    document.getElementsByClassName("play")[0].innerHTML = `<img src="assets/svgs/pause.svg" alt="" />`;
    audio.play();
    await showtime();
    showplaybar();
    songplaying();
}
async function getBollySongs() {
    audio.pause();
    index = 0;
    document.getElementsByClassName("playbar")[0].style.display = `flex`;
    // dynamic creation of library area
    let songCards = "";
    for (let i = 0; i < bollysongs.length; i++) {
        const listimgaddress = bollyimg[i];
        const listsongname = bsnames[i];
        const songCard = `<div class="song-card">
        <div class="simgname">
        <img src="${listimgaddress}" alt="" />
        <div class="songname">${listsongname}</div>
        </div>
        <div class="playing">
        <img src="assets/playingggg.gif" alt="" srcset="" />
        </div>
        </div>`
        songCards = songCards + songCard;
    }
    document.querySelector(".play-pod").innerHTML = songCards;
    // updating playbarimgaddress and playbarsongname
    imgaddress = bollyimg;
    songname = bsnames;
    showplaybar();
    // PLAYING BOLLYWOOD SONGS
    songs = bollysongs;
    songno = document.getElementsByClassName("song-card");
    audio.src = bollysongs[index];
    audio.play();
    // update time in playbar
    showtime();
    songplaying();
    audio.addEventListener("ended",()=>{
        nextsong();
    });
}

async function getRapSongs() {
    audio.pause();
    index=0;
    document.getElementsByClassName("playbar")[0].style.display = `flex`;
    // dynamic creation of library area
    let songCards = "";
    for (let i = 0; i < rapsongs.length; i++) {
        const imgadress = rapimg[i];
        const songname = rapnames[i];
        const songCard = `<div class="song-card">
        <div class="simgname">
        <img src="${imgadress}" alt="" />
        <div class="songname">${songname}</div>
        </div>
        <div class="playing">
        <img src="assets/playingggg.gif" alt="" srcset="" />
        </div>
        </div>`
        songCards = songCards + songCard;
    }
    document.querySelector(".play-pod").innerHTML = songCards;
    // updating playbarimgaddress and playbarsongname
    imgaddress = rapimg;
    songname = rapnames;
    showplaybar();
    // PLAYING RAP SONGS
    songs = rapsongs;
    songno = document.getElementsByClassName("song-card");
    audio.src = rapsongs[index];
    audio.play();
    // update time in playbar
    showtime();
    songplaying();
    audio.addEventListener("ended",()=>{
        nextsong();
    });   
}
main();
// Seekbar functionality
document.getElementsByClassName("seekbar")[0].addEventListener('click', (e) => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".played").style.width = `${percent}%`;
    audio.currentTime = (audio.duration * percent) / 100;
});
audio.addEventListener("timeupdate",showcurrentime);
document.getElementsByClassName("prev")[0].addEventListener("click",prevsong);
document.getElementsByClassName("play")[0].addEventListener("click",playpause);
document.getElementsByClassName("next")[0].addEventListener("click",()=>{
    audio.pause();
    audio.currentTime = 0;
    nextsong();
});
document.addEventListener("keydown",(e)=>{
    if (e.code === "Space") {
        playpause();
    }
    if (e.code === "ArrowRight") {
        audio.pause();
        audio.currentTime = 0;
        nextsong();
    }
    if (e.code === "ArrowLeft") {
        prevsong();
    }
})
const volumeControl = document.querySelector(".volume input");
volumeControl.addEventListener('input', () => {
    audio.volume = volumeControl.value / 100;
});
document.addEventListener('DOMContentLoaded', (event) => {
    const playPod = document.querySelector(".play-pod");
    playPod.addEventListener('click', async function(event) {
        const clickedElement = event.target.closest('.song-card'); // The clicked .song-card element
        if (clickedElement) {
            const songCards = Array.from(playPod.getElementsByClassName('song-card')); // All .song-card elements
            const clickedindex = songCards.indexOf(clickedElement); // Find the index of the clicked element
            if (clickedindex !== -1) {
                songpaused();
                audio.pause();
                audio.currentTime = 0;
                index = clickedindex -1;
                nextsong();
            }
        }
    });
});  