/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import observeDOM from './helper/observeDOM';
import isInViewport from './helper/isInViewport';
import clickHandler from './helper/clickHandler'
import { makeElementSticky } from './helper/stickyHandler';
import { stickyBanner } from './components/stickyBanner';
import { mainModal } from './components/mainModal';

const { ID, VARIATION } = shared;
let targetEle = document.querySelector('main article>div');

const init = () => {

  //console.log(`BL ${ID} test working`);

  if (VARIATION == 'control') {
    return;
  }

  setTimeout(() => {

    if (!document.querySelector(`.${ID}__sticky-banner-container`)) {

      targetEle.insertAdjacentHTML("afterend", mainModal(ID));
      targetEle.insertAdjacentHTML("beforeend", stickyBanner(ID));

      makeElementSticky(`.${ID}__sticky-banner-container`);

      document.querySelector(`.${ID}__sticky-banner-container`)
        .addEventListener("click", () => {

          document.querySelector(`.${ID}__modal-container`)
            .classList.add('modal-active');

          document.querySelector(`.${ID}__sticky-banner-container`)
            .classList.add('clicked-once')

        })

      document.addEventListener("click", (e) => {

        const { target } = e;

        if (target.classList.value !== " ") {

          if (
            target.classList.value.includes(`${ID}__modal-container modal-active`) ||
            target.classList.value.includes('cross-icon')
          ) {
            document.querySelector(`.${ID}__modal-container`)
              .classList.remove('modal-active');
          }

          if (target.classList.value.includes('modal-signup')) {
            window.location.href = `https://manage.gocardless.com/sign-up`;
          }

          if (target.classList.value.includes('sticky-cross-icon')) {
            document.querySelector(`.${ID}__sticky-banner-container`)
              .classList.add('hide');
          }

        }

      });

      setTimeout(() => {
        let tragetEle = document.querySelectorAll('.css-mhfmft');

        if (tragetEle.length > 0) {
          let targetNum = tragetEle.length - 1;

          function onScroll() {
            const myElement = document.querySelectorAll('.css-mhfmft')[targetNum];
            if (isInViewport(myElement)) {

              if (
                !document.querySelector(`.GCOR032__modal-container.modal-active`) &&
                !document.querySelector(`.GCOR032__modal-container.auto-generated`)
              ) {
                document.querySelector(`.GCOR032__modal-container`).classList.add('modal-active', 'auto-generated');
              }
            }
          }
          window.addEventListener('scroll', onScroll);

        }
      }, 1000)

    }

  }, 1500);

}

export default () => {

  setup();
  fireEvent('Conditions Met');

  init();
  observeDOM('body', init);

  document.body.addEventListener('click', clickHandler);

};
