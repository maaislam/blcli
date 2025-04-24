import { fullStory } from '../../../../../lib/utils';
import settings from './settings';

const { ID, VARIATION } = settings;

/**
 * Standard experiment setup
 */
export const setup = () => {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
};

/**
 * Gets layout name from root scope (mobile/tablet/desktop)
 * @returns {string}
 */
export const getLayoutName = () => window.AppModule.RootScope.Layout.Name;

/**
 * Create a date object in UTC time
 * @param {String} dateTime DateTime
 * @returns {Date}
 */
export const createDateAsUTC = (dateTime) => {
  const date = new Date(dateTime);
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
};
