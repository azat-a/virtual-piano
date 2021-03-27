const samplePack = {
  "c": "assets/audio/c.mp3",
  "c♯": "assets/audio/c♯.mp3",
  "d": "assets/audio/d.mp3",
  "d♯": "assets/audio/d♯.mp3",
  "e": "assets/audio/e.mp3",
  "f": "assets/audio/f.mp3",
  "f♯": "assets/audio/f♯.mp3",
  "g": "assets/audio/g.mp3",
  "g♯": "assets/audio/g♯.mp3",
  "a": "assets/audio/a.mp3",
  "a♯": "assets/audio/a♯.mp3",
  "b": "assets/audio/b.mp3",
}

class PianoController {

  pianoPlayer
  screenViewer
  isMouseDown = false
  keys = {}

  constructor(pianoPlayer, screenViewer) {
    this.pianoPlayer = pianoPlayer;
    this.screenViewer = screenViewer;

    this.piano = document.getElementById("piano");
    this.piano.addEventListener("mousedown", this.pianoMouseDown.bind(this));
    document.addEventListener("mouseup", this.pianoMouseUp.bind(this));
    this.piano.addEventListener("mouseover", this.pianoMouseOver.bind(this));
    this.piano.addEventListener("mouseout", this.pianoMouseOut.bind(this));

    let pianoKeys = document.querySelectorAll(".piano-key");
    pianoKeys.forEach(item => {
      this.keys[`Key${item.dataset.letter}`] = item.dataset.note;
    });

    document.addEventListener("keydown", this.keyboardKeyDown.bind(this));
    document.addEventListener("keyup", this.keyboardKeyUp.bind(this));

    document.getElementById("btnContainer").addEventListener("click", this.lettersNotesClick.bind(this));

    document.getElementById("fullscreen").addEventListener("click", this.fullScreenSwitch.bind(this));
    
  }

  pianoMouseDown(event) {
    if (event.target.classList.contains("piano-key")) {
      this.isMouseDown = true;
      this.pianoPlayer.playNote(event.target.dataset.note);
      this.screenViewer.pianoKeyPress(event.target.dataset.note);
    }
  }

  pianoMouseUp(event) {
    this.isMouseDown = false;
    if (event.target.classList.contains("piano-key")) {
      this.screenViewer.pianoKeyRelease(event.target.dataset.note);
    }
  }

  pianoMouseOver(event) {
    if (this.isMouseDown === false) {
      return;
    }
    if (event.target.classList.contains("piano-key") === false) {
      return;
    }
    
    this.pianoPlayer.playNote(event.target.dataset.note);
    this.screenViewer.pianoKeyPress(event.target.dataset.note);
  }

  pianoMouseOut(event) {
    if (event.target.classList.contains("piano-key")) {
      this.screenViewer.pianoKeyRelease(event.target.dataset.note);
    }
  }

  keyboardKeyDown(event) {
    if (event.repeat) {
      return;
    }
    if (event.code in this.keys) {
      this.pianoPlayer.playNote(this.keys[event.code]);
      this.screenViewer.pianoKeyPress(this.keys[event.code]);
    } else {
      return;
    }
  }

  keyboardKeyUp(event) {
    if (event.code in this.keys) {
      this.screenViewer.pianoKeyRelease(this.keys[event.code]);
    } else {
      return;
    }
  }

  lettersNotesClick(event) {
    this.screenViewer.lettersNotesSwitch(event.target);
  }

  fullScreenSwitch() {
    this.screenViewer.fullScreenSwitch();
  }

}

class PianoPlayer {
  samples;

  constructor(samplePack) {
    this.samples = Object.assign({}, samplePack);
  }

  playNote(note) {
    const currentNote = new Audio(this.samples[note]);
    currentNote.play();
  }

}

class ScreenViewer {
  
  fullscreen = true
  pianoKeys = {}
  notesButton
  lettersButton

  constructor() {
    let pianoKeysList = document.querySelectorAll(".piano-key");
    pianoKeysList.forEach(item => {
      this.pianoKeys[item.dataset.note] = item; // note: element
    });

    this.notesButton = document.getElementById("notesButton");
    this.lettersButton = document.getElementById("lettersButton");
  }

  pianoKeyPress(note) {
    this.pianoKeys[note].classList.add("piano-key-active");
  }

  pianoKeyRelease(note) {
    this.pianoKeys[note].classList.remove("piano-key-active");
  }

  lettersNotesSwitch(button) {
    if(!button.classList.contains("btn-active")) {
      this.notesButton.classList.toggle("btn-active");
      this.lettersButton.classList.toggle("btn-active");
      for (let key in this.pianoKeys) {
        this.pianoKeys[key].classList.toggle("piano-key-letter");
      }
    }
  }

  fullScreenSwitch() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

}

const player = new PianoPlayer(samplePack);
const screen = new ScreenViewer;
const controller = new PianoController(player, screen);