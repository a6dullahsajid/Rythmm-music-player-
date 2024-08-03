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
          element.style.backgroundColor = 'rgb(4, 9, 20)';
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
    window.history.back();
}
function forward() {
    window.history.forward();
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
// Main function
async function getBollySongs() {
    document.getElementsByClassName("playbar")[0].style.display = `flex`;
    // fetching bollywood songs
    let bs = await fetch("/assets/bsongs/");
    let bsresponse = await bs.text();
    let bollydiv = document.createElement("div");
    bollydiv.innerHTML = bsresponse;
    let as = bollydiv.getElementsByTagName("a");
    let bollysongs = [];
    let bsnames = [];
    console.log(bollydiv.innerHTML);
    // loop for getting links of bollywood songs in an array
    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if (element.href.endsWith(".mp3")) {
            bollysongs.push(element.href);
        }
        let spans = bollydiv.getElementsByTagName("td");
        // loop for getting names of bollywood songs in an array
        for (let i = 0; i < spans.length; i++) {
                if (spans[i].innerText.endsWith(".mp3")) {
                    const element = spans[i].innerText;
                    bsnames.push(element.slice(0, element.length - 4));
                }
        }
    }
    // fetching bollywood song images
    let bimg = await fetch("/assets/bimgs/");
    let bimgresponse = await bimg.text();
    let bollyimgdiv = document.createElement("div");
    bollyimgdiv.innerHTML = bimgresponse;
    let asimg = bollyimgdiv.getElementsByTagName("a");
    let bollyimg = [];
    // loop for getting links of bollywood imgs in an array
    for (let i = 0; i < asimg.length; i++) {
        const element = asimg[i];
        if (element.href.endsWith(".jfif")) {
            bollyimg.push(element.href);
        }
    }
    
    // dynamic creation of library area
    let songCards = "";
    for (let i = 0; i < bollysongs.length; i++) {
        const imgadress = bollyimg[i];
        const songname = bsnames[i];
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
    // PLAYING BOLLYWOOD SONGS
    let songno = document.getElementsByClassName("song-card");
    playSongs(0);
    async function playSongs(index) {
        if (index < bollysongs.length && index >= 0) {
            let paused = false;
            songno[index].getElementsByClassName("playing")[0].style.display = `block`;
            document.getElementsByClassName("current")[0].innerHTML = ``;
            document.getElementsByClassName("played")[0].style.width = `0%`;
            document.getElementsByClassName("play")[0].innerHTML = `<img src="assets/svgs/pause.svg" alt="" />`;
    
            // Show in the playbar
            const imgadress = bollyimg[index];
            const songname = bsnames[index];
            const songCard = `<div class="song-card">
            <div class="simgname">
            <img src="${imgadress}" alt="" />
            <div class="songname">${songname}</div>
            </div>
            </div>`;
            document.querySelector(".pbleft").innerHTML = songCard;
    
            // Play the song
            let audio = new Audio(bollysongs[index]);
            await new Promise((resolve) => {
                audio.addEventListener('loadedmetadata', resolve);
            });
    
            if (paused) return; // Exit if paused
    
            // Get the duration and update song length
            let duration = audio.duration.toFixed(0);
            let durationinm = Math.floor(duration / 60);
            let durationins = Math.floor(duration % 60);
            document.getElementsByClassName("songlength")[0].innerHTML = `${durationinm}:${durationins}`;
    
            audio.play();
            document.getElementsByClassName("seekbar")[0].addEventListener('click', (e) => {
                let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
                document.querySelector(".played").style.width = `${percent}`;
                audio.currentTime = (audio.duration * percent) / 100;
            });
            const volumeControl = document.querySelector(".volume input");
            volumeControl.addEventListener('input', () => {
                audio.volume = volumeControl.value / 100;
            });
            let playtimeInterval;
            
            function startCheckPlayTime() {
                playtimeInterval = setInterval(() => {
                    if (paused) return; // Exit if paused
                    const playedtime = (audio.currentTime.toFixed(0) / duration * 100).toFixed(3);
                    let durationinm = Math.floor(audio.currentTime.toFixed(0) / 60);
                    let durationins = Math.floor(audio.currentTime.toFixed(0) % 60);
                    document.getElementsByClassName("current")[0].innerHTML = `${durationinm}:${durationins}`;
                    document.getElementsByClassName("played")[0].style.width = `${playedtime}%`;
                }, 1000);
            }
    
            startCheckPlayTime();
    
            const nextButton = document.getElementsByClassName("next")[0];
            const prevButton = document.getElementsByClassName("prev")[0];
            let playButton = document.getElementsByClassName("play")[0];
            const listButton = document.getElementsByClassName("list1")[1];
    
            function nextSong() {
                clearInterval(playtimeInterval); // Clear interval
                audio.currentTime = 0;
                audio.pause();
                songno[index].getElementsByClassName("playing")[0].style.display = 'none';
                removeEventListeners();
                playSongs(index + 1);
            }
    
            function prevSong() {
                clearInterval(playtimeInterval); // Clear interval
                audio.currentTime = 0;
                audio.pause();
                songno[index].getElementsByClassName("playing")[0].style.display = 'none';
                removeEventListeners();
                playSongs(index - 1);
            }
    
            function removeEventListeners() {
                nextButton.removeEventListener('click', nextSong);
                prevButton.removeEventListener('click', prevSong);
                playButton.removeEventListener('click', togglePlayPause);
                listButton.removeEventListener('click', pauseSong);
                document.removeEventListener('keydown', handleKeyboard);
                audio.removeEventListener('ended', nextSong);
            }
    
            function pauseSong() {
                clearInterval(playtimeInterval); // Clear interval
                paused = true; // Set the paused flag
                songno[index].getElementsByClassName("playing")[0].style.display = 'none';
                audio.pause();
                removeEventListeners();
            }
    
            function togglePlayPause() {
                if (audio.paused) {
                    startCheckPlayTime(); // Start interval
                    audio.play();
                    songno[index].getElementsByClassName("playing")[0].style.display = 'block';
                    updatePlayButton(true);
                } else {
                    pauseSong();
                    updatePlayButton(false);
                }
            }
    
            function updatePlayButton(isPlaying) {
                document.getElementsByClassName("prevplaynext")[0].innerHTML = `
                    <div class="prev">
                        <img src="assets/svgs/prev.svg" alt="" />
                    </div>
                    <div class="play">
                        <img src="assets/svgs/${isPlaying ? 'pause' : 'pplay'}.svg" alt="" />
                    </div>
                    <div class="next">
                        <img src="assets/svgs/next.svg" alt="" />
                    </div>`;
                attachEventListeners();
            }
    
            function attachEventListeners() {
                const newNextButton = document.getElementsByClassName("next")[0];
                const newPrevButton = document.getElementsByClassName("prev")[0];
                const newPlayButton = document.getElementsByClassName("play")[0];
    
                newNextButton.addEventListener('click', nextSong);
                newPrevButton.addEventListener('click', prevSong);
                newPlayButton.addEventListener('click', togglePlayPause);
                listButton.addEventListener('click', pauseSong);
                document.addEventListener('keydown', handleKeyboard);
                audio.addEventListener('ended', nextSong);
    
                // Update playButton reference
                playButton = newPlayButton;
            }
    
            function handleKeyboard(event) {
                switch (event.code) {
                    case "Space":
                        togglePlayPause();
                        break;
                    case "ArrowRight":
                        nextSong();
                        break;
                    case "ArrowLeft":
                        prevSong();
                        break;
                    default:
                }
            }
    
            nextButton.addEventListener('click', nextSong);
            prevButton.addEventListener('click', prevSong);
            playButton.addEventListener('click', togglePlayPause);
            listButton.addEventListener('click', pauseSong);
            document.addEventListener('keydown', handleKeyboard);
            audio.addEventListener('ended', nextSong);
        }
    }
    
  
}

async function getRapSongs() {
    document.getElementsByClassName("playbar")[0].style.display = `flex`;
    // fetching rap songs
    let raps = await fetch("/assets/rapsongs/");
    let rapresponse = await raps.text();
    let rapdiv = document.createElement("div");
    rapdiv.innerHTML = rapresponse;
    let as = rapdiv.getElementsByTagName("a");
    let rapsongs = [];
    let rapnames = [];
    // loop for getting links of rap songs in an array
    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if (element.href.endsWith(".mp3")) {
            rapsongs.push(element.href);
        }
        let spans = rapdiv.getElementsByTagName("td");
    // loop for getting names of rap songs in an array
        for (let i = 0; i < spans.length; i++) {
            if (spans[i].innerText.endsWith(".mp3")) {
                const element = spans[i].innerText;
                rapnames.push(element.slice(0, element.length - 4));
            }
        }
    }
    // fetching rap song images
    let rapimg = await fetch("/assets/rapimgs/");
    let rapimgresponse = await rapimg.text();
    let rapimgdiv = document.createElement("div");
    rapimgdiv.innerHTML = rapimgresponse;
    let asimg = rapimgdiv.getElementsByTagName("a");
    let rapimgs = [];
    // loop for getting links of rap imgs in an array
    for (let i = 0; i < asimg.length; i++) {
        const element = asimg[i];
        if (element.href.endsWith(".jfif")) {
            rapimgs.push(element.href);
        }
    }
    // dynamic creation of library area
    let songCards = "";
    for (let i = 0; i < rapsongs.length; i++) {
        const imgadress = rapimgs[i];
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
    // PLAYING RAP SONGS
    let songno = document.getElementsByClassName("song-card");
    playSongs(0);
    async function playSongs(index) {
        if (index < rapsongs.length && index >= 0) {
            let paused = false;
            songno[index].getElementsByClassName("playing")[0].style.display = `block`;
            document.getElementsByClassName("current")[0].innerHTML = ``;
            document.getElementsByClassName("played")[0].style.width = `0%`;
            document.getElementsByClassName("play")[0].innerHTML = `<img src="assets/svgs/pause.svg" alt="" />`;
            
            // Show in the playbar
            const imgadress = rapimgs[index];
            const songname = rapnames[index];
            const songCard = `<div class="song-card">
                <div class="simgname">
                    <img src="${imgadress}" alt="" />
                    <div class="songname">${songname}</div>
                </div>
            </div>`;
            document.querySelector(".pbleft").innerHTML = songCard;
            
            // Play the song
            let audio = new Audio(rapsongs[index]);
            await new Promise((resolve) => {
                audio.addEventListener('loadedmetadata', resolve);
            });
    
            if (paused) return; // Exit if paused
    
            // Get the duration
            let duration = audio.duration.toFixed(0);
            let durationinm = Math.floor(duration / 60);
            let durationins = Math.floor(duration % 60);
            document.getElementsByClassName("songlength")[0].innerHTML = `${durationinm}:${durationins}`;
            audio.play();
            
            const volumeControl = document.querySelector(".volume input");
            volumeControl.addEventListener('input', () => {
                audio.volume = volumeControl.value / 100;
            });
            // Seekbar functionality
            document.getElementsByClassName("seekbar")[0].addEventListener('click', (e) => {
                let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
                document.querySelector(".played").style.width = `${percent}%`;
                audio.currentTime = (audio.duration * percent) / 100;
            });
    
            // Function to update current time and played progress
            function checkplaytime() {
                if (paused) return; // Exit if paused
                const playedtime = (audio.currentTime.toFixed(0) / duration * 100).toFixed(3);
                let durationinm = Math.floor(audio.currentTime.toFixed(0) / 60);
                let durationins = Math.floor(audio.currentTime.toFixed(0) % 60);
                document.getElementsByClassName("current")[0].innerHTML = `${durationinm}:${durationins}`;
                document.getElementsByClassName("played")[0].style.width = `${playedtime}%`;
            }
    
            // Start checking playtime
            checkplaytime();
    
            // Interval for updating playtime periodically
            let playtimeInterval = setInterval(checkplaytime, 1100);
    
            // Functions for controlling playback and event listeners
            const nextButton = document.getElementsByClassName("next")[0];
            const prevButton = document.getElementsByClassName("prev")[0];
            let playButton = document.getElementsByClassName("play")[0];
            const listButton = document.getElementsByClassName("list1")[0];
    
            function nextSong() {
                clearInterval(playtimeInterval); // Stop updating playtime
                audio.pause();
                songno[index].getElementsByClassName("playing")[0].style.display = 'none';
                removeEventListeners();
                playSongs(index + 1);
            }
    
            function prevSong() {
                clearInterval(playtimeInterval); // Stop updating playtime
                audio.pause();
                songno[index].getElementsByClassName("playing")[0].style.display = 'none';
                removeEventListeners();
                playSongs(index - 1);
            }
    
            function removeEventListeners() {
                nextButton.removeEventListener('click', nextSong);
                prevButton.removeEventListener('click', prevSong);
                playButton.removeEventListener('click', togglePlayPause);
                listButton.removeEventListener('click', pauseSong);
                document.removeEventListener('keydown', handleKeyDown);
                audio.removeEventListener('ended', nextSong);
            }
    
            function pauseSong() {
                paused = true; // Set the paused flag
                songno[index].getElementsByClassName("playing")[0].style.display = 'none';
                audio.pause();
                removeEventListeners();
            }
    
            function togglePlayPause() {
                if (audio.paused) {
                    audio.play();
                    songno[index].getElementsByClassName("playing")[0].style.display = 'block';
                    updatePlayButton(true);
                } else {
                    pauseSong();
                    updatePlayButton(false);
                }
            }
    
            function updatePlayButton(isPlaying) {
                document.getElementsByClassName("prevplaynext")[0].innerHTML = `
                    <div class="prev">
                        <img src="assets/svgs/prev.svg" alt="" />
                    </div>
                    <div class="play">
                        <img src="assets/svgs/${isPlaying ? 'pause' : 'pplay'}.svg" alt="" />
                    </div>
                    <div class="next">
                        <img src="assets/svgs/next.svg" alt="" />
                    </div>`;
                attachEventListeners();
            }
    
            function attachEventListeners() {
                const newNextButton = document.getElementsByClassName("next")[0];
                const newPrevButton = document.getElementsByClassName("prev")[0];
                const newPlayButton = document.getElementsByClassName("play")[0];
    
                newNextButton.addEventListener('click', nextSong);
                newPrevButton.addEventListener('click', prevSong);
                newPlayButton.addEventListener('click', togglePlayPause);
                listButton.addEventListener('click', pauseSong);
                document.addEventListener('keydown', handleKeyDown);
                audio.addEventListener('ended', nextSong);
    
                // Update playButton reference
                playButton = newPlayButton;
            }
    
            function handleKeyDown(event) {
                switch (event.code) {
                    case "Space":
                        event.preventDefault();
                        togglePlayPause();
                        break;
                    case "ArrowRight":
                        nextSong();
                        break;
                    case "ArrowLeft":
                        prevSong();
                        break;
                    default:
                }
            }
    
            // Add initial event listeners
            nextButton.addEventListener('click', nextSong);
            prevButton.addEventListener('click', prevSong);
            playButton.addEventListener('click', togglePlayPause);
            listButton.addEventListener('click', pauseSong);
            document.addEventListener('keydown', handleKeyDown);
            audio.addEventListener('ended', nextSong);
        }
    }
}