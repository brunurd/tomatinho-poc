const updatePomodoroCounterDots = () => {
  for (let i = 0; i < APP_STATE.pomodoroCounts; i++) {
    TIMER_ELEMENTS.pomodoroCounterDots[i].classList.add('pomodoro-counter__dot--done');
  }
  for (let i = 3; i >= APP_STATE.pomodoroCounts; i--) {
    TIMER_ELEMENTS.pomodoroCounterDots[i].classList.remove('pomodoro-counter__dot--done');
  }
}

const onSequenceEnd = () => {
  const api = window.TOMATINHO_API;
  api.restore();

  const audio = new Audio('assets/sounds/alarm.mp3');
  audio.play();

  APP_STATE.currentTimeStart = APP_STATE.currentTime.clone();

  if (APP_STATE.currentState === STATES.pomodoro && APP_STATE.pomodoroCounts < 4) {
    TIMER_ELEMENTS.app.classList.add('light-theme');
    TIMER_ELEMENTS.app.classList.remove('dark-theme');
    APP_STATE.currentTimeEnd = APP_STATE.currentTime.clone().add(SETTINGS.shortBreakLength, 'minute');
    APP_STATE.currentState = STATES.shortBreak;
  }

  else if ((APP_STATE.currentState === STATES.shortBreak || APP_STATE.currentState === STATES.longBreak) && APP_STATE.pomodoroCounts < 4) {
    TIMER_ELEMENTS.app.classList.remove('light-theme');
    TIMER_ELEMENTS.app.classList.add('dark-theme');
    APP_STATE.currentTimeEnd = APP_STATE.currentTime.clone().add(SETTINGS.pomodoroLength, 'minute');
    APP_STATE.currentState = STATES.pomodoro;
    APP_STATE.pomodoroCounts += 1;
  }

  else if (APP_STATE.pomodoroCounts >= 4) {
    TIMER_ELEMENTS.app.classList.add('light-theme');
    TIMER_ELEMENTS.app.classList.remove('dark-theme');
    APP_STATE.currentTimeEnd = APP_STATE.currentTime.clone().add(SETTINGS.longBreakLength, 'minute');
    APP_STATE.currentState = STATES.longBreak;
    APP_STATE.pomodoroCounts = 0;
  }

  TIMER_ELEMENTS.currentState.innerHTML = APP_STATE.currentState;
  updatePomodoroCounterDots();
};

const update = () => {
  if (APP_STATE.paused) {
    APP_STATE.pausedSeconds += 1;
    return;
  }

  APP_STATE.currentTime = moment().subtract(APP_STATE.pausedSeconds, 'second');

  if (APP_STATE.currentTime.isAfter(APP_STATE.currentTimeEnd)) {
    onSequenceEnd();
    return;
  }

  const time = APP_STATE.currentTime.clone();

  time.subtract(APP_STATE.currentTimeStart.hour(), 'hour');
  time.subtract(APP_STATE.currentTimeStart.minute(), 'minute');
  time.subtract(APP_STATE.currentTimeStart.second(), 'second');

  APP_STATE.currentTimerDisplay = time.format('mm:ss');
  document.title = APP_STATE.currentTimerDisplay;
  TIMER_ELEMENTS.timer.innerHTML = APP_STATE.currentTimerDisplay;
};

export { updatePomodoroCounterDots, update };
