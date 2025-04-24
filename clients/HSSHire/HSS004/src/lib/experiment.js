/**
 * HSS004 - Copy product names & IDs
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, showLightbox, showLightboxClick } from './services';
import shared from './shared';
import { events } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

export default () => {
  if (shared.VARIATION == 'control') {
    events.send(`${shared.ID}-control`, 'activated');
  } else {
    if (window.location.pathname.indexOf('/p/') > -1) {
      // rest of experiment code
      events.send(`${shared.ID}-v1`, 'activated');
      setup();

      // Write experiment code here
      const controlCallCta = document.querySelector('#riq_requestcall div.dilricn2nw.lftbtmicon');
      let callCtaEl = '';
      if (!controlCallCta) {
        callCtaEl = `<button class="${shared.ID}-btn ${shared.ID}-btn__call positive large btn btn-primary btn-lg btn-block inactive">Call us</button>
        <div class="${shared.ID}-errorMessage hidden">Sorry, this is currently unavailable</div>`;
      } else {
        callCtaEl = `<button class="${shared.ID}-btn ${shared.ID}-btn__call positive large btn btn-primary btn-lg btn-block">Call us</button>`;
      }
      // --- Create Bubble
      const mainTitle = document.querySelector('.item_content h1.group_title');
      const title = document.querySelector('.item_info h2');
      const productCode = document.querySelector('.prd-code');
      //  label span
      const bubble = `<div class="${shared.ID}-bubble__wrapper hidden">
        <div class="${shared.ID}-bubble__container">
          <div class="${shared.ID}-bubble__header">
            <span class="${shared.ID}-title__wrapper">
              <div class="${shared.ID}-title">Need advice?</div>
            </span>
            <span class="${shared.ID}-close"></span>
          </div>
          <div class="${shared.ID}-bubble__textContainer">
            <p>Or have a question about:</p>
            <ul>
              <li>Delivery/Collection</li>
              <li>Availability</li>
              <li>Price</li>
            </ul>
            <p class="${shared.ID}-text__small">Have a chat to someone from our helpful and friendly support team.</p>
            <div class="${shared.ID}-btn__wrapper">
              ${callCtaEl}
              <button class="${shared.ID}-btn ${shared.ID}-btn__chat positive large btn btn-primary btn-lg btn-block">Online chat</button>
            </div>
          </div>
        </div>
      </div>`;
      title.insertAdjacentHTML('afterend', bubble);

      // --- Highlight main title text
      showLightbox(mainTitle);

      // --- Highlight title text
      showLightbox(title);
      // title.addEventListener("mouseup",event=>{
      //   // Prevent Default Actions
      //   // event.preventDefault();
      //   window.event.preventDefault();
      //   event.stopPropagation();

      //   let selection = document.getSelection ? document.getSelection().toString() :  document.selection.createRange().toString();
      //   document.querySelector(`.${shared.ID}-bubble__wrapper`).classList.remove('hidden');


      //   // --- Close Icon
      //   const closeIcon = document.querySelector(`.${shared.ID}-close`);
        
      //   closeIcon.addEventListener('click', () => {
      //     document.querySelector(`.${shared.ID}-bubble__wrapper`).classList.add('hidden');
      //   });

      //   // --- Clicked outside Lightbox
      //   setTimeout(() => {
      //     const bubbleEl = document.querySelector(`.${shared.ID}-bubble__wrapper`);
      //     document.addEventListener('click', (e) => {
      //         if (!bubbleEl.contains(e.target)) {
      //           // Clicked outside the box
      //           bubbleEl.classList.add('hidden');
      //         }
      //     });
      //   }, 2000);

      //   // --- CTA Buttons
      //   const callUsCta = document.querySelector(`.${shared.ID}-btn__call`);
      //   const chatCta = document.querySelector(`.${shared.ID}-btn__chat`);
      //   const errorMessage = document.querySelector(`.${shared.ID}-errorMessage`);

      //   callUsCta.addEventListener('click', () => {
      //     if (!callUsCta.classList.contains('inactive')) {
      //       controlCallCta.click();
      //     } else {
      //       callUsCta.classList.add('grey');
      //       errorMessage.classList.remove('hidden');
      //     }
      //   });

      //   chatCta.addEventListener('click', () => {
      //     let controlChatCta = document.querySelector('button#bc_chatbutton');
      //     if (!controlChatCta) {
      //       controlChatCta = document.querySelector('div.bcFloat a');
      //     }
      //     controlChatCta.click();
      //   });
        
      // });



      // --- Highlight product code text
      showLightboxClick(productCode);
    }
  }
};
