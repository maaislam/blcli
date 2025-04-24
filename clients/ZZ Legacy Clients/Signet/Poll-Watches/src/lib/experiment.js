/**
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import { cacheDom } from '../../../../../lib/cache-dom';
import { pollerLite } from '../../../../../lib/uc-lib';

/**
 * Typeform script [POPUP]
 *
 * This initialises the Typeform popup
 */
const executeTypeformScriptPopup = () => {
  var qs,js,q,s,d=document, gi=d.getElementById, ce=d.createElement, gt=d.getElementsByTagName, id="typef_orm_share", b="https://embed.typeform.com/"; if(!gi.call(d,id)){ js=ce.call(d,"script"); js.id=id; js.src=b+"embed.js"; q=gt.call(d,"script")[0]; q.parentNode.insertBefore(js,q) }
};

/**
 * Typeform script [EMBEDDED]
 *
 * Initialises Typeform script
 */
const executeTypeformScriptEmbedded = () => {
  var qs,js,q,s,d=document, gi=d.getElementById, ce=d.createElement, gt=d.getElementsByTagName, id="typef_orm", b="https://embed.typeform.com/"; if(!gi.call(d,id)) { js=ce.call(d,"script"); js.id=id; js.src=b+"embed.js"; q=gt.call(d,"script")[0]; q.parentNode.insertBefore(js,q) }
};

/**
 * Typeform embed HTML
 */
const typeformEmbedHTML = () => {
  const html = `
    <div class="typeform-widget" 
      data-url="https://ryanjordan449512.typeform.com/to/LV7ldY" 
      style="width: 100%; height: 500px;"
    ></div>
    <div style="font-family: Sans-Serif;font-size: 12px;color: #999;opacity: 0.5; padding-top: 5px;"> 
      powered by <a href="https://admin.typeform.com/signup?utm_campaign=LV7ldY&utm_source=typeform.com-13438982-Pro&utm_medium=typeform&utm_content=typeform-embedded-poweredbytypeform&utm_term=EN" style="color: #999" target="_blank"
      >Typeform</a>
    </div>
  `;

  return html;
};

/**
 * Create poll popup
 *
 * -> Poll with timing conditions
 */
const createPollPopup = () => {
  if(localStorage.getItem('UCXXX-Poll-Watches')) {
    return;
  }

  const destroy = (forever = true) => {
    [].forEach.call(document.querySelectorAll(`.${settings.ID}-popup`), (popup) => {
      popup.parentNode.removeChild(popup);
    });

    if(forever) {
      localStorage.setItem('UCXXX-Poll-Watches', '1');
    }
  };

  // After X seconds
  setTimeout(() => {
    const popupHtml = `
      <div class="${settings.ID}-popup ${settings.ID}-popup--active">
        <a class="${settings.ID}-popup__destroy ${settings.ID}-popup__close-icon">&times;</a>

        <p class="${settings.ID}-popup__title">Help us improve this site in 4 quick questions</p>

        <p class="${settings.ID}-popup__buttons">
          <a 
            href="https://ryanjordan449512.typeform.com/to/DB1VBS"
            data-mode="drawer_left"
            class="${settings.ID}-popup__init button ${settings.ID}-popup__btn typeform-share"
            target="_blank"
          >Sure, I'll help</a>
          <a class="${settings.ID}-popup__destroy button ${settings.ID}-popup__btn">Not now</a>
        </p>
      </div>
    `;

    document.body.insertAdjacentHTML('afterbegin', popupHtml);

    executeTypeformScriptPopup();

    window.dataLayer.push({
      event: 'uc_poll_pdp_page_popup_seen'
    });

    // Event on click
    [].forEach.call(document.querySelectorAll(`.${settings.ID}-popup__init`), (init) => {
      init.addEventListener('click', () => {
        window.dataLayer.push({
          event: 'uc_poll_pdp_page_poll'
        });
        destroy();
      });
    });

    [].forEach.call(document.querySelectorAll(`.${settings.ID}-popup__destroy`), (d) => {
      d.addEventListener('click', () => {
        destroy();
      });
    });

  }, settings.POPUP_SHOW_DELAY);
};

/**
 * Create embed version
 *
 * -> Embedded directly into page
 */
const createEmbed = () => {
  const banner = document.querySelector('.confirmationBanner');
  if(banner) {
    const html = typeformEmbedHTML();
    banner.insertAdjacentHTML('afterend', html);

    executeTypeformScriptEmbedded();

    window.dataLayer.push({
      event: 'uc_poll_confirmation_page_poll'
    });
  }
};

/**
 * Helper do any of the transaction items belonging category match the passed regex?
 *
 * Useful if we want to see if a user bought a product belonging to a watch 
 * (i.e. /watch/i) category for example.
 */
const getDoTransactionItemsMatchCat = (catRegex) => {
  let result = false;

  const items = (window.digitalData.transaction || {}).item;
  if(items) {
    items.forEach((item) => {
      if(item && item.category) {
        Object.keys(item.category).forEach((k) => {
          if(item.category[k].match(catRegex)) {
            result = true;
          }
        });
      }
    });
  }

  return result;
};

/**
 * Entry point for experiment
 */
const activate = () => {
  setup();

  // Host check
  if(window.location.hostname.match(/ernestjones/i)) {
    document.body.classList.add('EJ');
  } else {
    document.body.classList.add('HS');
  }

  // Order Confirmation Page Poll
  if(window.digitalData.page.pageInfo.pageName.match(/ordercomplete/i) 
      && getDoTransactionItemsMatchCat(/watch/i)) 
  {
    pollerLite([
      '.confirmationBanner',
    ], createEmbed);
  }

  // Watches PDP 
  if(window.digitalData.page.pageInfo.pageType.toLowerCase() == 'pdp' &&
      window.digitalData.page.pageInfo.pageName.match(/watch/i))
  {
    createPollPopup();
  }
};

export default activate;
