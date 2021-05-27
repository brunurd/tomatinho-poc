const applyTogglePausePlay = () => {
  const button = document.querySelector('.timer-display__pause-play-button');

  button.addEventListener('click', () => {
    if (APP_STATE.paused) {
      button.classList.remove('fa-play');
      button.classList.add('fa-pause');
      APP_STATE.paused = false;
    } else {
      button.classList.add('fa-play');
      button.classList.remove('fa-pause');
      APP_STATE.paused = true;
    }
  });
}

export { applyTogglePausePlay };