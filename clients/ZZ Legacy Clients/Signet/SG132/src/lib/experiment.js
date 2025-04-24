/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, getSiteFromHostname } from './services';
import { events, pollerLite } from '../../../../../lib/utils';
import shared from './shared';
import { scrollToElement } from './scrollToEl';

const { ID, VARIATION } = shared;

export default () => {
  if(VARIATION == 'control') {
    events.send(`${ID} - Control`, 'Fired');
    setup();

    document.querySelector('.product-buy-now__button').addEventListener('click', () => {
      events.send(`${ID} - V` + VARIATION, 'click', 'main add to bag CTA');
    });

    if(document.querySelector('.book-appointments-section .product-book-appointment a')) {
      document.querySelector('.book-appointments-section .product-book-appointment a').addEventListener('click', () => {
        events.send(`${ID} - V` + VARIATION, 'click', 'book in store appointment');
      });
    }

    if(document.querySelector('.book-appointments-section .product-virtual-appointment a')) {
      document.querySelector('.book-appointments-section .product-virtual-appointment a').addEventListener('click', () => {
        events.send(`${ID} - V` + VARIATION, 'click', 'book online appointment');
      });
    }

    if(document.querySelector('#js-link-reviews')) {
      document.querySelector('#js-link-reviews').addEventListener('click', () => {
        events.send(`${ID} - V` + VARIATION, 'click', 'review link');
      });
    }

  } else {
    events.send(`${ID} - V` + VARIATION, 'Fired');

    setup();

    // rearrange elements
    const moveElements = () => {
      const productreviews = document.querySelector('.detail-page__right-column .product-customer-rating-summary');
      if(productreviews) {
        const reviewAmount = window.digitalData.product[0].productInfo.ratingCount;
        productreviews.querySelector('.product-customer-rating-summary__text').textContent = `(${reviewAmount})`;
        document.querySelector('.product-price').appendChild(productreviews);

        document.querySelector('#js-link-reviews').addEventListener('click', () => {
          events.send(`${ID} - V` + VARIATION, 'click', 'review link');
        });
      }

      const watchBanner = document.querySelector('.SG117-watchBanner');
      if(watchBanner) {
        if(VARIATION === '1') {
          document.querySelector('.book-appointments-section').insertAdjacentElement('afterend', watchBanner);
        }
        else if(VARIATION === '2' && window.innerWidth > 768) {
          document.querySelector('.book-appointments-section').insertAdjacentElement('afterend', watchBanner);
        } else {
          document.querySelector('.detail-page__upper-row').insertAdjacentElement('afterend', watchBanner);
        }
      }
    }

    const offertext = document.querySelector('.product-price-offer');
    if(offertext) {
     document.querySelector('.product-buy-now').insertAdjacentElement('afterend', offertext);
    }

    // offer message
    const addOfferBadge = () => {
      const offerExBadge = document.querySelector('.product-messages .product-messages__item span');

      if(offerExBadge) {
        const badge = document.createElement('div');
        badge.classList.add(`${ID}-badge`);
        badge.innerHTML = `<span>${offerExBadge.textContent.trim()}</span>`;

        document.querySelector('.product-gallery__main').appendChild(badge);
      }
    }

    // description
    const addproductDescription = () => {
      const productDesc = document.querySelector('.s-product-description-markdown p');

      if(productDesc) {
        const topDesc = document.createElement('div');
        topDesc.classList.add(`${ID}-topDescription`);
        topDesc.innerHTML = `<p class="${ID}-inner">${productDesc.textContent.trim()}</p>
        <div class="${ID}-readMore">Read More</div>`;

        document.querySelector('.product-price').insertAdjacentElement('afterend', topDesc);

        topDesc.querySelector(`.${ID}-readMore`).addEventListener('click', () => {
          if(document.querySelector('#skip_link-description').parentNode.classList.contains('product-accordion-item--is-close')) {
            document.querySelector('#skip_link-description').click();
            events.send(`${ID} - V` + VARIATION, 'click', 'read more');
          }
          scrollToElement(document.querySelector('#skip_link-description'));
        });
      }
    }

    // add USPS
    const createUSPS = () => {

      const uspBlock = document.createElement('div');
      uspBlock.classList.add(`${ID}-usps`);
      uspBlock.innerHTML = `<ul></ul>`;

      if(VARIATION === '1') {
        document.querySelector(`.${ID}-topDescription`).insertAdjacentElement('afterend', uspBlock);
      }
      if(VARIATION === '2') {
        document.querySelector('.detail-page__upper-row').insertAdjacentElement('afterend', uspBlock);
      }
      

      let deliveryContent;
     
      const deliveryText = () => {
        const productPrice = window.digitalData.product[0].price.currentPrice;
        if(productPrice >= 499) {
          deliveryContent = 'Free Delivery & Click & Collect <span>More information and options</span>';
        } else {
          deliveryContent = 'Free Tracked Delivery & Click & Collect <span>More information and options</span>';
        }
        return deliveryContent;
      }

      const usps = {
        'Delivery': {
          classEl: 'delivery',
          icon: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/8BDB8E9457D103C9F96F0009F72B103E00AA1860B1E8DE96F72626BBB900F62D.png?meta=/SG132---CTA-section-tidy-up/noun_delivery_3524897.png',
          text: deliveryText(),
          link: '.product-delivery'
        },
        'Gifting': {
          icon: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/715D1B70272A5A89A8BA1CB0A6397A35ACCBAE54FBBBFA886BFC1248C8F32966.png?meta=/SG132---CTA-section-tidy-up/noun_Gift_642916.png',
          text: 'Gift Wrapping available at checkout'
        },
        'Returns': {
          classEl: 'returns',
          icon: 'https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/9D5FE8C81304FBC0E05C495EDBD4B76F9A5E608E260DF66670A25A9FC5DFF027.png?meta=/SG132---CTA-section-tidy-up/noun_packagereturned_3780435.png',
          text: `Free and Easy Returns <span>More Details</span>`,
          link: '.product-refunds-returns'
        },
      }

      Object.keys(usps).forEach((i) => {
        const data = usps[i];
        const usp = document.createElement('li');
        usp.classList.add(`${ID}-usp`);
        if(data.classEl) {
          usp.classList.add(`${ID}-${data.classEl}`);
        }
        usp.innerHTML = `<div class="${ID}-icon" style="background-image:url(${data.icon})"></div><p>${data.text}</p>`;
        document.querySelector(`.${ID}-usps ul`).appendChild(usp);
      });

      // open delivery
      const deliveryLink = document.querySelector(`.${ID}-usp.${ID}-delivery`);
      deliveryLink.addEventListener('click', () => {
        document.querySelector('.product-delivery').parentNode.parentNode.querySelector('h2').click();
        scrollToElement(document.querySelector('.product-delivery'));
        events.send(`${ID} - V` + VARIATION, 'click', 'delivery usp info');
      });
      //open returns
      const returnsLink = document.querySelector(`.${ID}-usp.${ID}-returns`);
      returnsLink.addEventListener('click', () => {
        document.querySelector('.product-refunds-returns').parentNode.parentNode.querySelector('h2').click();
        scrollToElement(document.querySelector('.product-refunds-returns'));
        events.send(`${ID} - V` + VARIATION, 'click', 'returns usp info');
      })

    }

    // finance box
    const financeUpdate = () => {
      const newFinance = document.createElement('div');
      newFinance.classList.add(`${ID}-financeOptions`);

      const productPrice = window.digitalData.product[0].price.currentPrice;
      const clearpay = document.querySelector('.product-clearpay');
      
     
      // £50 - £98 - clearpay only
      if(productPrice >= 50 && productPrice <= 98 && clearpay) {
        newFinance.innerHTML = `<div class="${ID}-clearpay"></div>`;
      }

      pollerLite(['finance-options',
      () => {
        if(document.querySelector('finance-options') && document.querySelector('finance-options').shadowRoot && document.querySelector('finance-options').shadowRoot.querySelector('.finance-options')) {
          return true
        }
      }
      ], () => {
        const ifc = document.querySelector('finance-options');
        const financePrice = ifc.shadowRoot.querySelector('.finance-options').textContent.match(/[\$\£\€](\d+(?:\.\d{1,2})?)/);
        
        if(ifc) {
          ifc.shadowRoot.querySelector('.finance-options').style = "background: transparent; padding:0px;";
          ifc.shadowRoot.querySelector('.finance-options p').style = "display: none;";
          ifc.shadowRoot.querySelector('.finance-options__button').style = "display: none;";
        }

        // £99 - £500 - all finance
        if(productPrice >= 99 && productPrice <= 500 && ifc && clearpay) {
          newFinance.innerHTML = `
          <p class="${ID}-allFinance">
          <span class="${ID}-title">0% Interest Free Credit</span> and <span class="${ID}-paypal"></span> available from only <span class="${ID}-ifcPrice">${financePrice[0]}</span> per month.</p>
          <p class="${ID}-ifcLink">More Information</p>
          <p class="${ID}-or">Or</p>
          <div class="${ID}-clearpay"></div>`;
        }   
        // £501 - £1000 - ifc and clearpay
        if(productPrice >= 501 && productPrice <= 1000 && ifc && clearpay) {
          newFinance.innerHTML = `
          <p><span class="${ID}-title">0% Interest Free Credit Available</span></p> 
          <p>from only <span class="${ID}-ifcPrice">${financePrice[0]}</span> per month.</p>
          <p class="${ID}-ifcLink">More Information</p>
          <p class="${ID}-or">Or</p>
          <div class="${ID}-clearpay"></div>`;
        }

        // £1000+ - ifc only
        if(productPrice > 1000 && ifc) {
            newFinance.innerHTML = `
            <p>
            <span class="${ID}-title">0% Interest Free Credit Available</span> 
            from only <span class="${ID}-ifcPrice">${financePrice[0]}</span> per month.</p>
            <p class="${ID}-ifcLink">More Information</p>`;
        }
      });
     

      if(productPrice >= 50) {
        if(VARIATION === '1') {
          document.querySelector(`.${ID}-usps`).insertAdjacentElement('afterend', newFinance);
        } else  if(VARIATION === '2'){
          document.querySelector(`.${ID}-topDescription`).insertAdjacentElement('afterend', newFinance);
        }
       

        if(clearpay) {
          document.querySelector(`.${ID}-clearpay`).appendChild(clearpay);
          const replacedText = document.querySelector(`.product-clearpay`).innerHTML.replace('or', '');
          document.querySelector(`.product-clearpay`).innerHTML = replacedText;
        }

        pollerLite(['finance-options', `.${ID}-ifcLink`], () => {
          if(document.querySelector(`.${ID}-ifcLink`)) {
            document.querySelector(`.${ID}-ifcLink`).addEventListener('click', () => {
              document.querySelector('finance-options').shadowRoot.querySelector('.finance-options__button').click();
              events.send(`${ID} variation: ${VARIATION}`, 'click', 'More information finance');
            }); 
          }
        })
       
      }

    }

    // add sticky CTA
    const stickyCTA = () => {
      const fixedCTA = document.createElement('div');
      fixedCTA.classList.add(`${ID}-stickyCTA`);
      fixedCTA.classList.add(`${ID}-hidden`);
      fixedCTA.innerHTML = 'Add to basket';

      document.body.appendChild(fixedCTA);

      window.addEventListener("scroll", function() {
        var elementTarget = document.querySelector('.product-buy-now');
        if (window.scrollY > ((elementTarget.offsetTop - 200) + elementTarget.offsetHeight)) {
          fixedCTA.classList.add(`${ID}-fixed`);
          fixedCTA.classList.remove(`${ID}-hidden`);
          if(document.querySelector('.js-live-chat-toggle')) {
            document.querySelector('.js-live-chat-toggle').classList.add(`${ID}-ctaShow`);
          }
        } else {
          fixedCTA.classList.remove(`${ID}-fixed`);
          if(document.querySelector('.js-live-chat-toggle')) {
            document.querySelector('.js-live-chat-toggle').classList.remove(`${ID}-ctaShow`);
          }
        }
      });

      // add to bag sticky click
      const currentCTA = document.querySelector('.product-buy-now .product-buy-now__button');
      const material = document.querySelector('#product-step-up-down__Material');
      const ringSize = document.querySelector('.product-ring-size__select');
      const diamond = document.querySelector('#product-step-up-down__Diamond');
      fixedCTA.addEventListener('click', () => {

        // if any errors
        if(diamond && diamond.value === '') {
          diamond.classList.add(`${ID}-required`);
          scrollToElement(document.querySelector('#product-step-up-down__Diamond'));
        }
        else if(material && material.value === '') {
          material.classList.add(`${ID}-required`);
          scrollToElement(document.querySelector('#product-step-up-down__Material'));
        }
        else if(ringSize && ringSize.value === '') {
          ringSize.classList.add(`${ID}-required`);
          document.querySelector('.product-ring-size__select').classList.add(`${ID}-required`);
          scrollToElement(document.querySelector('.product-ring-size__select'));
        } else {
          const allErrored = document.querySelectorAll(`.${ID}-required`);
          if(allErrored) {
            for (let index = 0; index < allErrored.length; index += 1) {
              const element = allErrored[index];
              element.classList.remove(`${ID}-required`);
            }
          }
          currentCTA.click();
          events.send(`${ID} - V` + VARIATION, 'click', 'sticky add to bag');
        }
      });
    }

    // slide out booking
    const bookAppointment = () => {

      // create booking title based on the brand
      const getTitle = () => {
        let title;
        let brand;
        const brands = ['Breitling', 'TAG Heuer', 'Omega', 'Bremont', 'Tudor', 'Glashutte', 'Chanel', 'Chopard', 'Zenith'];
        const pageBrand = window.digitalData.product[0].productInfo.brand;
        if(pageBrand && brands.indexOf(pageBrand) > -1) {
          brand = brands[pageBrand];
          title = `Get help and advice from a ${pageBrand} expert`;
        } else {
          title = 'Get expert help or advice with an appointment';
        }
        return title;
      }

      // booking tab
      const bookingTab = document.createElement('div');
      bookingTab.classList.add(`${ID}-bookTab`);
      bookingTab.innerHTML = `<div class="${ID}-date"></div>`;


      // booking box
      const bookingBox = document.createElement('div');
      bookingBox.classList.add(`${ID}-bookBox`);
      bookingBox.innerHTML = `
      <div class="${ID}-close"></div>
      <div class="${ID}-icon"></div>
      <h3>${getTitle()}</h3>
      <p>Book a free appointment at your local store or an online virtual appointment. Our friendly staff are on hand to answer your questions and help you make your decision.</p>
      <span>Book now</span>
      <div class="${ID}-buttons">
        <div class="${ID}-button ${ID}-store">In-Store</div>
        <div class="${ID}-button ${ID}-online">Online</div>
      </div>`;

      document.body.appendChild(bookingBox);
      document.body.appendChild(bookingTab);
      document.body.insertAdjacentHTML('beforeend', `<div class="${ID}-overlay"></div>`);

      const open = () => {
        document.body.classList.add(`${ID}-noScroll`);
        bookingBox.classList.add(`${ID}-open`);
        bookingBox.classList.remove(`${ID}-hidden`);
        document.querySelector(`.${ID}-overlay`).classList.add(`${ID}-overlayShow`);
        bookingTab.classList.remove(`${ID}-tabOpen`);
        events.send(`${ID} v${VARIATION}`, 'click', 'open appointment side tab');

      }
      const closed = () => {
        bookingTab.classList.add(`${ID}-tabOpen`);
        document.body.classList.remove(`${ID}-noScroll`);
        bookingBox.classList.remove(`${ID}-open`);
        bookingBox.classList.add(`${ID}-hidden`);
        document.querySelector(`.${ID}-overlay`).classList.remove(`${ID}-overlayShow`);
      }

      setTimeout(() => {
        open();
      }, 25000);

      // events
      bookingTab.addEventListener('click', () => {
        open();
      });
      document.querySelector(`.${ID}-bookBox .${ID}-close`).addEventListener('click', () => {
        closed();
      });
      document.querySelector(`.${ID}-overlay`).addEventListener('click', () => {
        closed();
      });

      // button clicks
      document.querySelector(`.${ID}-button.${ID}-store`).addEventListener('click', () => {
        document.querySelector('.book-appointments-section .product-book-appointment a').click();
        events.send(`${ID} v${VARIATION}`, 'click', 'book store appointment in tab');
        closed();
      });
      document.querySelector(`.${ID}-button.${ID}-online`).addEventListener('click', () => {
        document.querySelector('.book-appointments-section .product-virtual-appointment a').click();
        events.send(`${ID} v${VARIATION}`, 'click', 'book online appointment in tab');
        closed();
      });
    }

    moveElements();
    addOfferBadge();
    addproductDescription();
    createUSPS();
    financeUpdate();
    if(window.innerWidth < 768) {
      stickyCTA();
    }

    // other events
    document.querySelector('.product-buy-now__button').addEventListener('click', () => {
      events.send(`${ID} - V` + VARIATION, 'click', 'main add to bag CTA');
    });
    if(document.querySelector('.book-appointments-section .product-book-appointment a')) {
      document.querySelector('.book-appointments-section .product-book-appointment a').addEventListener('click', () => {
        events.send(`${ID} - V` + VARIATION, 'click', 'book in store appointment');
      });
    }

    if(document.querySelector('.book-appointments-section .product-virtual-appointment a')) {
      document.querySelector('.book-appointments-section .product-virtual-appointment a').addEventListener('click', () => {
        events.send(`${ID} - V` + VARIATION, 'click', 'book online appointment');
      });
    }

    if(VARIATION === '2') {
      bookAppointment();
    }

    if(getSiteFromHostname() == 'ernestjones') {
      // EJ-specific JS
    }

    if(getSiteFromHostname() == 'hsamuel') {
      // HS-specific JS
    }
  }
};
