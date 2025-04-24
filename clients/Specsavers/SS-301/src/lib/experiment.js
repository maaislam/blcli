/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  const markup = `
    <div class="${ID}-p">
      <p class="${ID}-p__title">
        Is your prescription up to date?
      </p>
      <div class="${ID}-p__btns">
        <a href="/book/location" class="${ID}-p__btn">Book a test online</a>
      </div>

      <span class="${ID}-p__close">&times;</span>
    </div>
  `;

  const wrapper = document.querySelector('#content-wrapper');
  if(wrapper) {
    wrapper.insertAdjacentHTML('afterbegin', markup);

    const btn = document.querySelector(`.${ID}-p__btn`);
    if(btn) {
      btn.addEventListener('click', e => fireEvent('Click Book Button'));
    }

    const close = document.querySelector(`.${ID}-p__close`);
    if(close) {
      close.addEventListener('click', e => {
        document.querySelector(`.${ID}-p`)?.remove?.();

        localStorage.setItem(`${ID}-closed`, 1);

        fireEvent('Click Close')
      });

    }
  }
};
