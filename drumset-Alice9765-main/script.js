const keySounds = {
  'w': "sounds/tom-1.mp3",
  'a': "sounds/tom-2.mp3",
  's': 'sounds/tom-3.mp3',
  'd': 'sounds/tom-4.mp3',
  'j': 'sounds/snare.mp3',
  'k': 'sounds/crash.mp3',
  'l': 'sounds/kick-bass.mp3',
  'i': 'sounds/kick2.mp3'
};

let rec = false;
let play = false;
let recSounds = [];
let soundsPlay = [];

const recButton = document.querySelector(".rec");
const delButton = document.querySelector(".del");
const playButton = document.querySelector(".play");
const recordingsList = document.getElementById("recordingsList");
const bpmInput = document.getElementById("bpm");

let recordedSongs = [];

const storedArrayString = localStorage.getItem('recordedSongs');

// Array als JSON in einen String umwandeln
const arrayString = JSON.stringify(recordedSongs);

// Überprüfen, ob ein gespeichertes Array vorhanden ist
if (storedArrayString) {
  // JSON-String in ein Array umwandeln
  recordedSongs = JSON.parse(storedArrayString);
  displayRecordings();
} else {
  console.log('Kein gespeichertes Array gefunden');
}

recButton.addEventListener("click", function () {
  if (rec) {
    rec = false;
    recButton.classList.remove("active");
    console.log(recSounds);
    recordedSongs.push(recSounds.slice());
    displayRecordings();
    recSounds = [];
    saveRecordedSongs();
  } else {
    rec = true;
    recButton.classList.add("active");
    UselessFact();
  }
});

delButton.addEventListener("click", function () {
  recSounds = [];
});

playButton.addEventListener("click", function () {
  if (!play) {
    play = true;
    playButton.classList.add("active");
    playRec();
  } else {
    play = false;
    playButton.classList.remove("active");
    stopPlayback();
  }
});

function playRec() {
  const bpm = parseInt(bpmInput.value);
  const milSecs = 60 / bpm * 1000;

  recSounds.forEach((soundKey, i) => {
    const path = keySounds[soundKey];
    const sound = new Audio(path);
    soundsPlay.push(sound);

    setTimeout(() => {
      sound.play();
      console.log(i, recSounds.length);

      if (i + 1 === recSounds.length) {
        console.log('end');
        soundsPlay = [];
        setTimeout(() => {
          if (play) {
            playRec();
          }
        }, milSecs);
      }
    }, i * milSecs);
  });
}

const drumButtons = document.querySelectorAll(".drum");

drumButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const buttonInnerHTML = this.innerHTML;
    makeSound(buttonInnerHTML);
    buttonAnimation(buttonInnerHTML);

    if (rec) {
      console.log(buttonInnerHTML);
    }
  });
});

document.addEventListener("keydown", function (event) {
  if (!event.repeat) {
    makeSound(event.key);
    buttonAnimation(event.key);
  }
});

document.addEventListener("keyup", function (event) {
  const currentKey = event.key;
  let activeButton = null;

  if (currentKey === 'a' || currentKey === 'w' || currentKey === 's' || currentKey === 'd' || currentKey === 'j' || currentKey === 'i' || currentKey === 'k' || currentKey === 'l') {
    activeButton = document.querySelector("." + currentKey);
  }

  if (activeButton !== null) {
    activeButton.classList.remove("pressed");
  }
});

function makeSound(key) {
  const path = keySounds[key];

  if (path) {
    new Audio(path).play();

    if (rec) {
      recSounds.push(key);
    }
  }
}

function UselessFact() {
  fetch('https://uselessfacts.jsph.pl/random.json?language=de')
    .then(response => response.json())
    .then(data => {
      const fact = data.text;
      document.getElementById('fact').textContent = fact;
    });
}

function buttonAnimation(currentKey) {
  let activeButton = null;

  if (currentKey === 'a' || currentKey === 'w' || currentKey === 's' || currentKey === 'd' || currentKey === 'j' || currentKey === 'i' || currentKey === 'k' || currentKey === 'l') {
    activeButton = document.querySelector("." + currentKey);
  }

  if (activeButton !== null) {
    activeButton.classList.add("pressed");
  }
}

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

function playRecording(recording) {
  if (soundsPlay.length > 0) {
    stopPlayback();
  }

  const bpm = parseInt(bpmInput.value);
  const milSecs = 60 / bpm * 1000;
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

  playButton.classList.add("active");
  play = true;
  playNextSound();
}

function stopPlayback() {
  play = false;
  playButton.classList.remove("active");

  soundsPlay.forEach((sound) => {
    sound.pause();
    sound.currentTime = 0;
  });

  soundsPlay = [];
}

function saveRecordedSongs() {
  // Array als JSON in einen String umwandeln
  const arrayString = JSON.stringify(recordedSongs);

  // Array im Local Storage speichern
  localStorage.setItem('recordedSongs', arrayString);
}
