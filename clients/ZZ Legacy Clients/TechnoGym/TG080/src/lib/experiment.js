/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import settings from './settings';

const activate = () => {
  setup();

  const variation = settings.VARIATION;

  const cookieMessage = document.querySelector('#cookiepolicy-dropdown');

  const cookieText = cookieMessage.querySelector('.block-content').childNodes;

  for (let index = 0; index < cookieText.length; index += 1) {
    const element = cookieText[index];
    if (element.nodeType === 3) {
      element.remove();
    }
  }

  const newCookieText = document.createElement('div');
  newCookieText.classList.add('TG080-cookie_text');
  newCookieText.innerHTML = `
  <div class="TG080-cookie_text">
    The site uses its own technical cookies, anonymous third party analytic cookies and third-party cookies that could be used in profiling: in accessing any element/area of the site outside of this banner, you consent to receiving cookies. 
    If you want to know more or refuse consent to cookies, click <a href="https://www.technogym.com/gb/cookie-policy/">here</a>
  </div> `;
  cookieMessage.querySelector('.block-content .accept').insertAdjacentElement('beforebegin', newCookieText);

  if (variation === '2') {
    document.body.appendChild(cookieMessage);
  }
};

export default activate;
