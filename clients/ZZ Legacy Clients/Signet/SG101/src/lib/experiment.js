/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, getSiteFromHostname } from './services';
import { events } from '../../../../../lib/utils';
import shared from './shared';
import ServicePopup from './lightbox';

const { ID, VARIATION } = shared;

export default () => {
  if(VARIATION == 'control') {
    events.send(`${ID} - Control`, 'Fired');
    const liveChat = document.querySelector('.js-live-chat-toggle');
    if(liveChat) {
      liveChat.addEventListener('click', () => {
        events.send(`${ID} - V` + VARIATION, 'click', 'live chat toggle');
      });

      const phoneCall = document.querySelector('.js-live-chat-dialog .live-chat__chat-option.js-live-chat-gis .live-chat__cta');
      
      if(phoneCall) {
        phoneCall.addEventListener('click', () => {
          events.send(`${ID} - V` + VARIATION, 'click', `Begin phone call button`);
        });
      }

      const liveChatButton = document.querySelector('.js-live-chat-dialog .live-chat__chat-option.js-live-chat-whoson .live-chat__cta');
      if(liveChatButton) {
        liveChatButton.addEventListener('click', () => {
          events.send(`${ID} - V` + VARIATION, 'click', `Begin live chat button`);
        });
      }

      const appointmentButton = document.querySelector('.js-live-chat-dialog .live-chat__chat-option.js-live-chat-instore-appointment .live-chat__cta');
      if(appointmentButton) {
        appointmentButton.addEventListener('click', () => {
          events.send(`${ID} - V` + VARIATION, 'click', `Book in store appointment button`);
        });
      }

      const onlineappointmentButton = document.querySelector('.js-live-chat-dialog .live-chat__chat-option.js-live-chat-virtual-appointment .live-chat__cta');
      if(onlineappointmentButton) {
        onlineappointmentButton.addEventListener('click', () => {
          events.send(`${ID} - V` + VARIATION, 'click', `Book virtual appointment button`);
        });
      }
    }
  } else {
    events.send(`${ID} - V` + VARIATION, 'Fired');

    setup();

    const createSideTab = () => {
      const sideTab = document.createElement('div');
      sideTab.classList.add(`${ID}-sideBar`);
      sideTab.innerHTML = `<p><span></span>Talk to an <b>expert</b><p>`;

      document.body.appendChild(sideTab);
    }

    document.body.insertAdjacentHTML('beforeend', `<div class="${ID}-overlay"></div>`);
    createSideTab();
    new ServicePopup();


    /** In grid content block */

    const InGridMessage = () => {

      const message = document.createElement('div');
      message.className = `${ID}-inGrid product-tile-list__item`;
      message.innerHTML = `
      <div class="${ID}-container">
      <div class="${ID}-image"></div>
      <div class="${ID}-wrapper">
        <div class="${ID}-inGrid-content">
          <div class="${ID}-icon"></div>
          <h3>Need Help?</h3>
          <p>Why not speak to one of our online experts</p>
          <p>Virtual consultations available now</p>
          <div class="${ID}-button">Talk to an expert</div>
        </div>
      </div>
      </div>`;
      

      return message;
    }

   
    const addMessage = () => {
      const products = document.querySelectorAll('.product-tile-list .product-tile-list__item');
      for (let index = 0; index < products.length; index += 1) {
        const element = products[index];
        
        const gridMessage = InGridMessage();

        // insert content after 7th and 14th - mobile
          if(index === 6 || index === 13) {
            element.insertAdjacentElement('afterend', gridMessage);
          }
      }
    }

    const removeMessage = () => {
     const allIngridContent = document.querySelectorAll(`.${ID}-inGrid`);
      if(allIngridContent) {
        for (let index = 0; index < allIngridContent.length; index += 1) {
          const element = allIngridContent[index];
          element.remove();
        }
      }
    }

    const buttonEvent = () => {
      const inGridContent = document.querySelectorAll(`.${ID}-inGrid`);
      if(inGridContent) {
        for (let index = 0; index < inGridContent.length; index += 1) {
          const element = inGridContent[index];
          element.querySelector(`.${ID}-button`).addEventListener('click', () => {
            // click side tab
            const sideBar = document.querySelector(`.${ID}-sideBar`);
            if(sideBar) {
              sideBar.click();
              events.send(`${ID} variation: ${VARIATION} site: ${getSiteFromHostname()}`, 'click', 'in grid help');
            }
          });
        }
      }
    }

    const productBanner = () => {
      let title;
      let bgImage;
      let productText;
      let bookingLink;
      
      const EJbrands = ['Breitling','TAG Heuer', 'Omega', 'Bremont', 'Tudor', 'Glashutte', 'Chanel', 'Chopard', 'Zenith'];
      // diamond rings
      if(window.digitalData.page.category.subCategory1 === 'Rings' && window.location.href.indexOf('diamond') > -1) {
        title = 'Talk to our Diamond Ring Experts';
        productText = 'diamond rings';
        bgImage = 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/70416AE464F3F66FA4E7E0170282C490A6E001726D2DDC6C1B08E1F5C2ECEF38.jpg?meta=/SG101---Live-Advice-Popup-Eng-New/store.jpg';
      }
      
      if(getSiteFromHostname() === 'ernestjones') {
        bookingLink = 'https://customer.bookingbug.com/?client=ernest_jones&service=48321&company=37397';
        // luxury watches
          if(EJbrands.indexOf(window.digitalData.product[0].productInfo.brand) > -1 && window.digitalData.page.category.primaryCategory === 'Watches'){
            title = 'Talk to our Luxury Watch Experts';
            productText = 'luxury watches';
            bgImage = 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/70416AE464F3F66FA4E7E0170282C490A6E001726D2DDC6C1B08E1F5C2ECEF38.jpg?meta=/SG101---Live-Advice-Popup-Eng-New/store.jpg';
          }
      } else {
        bookingLink = 'https://customer.bookingbug.com/?client=h_samuel&service=49232&company=37398';
        // normal watches
          if(window.digitalData.page.category.primaryCategory === 'Watches') {
            title = 'Talk to our Watch Experts';
            productText = 'watches';
            bgImage = 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/F02CA8291AC2706E224241B3D46293DF342561F22E92734485601D6CF950BC16.jpg?meta=/SG101---Live-Advice-Popup-Eng-New/HS-01-copy1.jpg';
          }
      }

      const adviceBanner = document.createElement('div');
      adviceBanner.classList.add(`${ID}-liveChatBanner`);
      if(window.innerWidth > 767) {
        adviceBanner.style = `background-image: url(${bgImage})`;
      }

      adviceBanner.innerHTML = `
      <div class="${ID}-mobileImage" style="background-image: url(${bgImage})"></div>
      <div class="${ID}-innerText">
        <h3>${title}</h3>
        <p>Have a question about one of our ${productText}? Want to speak with one of our specialist members of staff to discuss your requirements in detail? Book an appointment, at your convenience, today</p>
        <a class="${ID}-button" href="${bookingLink}">Book now</a>
      </div>`;

      document.querySelector('.detail-page__upper-row').insertAdjacentElement('afterend', adviceBanner);

      adviceBanner.querySelector('a').addEventListener('click', () => {
        events.send(`${ID} variation: ${VARIATION}`, 'click', 'live advice banner on PDP');
      });
    }

    if(window.digitalData.page.pageInfo.pageType === 'PLP') {
      addMessage();
      buttonEvent();
    }

    if(window.digitalData.page.pageInfo.pageType === 'PDP') {
      if(window.digitalData.page.category.subCategory1 === 'Rings' && window.location.href.indexOf('diamond') > -1) {
        productBanner();
      }
      if(getSiteFromHostname() === 'ernestjones') {
        const EJbrands = ['Breitling','TAG Heuer', 'Omega', 'Bremont', 'Tudor', 'Glashutte', 'Chanel', 'Chopard', 'Zenith'];
        if(EJbrands.indexOf(window.digitalData.product[0].productInfo.brand) > -1 && window.digitalData.page.category.primaryCategory === 'Watches'){
          productBanner();
        }
      } else {
        if(window.digitalData.page.category.primaryCategory === 'Watches') {
          productBanner();
        }
      } 
    }


    let oldHref = document.location.href;
    let bodyList = document.querySelector("body");
    const observeEl = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (oldHref != document.location.href) {
                    oldHref = document.location.href;
                    if(window.digitalData.page.pageInfo.pageType === 'PLP') {
                      removeMessage();
                      addMessage();
                      buttonEvent();
                    }
                }
            });
        });
    const config = {
        childList: true,
        subtree: true
    };
    
    observeEl.observe(bodyList, config);

  }
};
