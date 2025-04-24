/* eslint-disable import/prefer-default-export */
import { fullStory } from '../../../../../lib/utils';
import { getLanguage } from '../../../../../lib/utils/avon';
import translations from './translations';
import shared from './shared';

/**
 * Standard experiment setup
 */
export const setup = () => {
  const { ID, VARIATION } = shared;

  /** Use fullStory API to tag screen recording with experiment info */
  fullStory(ID, `Variation ${VARIATION}`);

  /** Namespace with body classes for easier CSS specificity */
  document.body.classList.add(ID);
  document.body.classList.add(`${ID}-${VARIATION}`);
};

/**
 * Translate a string to another language
 * Dataset located at /lib/translations.js
 * @returns {string}
 */
export const translate = (text) => {
  const translation = translations[text] ? translations[text][getLanguage()] : false;
  return translation || text;
};
