import { updatePomodoroCounterDots, update } from './timer';
import { applyActions } from './windowButtons';

window.addEventListener('DOMContentLoaded', () => {
  updatePomodoroCounterDots();
  applyActions();
  setInterval(update, 1000);
});
