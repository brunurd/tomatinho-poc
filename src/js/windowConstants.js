const INITIAL_TIME = moment();

window.TIMER_ELEMENTS = {
  app: document.querySelector('.app'),
  timer: document.querySelector('.text--timer'),
  currentState: document.querySelector('.text--current-state'),
  pomodoroCounterDots: document.querySelectorAll('.pomodoro-counter__dot'),
}

window.STATES = {
  pomodoro: 'Pomodoro 🍅',
  shortBreak: 'Short Break ☕',
  longBreak: 'Long Break 🕹️',
}

window.SETTINGS = {
  pomodoroLength: 25,
  shortBreakLength: 5,
  longBreakLength: 25,
}

window.APP_STATE = {
  pomodoroCounts: 1,
  currentTimeStart: INITIAL_TIME.clone(),
  currentTimeEnd: INITIAL_TIME.clone().add(SETTINGS.pomodoroLength, 'minute'),
  currentTime: INITIAL_TIME.clone(),
  currentState: STATES.pomodoro,
  currentTimerDisplay: '00:00',
  paused: false,
  pausedSeconds: 0,
}