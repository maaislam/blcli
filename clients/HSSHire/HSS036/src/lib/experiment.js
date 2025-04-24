/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { getElements } from './get-elements';

const { ID, VARIATION } = shared;

export default () => {
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') return;

  // Is user logged in?
  if (document.querySelector('#header .logged_details')) {
    fireEvent(`${ID} - The user is already logged in`);
    return;
  }

  // PLP
  const plpProductCountElement = document.querySelector(
    '#content > div.container.category-padding > div > div > .product_count'
  );

  const plpCategoryElement = document.querySelector(
    '#content > div:nth-child(4) > div > div.col-xs-12 > div.row > div > div > div'
  );

  // PDP
  const inputElement = document.querySelector('.input_here');

  if (!plpProductCountElement && !inputElement && !plpCategoryElement) return;

  if (plpProductCountElement)
    plpProductCountElement.insertAdjacentHTML(
      'beforebegin',
      getElements('plp')
    );

  if (plpCategoryElement)
    plpCategoryElement.insertAdjacentHTML('beforebegin', getElements('plp'));

  if (inputElement)
    inputElement.insertAdjacentHTML('afterend', getElements('pdp'));

  // Mobile buttons
  const mobileButtonShowMore = document.querySelector(
    `.${ID}-mobile__icons-wrapper-small--button`
  );
  const mobileButtonShowLess = document.querySelector(
    `.${ID}-mobile__icons-wrapper-big--close-button`
  );
  const mobileLoginButton = document.querySelector(
    `.${ID}-mobile__icons-wrapper-big--register-button`
  );
  const mobileSmallIconsWrapper = document.querySelector(
    `.${ID}-mobile__icons-wrapper-small`
  );
  const mobileBigIconsWrapper = document.querySelector(
    `.${ID}-mobile__icons-wrapper-big`
  );

  // Desktop buttons
  const desktopButtonShowMore = document.querySelector(
    `.${ID}-desktop__icons-wrapper-small--button`
  );
  const desktopLoginButton = document.querySelector(
    `.${ID}-desktop__icons-wrapper-big--register-button`
  );
  const desktopBigIconsWrapper = document.querySelector(
    `.${ID}-desktop__icons-wrapper-big`
  );

  // Mobile show more
  mobileButtonShowMore &&
    mobileButtonShowMore.addEventListener('click', (e) => {
      e.preventDefault();
      !mobileSmallIconsWrapper.classList.contains(`${ID}-hidden`) &&
        mobileSmallIconsWrapper.classList.add(`${ID}-hidden`);

      mobileBigIconsWrapper.classList.contains(`${ID}-hidden`) &&
        mobileBigIconsWrapper.classList.remove(`${ID}-hidden`);

      fireEvent(`${ID} - The user has opened Trade login and sign up`);
    });

  // Mobile show less
  mobileButtonShowLess &&
    mobileButtonShowLess.addEventListener('click', (e) => {
      e.preventDefault();
      mobileSmallIconsWrapper.classList.contains(`${ID}-hidden`) &&
        mobileSmallIconsWrapper.classList.remove(`${ID}-hidden`);

      !mobileBigIconsWrapper.classList.contains(`${ID}-hidden`) &&
        mobileBigIconsWrapper.classList.add(`${ID}-hidden`);

      fireEvent(`${ID} - The user has closed Trade login and sign up`);
    });

  // Mobile login button
  mobileLoginButton &&
    mobileLoginButton.addEventListener('click', (e) => {
      e.preventDefault();

      fireEvent(
        `${ID} - The user has clicked Login, register or activate here button`
      );

      window.location = '/hire/login';
    });

  // Desktop show more
  desktopButtonShowMore &&
    desktopButtonShowMore.addEventListener('click', (e) => {
      e.preventDefault();
      if (desktopBigIconsWrapper.classList.contains(`${ID}-hidden`)) {
        desktopBigIconsWrapper.classList.remove(`${ID}-hidden`);

        desktopButtonShowMore.classList.add('rotate');

        fireEvent(`${ID} - The user has opened Trade login and sign up`);
      } else {
        desktopBigIconsWrapper.classList.add(`${ID}-hidden`);

        desktopButtonShowMore.classList.remove('rotate');

        fireEvent(`${ID} - The user has closed Trade login and sign up`);
      }
    });

  // Desktop login button
  desktopLoginButton &&
    desktopLoginButton.addEventListener('click', (e) => {
      e.preventDefault();

      fireEvent(
        `${ID} - The user has clicked Login, register or activate here button`
      );

      window.location = '/hire/login';
    });
};
