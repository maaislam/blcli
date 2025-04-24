import Experiment from '../experiment';
import { fullStory, events, getCookie } from '../../../../../lib/utils';

/**
 * Helper storage in storage
 */
const store = (k, v) => {
  localStorage.setItem(k, v);
};

/**
 * Helper get
 */
const get = (k) => {
  return localStorage.getItem(k);
};

/**
 * Helper did see popup
 */
const markDidSeePopup = () => {
  store(Experiment.settings.STORAGE_KEY__POPUP, 1);
};

export {markDidSeePopup};

/**
 * Helper mark as did see popup
 *
 * @return {Boolean}
 */
const getDidSeePopup = () => {
  return !!Number(get(Experiment.settings.STORAGE_KEY__POPUP));
};

export {getDidSeePopup};

/**
 * Helper set toggled state
 */
const saveToggled = (toggled) => {
  document.cookie = `${Experiment.settings.STORAGE_KEY__TOGGLED}=${Number(toggled)}`;
};

export {saveToggled};

/**
 * Get toggled state
 */
const getToggled = () => Number(getCookie(Experiment.settings.STORAGE_KEY__TOGGLED));

export {getToggled};
