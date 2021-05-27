import './windowConstants';
import { updatePomodoroCounterDots, update } from './timer';
import { applyWindowActions } from './windowButtons';
import { applyTogglePausePlay } from './pausePlayButton';

window.addEventListener('DOMContentLoaded', () => {
  updatePomodoroCounterDots();
  applyWindowActions();
  applyTogglePausePlay();
  setInterval(update, 1000);
});
