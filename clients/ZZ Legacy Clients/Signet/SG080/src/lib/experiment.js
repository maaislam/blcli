/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, getSiteFromHostname } from './services';
import { events, observer } from '../../../../../lib/utils';
import shared from './shared';

const { ID, VARIATION } = shared;

export default () => {
  if(VARIATION == 'control') {
    events.send(`${ID} - Control, Site:${getSiteFromHostname()}`, 'Fired');
  } else {
    events.send(`${ID} - V${VARIATION} ${getSiteFromHostname()}`, 'Fired');

    setup();


    const InGridMessage = () => {

      let ringLink;
      let watchLink;
      let ringTitle;

  
      if(getSiteFromHostname() === 'ernestjones') {
        ringLink = 'https://www.ernestjones.co.uk/webstore/content/appointment-booking/';
        watchLink = 'https://www.ernestjones.co.uk/webstore/content/appointment-booking/';
        ringTitle = 'Spring Revival!';
      } else if(getSiteFromHostname() === 'hsamuel') {
        ringLink = 'https://www.hsamuel.co.uk/webstore/content/appointment-booking/';
        watchLink = 'https://www.hsamuel.co.uk/webstore/content/appointment-booking/';
        ringTitle = 'Spring Clean!';
      }

      const message = document.createElement('div');
      message.className = `${ID}-inGrid product-tile-list__item`;

      if(window.digitalData.page.category.primaryCategory === 'Watches') {
        document.body.classList.add(`${ID}-watches`);
        message.innerHTML = `
        <div class="${ID}-container">
        <div class="${ID}-image"></div>
        <div class="${ID}-wrapper">
          <div class="${ID}-inGrid-content">
            <div class="${ID}-icon"></div>
            <h3>Need Some Advice?</h3>
            <p>Why not book a free in-store appointment?</p>
            <a target="_blank" href="${watchLink}" class="${ID}-button">Book Now</a>
          </div>
        </div>
        </div>`;

      } else {

      message.innerHTML = `
        <div class="${ID}-container">
          <div class="${ID}-image"></div>
          <div class="${ID}-wrapper">
            <div class="${ID}-inGrid-content">
              <div class="${ID}-icon"></div>
              <h3>Need Some Advice?</h3>
              <p>Why not book a free in-store appointment?</p>
              <a target="_blank" href="${ringLink}" class="${ID}-button">Book Now</a>
            </div>
          </div>
        </div>`;
      }

      return message;
    }

    const InGridMessage2 = () => {

      let bookingLink;

      if(getSiteFromHostname() === 'ernestjones') {
        bookingLink = 'https://www.ernestjones.co.uk/webstore/in-store-appointment.cdo?icid=ej-fn-appointment'
      } else if(getSiteFromHostname() === 'hsamuel') {
        bookingLink = 'https://www.hsamuel.co.uk/webstore/content/appointment-booking/'
      }

      const message2 = document.createElement('div');
      message2.className = `${ID}-inGrid product-tile-list__item ${ID}-booking`;

      if(window.digitalData.page.category.primaryCategory === 'Watches') {
        document.body.classList.add(`${ID}-watches`);
        message2.innerHTML = `
        <div class="${ID}-container">
        <div class="${ID}-image"></div>
        <div class="${ID}-wrapper">
          <div class="${ID}-inGrid-content">
            <div class="${ID}-icon"></div>
            <h3>Need Some Advice?</h3>
            <p>Why not book a free in-store appointment?</p>
            <a target="_blank" href="${bookingLink}" class="${ID}-button">Book Now</a>
          </div>
        </div>
        </div>`;

      } else {

      message2.innerHTML = `
        <div class="${ID}-container">
          <div class="${ID}-image"></div>
          <div class="${ID}-wrapper">
            <div class="${ID}-inGrid-content">
              <div class="${ID}-icon"></div>
              <h3>Need Some Advice?</h3>
              <p>Why not book a free in-store appointment?</p>
              <a target="_blank" href="${bookingLink}" class="${ID}-button">Book Now</a>
            </div>
          </div>
        </div>`;
      }

      return message2;
    }

    const addMessage = () => {
      const products = document.querySelectorAll('.product-tile-list .product-tile-list__item');
      for (let index = 0; index < products.length; index += 1) {
        const element = products[index];
        
        const gridMessage = InGridMessage();
        const gridMessage2 = InGridMessage2();

        if(window.innerWidth < 767) {
          // insert content after 3rd and 15th - mobile
          if(index === 2) {
            element.insertAdjacentElement('afterend', gridMessage);
          }

          if(index === 14) {
            element.insertAdjacentElement('afterend', gridMessage2);
          }
        } else { // insert content after 5th and 16th - desktop
          if(index === 4) {
            element.insertAdjacentElement('afterend', gridMessage);
          }

          if(index === 15) {
            element.insertAdjacentElement('afterend', gridMessage2);
          }
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
          element.querySelector('a').addEventListener('click', () => {
            events.send(`${ID} variation: ${VARIATION} site: ${getSiteFromHostname()}`, 'click', 'in grid buying guide');
          });
        }
      }
    }

    if(document.location.href.indexOf('jewellery') > -1) {
      addMessage();
      buttonEvent();
    } else if(document.location.href.indexOf('watches') > -1) {
    
      addMessage();
      buttonEvent();
    }
    // on filter changes, remove messages and re-add to stop duplication
   /*observer.connect(document.querySelector('#filter-modal'), () => {
      removeMessage();
      addMessage();
      buttonEvent();
    }, {
      throttle: 1000,
      config: {
        attributes: true,
        childList: true,
        subtree: false,
      },
    });*/


    let oldHref = document.location.href;
    let bodyList = document.querySelector("body");
    const observeEl = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (oldHref != document.location.href) {
                    oldHref = document.location.href;

                    const gridView = document.querySelector('#two-column-mode');

                    /*if(window.innerWidth < 767 && gridView && gridView.className.indexOf('list-display-buttons__button--active') === -1) {
                      removeMessage();
                      events.send(`${ID} variation: ${VARIATION} site: ${getSiteFromHostname()}`, 'grid view clicked', 'in grid hidden');
                    }*/

                    removeMessage();
                    if(document.location.href.indexOf('jewellery') > -1) {
                      addMessage();
                      buttonEvent();
                    } else if(document.location.href.indexOf('watches') > -1) {
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
