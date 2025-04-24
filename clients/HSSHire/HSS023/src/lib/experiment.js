/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { pollerLite, events } from '../../../../../lib/utils';
import settings from './shared';

export default () => {
  setup();

  if (settings.VARIATION == 2) {
    events.send('HSS023', 'HSS023 Control', 'Control is active');
    return false;
  }

  events.send('HSS023', 'HSS023 V1', 'HSS023 Variation is active');

  const buildPopup = (obj) => {
    if (!obj) return;

    let html = `
      <div class="HS-popup">
      
        <div class="HS-popup--wrap">
          <div class="HS-inner">
            <div class="HS-close"></div>

            <h2>${obj.title ?  obj.title.outerHTML : ''}</h2>

            <div class="HS-ib">

              ${obj.options ? obj.options.outerHTML : ''}
              
              ${obj.image ? obj.image.outerHTML : ''}
              
            </div>

            <div class="HS-ib">
              ${obj.priceRow ? obj.priceRow.outerHTML : ''}

              ${obj.tabs ? obj.tabs.outerHTML : ''}

              <div class="HS-clear">
                <a href="${obj.link}" class="HSS002-btn-info btn HSS023-QV">Hire Now</a>
                <br />
                <a href="#" class="HS-close">Close</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    return html;
  }

  const remove = el => el.parentNode ? el.parentNode.removeChild(el) : null;

  const showPopup = (url) => {
    if (!url) return;

    if (document.querySelector('.HS-popup')) return;
    // console.log('show popup ', url);
    // Fetch product page details
    let request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function() {
      if (this.status >= 200 && this.status < 400) {
        // Success!
        let data = this.response;
        let tempDiv = document.createElement('div');
        tempDiv.innerHTML = data;

        // Fetch required elements
        const tabs = tempDiv.querySelector('.product-details');
        const image = tempDiv.querySelector('#primary_image img');
        const priceRow = tempDiv.querySelector('.price-row');
        const title = tempDiv.querySelector('h1.group_title');
        const options = tempDiv.querySelector('.variant_options');
        const link = url;

        const tabReviews = tabs.querySelector('li.review');
        tabReviews ? tabReviews.parentNode.removeChild(tabReviews) : null;
        
        const obj = {
          tabs,
          image,
          priceRow,
          title,
          link,
          options: options ? options : null,
        };

        let popup = buildPopup(obj);

        document.body.insertAdjacentHTML('afterbegin', popup);

        // events
        pollerLite(['.HS-popup--wrap', '.product-details .summary'], () => {
          const addedPopup = document.querySelector('.HS-popup');
          const close = addedPopup.querySelectorAll('.HS-close');
          const inner = addedPopup.querySelector('.HS-inner');
  
          for (let i = 0; close.length > i; i += 1) {
            close[i].addEventListener('click', () => remove(addedPopup));
          }

          addedPopup.addEventListener('click', (e) => {
            if (!inner.contains(e.target)) {
              remove(addedPopup);
            }
          })

          // Toggle Product details first tab
          const firstTab = addedPopup.querySelector('.product-details .specification');
          // Ensure first tab specs is first
          firstTab.parentElement.insertAdjacentElement('afterbegin', firstTab);
          const firstContent = addedPopup.querySelector('.tab-content #specification_tab.tab-pane');
          firstTab.classList.add('active');
          firstContent.classList.add('active');
          firstContent.classList.remove('fade');

          // If options exist. Fetch other details on select.
          
          const selectOptions = addedPopup.querySelector('.selectpicker');
          selectOptions ? selectOptions.addEventListener('change', function(e) {
            const sku = this.value.match(/([^\/]+$)/)[0]; // End of URL so 2-0-6-m.....
            const currentSku = url.match(/([^\/]+$)/)[0];

            
            if (!sku) return;
            let newUrl = `${url.replace(currentSku, '')}${sku}`;
            
            remove(addedPopup);
            showPopup(newUrl);
          }) : null;
        });

      } else {
        // We reached our target server, but it returned an error
        console.log('error in HSS023 Server error.');
      }
    };

    request.onerror = function() {
      // There was a connection error of some sort
      console.log('error in HSS023 AJAX request.');
    };

    request.send();
  }
  

  const listItems = document.querySelectorAll('.prod_list_outer');
  
  const len = listItems.length;

  for (let i = 0; len > i; i += 1) {
    const prod = listItems[i];
    
    const link = prod.querySelector('a.productMainLink').getAttribute('href');
    const ref = prod.querySelector('.cart');

    if (!link || !prod || !ref) return;

    ref.insertAdjacentHTML('afterend', `
      <button class="HSS002-btn-info btn HSS023-QV" data-link="${link}">Quick View</button>

      <a class="HS-underline" href="${link}">View Full Details</a>
    `);

    // Add events.
    const button = prod.querySelector('.HSS023-QV');

    button ? button.addEventListener('click', (e) => {
      e.preventDefault();
      return showPopup(link);
    }) : null;
  }
  
  
};
