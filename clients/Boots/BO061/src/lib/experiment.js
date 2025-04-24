/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { pollerLite } from '../../../../../lib/utils';
import { setup } from './services';
import shared from './shared';

export default () => {
  setup();

  const { ID } = shared;

  
  const buttonsMarkup = () => {
    let content;

    if(document.querySelector('#estore_category_heading h1') && document.querySelector('#estore_category_heading h1').textContent.trim() === 'black friday') {
      content = `
      <a class="${ID}-button" href="https://www.boots.com/christmas/christmas-weekly-offers"><span class="title">Shop All Star Gifts</span></a>
      <a class="${ID}-button" href="https://www.boots.com/christmas/christmas-3-for-2"><span class="title">Shop All Christmas 3 for 2</span></a>`;
    } else if(document.querySelector('#estore_category_heading h1') && document.querySelector('#estore_category_heading h1').textContent.trim() === 'all black friday deals') { 
      content = `
      <a class="${ID}-button" href="https://www.boots.com/christmas/christmas-weekly-offers"><span class="title">Shop All Star Gifts</span></a>
      <a class="${ID}-button" href="https://www.boots.com/christmas/christmas-3-for-2"><span class="title">Shop All Christmas 3 for 2</span></a>`;
    }
    else if(window.location.href.indexOf('christmas-weekly-offers') > -1){
      content = `
      <a class="${ID}-button" href="https://www.boots.com/black-friday/all-blackfriday-deals"><span class="title">Shop All Black Friday</span></a>
      <a class="${ID}-button" href="https://www.boots.com/christmas/christmas-3-for-2"><span class="title">Shop All Christmas 3 for 2</span></a>`;
    } else {
      content = `
      <a class="${ID}-button" href="https://www.boots.com/black-friday/all-blackfriday-deals"><span class="title">Shop All Black Friday</span></a>
      <a class="${ID}-button" href="https://www.boots.com/christmas/christmas-weekly-offers"><span class="title">Shop All Star Gifts</span></a>`;
    }

    return content;
  }

  const blackFridayPageButtons = {
    'Shop All Star Gifts': {
      link: ' https://www.boots.com/christmas/christmas-weekly-offers'
    },
    'Shop All Christmas 3 for 2': {
      link: 'https://www.boots.com/christmas/christmas-3-for-2'
    }
  }

  const blackFridayButtons = {
    'Shop All Black Friday': {
      link: 'https://www.boots.com/black-friday/all-blackfriday-deals'
    },
    'Shop All Christmas 3 for 2': {
      link: 'https://www.boots.com/christmas/christmas-3-for-2'
    }
  }

  let buttonsToShow;

  if(document.querySelector('#estore_category_heading h1') && document.querySelector('#estore_category_heading h1').textContent.trim() === 'black friday') {
    buttonsToShow = blackFridayPageButtons;
  } else {
    buttonsToShow = blackFridayButtons;
  }

  const addButtons = () => {
    const buttons = document.createElement('div');
    buttons.classList.add(`${ID}-blackFridayButtons`);
    buttons.innerHTML = buttonsMarkup();

    return buttons;
  }


  pollerLite(['#PLP--Banner--blackFriday--2020 .container'], () => {
    document.querySelector('#PLP--Banner--blackFriday--2020 .container').insertAdjacentElement('afterbegin', addButtons());
  });

  pollerLite(['.heroCarousel'], () => {
    document.querySelector('.heroCarousel').insertAdjacentElement('beforebegin', addButtons());
  })
  
  if(window.location.href.indexOf('/christmas-weekly-offers') > -1) {
    pollerLite(['.cm-placement-slot5 .richText.seo'], () => {
      document.querySelector('.cm-placement-slot5 .richText.seo').insertAdjacentElement('afterend', addButtons());
    });
  }


};
