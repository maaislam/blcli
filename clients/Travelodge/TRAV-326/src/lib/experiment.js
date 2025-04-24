/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

let timeout;

const overlay = `<div class="${ID}-share--overlay"></div>`;

const addTracking = (placement) => {
  let shareButton = document.querySelector(`.${ID}-share--button`);

  if (VARIATION !== 'control') {
    fireEvent(`Visible - share button + share box added`, true);
  }

  shareButton.addEventListener('click', () => {
    document.querySelector(`.${ID}-share--social`).classList.toggle(`${ID}-active`);
    fireEvent(`Click - user clicked the share button`, true);
    document.body.insertAdjacentHTML('beforeend', overlay);
  });

  let linkCopyButton = document.querySelector(`.${ID}-share--linkboxcopybutton`);
  linkCopyButton.addEventListener('click', (e) => {
    e.preventDefault();
    copyLinkToClipboard('link');
  });

  let bigCopyButton = document.querySelector(`.${ID}-share--copybutton`);
  bigCopyButton.addEventListener('click', (e) => {
    e.preventDefault();
    copyLinkToClipboard('bigcopy');
  });

  let allShareButtons = document.querySelectorAll(`.${ID}-share--socialbutton`);
  [].slice.call(allShareButtons).forEach((button) => {
    button.addEventListener('click', () => {
      fireEvent(
        `Click - user clicked the: ${button.getAttribute('data-share-button')} share button to go to link: ${button.href}`,
        true
      );
    });
  });
};

