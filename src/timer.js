const INITIAL_TIME = moment();
const STATES = {
  pomodoro: 'Pomodoro 🍅',
  shortBreak: 'Short Break ☕',
  longBreak: 'Long Break 🕹️',
}
const APP_STATE = {
  pomodoroCounts: 0,
  currentTimeStart: INITIAL_TIME.clone(),
  currentTimeEnd: INITIAL_TIME.clone().add(25, 'minute'),
  currentTime: INITIAL_TIME.clone(),
  currentState: STATES.pomodoro,
  currentTimerDisplay: '00:00:00',
}
const ELEMENTS = {
  timer: document.querySelector('.text--timer'),
  currentState: document.querySelector('.text--current-state'),
  pomodoroCounterDots: document.querySelectorAll('.pomodoro-counter__dot'),
}

const updatePomodoroCounterDots = () => {
  for (i = 0; i < APP_STATE.pomodoroCounts; i++) {
    ELEMENTS.pomodoroCounterDots[i].classList.add('pomodoro-counter__dot--done');
  }
  for (i = 3; i >= APP_STATE.pomodoroCounts; i--) {
    ELEMENTS.pomodoroCounterDots[i].classList.remove('pomodoro-counter__dot--done');
  }
}

const onSequenceEnd = () => {
  APP_STATE.currentTimeStart = APP_STATE.currentTime.clone();

  if (APP_STATE.currentState === STATES.pomodoro && APP_STATE.pomodoroCounts < 4) {
    APP_STATE.currentTimeEnd = APP_STATE.currentTime.clone().add(5, 'minute');
    APP_STATE.currentState = STATES.shortBreak;
    APP_STATE.pomodoroCounts += 1;
  }

  if (APP_STATE.currentState === STATES.shortBreak && APP_STATE.pomodoroCounts < 4) {
    APP_STATE.currentTimeEnd = APP_STATE.currentTime.clone().add(25, 'minute');
    APP_STATE.currentState = STATES.pomodoro;
    APP_STATE.pomodoroCounts += 1;
  }

  if (APP_STATE.pomodoroCounts >= 4) {
    APP_STATE.currentTimeEnd = APP_STATE.currentTime.clone().add(25, 'minute');
    APP_STATE.currentState = STATES.longBreak;
    APP_STATE.pomodoroCounts = 0;
  }

  currentState.innerHTML = APP_STATE.currentState;
  updatePomodoroCounterDots();
};

const update = () => {
  APP_STATE.currentTime = moment();

  if (APP_STATE.currentTime.isAfter(APP_STATE.currentTimeEnd)) {
    onSequenceEnd();
    return;
  }

  const time = APP_STATE.currentTime.clone();

  time.subtract(APP_STATE.currentTimeStart.hour(), 'hour');
  time.subtract(APP_STATE.currentTimeStart.minute(), 'minute');
  time.subtract(APP_STATE.currentTimeStart.second(), 'second');

  currentTimerDisplay = time.format('HH:mm:ss');
  ELEMENTS.timer.innerHTML = currentTimerDisplay;
};

window.addEventListener('DOMContentLoaded', () => {
  updatePomodoroCounterDots();
  setInterval(update, 1000);
});