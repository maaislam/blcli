/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import { onUrlChange } from './helpers/utils';
import { searchBox } from './components/searchBox';
//import { searchResults } from './components/searchResults';

const { ID, VARIATION } = shared;
const DOM_RENDER_DELAY = 1000;

const init = () => {
  if (window.location.pathname !== '/') {
    if (document.querySelector(`.${ID}__searchBox`)) {
      document.querySelector(`.${ID}__searchBox`).remove();
    }
    document.documentElement.classList.remove(ID);
    document.documentElement.classList.add(`${ID}-${VARIATION}`);
    return;
  }
  setup();
  fireEvent('Conditions Met');

  if (VARIATION == 'control') {
    return;
  }

  const mainContainerElement = document.querySelector('#container-main');
  if (document.querySelector(`.${ID}__searchBox`)) {
    document.querySelector(`.${ID}__searchBox`).remove();
  }

  mainContainerElement && mainContainerElement.insertAdjacentHTML('afterbegin', searchBox(ID));

  const inputElement = document.querySelector(`.${ID}__input`);

  const handleKeypress = (event) => {
    const searchBtn = document.querySelector(`.${ID}__searchBtn`);

    if (event.key === 'Enter' && inputElement.value.trim() !== '') {
      searchBtn.click();
    }
  };

  inputElement.addEventListener('focus', () => {
    inputElement.addEventListener('keypress', handleKeypress);
  });

  inputElement.addEventListener('blur', () => {
    inputElement.removeEventListener('keypress', handleKeypress);
  });
};

export default () => {
  /*****Request from Screwfix*****/
  const blExpID = VARIATION === 'control' ? `${ID} control` : ID;
  window.brainLabsExperimentID = window.brainLabsExperimentID || '';
  if (window.brainLabsExperimentID) {
    window.brainLabsExperimentID += `,${blExpID}`;
  } else {
    window.brainLabsExperimentID = blExpID;
  }

  /*****Request from Screwfix*****/

  document.body.addEventListener('click', (event) => {
    const { target } = event;

    if (target.closest(`.${ID}__searchBtn`)) {
      //event.preventDefault();
      const searchTerm = document.querySelector(`.${ID}__input`).value;
      window.location.href = `/search?search=${searchTerm}`;
    }
  });

  setTimeout(init, DOM_RENDER_DELAY);

  onUrlChange(() => {
    pollerLite(['#__next', '#__NEXT_DATA__', () => window.__NEXT_DATA__ !== undefined, '#container-main'], () => {
      setTimeout(init, DOM_RENDER_DELAY);
    });
  });
};
