import { fullStory, events } from '../../../../lib/utils';
import { observer } from '../../../../lib/uc-lib';

/**
 * {{FL024}} - {{Sticky ATB Mobile}}
 */
const Experiment = {
  /**
   * @desc Variation settings. Useful for when multiple variations are developed
   * in a single project so you can just toggle the variation number in production
   */
  settings: {
    ID: 'FL024',
    VARIATION: '{{VARIATION}}',
  },

  init() {
    // Setup
    events.analyticsReference = '_gaUAT';
    const { settings, services, components } = Experiment;
    if (settings.VARIATION === '2') {
      events.send(settings.ID, 'Active', 'Control is active', { sendOnce: true });
    } else if (settings.VARIATION === '1') {
      services.tracking();
      document.body.classList.add(settings.ID);
      const html = components.buildHTML();
      const domRef = document.querySelector('#Form #BodyWrap .productVariantContainer');
      components.appendHTMl(domRef, html);
      // const newDropdown = document.querySelector('.FL024-sticky-atb .FL024-sizes select.SizeDropDown');
      // components.controlSizes(newDropdown);
      const mainBtn = document.querySelector('.FL024-sticky-atb .FL024-atb a.addToBag');
      components.controlAddToBag(mainBtn);
      components.toggleOpacity();
    }
  },

  services: {
    /**
     * @desc Inits all page level tracking
     */
    tracking() {
      const { settings } = Experiment;
      fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      events.send(settings.ID, 'View', `${settings.ID} activated - Variation ${settings.VARIATION}`);
    },
  },

  components: {
    /**
     * Retrieves the ATB Button.
     */
    getAddToBagBtn() {
      const el = document.querySelector('#mainDetails .addToBasketContainer');
      if (el) {
        return el;
      }
    },
    /**
     * Returns size dropdown element if exists.
     */
    getSizeDropdown() {
      const el = document.querySelector('#productDetails #productVariantAndPrice .swapSize');
      if (el) {
        return el;
      }
    },
    /**
     * Get product prices.
     */
    getPrices() {
      const el = document.querySelector('#price .PriceGroups');
      if (el) {
        return el;
      }
    },
    /**
     * Constructs an element object.
     */
    elementsObject() {
      const elements = {};
      elements.ATB = Experiment.components.getAddToBagBtn();
      elements.Sizes = Experiment.components.getSizeDropdown();
      elements.Prices = Experiment.components.getPrices();
      const div = document.createElement('div');
      if (elements.Sizes) {
        div.innerHTML = elements.Sizes.outerHTML;
        if (div) {
          const el = div.querySelector('.SizeDropDown');
          el.setAttribute('name', '');
          el.setAttribute('id', '');
        }
        elements.Sizes = div;
        if (!elements.Sizes) {
          elements.Sizes = '';
        }
        return elements;
      }
    },
    /**
     * Collects the other component functions and builds
     * up the HTML
     */
    buildHTML() {
      const elements = Experiment.components.elementsObject();
      if (elements && elements.Prices && elements.ATB) {
        const html = `
          <div class="FL024-sticky-atb">
            <div class="FL024-atb--wrap">
              
              <div class="FL024-price">
                ${elements.Prices.outerHTML}
              </div>
              <div class="FL024-atb">
                ${elements.ATB.outerHTML}
              </div>
            </div>
          </div>
        `;
        return html;
      }
    },
    /**
     * @desc Adds the built HTML to the DOM.
     * @param {Element} ref
     * @param {String} html
     */
    appendHTMl(ref, html) {
      if (ref && html) {
        ref.insertAdjacentHTML('beforeend', html);
        events.send(Experiment.settings.ID, 'Added', 'Sticky ATB component added to DOM', { sendOnce: true });
      }
    },
    /**
     * @desc Updates the control select which in turn
     * updates the prices. This is called on change of
     * new select.
     * @param {String} value
     */
    updateControlSelection(value) {
      const oldDropdown = document.querySelector('#productVariantAndPrice .swapSize select.SizeDropDown');
      if (oldDropdown) {
        const options = oldDropdown.querySelectorAll('option');
        [].forEach.call(options, (option) => {
          // option.setAttribute('selected', '');
          option.removeAttribute('selected');
          // console.log('value ,', value);
          // console.log('option value ,', option.value);
          if (value === option.value) {
            option.setAttribute('selected', 'selected');
            window.jQuery(oldDropdown).val(value);
            // Trigger change
            // NB we have to trigger change on the jQuery that is attached
            // to the window as associated event listeners are bound
            // to that version of jQuery
            window.jQuery(oldDropdown).trigger('change');
          }
        });
      }
    },
    /**
     * On selection of new sizes / style dropdown will
     * trigger the control dropdown which will update
     * any product prices / images.
     */
    controlSizes(dropdownSelect) {
      // Store newDropdown choice
      let optionVal = null;
      dropdownSelect.addEventListener('change', (e) => {
        const selectedOption = dropdownSelect.options.selectedIndex;
        // set selected on choice
        const options = dropdownSelect.querySelectorAll('option');
        for (let i = 0; options.length > i; i += 1) {
          // options[i].setAttribute('selected', '');
          options[i].removeAttribute('selected');
          if (i === selectedOption) {
            options[i].setAttribute('selected', 'selected');
            optionVal = options[i].value;
          }
        }
        // e.target.setAttribute('selected', 'selected');
        Experiment.components.updateControlSelection(optionVal);
      });
    },
    /**
     * Does the control select have a value, if so then return true.
     */
    checkSelect() {
      const controlSelect = document.querySelector('#productVariantAndPrice .SizeDropDown');
      const selectedOption = controlSelect.options.selectedIndex;
      if (selectedOption === 0 || selectedOption === -1) {
        return false;
      }
      return true;
    },
    /**
     * Controls the ATB button, if no options are selected a popup will appear.
     */
    controlAddToBag(btn) {
      const controlBtn = document.querySelector('.productVariantContainer .addToBasketContainer a.addToBag');
      if (btn) {
        btn.addEventListener('click', (e) => {
          // Check if option is selected
          const hasSelectedOption = Experiment.components.checkSelect();
          if (hasSelectedOption) {
            controlBtn.click();
          } else {
            // No option selected, show popup.
            Experiment.components.showSelectPopup();
          }
          /**
           * If btn is in popup
           */
          const popupElement = e.target.parentNode.parentNode.parentNode.parentNode.parentNode;
          if (popupElement.classList.contains('FL024-select-popup')) {
            popupElement.classList.add('FL024-hide');
          }
          // Events
          events.send(Experiment.settings.ID, 'Click', 'Sticky Add to Bag button clicked', { sendOnce: false });
        });
      }
    },
    /**
     * Creates and appends popup.
     */
    showSelectPopup() {
      const elements = Experiment.components.elementsObject();
      const html = `
        <div class="FL024-select-popup">
          <div class="FL024-popup--title">
            <p>Select Option</p>
            <span class="FL024-close">x</span>
          </div>
          <div class="FL024-popup--wrap">
            <div class="FL024-options clearfix">
              ${elements.Sizes.outerHTML}
            </div>
            <div class="FL024-atb">
              ${elements.ATB.outerHTML}
            </div>
          </div>
        </div>
      `;
      const popupEl = document.querySelector('.FL024-select-popup');
      if (!popupEl) {
        document.body.querySelector('#Form .BodyWrap').insertAdjacentHTML('beforeend', html);
        events.send(Experiment.settings.ID, 'Popup', 'Sticky ATB popup component added to DOM', { sendOnce: true });
      } else {
        popupEl.classList.toggle('FL024-hide');
      }
      Experiment.components.popupControls();
      Experiment.components.selectSize();
    },
    /**
     * Controls the updating of sizes / options, closing the popup and adding to
     * the bag.
     */
    popupControls() {
      const popupSelect = document.querySelector('.FL024-select-popup .FL024-options select');
      Experiment.components.controlSizes(popupSelect);
      /**
       * Closing the popup.
       */
      const closePopup = document.querySelector('.FL024-select-popup .FL024-close');
      const popupContainer = document.querySelector('.FL024-select-popup');
      closePopup.addEventListener('click', () => {
        popupContainer.classList.add('FL024-hide');
      });

      /**
       * Add to bag.
       */
      const addToBagBtn = document.querySelector('.FL024-select-popup .FL024-atb a.addToBag');
      Experiment.components.controlAddToBag(addToBagBtn);
    },
    /**
     * Toggle the opacity over the sticky CTA when a product is added to the cart.
     * Causing the slidedown to appear.
     */
    toggleOpacity() {
      const bagItems = document.querySelector('#divBagItems');
      const container = document.querySelector('.mp-scroller-inner .ContentWrapper');
      observer.connect(bagItems, () => {
        if (bagItems) {
          if (bagItems.style.display === 'block') {
            container.classList.toggle('FL024-opacity');
          }
        }
      }, {
        config: {
          attributes: true,
          childList: false,
        },
      });
    },
    /**
     * on click of add to bag via the popup, ensure that a size is chosen
     * on the product itself.
     */
    selectSize() {
      const controlBtn = document.querySelector('.productVariantContainer .addToBasketContainer a.addToBag');
      const popupSize = document.querySelector('.FL024-select-popup .FL024-options select.SizeDropDown');
      const atbPopupBtn = document.querySelector('.FL024-select-popup .FL024-atb a.addToBag');
      const oldDropdown = document.querySelector('#productVariantAndPrice .swapSize select.SizeDropDown');
      if (atbPopupBtn) {
        atbPopupBtn.addEventListener('click', () => {
          // Store popup size
          if (popupSize) {
            const popupOptions = popupSize.querySelectorAll('option');
            for (let i = 0; popupOptions.length > i; i += 1) {
              const selected = popupOptions[i].getAttribute('selected');
              if (selected === 'selected') {
                const value = popupOptions[i].value;
                if (oldDropdown) {
                  const oldOptions = oldDropdown.querySelectorAll('option');
                  for (let j = i; oldOptions.length > j; j += 1) {
                    if (oldOptions[0].getAttribute('selected') === 'selected') {
                      Experiment.components.updateControlSelection(value);
                      setTimeout(() => {
                        controlBtn.click();
                        oldDropdown.click();
                      }, 1000);
                    }
                  }
                }
              }
            }
          }
          // Check if option is selected
          // const hasSelectedOption = Experiment.components.checkSelect();
          // console.log(hasSelectedOption);
          // if (hasSelectedOption) {
          //   controlBtn.click();
          // }
        });
      }
      // Experiment.components.controlSizes(popupSize);
    },
  },
};

export default Experiment;
