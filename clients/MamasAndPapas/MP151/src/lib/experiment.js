/**
 * MP151 - Increasing visibility of USPs on PLP
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import { cacheDom } from './../../../../../lib/cache-dom';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';
import uspMessages from './uspMessagesList';
import createUspMessages from './createUspMessages';
// import removeUspSlide from './removeUspSlide';

const activate = () => { 
  setup();
  const screenSize = window.innerWidth;
  if (!localStorage.getItem('MP151-userSawUspMessages')) {
    createUspMessages(screenSize);

    // Click - Remove USP Message
    pollerLite(['li.MP151-usp__item.slick-slide'], () => {
      const uspListItems = document.querySelectorAll('li.MP151-usp__item');
      [].forEach.call(uspListItems, (message) => {
        const closeIcon = message.querySelector('.MP151-usp__hide');
        closeIcon.addEventListener('click', () => {
          const messageRemoved = message.getAttribute('name');
          uspMessages.splice(uspMessages.indexOf(messageRemoved), 1);
          // Remove Slide on Click
          events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - The individual cross on each slide out to be tracked individually ${messageRemoved}`, { sendOnce: true });
          $('.MP151-usp').slick('slickRemove', $(message).attr('data-index') - 1);
          // Check remaining USP messages
          if (uspMessages < 1) {
            // Hide USP Container
            document.querySelector('.MP151-usp__wrapper').classList.add('inactive');
            document.querySelector('.breadcrumb.py-1.mx-auto.bg-white.text-center.font-weight-light').style.height = '30px';
            localStorage.setItem('MP151-userSawUspMessages', true);
          }
        });
        
        const link = message.querySelector('.MP151-usp__text a');
        link.addEventListener('click', () => {
          const messageClicked = message.getAttribute('name');
          events.send(settings.ID, `Variation ${settings.VARIATION}`, `Clicked - The copy for ${messageClicked}`, { sendOnce: true });
        });
      });
    });
  }
};

export default activate;
