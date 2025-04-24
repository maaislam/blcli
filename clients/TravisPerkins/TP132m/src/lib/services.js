import { fullStory, events } from '../../../../../lib/utils';
import settings from './settings';

const { ID, VARIATION } = settings;

/**
 * Standard experiment setup
 */
function setup() {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
}

const getDetails = (url) => {
  if (url) {
    const detailPromise = new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      
      request.open('GET', url, true);
      request.onload = () => {
        if (request.status >= 200 && request.status < 400) {
          // Success!
          const data = request.responseText;
          resolve(data);
        } else {
          // We reached our target server, but it returned an error
          reject();
        }
      };

      request.onerror = () => {
        // There was a connection error of some sort
      };
      request.send();
    });
    return detailPromise;
  }
};

const addBlurPoints = (listItem) => {
  const link = listItem.querySelector('.product_item_header > a').href;
  const ref = listItem.querySelector('.advanced_plp_product_price');

  const html = `
    <div class="TP132m-info">
      <div class="TP132m-labels">
        <p>Height</p>
        <p>Length</p>
        <p>Width</p>
      </div>

      <div class="TP132m-data TP132m-blur-on">
        <button>Click to view</button>
        <p class="TP132m-Height">100 mm</p>
        <p class="TP132m-Length">2300 mm</p>
        <p class="TP132m-Width">250 mm</p>
      </div>
    </div>
  `;
  if (!listItem.querySelector('.TP132m-info')) {
    ref.insertAdjacentHTML('beforeend', html);
    events.send(settings.ID, 'Active', 'Test is active and components added', { sendOnce: true });
  }

  /**
   * Add click event to blured area
   */
  const addedBlurEle = listItem.querySelector('.TP132m-data');
  if (addedBlurEle) {
    addedBlurEle.addEventListener('click', () => {
      getDetails(link).then((results) => {
        /**
         * Remove pagespeed from causing errors.
         */
        const pagespeedReg = /pagespeed\.gp.\w.+/gmi;
        const regex = /(x)\w+\.\w+\.(pagespeed\.\w+.+)/gmi;
        if (results) {
          if (results.match(regex)) {
            results.replace(pagespeedReg, '');
          }

          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = results;
          const techInfo = tempDiv.querySelectorAll('.tp_prodDetailTabs .tp_detSpec table.tp_specificationTable *');
          const widthRef = listItem.querySelector('.TP132m-Width');
          const heightRef = listItem.querySelector('.TP132m-Height');
          const lengthRef = listItem.querySelector('.TP132m-Length');
          // const thicknessRef = listItem.querySelector('.TP132m-Thickness');
          let returnedWidth = '';
          let returnedHeight = '';
          let returnedLength = '';
          // let returnedThickness = '';
  
          /**
           * Match and store values
           */
          Array.from(techInfo).find((elem) => {
            // console.log('each elem, ', elem);
            if (elem.textContent === 'Width') {
              returnedWidth = elem.nextElementSibling.textContent;
            }
            if (elem.textContent === 'Height') {
              returnedHeight = elem.nextElementSibling.textContent;
            }
            if (elem.textContent === 'Length') {
              returnedLength = elem.nextElementSibling.textContent;
            }
            // if (elem.textContent === 'Thickness') {
            //   returnedThickness = elem.nextElementSibling.textContent;
            // }
          });
          
          /**
           * Add returned values
           */
          widthRef.innerText = returnedWidth;
          heightRef.innerText = returnedHeight;
          // thicknessRef.innerText = returnedThickness;
          lengthRef.innerText = returnedLength;

          /**
           * Remove blur
           */
          addedBlurEle.classList.remove('TP132m-blur-on');

          events.send(settings.ID, 'Active', 'Elements have been added', { sendOnce: true });
        }
      });
    });
  }
};

const addTracking = () => {
  const clickTracking = (el) => {
    if (el) {
      el.addEventListener('click', () => {
        events.send(settings.ID, 'Clicked', 'User clicked for more info');
      });
    }
  };

  const products = document.querySelectorAll('.tp_prodViewWrapper ul#tp_product_lister_enumeration li.product_item');
  if (products.length) {
    for (let i = 0; products.length > i; i += 1) {
      const moreInfoEls = products[i].querySelector('.TP132m-data');
      clickTracking(moreInfoEls);
    }
  }
};

const movePrice = (listItem) => {
  const ref = listItem.querySelector('.product_header');
  const price = listItem.querySelector('.price_section');
  if (ref && price) {
    ref.insertAdjacentHTML('beforeend', price.outerHTML);
  }
};

export { addBlurPoints };
export { setup }; // eslint-disable-line
export { getDetails };
export { addTracking };
export { movePrice };
