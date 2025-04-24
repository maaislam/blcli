/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { VARIATION, ID } = shared;

const trackingMessages = {
  elementVisable: `${ID} test visable`,
  clicked: `${ID} element has been clicked`,
};

const makeAmends = () => {
  const getDesigner = document.querySelector('#pjax-container .designer-name a').text;
  const upperCaseDesigner = getDesigner.toUpperCase();

  const designerURL = document.querySelector('#product-info-accordion .accordion-notoggle-heading a').href;

  const meetTheDesignerElement = document.querySelector('#designPanel').parentElement;
  const socialLinks = document.querySelector('.sharebuttons').parentElement;
  const helpBox = document.querySelector('.span5.product-details-column .help-box.row');
  const meetDesignerPlacement = document.querySelector('#olapic_specific_widget').parentElement.parentElement;

  socialLinks.remove();
  helpBox.remove();
  meetTheDesignerElement.remove();

  const getDesignerImage = () => {
    const request = new XMLHttpRequest();
    request.open('GET', designerURL, true);
    request.onload = () => {
      if (request.status >= 200 && request.status < 400 && request.readyState === 4) {
        // Success!
        const data = request.responseText;
        if (data) {
          const brandPage = document.createElement('div');
          brandPage.classList.add('hidden');
          brandPage.id = 'no-visual';
          brandPage.innerHTML = data;

          const imageURL = brandPage.querySelector('#slides .carousel-inner .item.active img').getAttribute('data-src');
          const designerText = brandPage.querySelector('.designer-full-description').innerHTML;

          resolveMarkup(imageURL, designerText);
        }
      }
    };
    request.onerror = () => {
      // There was a connection error of some sort
    };
    request.send();
  };

  const detectMob = () => {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i,
    ];

    return toMatch.some(toMatchItem => navigator.userAgent.match(toMatchItem));
  };


  let rowClass;
  const matchMedia = window.matchMedia('(max-width: 599px)').matches;
  matchMedia ? rowClass = 'row' : rowClass = 'row-fluid';

  const hideElement = () => {
    if (!detectMob()) {
      return 'hidden';
    }
  };


  const resolveMarkup = (imageURL, designerText) => {
    const meetTheDesignermarkup = `
  <div class="${rowClass} ${ID}">
  <div class="${ID}__header--mobile ${hideElement}">
        <p class="${ID}__text">Meet The Designer</p>
      </div>
  <div class="${ID}__img-wrapper">
    <span class="img-wrapper__title">
      ${upperCaseDesigner}
    </span>
        <img class="img-wrapper__img" src="${imageURL}" alt="${getDesigner}"/>
      </div>
    <div class="${ID}__wrapper">
      <div class="${ID}__header">
            <p class="${ID}__text">Meet The Designer</p>
      </div>
      <div class="${ID}__description">
        <p>
          ${designerText}
        </p>
    </div>
    <div class="${ID}__url-wrapper">
      <a class="${ID}__url-wrapper__link" onclick=${fireEvent(trackingMessages.clicked)}" href="${designerURL}">LEARN MORE ABOUT ${upperCaseDesigner} </a>
    </div>
    </div>

  </div>
  `;

    meetDesignerPlacement.insertAdjacentHTML('beforebegin', meetTheDesignermarkup);
  };

  getDesignerImage();
};


/**
 * Activate
 */
export default () => {
  setup();

  fireEvent('Conditions Met');

  window.addEventListener('orientationchange', () => {
  // Announce the new orientation number
    window.location.reload();
  }, false);

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  if (VARIATION !== 'control') {
    // Tracking Customer Sees the basket
    const isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);

    // Function
    if (window.matchMedia('(orientation: portrait)').matches || !isMobile) {
      makeAmends();
      fireEvent(trackingMessages.elementVisable);
    }
  }
};
