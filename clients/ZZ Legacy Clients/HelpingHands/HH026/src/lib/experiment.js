import { setup } from './services';
import { observer } from '../../../../../lib/uc-lib';

/**
 * HH026 - Updated Sticky CTAs
 */

const Run = () => {
  const Exp = {
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;

      return {
        docVar,
        bodyVar,
      };
    })(),
    init: () => {
      setup();

      // Get dynamic phone number (Infinity Number) from footer
      const isMobile = window.device.type === 'mobile';
      const numberEl = document.querySelector('.phone-number.InfinityNumber');
      const number = numberEl.innerText.trim();
      const discoveryNumber = numberEl.getAttribute('data-ict-discovery-number');
      const clone = numberEl.cloneNode();
      if (!isMobile) clone.removeAttribute('href'); // Remove tel: link for non-mobile devices

      const callUsMarkup = `<div class="HH026_Link"><img class="HH026_Icon" src="//useruploads.visualwebsiteoptimizer.com/useruploads/363191/images/9d6b2785076bea676d23f49f4a80dee1_001-telephone.png" alt="Call us"/>${isMobile ? `<a data-ict-discovery-number="${discoveryNumber}" href="tel:${number.replace(/\s/g, '')}" class="HH026_phone-link phone-care InfinityNumber">Call us</a>` : `<div class="InfinityNumber" data-ict-discovery-number="${discoveryNumber}">${number}</div>`}</div>`;

      Exp.cache.bodyVar.insertAdjacentHTML('beforeend', `
        <div class="HH026_Container">
          <span class="HH026_Container_Toggle">Contact Details</span>
          <div class="HH026_Link_Container">
            ${callUsMarkup}
            <div class="HH026_Link">or we can <a style="text-decoration:underline;" href="/about-us/contact-us/call-me-back-now">call you now</a></div>
            <a class="HH026_Link" href="/about-us/contact-us/send-a-message/"><img class="HH026_Icon" src="//useruploads.visualwebsiteoptimizer.com/useruploads/363191/images/d8911d3559ad66e8f24995cf81f96bf0_003-close-envelope.png" alt="E-mail us" />E-mail us</a>
            <a class="HH026_Link" href="/about-us/contact-us/"><img class="HH026_Icon" src="//useruploads.visualwebsiteoptimizer.com/useruploads/363191/images/63bbe2892c3af52b6daed1efcac0782d_002-three-dots-more-indicator.png" alt="More options" />More options</a>
          </div>
        </div>
      `);

      // Handle click of button
      const HH026Container = Exp.cache.bodyVar.querySelector('.HH026_Container');
      Exp.cache.bodyVar.querySelector('.HH026_Container_Toggle').addEventListener('click', () => {
        HH026Container.classList.toggle('HH026_Display');
      });

      // Watch for changes on HH026_phone-link
      // If the InifnityNumber script runs it will replace the inner text with a phone number
      if (isMobile) {
        const phoneLink = Exp.cache.bodyVar.querySelector('.HH026_phone-link');
        observer.connect(phoneLink, () => {
          phoneLink.innerHTML = 'Call us';
        }, {
          throttle: 0,
          config: { subtree: true, childList: true, attributes: false },
        });

        // Remove observer after a while to save on resources
        setTimeout(() => {
          observer.disconnect(phoneLink);
        }, 8000);
      }
    },
  };

  Exp.init();
};

export default Run;
