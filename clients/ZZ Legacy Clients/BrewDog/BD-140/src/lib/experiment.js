/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { events } from '../../../../../lib/utils';

const mobileSearch = () => {
  const headerMob = document.querySelector('.header-mobile');
  if(headerMob) {
    headerMob.insertAdjacentHTML('beforeend', `
      <div class="${shared.ID}-search ${shared.ID}-search__mobile">
        <img src="https://www.brewdog.com/static/version1616573223/frontend/Born/arcticFox/en_US/design-system/icons/icon-search-20.svg" class="${shared.ID}-search__icon">
        <input type="text" class="${shared.ID}-search__input" placeholder="Search...">
      </div>
    `);

    const input = document.querySelector(`.${shared.ID}-search__mobile .${shared.ID}-search__input`);
    if(input) {
      input.addEventListener('focus', () => {
        events.send('Experimentation', `${shared.ID}`, `V-${shared.VARIATION} - Focus Input`, {
          sendOnce: true
        })

        const existingIcon = document.querySelector(`.header-mobile__actions .link .icon`);
        if(existingIcon) {
          existingIcon.click();
        }

        const existingInput = document.querySelector(`.search-modal__content__input`);
        if(existingInput) {
          existingInput.dispatchEvent(new Event('focus'));
        }
      });
    }
  }
};

const desktopSearch = () => {
  const headerActions = document.querySelector('.header__actions');
  if(headerActions) {
    headerActions.insertAdjacentHTML('afterbegin', `
      <li class="${shared.ID}-search ${shared.ID}-search__desktop header__actions__action even">
        <img src="https://www.brewdog.com/static/version1616573223/frontend/Born/arcticFox/en_US/design-system/icons/icon-search-20.svg" class="${shared.ID}-search__icon">
        <input type="text" class="${shared.ID}-search__input" placeholder="Search...">
      </div>
    `);

    const input = document.querySelector(`.${shared.ID}-search__desktop .${shared.ID}-search__input`);
    if(input) {
      input.addEventListener('focus', () => {
        events.send('Experimentation', `${shared.ID}`, `V-${shared.VARIATION} - Focus Input`, {
          sendOnce: true
        })

        const existingIcon = document.querySelector(`.header__actions #search-button .icon`);
        if(existingIcon) {
          existingIcon.click();
        }

        const existingInput = document.querySelector(`.search-modal__content__input`);
        if(existingInput) {
          existingInput.dispatchEvent(new Event('focus'));
        }
      });
    }
  }
};

export default () => {
  setup();

  mobileSearch();

  desktopSearch();
};
