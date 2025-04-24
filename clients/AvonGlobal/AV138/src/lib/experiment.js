/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import colorBlock from './files/colorBlock';
import { pollerLite } from '../../../../../lib/uc-lib';
import { handleScrollnEvent } from './files/handleScrollnEvent';

const { ID, VARIATION } = shared;

const init = () => {
  setup();

  fireEvent('Conditions Met');

  handleScrollnEvent(
    '.infos_section button',
    'Customer scrolls to Description'
  );

  //console.log(`${ID} test 01`);

  if (
    document.querySelector(`.${ID}__colour-block-container`) &&
    !document.querySelector('#v7_vue_pdp_detail .mobile_version .title_section p.title')?.textContent.includes('Glimmerstick')
  ) {

    document.querySelector(`.${ID}__colour-block-container`).remove();

    if (document.querySelector('p.try-on-copy')) {
      document.querySelector('p.try-on-copy')?.remove();
      document.querySelector('.perfect_corp_section')?.classList.remove(`${ID}__virtual-try-on`);
    }

  }

  if (
    !document.querySelector('.perfect_corp_section .btn_perfect_corp') &&
    document.querySelector('p.try-on-copy')
  ) {

    document.querySelector('p.try-on-copy').remove();
    document.querySelector('.perfect_corp_section')?.classList.remove(`${ID}__virtual-try-on`);

  }

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {

    handleScrollnEvent(
      '.variants_section button',
      'Customer scrolls to colour selection'
    );

    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  if (
    !document.querySelector(`.${ID}__colour-block-container`) &&
    document.querySelector('#v7_vue_pdp_detail .mobile_version .title_section p.title')?.textContent.includes('Glimmerstick')
  ) {

    document.querySelector('.infos_section').insertAdjacentHTML('beforebegin', colorBlock(ID, `for-mobile`));

    setTimeout(() => {
      if (document.querySelector('.perfect_corp_section .btn_perfect_corp')) {

        document.querySelector('.perfect_corp_section').classList.add(`${ID}__virtual-try-on`);
        document.querySelector('.perfect_corp_section .btn_perfect_corp').textContent = "OPEN VIRTUAL TRY ON";

        if (!document.querySelector('p.try-on-copy')) {
          document.querySelector('.perfect_corp_section .btn_perfect_corp').insertAdjacentHTML(
            'beforebegin',
            `<p class="try-on-copy">NEW! See how you look before you buy</p>`
          );
        }

        handleScrollnEvent(
          '.AV138__colour-block-container.for-mobile img',
          'Customer scrolls to see content block'
        );

      }
    }, 1000);

  }

};

export default () => {

  init();

  // Poll and re-run init
  pollerLite([
    '#v7_vue_pdp_detail .mobile_version',
  ], () => {
    const appContainer = document.querySelector('#container')

    // ------------------------------------
    // Added Poller:
    // Checks for page changes and checks to see if the URL has changed
    // ------------------------------------
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {

        setTimeout(() => {
          // -----------------------------------
          // Timeout ensures router has started to rebuild DOM container
          // and we don't fire init() too early
          // -----------------------------------
          init();

        }, 1000);

      });
    });

    const config = {
      childList: true,
      subtree: true,
    };

    observer.observe(appContainer, config);
  });

  document.body.addEventListener('click', (e) => {
    const { target } = e;

    if (target.closest(`.review-btn`)) {
      if (document.querySelector('#yotpo-main-widget')) {
        document.querySelector('#yotpo-main-widget').scrollIntoView();
        //window.scrollBy(0, -100);
      }
    }

    if (target.closest(`.btn_perfect_corp`)) {
      fireEvent('Customer clicks Try on button');
    }

  });

};
