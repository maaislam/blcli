import { fullStory, events } from '../../../../lib/utils';
import { pollerLite } from '../../../../lib/uc-lib';

/**
 * {{ HS009 }} - {{ Find watch filters modal/popup }}
 */

const checkErrorPage = () => {
  if (document.querySelector('h1').textContent.toLowerCase().indexOf('not found') > -1 && localStorage.getItem('HS009')) {
    events.send('HS009', 'Failed Search', 'Variation 1 - ' + localStorage.getItem('HS009'), { sendOnce: true });
    localStorage.removeItem('HS009');
  }
};

const Run = () => {
  let slideQ = false;

  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'HS009',
      VARIATION: '1',
    },
    /**
     * @desc Define variables to be used throughout the test
     */
    cache: (() => {
      const doc = document;
      const bodyVar = doc.body;

      const filtersWrap = doc.getElementById('filters-panel');
      const priceRangeWrap = doc.getElementById('refinement-price');
      const priceRanges = priceRangeWrap.querySelectorAll('.filters-panel__refinement-link');
      let maxRangeValue = null;

      if(localStorage.getItem('HS009')) {
        localStorage.removeItem('HS009');
      }

      const openBtn = null;
      const modal = null;
      const modalBG = null;
      const $modal = null;

      /**
       * @desc Expose the selectors cached above to the rest of the functions to be fired
       */
      return {
        doc,
        bodyVar,
        filtersWrap,
        priceRanges,
        openBtn,
        modal,
        modalBG,
        $modal,
        maxRangeValue,
      };
    })(),
    /**
     * @desc Initialize the functions to start running the test
     */
    init: () => {
      /**
       * @desc Object destructuring for easier to read references
       */
      const {
        services,
        settings,
        components,
        bindings,
      } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();

      components.findPriceRange();
      components.contentBuilder();
      bindings.selectBinding();
      bindings.findWatch();

      /**
       * @desc Build the modal and wait on jQuery
       * When jQuery has loaded, bind the event listeners and animations
       */
      pollerLite([
        () => {
          let trigger = false;
          if (window.jQuery) trigger = true;
          return trigger;
        },
      ], () => {
        bindings.bindModalClose();
        bindings.bindBodyClick();
        bindings.bindModalOpen();
        bindings.rangeFinder();
        setTimeout(() => {
          Exp.cache.openBtn.classList.add('HS009_active');
        }, 200);
      });
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking() {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
        events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
      },
      /**
       * @function
       * @desc Return the last item of an array without splicing or pop
       * @name lastInArray
       * @param { Array }
       * @returns { * }
       */
      lastInArray(Arr) {
        return Arr[Arr.length-1];
      },
      /**
       * @function
       * @desc Takes a string/int and converts it into pound currency
       * @name convert
       * @param { Int }
       * @returns { String }
       */
      convert(value){
        return "£"+((Number(value)||0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"));
      },
      /**
       * @function
       * @desc Manages the way the range finder functions
       * @name rangeInputChangeEventHandler
       */
      rangeInputChangeEventHandler() {
          const rangeDiff = 20;
          const el = this;
          const parent = el.parentNode;
          const minBtn = parent.querySelector('.min');
          const maxBtn = parent.querySelector('.max');
          const minRange = parent.querySelector('.range_min');
          const maxRange = parent.querySelector('.range_max');
          let minVal = parseInt(minBtn.value);
          let maxVal = parseInt(maxBtn.value);
          
          if(el.classList.contains('min') && minVal > (maxVal - rangeDiff)){
            minBtn.value = maxVal - rangeDiff;
          }
          
          minVal = parseInt(minBtn.value);
          minRange.innerHTML = Exp.services.convert(minVal);

          if(el.classList.contains('max') && (maxVal - rangeDiff) < minVal) {
            maxBtn.value = rangeDiff + minVal;
          }
          
          maxVal = parseInt(maxBtn.value);
          
          if (maxVal === parseInt(maxBtn.getAttribute('max'))) {
            maxRange.innerHTML = Exp.services.convert(maxVal);
            maxRange.classList.add('max_value');
          } else {
            maxRange.innerHTML = Exp.services.convert(maxVal);
            maxRange.classList.remove('max_value');
          }
        }
      /*
        events.send(`${Exp.settings.ID}`, 'Action', 'Label', { sendOnce: true });
      */
    },
    components: {
      findPriceRange() {
        const { cache } = Exp;
        let highestPrice = Exp.services.lastInArray(cache.priceRanges).childNodes[0].nodeValue.trim();
        highestPrice = parseInt(highestPrice.replace('£', '').replace('+', ''));

        Exp.cache.maxRangeValue = 1000;        
      },
      contentBuilder() {
        const { pathname } = window.location;
        let recipientMarkup = `
          <option selected disabled value="blank">Please select...</option>
          <option value="recipient%7Cher/">Her</option>
          <option value="recipient%7Chim/">Him</option>
          <option value="recipient%7Cchildren/">Children</option>
        `;

        if (pathname.indexOf('recipient%7Chim/') > -1) {
          recipientMarkup = `
            <option value="recipient%7Cher/">Her</option>
            <option selected value="recipient%7Chim/">Him</option>
            <option value="recipient%7Cchildren/">Children</option>
          `;
        } else if (pathname.indexOf('recipient%7Cher/') > -1) {
          recipientMarkup = `
            <option selected value="recipient%7Cher/">Her</option>
            <option value="recipient%7Chim/">Him</option>
            <option value="recipient%7Cchildren/">Children</option>
          `;
        }

        Exp.cache.bodyVar.insertAdjacentHTML('afterbegin', `
          <a class="HS009_open_modal">Find your perfect watch</a>
          <div class="HS009_pop-up_modal">
            <div class="HS009_body_click"></div>
            <div class="HS009_inner_div">
              <a class="HS009_close_btn">✕</a>
              <div class="HS009_overflow_fix">
                <h2>H.Samuel Watch Finder</h2>
                <div class="HS009_input-wrap HS009_person">
                  <label>Who's it for</label>
                  <div class="HS009_select">
                    <span></span>
                    <select>
                     ${recipientMarkup}
                    </select>
                  </div>
                </div>
                <div class="HS009_input-wrap HS009_strap">
                  <label>Any particular strap style?</label>
                  <div class="HS009_select">
                    <span></span>
                    <select>
                      <option selected disabled value="blank">Please select...</option>
                      <option value="strap+style%7Cbracelet/">Bracelet</option>
                      <option value="strap+style%7Cbuckle/">Buckle</option>
                      <option value="strap+style%7Cstrap/">Strap</option>
                      <option value="strap+style%7Cexpander/">Expander</option>
                      <option value="strap+style%7Csemi-bangle/">Semi-bangle</option>
                    </select>
                  </div>
                </div>
                <div class="HS009_input-wrap HS009_color">
                  <label>What material do you prefer?</label>
                  <div class="HS009_select">
                    <span></span>
                    <select>
                      <option selected disabled value="blank">Please select...</option>
                      <option value="case+material%7Calloy/">Alloy</option>
                      <option value="case+material%7Cbrass/">Brass</option>
                      <option value="case+material%7Cstainless+steel/">Stainless Steel</option>
                      <option value="case+material%7Ctitanium/">Titanium</option>
                      <option value="case+material%7Cion+plated/">Ion Plated</option>
                    </select>
                  </div>
                </div>
                <div class="HS009_price-range">
                  <label>Price Range</label>
                  <span>Slide to change amount</span>
                  <div class="rangeslider">
                    <input class="slider_input min" data-name="price" type="range" min="0" max="${Exp.cache.maxRangeValue}" value="0" />
                    <input class="slider_input max" data-name="price" type="range" min="0" max="${Exp.cache.maxRangeValue}" value="1000" />
                    <span class="range_min light left">£0.00</span>
                    <span class="range_max max_value light right">${Exp.services.convert(Exp.cache.maxRangeValue)}</span>
                  </div>
                </div>
                <a class="HS009_find-watch">Find Watches</a>
              </div>
            </div>
          </div>
        `);

        Exp.cache.openBtn = Exp.cache.bodyVar.querySelector('.HS009_open_modal');
        Exp.cache.modal = Exp.cache.bodyVar.querySelector('.HS009_pop-up_modal');
        Exp.cache.modalBG = Exp.cache.modal.querySelector('.HS009_body_click');
        Exp.cache.$modal = $(Exp.cache.modal);
      },
    },
    bindings: {
      bindModalClose() {
        Exp.cache.modal.querySelector('.HS009_close_btn').addEventListener('click', () => {
          if (slideQ === false) {
            slideQ = true;

            if (Exp.cache.modal.classList.contains('HS009_active')) {
              Exp.cache.$modal.fadeOut('slow', () => {
                Exp.cache.modal.classList.remove('HS009_active');
                slideQ = false;
              });
            } else {
              Exp.cache.$modal.fadeIn('slow', () => {
                Exp.cache.modal.classList.add('HS009_active');
                slideQ = false;
              });
            }
          }
        });
      },
      bindBodyClick() {
        Exp.cache.modalBG.addEventListener('click', () => {
          if (Exp.cache.modal.classList.contains('HS009_active')) {
            Exp.cache.$modal.fadeOut('slow', () => {
              Exp.cache.modal.classList.remove('HS009_active');
              slideQ = false;
            });
          }
        });
      },
      bindModalOpen() {
        Exp.cache.openBtn.addEventListener('click', () => {
          slideQ = true;
          if (Exp.cache.modal.classList.contains('HS009_active')) {
            Exp.cache.$modal.fadeOut('slow', () => {
              Exp.cache.modal.classList.remove('HS009_active');
              slideQ = false;
            });
          } else {
            Exp.cache.$modal.fadeIn('slow', () => {
              Exp.cache.modal.classList.add('HS009_active');
              slideQ = false;
            });
          }
        });
      },
      selectBinding() {
        const selectBoxes = document.querySelectorAll('.HS009_select');

        for (let i = 0; i < selectBoxes.length; i += 1) {
          const current = selectBoxes[i];
          const span = current.querySelector('span');
          const select = current.querySelector('select');
          const selectedOptionText = select.options[select.selectedIndex].text;

          span.innerText = selectedOptionText;

          if (selectedOptionText.indexOf('Please select') > -1) {
            current.classList.add('HS009_placeholder');
          } else if (current.classList.contains('HS009_placeholder')) {
            current.classList.remove('HS009_placeholder');
          }

          select.addEventListener('change', () => {
            span.innerText = select.options[select.selectedIndex].text;

            if (select.options[select.selectedIndex].text.indexOf('Please select') > -1) {
              current.classList.add('HS009_placeholder');
            } else if (current.classList.contains('HS009_placeholder')) {
              current.classList.remove('HS009_placeholder');
              select.parentNode.parentNode.classList.remove('HS009_error');
            }
          });
        }
      },
      rangeFinder() {
        const { services } = Exp;
        const sliderEl = document.querySelectorAll('.slider_input');
        
        for (let i = 0; i < sliderEl.length; i += 1) {
          sliderEl[i].addEventListener('input', services.rangeInputChangeEventHandler);
        }
      },
      selectValidation() {
        const { cache } = Exp;

        // Who is it for wrap and value
        const selectPerson = cache.bodyVar.querySelector('.HS009_person');
        const selectPersonValue = cache.bodyVar.querySelector('.HS009_person select').options[cache.bodyVar.querySelector('.HS009_person select').selectedIndex].value;

        // Strap style wrap and value
        const selectStrap = cache.bodyVar.querySelector('.HS009_strap');
        const selectStrapValue = cache.bodyVar.querySelector('.HS009_strap select').options[cache.bodyVar.querySelector('.HS009_strap select').selectedIndex].value;

        // Color wrap and value
        const selectColor = cache.bodyVar.querySelector('.HS009_color');
        const selectColorValue = cache.bodyVar.querySelector('.HS009_color select').options[cache.bodyVar.querySelector('.HS009_color select').selectedIndex].value;
        let validation = true;

        if (selectPersonValue !== 'blank') {
          selectPerson.classList.remove('HS009_error');
        } else {
          selectPerson.classList.add('HS009_error');
          validation = false;
        }

        // if (selectStrapValue !== 'blank') {
        //   selectStrap.classList.remove('HS009_error');
        // } else {
        //   selectStrap.classList.add('HS009_error');
        //   validation = false;
        // }

        // if (selectColorValue !== 'blank') {
        //   selectColor.classList.remove('HS009_error');
        // } else {
        //   selectColor.classList.add('HS009_error');
        //   validation = false;
        // }

        return validation;
      },
      findWatch() {
        const { cache } = Exp;
        const findWatchBtn =  cache.modal.querySelector('.HS009_find-watch');
        const path = window.location.pathname;
        const regMeFam = /brand.+?(?=\/)/;
        let stringBuilder = 'https://www.hsamuel.co.uk/webstore/l/watches/';
        
        if (path.match(regMeFam)) {
          stringBuilder += path.match(regMeFam)[0] + '/';
        }

        findWatchBtn.addEventListener('click', () => {
          const priceFrom = cache.bodyVar.querySelector('.slider_input.min').value;
          let priceTo = cache.bodyVar.querySelector('.slider_input.max').value;
          let selectPerson = cache.bodyVar.querySelector('.HS009_person select').options[cache.bodyVar.querySelector('.HS009_person select').selectedIndex];
          let selectStrap = cache.bodyVar.querySelector('.HS009_strap select').options[cache.bodyVar.querySelector('.HS009_strap select').selectedIndex];
          let selectColor = cache.bodyVar.querySelector('.HS009_color select').options[cache.bodyVar.querySelector('.HS009_color select').selectedIndex];
          let selectPersonValue = selectPerson.value;
          let selectStrapValue = selectStrap.value;
          let selectColorValue = selectColor.value;
          let selectPersonText = selectPerson.innerText;
          let selectStrapText = selectStrap.innerText;
          let selectColorText = selectColor.innerText;

          if (selectStrapValue === 'blank') {
            selectStrapValue = '';
          }

          if (selectColorValue === 'blank') {
            selectStrapValue = '';
          }

          if (priceTo == 1000) {
            priceTo = '10000';
          }

          if (Exp.bindings.selectValidation() === true) {
            stringBuilder += selectPersonValue + selectStrapValue + selectColorValue;
            stringBuilder += '?Nf=P_Current_Price%7CBTWN+' + priceFrom + '+' + priceTo;
            
            localStorage.setItem('HS009', `For: ${selectPersonText}, Strap: ${selectStrapText}, Material: ${selectColorText}, Price From: ${priceFrom}, Price To: ${priceTo}`)
            events.send(`${Exp.settings.ID}`, 'Watch Search', `For: ${selectPersonText}, Strap: ${selectStrapText}, Material: ${selectColorText}, Price From: ${priceFrom}, Price To: ${priceTo}`, { sendOnce: true });
            window.location.href = stringBuilder;
          }
        });
      },
    },
  };

  Exp.init();
};

export { Run, checkErrorPage };
