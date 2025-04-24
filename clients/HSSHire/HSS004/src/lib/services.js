import { fullStory } from '../../../../../lib/utils';
import shared from './shared';

/**
 * Pass data to shared object
 * @param {Object} data
 */
export const share = (data) => {
  Object.keys(data).forEach((key) => {
    shared[key] = data[key];
  });
};

/**
 * Standard experiment setup
 */
export const setup = () => {
  const { ID, VARIATION } = shared;

  /** Use fullStory API to tag screen recording with experiment info */
  fullStory(ID, `Variation ${VARIATION}`);

  /** Namespace with body classes for easier CSS specificity */
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
};

export const showLightbox = (item) => {
  item.addEventListener("mouseup",event=>{
    // Prevent Default Actions
    // event.preventDefault();
    window.event.preventDefault();
    event.stopPropagation();

    let selection = document.getSelection ? document.getSelection().toString() :  document.selection.createRange().toString();
    document.querySelector(`.${shared.ID}-bubble__wrapper`).classList.remove('hidden');
    console.log('Highlighted text:');
    console.log(selection);

    // --- Close Icon
    const closeIcon = document.querySelector(`.${shared.ID}-close`);
    
    closeIcon.addEventListener('click', () => {
      document.querySelector(`.${shared.ID}-bubble__wrapper`).classList.add('hidden');
    });

    // --- Clicked outside Lightbox
    setTimeout(() => {
      const bubbleEl = document.querySelector(`.${shared.ID}-bubble__wrapper`);
      document.addEventListener('click', (e) => {
          if (!bubbleEl.contains(e.target)) {
            // Clicked outside the box
            bubbleEl.classList.add('hidden');
          }
      });
    }, 2000);

    // --- CTA Buttons
    const callUsCta = document.querySelector(`.${shared.ID}-btn__call`);
    const chatCta = document.querySelector(`.${shared.ID}-btn__chat`);
    const errorMessage = document.querySelector(`.${shared.ID}-errorMessage`);

    callUsCta.addEventListener('click', () => {
      if (!callUsCta.classList.contains('inactive')) {
        controlCallCta.click();
      } else {
        callUsCta.classList.add('grey');
        errorMessage.classList.remove('hidden');
      }
    });

    chatCta.addEventListener('click', () => {
      let controlChatCta = document.querySelector('button#bc_chatbutton');
      if (!controlChatCta) {
        controlChatCta = document.querySelector('div.bcFloat a');
      }
      controlChatCta.click();
    });
    
  });
};


export const showLightboxClick = (item) => {
  item.addEventListener("click",event=>{
    // Prevent Default Actions
    // event.preventDefault();
    window.event.preventDefault();
    event.stopPropagation();

    let selection = document.getSelection ? document.getSelection().toString() :  document.selection.createRange().toString();
    document.querySelector(`.${shared.ID}-bubble__wrapper`).classList.remove('hidden');
    console.log('Highlighted text:');
    console.log(selection);

    // --- Close Icon
    const closeIcon = document.querySelector(`.${shared.ID}-close`);
    
    closeIcon.addEventListener('click', () => {
      document.querySelector(`.${shared.ID}-bubble__wrapper`).classList.add('hidden');
    });

    // --- Clicked outside Lightbox
    setTimeout(() => {
      const bubbleEl = document.querySelector(`.${shared.ID}-bubble__wrapper`);
      document.addEventListener('click', (e) => {
          if (!bubbleEl.contains(e.target)) {
            // Clicked outside the box
            bubbleEl.classList.add('hidden');
          }
      });
    }, 2000);

    // --- CTA Buttons
    const callUsCta = document.querySelector(`.${shared.ID}-btn__call`);
    const chatCta = document.querySelector(`.${shared.ID}-btn__chat`);
    const errorMessage = document.querySelector(`.${shared.ID}-errorMessage`);

    callUsCta.addEventListener('click', () => {
      if (!callUsCta.classList.contains('inactive')) {
        controlCallCta.click();
      } else {
        callUsCta.classList.add('grey');
        errorMessage.classList.remove('hidden');
      }
    });

    chatCta.addEventListener('click', () => {
      let controlChatCta = document.querySelector('button#bc_chatbutton');
      if (!controlChatCta) {
        controlChatCta = document.querySelector('div.bcFloat a');
      }
      controlChatCta.click();
    });
    
  });
};
