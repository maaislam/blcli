/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import { cacheDom } from '../../../../../lib/cache-dom';
import { events, setCookie, getCookie, deleteCookie } from '../../../../../lib/utils';
import { observer } from '../../../../../lib/uc-lib';

events.analyticsReference = '_gaUAT';

/**
 * @var Hold reference to interval that runs when product added
 */
let intervalReference = null;

/**
 * Entry point for experiment
 */
const activate = () => {
  setup();

  // If IOS add class
  const iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
  if (iOS) {
    document.body.classList.add('FL069-IOS');
  }


  // Control
  if (settings.VARIATION === '2') {
    events.send(settings.ID, 'FL069 Control', 'Control is active');
    return false;
  } else {
    events.send(settings.ID, 'FL069 Active', 'Test is active');
  }


  // Brand URL
  let url = '';
  // Get what we need
  const { productBrand } = window.dataLayer[1];
  const { productGender } = window.dataLayer[1];

  // Experiment code
  const atbLinks = cacheDom.getAll('a.addToBag');
  const bag = cacheDom.get('ul#ulBag');
  

  // On click of ATB
  const atbClick = () => {
    // Delete cookie
    deleteCookie('FL069-hidden');

    // Warn message
    if (!productBrand) {
      console.warn('FL069 could not access dataLayer');
    }

    // Set the URL.
    let prodBrand = productBrand.toLowerCase();
    const prodBrandToUse = prodBrand.replace(/\s/g, '-');

    // url = `https://www.flannels.com/${productGender ? productGender.toLowerCase() : 'men'}/brands/${prodBrandToUse}`; OLD
    url = `https://www.flannels.com/${prodBrandToUse}`;
  };

  // Attach click events
  if (atbLinks) {
    let atbLen = atbLinks.length;
    for (let i = 0; atbLen > i; i += 1) {
      atbLinks[i].addEventListener('click', atbClick);
    } 
  }

  // Show message
  const showMessage = (product) => {
      if (!document.querySelector('.FL069-message')) {
        document.body.insertAdjacentHTML('beforeend', `
          <div class="FL069-overlay">
            <div class="FL069-message">

              <div class="FL069-close"></div>

              <div class="FL069-message--inner">

                <div class="FL069-message--img">
                  ${product.img.outerHTML}
                </div>

                <div class="FL069-message--info">
                  <h3><span class="tick"></span> Successfully added to bag</h3>

                  <p><strong>${productBrand}</strong></p>

                  <p>${product.title.outerHTML}</p>

                  <p>${product.size.outerHTML}</p>
                  
                  <p>${product.price.outerHTML}</p>

                </div>

                <div class="FL069-message--redirect">
                  <h2>...Redirecting you to more <span style="text-transform: capitalize;">${productBrand.toLowerCase()}</span> products</h2>

                  <div id="FL069-countdown">
                    <div class="FL069-countdown--wrap">
                      <p>9</p>
                    </div>
                  </div>
                </div>

                <p class="FL069-showmenow"><a href="${url}">Show me now</a></p>

              </div>

              <div class="FL069-buttons">
                <a href="https://www.flannels.com/Cart" class="FL069-view--bag">View Bag</a>

                <a href="https://www.flannels.com/checkout/launch" class="FL069-continue">Proceed to Checkout</a>
              </div>

            </div>
          </div>
        `);
      }


      // Attach events & countdown
      if (document.querySelector('#FL069-countdown')) {
        const cD = document.querySelector('#FL069-countdown p');
        countdown(cD);        
      }
      // Close
      const popup = document.querySelector('.FL069-overlay')
      const closeBtn = document.querySelector('.FL069-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          popup.parentNode.removeChild(popup);
          events.send(settings.ID, 'User closed pop up down', 'FL069 Closed Popup');

          clearInterval(intervalReference);
        });
      }
      const hideOnClickOutside = (element) => {
        const outsideClickListener = event => {
            if (!element.contains(event.target) && isVisible(element)) { // or use: event.target.closest(selector) === null
              popup.parentNode.removeChild(popup);
              removeClickListener();
              setCookie('FL069-hidden', 'true', '99');
              events.send(settings.ID, 'User closed pop up down', 'FL069 Closed Popup');

              clearInterval(intervalReference);
            }
        }
    
        const removeClickListener = () => {
            document.removeEventListener('click', outsideClickListener)
        }
    
        document.addEventListener('click', outsideClickListener)
      }
    
      const isVisible = elem => !!elem && !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length )
    
      const messageContainer = document.querySelector('.FL069-message');
      hideOnClickOutside(messageContainer);
  }

  // Trigger countdown
  const countdown = (numberEl) => {
    if (!numberEl) return;
    let start = 9;
    numberEl.textContent = start;
    // Lower number every second.
    intervalReference = setInterval(() => {
      // Start the spinner
      numberEl.classList.add('active');
      // Hits 0, redirect
      if (start === 0 && getCookie('FL069-hidden') !== 'true') {
        // Add Cookie, only fire once.
        setCookie('FL069-shown', 'true', 1);
        
        redirect(url);
      }
      // Lower the test in the element by 1.
      numberEl.textContent = start;
      // Lower start
      start--;
      numberEl.classList.remove('active');
    }, 1000);

  }

  // Redirect
  const redirect = (link) => {
    if (link) {
      events.send(settings.ID, 'User visited redirected brand PLP', 'FL069 Landed PLP');
      window.location.href = link;
    }
  }

  // Now we have the URL, wait for the product to be successfully added to bag.
  setTimeout(() => {
    observer.connect(bag, () => {
      // Hide original
      const ogBag = document.getElementById('divBagItems');
      if (ogBag) {
        ogBag.style.display = 'none';
      }
      // Get the added product (e.g last added)
      const addedP = bag.querySelector('li:first-of-type');
      if (!addedP) {
        console.warn('couldn\'t find product in bag');
      }
      // Deconstruct for assets
      const product = {
        title: addedP.querySelector('span.BaskName'),
        img: addedP.querySelector('img.Baskimg'),
        size: addedP.querySelector('span.BaskSize'),
        qty: addedP.querySelector('span.BaskQuant'),
        price: addedP.querySelector('span.BaskPrice'),
      }
  
      // Remove brand name from title.
      if (product.title && product.title.textContent.indexOf(productBrand) > -1) {
        product.title.textContent = product.title.textContent.replace(productBrand, '');
      }
  
      // Call add Message      
      showMessage(product);

      const showMeNowLink = document.querySelector('.FL069-showmenow a');
      if(showMeNowLink) {
        showMeNowLink.addEventListener('click', () => {
          events.send(settings.ID, 'FL069 Clicked Show Me Now', 'in-popup');
        });
      }

    }, {
      config: {
        attributes: false,
        childList: true,
        subtree: false,
      }
    });
  }, 2000);

};

export default activate;
