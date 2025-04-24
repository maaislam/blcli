/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';

/**
 * Helper add a script
 */
const addScript = (src, id = '') => {
  return new Promise((res, rej) => {
    const s = document.createElement('script');
    s.id = id;
    document.head.appendChild(s);
    s.onload = res;
    s.src = src;
  });
};

/**
 * Entry point for experiment
 */
export default () => {
  const { ID } = shared;

  // ----------------------------------------
  // Add Fetchify
  // ----------------------------------------
  addScript('https://cc-cdn.com/generic/scripts/v1/cc_c2a.min.js').then(() => {
    setTimeout(() => {
      setup();

      // ----------------------------------------
      // Create new dom Elms
      // ----------------------------------------
      const lastNameContainer = document.querySelector('[name="shippingAddress.lastname"]');

      if(lastNameContainer) {
        lastNameContainer.insertAdjacentHTML('afterend', `
          <div class="${shared.ID}-lookup field">
            <div class="${shared.ID}-lookup__inner">
              <p>Search for Address</p>
              <input class="${shared.ID}-lookup__search" type="text" name="${shared.ID}-lookup__search">
            </div>
          </div>
        `);
      }

      // ----------------------------------------
      // Create Fetchify click to address
      // ----------------------------------------
      new clickToAddress({
        accessToken: '6170a-d1794-f12be-05d39',
        dom: {
            search:     `${shared.ID}-lookup__search`,
            town:       'city',
            postcode:   'postcode',
            line_1:     'street[0]',
            line_2:     'street[1]',
            county:     'region',
            country:    'country_id'
        },
        gfxMode: 1,
        texts: {
          default_placeholder: 'Start typing your postal code or street...',
        },
        onResultSelected: function(c2a, elements, address){
          // ----------------------------------------
          // Trigger 'change' on any of the elements - worksaround Magento validation error'ing
          // ----------------------------------------
          const line1 = elements['line_1'];
          const line2 = elements['line_2'];
          if(line1.value.length >= 60) {
            const splitLine1 = line1.value.split(',').map(m => m.trim());
            const splitLine2 = line2.value.split(',').map(m => m.trim());

            let runningLength = 0;
            const newLine1 = [];
            const newLine2 = splitLine2;

            splitLine1.forEach(m => {
              if(runningLength + m.length + (newLine1.length * 2) < 60) {
                newLine1.push(m);
                runningLength += m.length;
              } else {
                runningLength = 60;

                newLine2.unshift(m);
              }
            });

            line1.value = newLine1.join(', ');
            line2.value = newLine2.join(', ');
          }

          for(let k in elements) {
            if(['country', 'county', 'line_1', 'line_2', 'postcode', 'town'].indexOf(k) > -1) {
              // ----------------------------------------
              // Use jQuery as easy way to trigger change
              // ----------------------------------------
              window.jQuery(elements[k]).trigger('change');
            }
          }
          
          // Lookup Scroll
          const lookup = document.querySelector(`.${shared.ID}-lookup__inner`);
          if(lookup) {
            try {
              lookup.scrollIntoView({
                behavior: "smooth",
                block: "start"
              });
            } catch (error) {
              // ----------------------------------------
              // Fallback for browsers not supporting scrollintoviewoptions
              // ----------------------------------------
              lookup.scrollIntoView(true);
            }
          }
        },
        domMode: 'name'
      });
    }, 1500);
  });
};
