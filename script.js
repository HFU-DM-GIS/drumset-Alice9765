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

let recordedSongs = [];

recButton.addEventListener("click", function () {
  if (rec) {
    rec = false
    recButton.classList.remove("active")
    console.log(recSounds)
    recordedSongs.push(recSounds.slice());
    displayRecordings();
    recSounds = [];
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
    UselessFact();
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

function UselessFact() {
  fetch('https://uselessfacts.jsph.pl/random.json?language=de')
    .then(response => response.json())
    .then(data => {
      const fact = data.text;
      document.getElementById('fact').textContent = fact;
    })
}


function buttonAnimation(currentKey) {

  let activeButton = null
  if (currentKey === 'a' || currentKey === 'w' || currentKey === 's' || currentKey === 'd' || currentKey === 'j'  || currentKey === 'i' || currentKey === 'k' || currentKey === 'l') {
    activeButton = null
  if (currentKey === 'a' || currentKey === 'w' || currentKey === 's' || currentKey === 'd' || currentKey === 'j'  || currentKey === 'i' || currentKey === 'k' || currentKey === 'l') {
    activeButton = document.querySelector("." + currentKey);
  }
  if (activeButton !== null) {  }
  if (activeButton !== null) {
      activeButton.classList.add("pressed");
    }
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

const recordingsList = document.getElementById("recordingsList");

function displayRecordings() {
  recordingsList.innerHTML = "";
  recordedSongs.forEach((recording, index) => {
    const recordingItem = document.createElement("li");
    recordingItem.innerText = `Aufnahme ${index + 1}`;

    const playButton = document.createElement("button");
    playButton.innerText = "Play";
    playButton.addEventListener("click", function () {
      playRecording(recording);
    });

    recordingItem.appendChild(playButton);
    recordingsList.appendChild(recordingItem);
  });
}

let recordings = [];
let mediaRecorders = [];

function startRecording(key) {
  const mediaRecorder = new MediaRecorder(stream);
  const chunks = [];

  mediaRecorder.addEventListener('dataavailable', (event) => {
    chunks.push(event.data);
  });

  mediaRecorder.addEventListener('stop', () => {
    const recording = new Blob(chunks, { type: 'audio/webm' });
    chunks.length = 0;
    addRecording(key, recording);
  });

  mediaRecorders.push(mediaRecorder);
  mediaRecorder.start();
}

function stopRecording() {
  if (mediaRecorders.length > 0) {
    const mediaRecorder = mediaRecorders.pop();
    mediaRecorder.stop();
  }
}

function playRecording(recording) {
  if (soundsPlay.length > 0) {
    soundsPlay.forEach((sound) => sound.pause());
    soundsPlay = [];
  }

  let bpm = document.querySelector('#bpm').value;
  let milSecs = 60 / bpm * 1000;

  let index = 0;
  const playNextSound = () => {
    if (index >= recording.length) {
      stopPlayback();
      return;
    }

    const soundKey = recording[index];
    const path = keySounds[soundKey];
    const sound = new Audio(path);
    soundsPlay.push(sound);

    sound.play();

    sound.addEventListener('ended', () => {
      index++;
      playNextSound();
    });
  };

  const stopPlayback = () => {
    play = false;
    let icon = document.querySelector(".play .fa");
    icon.classList.remove("fa-pause");
    icon.classList.add("fa-play");
    soundsPlay.forEach((sound) => sound.pause());
    soundsPlay = [];
  };

  if (!play) {
    let icon = document.querySelector(".play .fa");
    icon.classList.remove("fa-play");
    icon.classList.add("fa-pause");
    play = true;
    playNextSound();
  }
}