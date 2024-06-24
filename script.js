// javascript function which changes seconds  to minutes:seconds
function formatTime(seconds) {
    // Calculate the number of minutes without decimal places
    const minutes = Math.floor(seconds / 60);

    // Calculate the remaining seconds without decimal places
    const remainingSeconds = Math.floor(seconds % 60);

    // Ensure minutes and seconds are displayed with two digits
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

    // Combine minutes and seconds in the desired format
    return `${formattedMinutes}:${formattedSeconds}`;
}


// normal JS down here 


let songs;

let onTime = new Audio();
async function getSongs() {

    let a = await fetch("http://127.0.0.1:3000/songs/")
    let text = await a.text()
    // console.log(text)
    let div = document.createElement("div")
    div.innerHTML = text
    let b = div.getElementsByTagName("a")
    // console.log(b)
    songs = []
    for (let index = 0; index < b.length; index++) {
        const element = b[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(/songs/)[1].trim())
        }
    }
    return songs
}
const playSong = (track, pause = false) => {
    // let audio  = new Audio(/songs/ + track)
    onTime.src = /songs/ + track
    if (!pause) {
        onTime.play()

        pause.src = "/svg/pause.svg"
    }
    document.querySelector(".track").innerHTML = track.replaceAll("/","")
    document.querySelector(".timeUp").innerHTML = "00:00/00:00"
}

async function main() {

     songs = await getSongs()
     playSong(songs[0],true)
     console.log(songs)
    // let audio = new Audio(songs[1])
    //   audio.play()
    let songList = document.querySelector(".songItem").getElementsByTagName("ul")[0]
    for (const song of songs) {

        songList.innerHTML = songList.innerHTML + `  <li> <img src="svg/music.svg" alt=""> 
        <div class="info">
        ${song.replaceAll("/", " ").replaceAll("-cinematic-background-music-for-video-30-second-202451", "").replaceAll("background-music-201042", "").replaceAll("-version-", "")}   
        </div> <img src="svg/playnow.svg" alt=""> </li>`


    }
    Array.from(document.querySelector(".songItem").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", ele => {
            console.log(e.querySelector(".info").innerHTML)
            playSong(e.querySelector(".info").innerHTML.trim())
            pause.src = "/svg/pause.svg"

        })
    })

    pause.addEventListener("click", () => {
        if (onTime.paused) {
            onTime.play()
            pause.src = "/svg/pause.svg"
        }
        else {
            onTime.pause()
            pause.src = "/svg/play.svg"
        }

    })

    onTime.addEventListener("timeupdate", () => {
        console.log(onTime.currentTime, onTime.duration)
        document.querySelector(".timeUp").innerHTML = `${formatTime(onTime.currentTime)}/${formatTime(onTime.duration)}`
        document.querySelector(".run").style.left = (onTime.currentTime / onTime.duration) * 100 + "%"
    })

    // add event listner to ham burger
    document.querySelector(".ham").addEventListener("click", () => {
        document.querySelector(".left").style.left = 0

    })
    document.querySelector(".closeIcon").addEventListener("click", () => {
        document.querySelector(".left").style.left = -120 + "%"

    })
    //previous
    previous.addEventListener("click",()=>{
        console.log("previous clickeed")
        let index = songs.indexOf(onTime.src.split("/songs/").slice(-1)[0])
        console.log(songs,index)
        if ((index-1) >= 0) {
            playSong(songs[index-1])
            pause.src ="/svg/pause.svg"
            
        }
    })
    //next
    next.addEventListener("click",()=>{
        console.log("next clickeed")
        let index = songs.indexOf(onTime.src.split("/songs/").slice(-1)[0])
        console.log(songs,index)
        if ((index+1) < songs.length) {
            playSong(songs[index+1])
            pause.src ="/svg/pause.svg"
        }
    })



}
main() 