const closeSVG = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="41" height="41" viewBox="0 0 41 41" fill="none" style="&#10;">
<rect width="41" height="41" fill="url(#pattern0_2080_62)"/>
<defs>
<pattern id="pattern0_2080_62" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_2080_62" transform="scale(0.0243902)"/>
</pattern>
<image id="image0_2080_62" width="41" height="41" xlink:href="data:image/png;base64,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"/>
</defs>
</svg>`;

const shareFunctionality = () => {
  document.documentElement.classList.add(`${ID}-share--active`);

  // document.body.insertAdjacentHTML("beforeend", overlay);

  let theCopyingURL =
    VARIATION == 1
      ? window.location.href + `${window.location.href.indexOf('?') > -1 ? `&` : `?`}blcopy=${ID}`
      : 'https://www.travelodge.co.uk' +
        decodeURIComponent(window.globalDataLayer.ocb1) +
        `${window.globalDataLayer.ocb1.indexOf('?') > -1 ? `&` : `?`}blcopy=${ID}`;
  let fbCopyingURL = `http://www.facebook.com/dialog/send?app_id=700976514890467&name=${encodeURIComponent(
    `A post from Travelodge`
  )}&link=${theCopyingURL}&redirect_uri=${encodeURIComponent(theCopyingURL)}`;
  if (window.outerWidth < 992) {
    fbCopyingURL = `fb-messenger://share/?link=${encodeURIComponent(theCopyingURL)}`;
  }

  const hotelImg = document.querySelector('#main-carousel-image img').src;
  const hotelName = document.querySelector('.rebase-hotel-name h1').innerText.trim();
  const hotelReviews = document.querySelector('.hotel-details-right-content .trip-advisor-rating').cloneNode(true);

  let newShareBoxHTML = `
  
  <div class="${ID}-share">

    <div class="${ID}-share--button ${
    window.location.href.indexOf('/ocb/') > -1 ? `ocb-button` : `normal-button`
  }"><span class="${ID}-share--buttonsvg">
    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none">
  <circle cx="18.72" cy="4.76002" r="3.36" stroke="#464646" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="18.72" cy="18.2" r="3.36" stroke="#464646" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="4.79994" cy="11.48" r="3.36" stroke="#464646" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M7.92004 10.024L15.6 6.44M7.92004 12.936L15.6 16.28" stroke="#464646" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg></span></div>

    <div class="${ID}-share--social">

    <div class="${ID}-share--header">
      <div class="${ID}-share--header--closebutton">${closeSVG}</div>
      <div class="${ID}-share--header--title">Share hotel with friends and family</div>
    </div>

    <div class="${ID}-share--hotelinfo">
      <div class="${ID}-share--hotelinfo--image"><img src="${hotelImg}" /></div>
      <div class="${ID}-share--hotelinfo--text">
        <h3 class="${ID}-share--hotelinfo--text--title">${hotelName}</h3>
        ${hotelReviews.outerHTML}
      </div>
    </div>

    <div class="${ID}-share--linkbox">
    
      <button class="${ID}-share--linkboxcopybutton">
      <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 8H7C4.79086 8 3 9.79086 3 12V12C3 14.2091 4.79086 16 7 16H10M14 8H17C19.2091 8 21 9.79086 21 12V12C21 14.2091 19.2091 16 17 16H14M9 12H15" stroke="#008CC6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>

      <input type="text" id="${ID}-share--linkboxinput" value="${theCopyingURL}" readonly>

    </div>

    <button class="${ID}-share--copybutton" id="${ID}-share--copybutton">
      <span class="${ID}-share--copybuttoninnertext">Copy</span>
      <span class="${ID}-share--copybuttontick"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.89163 13.2687L9.16582 17.5427L18.7085 8" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>          
    </button>

    <div class="${ID}-share--socialbuttons">

      <a href="https://wa.me/?text=I%20found%20a%20great%20deal%20with%20Travelodge,%20what%20do%20you%20think?%20${encodeURIComponent(
        theCopyingURL
      )}" data-action="share/whatsapp/share" target="_blank" data-share-button="whatsapp" class="${ID}-share--socialbutton ${ID}-share--socialbutton--whatsapp"><svg fill="#fff" width="30" height="30" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M26.576 5.363c-2.69-2.69-6.406-4.354-10.511-4.354-8.209 0-14.865 6.655-14.865 14.865 0 2.732 0.737 5.291 2.022 7.491l-0.038-0.070-2.109 7.702 7.879-2.067c2.051 1.139 4.498 1.809 7.102 1.809h0.006c8.209-0.003 14.862-6.659 14.862-14.868 0-4.103-1.662-7.817-4.349-10.507l0 0zM16.062 28.228h-0.005c-0 0-0.001 0-0.001 0-2.319 0-4.489-0.64-6.342-1.753l0.056 0.031-0.451-0.267-4.675 1.227 1.247-4.559-0.294-0.467c-1.185-1.862-1.889-4.131-1.889-6.565 0-6.822 5.531-12.353 12.353-12.353s12.353 5.531 12.353 12.353c0 6.822-5.53 12.353-12.353 12.353h-0zM22.838 18.977c-0.371-0.186-2.197-1.083-2.537-1.208-0.341-0.124-0.589-0.185-0.837 0.187-0.246 0.371-0.958 1.207-1.175 1.455-0.216 0.249-0.434 0.279-0.805 0.094-1.15-0.466-2.138-1.087-2.997-1.852l0.010 0.009c-0.799-0.74-1.484-1.587-2.037-2.521l-0.028-0.052c-0.216-0.371-0.023-0.572 0.162-0.757 0.167-0.166 0.372-0.434 0.557-0.65 0.146-0.179 0.271-0.384 0.366-0.604l0.006-0.017c0.043-0.087 0.068-0.188 0.068-0.296 0-0.131-0.037-0.253-0.101-0.357l0.002 0.003c-0.094-0.186-0.836-2.014-1.145-2.758-0.302-0.724-0.609-0.625-0.836-0.637-0.216-0.010-0.464-0.012-0.712-0.012-0.395 0.010-0.746 0.188-0.988 0.463l-0.001 0.002c-0.802 0.761-1.3 1.834-1.3 3.023 0 0.026 0 0.053 0.001 0.079l-0-0.004c0.131 1.467 0.681 2.784 1.527 3.857l-0.012-0.015c1.604 2.379 3.742 4.282 6.251 5.564l0.094 0.043c0.548 0.248 1.25 0.513 1.968 0.74l0.149 0.041c0.442 0.14 0.951 0.221 1.479 0.221 0.303 0 0.601-0.027 0.889-0.078l-0.031 0.004c1.069-0.223 1.956-0.868 2.497-1.749l0.009-0.017c0.165-0.366 0.261-0.793 0.261-1.242 0-0.185-0.016-0.366-0.047-0.542l0.003 0.019c-0.092-0.155-0.34-0.247-0.712-0.434z"></path></svg></a>
      <a href="mailto:?subject=A link from Travelodge&amp;body=Here's the link you requested: ${encodeURIComponent(
        theCopyingURL
      )}" target="_blank" data-share-button="email" class="${ID}-share--socialbutton ${ID}-share--socialbutton--email"><svg height="30" width="30" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"  xml:space="preserve"><style type="text/css">.st0{fill:#fff;}</style><g><path class="st0" d="M510.746,110.361c-2.128-10.754-6.926-20.918-13.926-29.463c-1.422-1.794-2.909-3.39-4.535-5.009c-12.454-12.52-29.778-19.701-47.531-19.701H67.244c-17.951,0-34.834,7-47.539,19.708c-1.608,1.604-3.099,3.216-4.575,5.067c-6.97,8.509-11.747,18.659-13.824,29.428C0.438,114.62,0,119.002,0,123.435v265.137c0,9.224,1.874,18.206,5.589,26.745c3.215,7.583,8.093,14.772,14.112,20.788c1.516,1.509,3.022,2.901,4.63,4.258c12.034,9.966,27.272,15.45,42.913,15.45h377.51c15.742,0,30.965-5.505,42.967-15.56c1.604-1.298,3.091-2.661,4.578-4.148c5.818-5.812,10.442-12.49,13.766-19.854l0.438-1.05c3.646-8.377,5.497-17.33,5.497-26.628V123.435C512,119.06,511.578,114.649,510.746,110.361z M34.823,99.104c0.951-1.392,2.165-2.821,3.714-4.382c7.689-7.685,17.886-11.914,28.706-11.914h377.51c10.915,0,21.115,4.236,28.719,11.929c1.313,1.327,2.567,2.8,3.661,4.272l2.887,3.88l-201.5,175.616c-6.212,5.446-14.21,8.443-22.523,8.443c-8.231,0-16.222-2.99-22.508-8.436L32.19,102.939L34.823,99.104z M26.755,390.913c-0.109-0.722-0.134-1.524-0.134-2.341V128.925l156.37,136.411L28.199,400.297L26.755,390.913z M464.899,423.84c-6.052,3.492-13.022,5.344-20.145,5.344H67.244c-7.127,0-14.094-1.852-20.142-5.344l-6.328-3.668l159.936-139.379l17.528,15.246c10.514,9.128,23.922,14.16,37.761,14.16c13.89,0,27.32-5.032,37.827-14.16l17.521-15.253L471.228,420.18L464.899,423.84z M485.372,388.572c0,0.803-0.015,1.597-0.116,2.304l-1.386,9.472L329.012,265.409l156.36-136.418V388.572z"/></g></svg></a>
      <a href="https://telegram.me/share/url?url=${encodeURIComponent(
        theCopyingURL
      )}" data-share-button="telegram" target="_blank" class="${ID}-share--socialbutton ${ID}-share--socialbutton--telegram"><svg width="50" height="50" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="14" fill="url(#paint0_linear_87_7225)"/><path d="M22.9866 10.2088C23.1112 9.40332 22.3454 8.76755 21.6292 9.082L7.36482 15.3448C6.85123 15.5703 6.8888 16.3483 7.42147 16.5179L10.3631 17.4547C10.9246 17.6335 11.5325 17.541 12.0228 17.2023L18.655 12.6203C18.855 12.4821 19.073 12.7665 18.9021 12.9426L14.1281 17.8646C13.665 18.3421 13.7569 19.1512 14.314 19.5005L19.659 22.8523C20.2585 23.2282 21.0297 22.8506 21.1418 22.1261L22.9866 10.2088Z" fill="white"/><defs><linearGradient id="paint0_linear_87_7225" x1="16" y1="2" x2="16" y2="30" gradientUnits="userSpaceOnUse"><stop stop-color="#37BBFE"/><stop offset="1" stop-color="#007DBB"/></linearGradient></defs></svg></a>

    </div>

    </div>

  </div>
  
  
  `;

  if (window.location.href.indexOf('/ocb/') > -1) {
    pollerLite(['.hotel-det-container'], () => {
      document.querySelector('.hotel-det-container').insertAdjacentHTML('afterbegin', newShareBoxHTML);

      addTracking('ocb');
    });
  } else {
    pollerLite(['.hotel-details-right-content'], () => {
      document.querySelector('.hotel-details-right-content .rebase-hotel-name').insertAdjacentHTML('beforeend', newShareBoxHTML);

      addTracking('normal');
    });
  }
};

