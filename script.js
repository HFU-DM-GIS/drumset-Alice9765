const keySounds = {
  'w': "sounds/tom-1.mp3",
  'a': "sounds/tom-2.mp3",
  's': 'sounds/tom-3.mp3',
  'd': 'sounds/tom-4.mp3',
  'j': 'sounds/snare.mp3',
  'k': 'sounds/crash.mp3',
  'l': 'sounds/kick-bass.mp3',
  'i': 'sounds/kick2.mp3'
}

let rec = false;

let play = false;

let recSounds = []

let soundsPlay = []

const recButton = document.querySelector(".rec")

const delButton = document.querySelector(".del")

const playButton = document.querySelector(".play")

recButton.addEventListener("click", function () {
  if (rec) {
    rec = false
    recButton.classList.remove("active")
    console.log(recSounds)
  } else {
    rec = true
    recButton.classList.add("active")
  }
});

delButton.addEventListener("click", function () {
  recSounds = []
})

function selectElementsBySrc(selector) {
  const elements = document.querySelectorAll(selector);
  const selectedElements = Array.from(elements).filter(element => {
    return element.getAttribute('src');
  });
  return selectedElements;
}

playButton.addEventListener("click", function (e) {
  let icon = document.querySelector(".play .fa")

  if (!play) {
    icon.classList.remove("fa-play")
    icon.classList.add("fa-pause")
    play = true
    playRec()
  } else {
    icon.classList.remove("fa-pause")
    icon.classList.add("fa-play")
    play = false
  }
})

function playRec() {
  let bpm = document.querySelector('#bpm').value
  let milSecs = 60/bpm*1000
  console.log(milSecs)
  if (play) {
    recSounds.forEach((soundKey, i) => {
    let path = keySounds[soundKey]
    let sound = new Audio(path)
    soundsPlay.push(sound)
    setTimeout(() => {
      sound.play()
      console.log(i, recSounds.length)
      if (i+1 == recSounds.length) {
        console.log('end')
        soundsPlay = []
        setTimeout(() => {
          playRec()
        }, milSecs)
      }
    }, i * milSecs)
  });
  }
  
}

const drumButtons = document.querySelectorAll(".drum");

for (let i = 0; i < drumButtons.length; i++) {

  drumButtons[i].addEventListener("click", function () {

    const buttonInnerHTML = this.innerHTML;

    makeSound(buttonInnerHTML);

    buttonAnimation(buttonInnerHTML);

    if (rec) {
      console.log(buttonInnerHTML)
    }

  });

}

document.addEventListener("keydown", function (event) { // keydown removes delay
  if (!event.repeat) { // removes sound spamming
    makeSound(event.key);

    buttonAnimation(event.key);

  }

});

document.addEventListener("keyup", function (event) {
  const currentKey = event.key;
  let activeButton = null
  if (currentKey === 'a' || currentKey === 'w' || currentKey === 's' || currentKey === 'd' || currentKey === 'j'  || currentKey === 'i' || currentKey === 'k' || currentKey === 'l') {
    activeButton = document.querySelector("." + currentKey);
  }
  if (activeButton !== null) {
    activeButton.classList.remove("pressed"); // removes "pressed" style after keyup event
  }

});

function makeSound(key) {

  let path = keySounds[key]

  if (path) {
    new Audio(path).play();

    if (rec) {
      recSounds.push(key)
    }


  }

}


function buttonAnimation(currentKey) {

  let activeButton = null
  if (currentKey === 'a' || currentKey === 'w' || currentKey === 's' || currentKey === 'd' || currentKey === 'j'  || currentKey === 'i' || currentKey === 'k' || currentKey === 'l') {
    activeButton = document.querySelector("." + currentKey);
  }
  if (activeButton !== null) {
    activeButton.classList.add("pressed");
  }
}
 
let recordedSongs = [];
 
 recButton.addEventListener("click", function () {
  if (rec) {
    rec = false;
    recButton.classList.remove("active");
    console.log(recSounds);
    recordedSongs.push(recSounds.slice()); // Hinzufügen der aktuellen Aufnahme zum Array recordedSongs
    console.log(recordedSongs); // Überprüfung der gespeicherten Songs
  } else {
    rec = true;
    recButton.classList.add("active");
  }
});
function playRec() {
  // ...
  if (play) {
    // ...
    recSounds.forEach((soundKey, i) => {
      // ...
    });
  }

  // Hier kannst du den Code hinzufügen, um die aufgenommenen Songs in der Tabelle anzuzeigen
  const recordedSongsTableBody = document.querySelector("#recordedSongsTable tbody");
  recordedSongsTableBody.innerHTML = ""; // Zurücksetzen der Tabelle

  recordedSongs.forEach((song, index) => {
    const row = document.createElement("tr");
    const songNumberCell = document.createElement("td");
    const soundsCell = document.createElement("td");

    songNumberCell.textContent = index + 1 ; // Songnummer
    soundsCell.textContent = song.join(", "); // Sounds im aktuellen Song

    row.appendChild(songNumberCell);
    row.appendChild(soundsCell);
    recordedSongsTableBody.appendChild(row);
  });
}

