import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  const taggContainer = document.createElement('div');
  taggContainer.classList.add(`${ID}-taggMessages`);
  if(VARIATION === '1') {
    document.querySelector('.product-col-2.product-detail').insertAdjacentElement('afterbegin', taggContainer);
  }
  if(VARIATION === '2') {
    document.querySelector('.product-col-1').insertAdjacentElement('beforebegin', taggContainer);
  }
  if(VARIATION === '3') {
    document.querySelector('.product-col-1 .product-primary-image').insertAdjacentElement('afterend', taggContainer);
  }


  // wait for tagg message to exist to get the text
  let tagMessages = [];

  const getTaggMessages = () => {
    return new Promise((resolve, reject) => {
        pollerLite(['.tagg-reset.tagg-balloon',
        () => {
          if(document.querySelectorAll(`.tagg-reset.tagg-balloon`)[1]) {
            return true;
          }
        }], () => {
        const allTagMessages = document.querySelectorAll(`.tagg-reset.tagg-balloon`);
        for (let index = 0; index < allTagMessages.length; index += 1) {
          const element = allTagMessages[index];
          const tagText = element.querySelector('.tagg-txt');
          
          if(tagText) {
            if(VARIATION !== 'control') {
              tagMessages.push(tagText.innerHTML);
            }
            resolve();
          }
        }
      });
    });
  }

  // create and add the new messages
  getTaggMessages().then(() => {

    if(VARIATION !== 'control') {
      fireEvent('New Tagg Messages Shown');
    } else {
      fireEvent('Control Tagg Messages Shown');
    }

    if(VARIATION !== 'control') {
      const taggMessages = () => {
        taggContainer.innerHTML = `
        <div class="${ID}-message ${ID}-first">${tagMessages[0].replace("Don't miss out", "Don't miss out!")}</div>
        <div class="${ID}-message ${ID}-second">${tagMessages[1]}</div>`;
      }

      taggMessages();
    

      const showHideMessages = () => {
        //  the first after 2 seconds, the second after 4 seconds.
        const firstEl = document.querySelector(`.${ID}-message.${ID}-first`);
        const secondEl = document.querySelector(`.${ID}-message.${ID}-second`);


        //1st message shows at 2 and disappears at 7
        firstEl.classList.add(`${ID}-show`);
        
        setTimeout(() => {
          firstEl.classList.add(`${ID}-fadeOut`);
          firstEl.classList.remove(`${ID}-show`);
        }, 5000)

        setTimeout(() => {
          secondEl.classList.add(`${ID}-show`);
        }, 6000);
        setTimeout(() => {
          secondEl.classList.add(`${ID}-fadeOut`);
          firstEl.classList.remove(`${ID}-show`);
        }, 11000);

        setTimeout(() => {
      // document.querySelector(`.${ID}-scarcityMessages`).remove();
        }, 9700);

      };

      showHideMessages();
    }
  });

  
  

};
