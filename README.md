# Virtual Piano
Music sampler with piano sounds. You can play on it by clicking on the piano keys, or by clicking and moving the mouse over the keys, or by pressing the keyboard keys.
Link: [https://azat-a.github.io/virtual-piano/](https://azat-a.github.io/virtual-piano/)

![Screenshot of Virtual Piano](https://raw.githubusercontent.com/azat-a/virtual-piano/main/virtual-piano-screenshot.png)

## Implementation
Note: this project based on [the layout](https://github.com/rolling-scopes-school/stage1-tasks/tree/virtual-piano) by RS School, I'm only implemented the Javascript algoritm. In this project I mastered:
- working with the DOM,
- handling events,
- OOP in JS using classes.

The code consists of three classes. `PianoController` sets event listeners and handles:
- mouse events (`mousedown`, `mouseup`, `mouseover`, `mouseout`) on piano keys,
- keyboard events (`keydown` and `keyup`),
- clicks on Notes/Letters switcher and fullscreen button.

Handlers call the appropriate methods of `PianoPlayer` (which stores a list of audio files, creates `Audio` objects and plays samples), and methods of `ScreenViewer` (which animates piano keystrokes, switches notes/letters tips and switches fullscreen mode).

## Using the code
Make a fork of the repository or clone it directly using `git clone https://github.com/azat-a/virtual-piano.git` — that's it, you're great!