const copyLinkToClipboard = (button) => {
  navigator.clipboard.writeText(document.getElementById(`${ID}-share--linkboxinput`).value);
  fireEvent(
    `Click - user copied link: ${
      document.getElementById(`${ID}-share--linkboxinput`).value
    } to clipboard using the ${button} button`,
    true
  );
  document.querySelector(`.${ID}-share--copybutton`).classList.add(`${ID}-share--copybutton--copied`);
  if (!document.querySelector(`.${ID}-share--copycompletetext`)) {
    document
      .querySelector(`.${ID}-share--copybutton`)
      .insertAdjacentHTML('afterend', `<p class="${ID}-share--copycompletetext">Link copied to clipboard</p>`);
  }

  clearTimeout(timeout);
  timeout = setTimeout(() => {
    document.querySelector(`.${ID}-share--copybutton`).classList.remove(`${ID}-share--copybutton--copied`);
    document.querySelector(`.${ID}-share--copycompletetext`).remove();
  }, 5000);
};

const closeShareBox = () => {
  //close sharebox when user clicks outside of it
  document.addEventListener('click', (e) => {
    if (
      !document.querySelector(`.${ID}-share--button`).contains(e.target) &&
      !document.querySelector(`.${ID}-share--social`).contains(e.target)
    ) {
      document.querySelector(`.${ID}-share--social`).classList.remove(`${ID}-active`);
      document.querySelector(`.${ID}-share--overlay`).remove();
    }

    if (document.querySelector(`.${ID}-share--header--closebutton`).contains(e.target)) {
      document.querySelector(`.${ID}-share--social`).classList.remove(`${ID}-active`);
      document.querySelector(`.${ID}-share--overlay`).remove();
    }
  });
};

const startExperiment = () => {
  console.log('Experiment started');
};
export default () => {
  setup();

  logMessage(ID + ' Variation: ' + VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  startExperiment();
  shareFunctionality();
  closeShareBox();
};
