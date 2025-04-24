import { pollerLite } from '../../../../../lib/uc-lib';
import { fullStory, events } from '../../../../../lib/utils';

const MP132variation2 = {
  init() {
    const { bindExperimentEvents } = MP132variation2;

    const boxContainer = `<div class='MP132-pushchair-suggestion__wrapper' style='visibility: hidden;'>
      <div class='MP132-pushchair-suggestion__container'>
        <div class='MP132-pushchair__image'></div>
        <div class='MP132-pushchair__content'>
          <div class='MP132-pushchair__title'>Other customers bought:</div>
          <div class='MP132-pushchair__name'>
            <a href='https://www.mamasandpapas.com/en-gb/ocarro-signature-edition-grey-twill/p/5775as4w2'>Ocarro Signature Edition All Terrain Pushchair</a>
          </div>
          <div class='MP132-pushchair__more-info'>
            <div class='MP132-pushchair__price'>from £749.00</div>
            <div class='MP132-pushchair__btn'>More Info</div>
          </div>
        </div>
        <div id='MP132-close-box'><div id='close-icon'></div></div>
      </div>
    </div>`;

    if (window.innerWidth > 450) {
      const qtyBlock = document.querySelector('.qty-block');
      qtyBlock.insertAdjacentHTML('afterend', boxContainer);
    } else {
      pollerLite(['#sticky-footer-container'], () => {
        const mobileStickyFooter = document.querySelector('#sticky-footer-container');
        if (mobileStickyFooter) {
          mobileStickyFooter.insertAdjacentHTML('afterbegin', boxContainer);
        }
      });
    }

    pollerLite(['.MP132-pushchair-suggestion__wrapper'], () => {
      setTimeout(function(){ 
        const pushchairSuggestion = document.querySelector('.MP132-pushchair-suggestion__wrapper');
        pushchairSuggestion.classList.add('show');
        pushchairSuggestion.style.visibility = '';

        // GA Event - Pop-up box shown
        events.send('MP132', `Variation 2`, `User saw - Pop Up Box`, { sendOnce: true });
      }, 10000);
      bindExperimentEvents.closePushchairPopUp();
      bindExperimentEvents.clickMoreInfo();
    });
  },

  bindExperimentEvents: {
    /**
     * @desc Close Pushchair Pop-up Box
     */
    closePushchairPopUp() {
      const closeIcon = document.querySelector('#MP132-close-box');
      if (closeIcon) {
        closeIcon.addEventListener('click', () => {
          events.send('MP132', `Variation 2`, `Clicked - X to Close Box`, { sendOnce: true });
          document.querySelector('.MP132-pushchair-suggestion__wrapper').classList.remove('show');
        });
      }
    },
    /**
     * @desc Click 'More Info' button
     */
    clickMoreInfo() {
      const moreInfoBtn = document.querySelector('.MP132-pushchair__btn');
      if (moreInfoBtn) {
        moreInfoBtn.addEventListener('click', () => {
          events.send('MP132', `Variation 2`, `Clicked - More Info`, { sendOnce: true });
          window.location.href = 'https://www.mamasandpapas.com/en-gb/pushchairs-prams';
        });
      }
    },
  },
};

export default MP132variation2;
