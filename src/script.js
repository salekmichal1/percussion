const recordBtn = document.querySelector('.record-btn');

document.addEventListener('keypress', onKeyPress);

const KeyToSound = {
  q: document.querySelector('#sound1'),
  w: document.querySelector('#sound2'),
  e: document.querySelector('#sound3'),
  r: document.querySelector('#sound4'),
  t: document.querySelector('#sound5'),
  y: document.querySelector('#sound6'),
};

let recordingStartTime;

let songNotes1;
let songNotes2;
let songNotes3;
let songNotes4;

function onKeyPress(event) {
  const sound = KeyToSound[event.key];
  playSound(sound);
}

recordBtn.addEventListener('click', toggleRecording);

function playSound(sound) {
  if (sound) {
    if (isRecording()) {
      recordSound(sound);
    }
    sound.currentTime = 0;
    sound.play();
  }
}

function toggleRecording() {
  recordBtn.classList.toggle('active');
  if (isRecording()) {
    startRecording();
  } else {
    stopRecording();
  }
}

function isRecording() {
  return recordBtn != null && recordBtn.classList.contains('active');
}

function startRecording() {
  recordingStartTime = Date.now();
  songNotes1 = [];
}

function stopRecording() {
  playSong();
}

function playSong() {
  if (songNotes1.length > 0) {
    songNotes1.forEach(note => {
      setTimeout(() => {
        playSound(note.key);
      }, note.startTime);
    });
  }
  console.log(songNotes1);
}

function recordSound(sound) {
  songNotes1.push({
    key: sound,
    startTime: Date.now() - recordingStartTime,
  });
}
