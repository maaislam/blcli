import '../../../../../../lib/utils/extendWebStorage';
import settings from '../../lib/settings';
import { events, viewabilityTracker } from '../../../../../../lib/utils';

const { ID } = settings;

export default class DeckingCalculator {
  constructor() {
    this.sessionStorage = window.sessionStorage.getObject(ID);

    this.model = this.sessionStorage && this.sessionStorage.model ? this.sessionStorage.model : {
      measurementUnit: 'm',
      includeWaste: true,
      deckingBoardWidth: DeckingCalculator.getDeckingBoardWidth(),
      deckingBoardLength: DeckingCalculator.getDeckingBoardLength(),
      areaWidth: 1,
      areaLength: 2,
      numberOfBoardsNeeded: null,
      minimumQty: 1,
    };

    this.elementCache = {
      originalAddToCartButton: document.querySelector('#addToCartButton'),
      originalClickAndCollectButton: document.querySelector('#addForCollectButton'),
      lengthSelect: (() => {
        const lengthSelectLabel = [].filter.call(document.querySelectorAll('.tpVariantsWrapper label'), el => el.innerText === 'Length:')[0];
        return lengthSelectLabel ? lengthSelectLabel.nextElementSibling : null;
      })(),
    };

    this.addToCartDisabled = (() => {
      const { originalAddToCartButton } = this.elementCache;
      return originalAddToCartButton.classList.contains('btn-disabled') || originalAddToCartButton.disabled;
    })();

    this.clickAndCollectDisabled = (() => {
      const { originalClickAndCollectButton } = this.elementCache;
      let isDisabled;
      if (originalClickAndCollectButton) {
        isDisabled = originalClickAndCollectButton.classList.contains('btn-disabled') || originalClickAndCollectButton.disabled;
      } else {
        isDisabled = true;
      }
      return isDisabled;
    })();

    this.init();

    if (this.sessionStorage) {
      window.sessionStorage.removeItem(ID);
      this.sessionStorage = null;
    }
  }

  /** Create component */
  init() {
    this.create();
    this.bindEvents();
    this.renderView();
    this.updateView();
  }

  /** Create component element */
  create() {
    const {
      elementCache,
      addToCartDisabled,
      clickAndCollectDisabled,
      model,
    } = this;
    const {
      measurementUnit,
      includeWaste,
      areaWidth,
      areaLength,
      numberOfBoardsNeeded,
    } = model;

    const temp = document.createElement('div');
    /* eslint-disable indent */
    temp.innerHTML = `
    <div class="${ID}_Decking_Calculator_Container">
      <h3 class="${ID}_Decking_Calculator_Header">Decking Calculator</h3>
      <div class="${ID}_Decking_Calculator_Components_Container">

        <div class="${ID}_Calculation_Input_Container">
          <p class="${ID}_Calculation_Input_Header ${ID}_Wrap">
            Enter your measurements below to calculate an approximate amount of decking boards needed.
            <br /><span class="${ID}_Bold">Please allow for up to 5% wastage</span><br />
          </p>
            
          <div class="${ID}_Toggle_Container">
            <span class="${ID}_Toggle_Option TPT131_Option_Metres">Metres</span>
            <label class="${ID}_Switch">
              <input type="checkbox" class="${ID}_Toggle_Input" ${measurementUnit === 'ft' ? 'checked="checked"' : ''} />
              <span class="${ID}_Slider"></span>
            </label>
            <span class="${ID}_Toggle_Option TPT131_Option_Feet">Feet</span>
          </div>
            
          <div class="${ID}_Checkbox_Container">
            <input type="checkbox" id="${ID}_Checkbox_Wastage" ${includeWaste ? 'checked="checked"' : ''} />
            <label for="${ID}_Checkbox_Wastage" class="${ID}_Checkbox_Wastage_Label">Include 5% wastage</label>
          </div>
          
          <div class="${ID}_Calculator_Input_Container ${ID}_Wrap">
            <div class="${ID}_Input_Container">
              <div class="${ID}_Input_Label_Container">
                <span class="${ID}_Calculator_Input_Label">Board Length:</span>
                <span class="${ID}_Error_Message">Please select a length</span>
              </div>
              <select name="${ID}_BoardLength" class="${ID}_BoardLength_Select">
                ${!elementCache.lengthSelect ? `
                  <option value="${model.deckingBoardLength}">
                    ${model.deckingBoardLength} mm
                  </option>
                ` : [].map.call(elementCache.lengthSelect.querySelectorAll('option'), (el, i) => {
                  const val = el.innerText.trim();
                  const length = val.match(/\d+/) ? val.match(/\d+/)[0] : null;
                  const url = el.value;
                  const isSelected = elementCache.lengthSelect.selectedIndex === i;

                  return `
                  <option value="${length || ''}" ${url ? `data-url="${url}"` : ''} ${isSelected ? 'selected="selected"' : ''}>
                    ${val}
                  </option>`;
                }).join('')}
              </select>
            </div>

            <div class="${ID}_Input_Container">
              <div class="${ID}_Input_Label_Container">
                <span class="${ID}_Calculator_Input_Label">Width:</span>
                <span class="${ID}_Error_Message">Please enter a valid number</span>
              </div>
              <input type="number" min="0" name="${ID}_Width" class="${ID}_Calculator_Input ${ID}_Width_Input" value="${areaWidth}" />
            </div>

            <div class="${ID}_Input_Container">
              <div class="${ID}_Input_Label_Container">
                <span class="${ID}_Calculator_Input_Label">Length:</span>
                <span class="${ID}_Error_Message">Please enter a valid number</span>
              </div>
              <input type="number" min="0" name="${ID}_Length" class="${ID}_Calculator_Input ${ID}_Length_Input" value="${areaLength}" />
            </div>
            <div class="${ID}-update">
              <button>Calculate</button>
            </div>
          </div>
        </div>

        <div class="${ID}_Output_Container">
          <div class="${ID}_Calculation_Output_Container">
            <span class="${ID}_Calculation_Output_Header">You will need approximately:</span>
            <div class="${ID}_Output_Values_Container ${ID}_Single">
              <span class="${ID}_Decking_Output ${ID}_Bold"><span class="${ID}_Decking_Output_Value">${numberOfBoardsNeeded || '__'}</span> Decking Boards to cover this area</span>
              ${(() => {
                // CTA section
                let markup = `<div class="${ID}_CTA_Block">`;

                if (addToCartDisabled && clickAndCollectDisabled) {
                  const lengthSelected = (() => {
                    const select = document.querySelector('#variantList');
                    return !select || (select && select.selectedOptions[0].innerText.trim().toLowerCase() !== 'please select');
                  })();
                  if (model.deckingBoardLength && lengthSelected) {
                    markup += `<p class="${ID}_CTA_Error">Sorry, this length is currently unavailable. Other lengths for this product may be available</p>`;
                  }
                } else {
                  markup += `<p class="${ID}_CTA_Label">Add <span class="${ID}_Decking_Output_Value ${ID}_Bold">${numberOfBoardsNeeded || '__'}</span> Decking Boards for:</p>`;

                  if (addToCartDisabled) {
                    markup += `
                      <div class="${ID}_CTA_Button ${ID}_CTA_Button--disabled" id="${ID}_CTA_Delivery">Delivery</div>
                      <p class="${ID}_CTA_Error">Sorry, this length isn't available for delivery</p>
                    `;
                  } else {
                    markup += `<div class="${ID}_CTA_Button" id="${ID}_CTA_Delivery">Delivery</div>`;
                  }

                  if (clickAndCollectDisabled) {
                    markup += `
                      <div class="${ID}_CTA_Button ${ID}_CTA_Button--disabled" id="${ID}_CTA_ClickAndCollect">Click & Collect</div>
                      <p class="${ID}_CTA_Error">Sorry, this length isn't available for Click & Collect</p>
                    `;
                  } else {
                    markup += `<div class="${ID}_CTA_Button" id="${ID}_CTA_ClickAndCollect">Click & Collect</div>`;
                  }
                }

                markup += '</div>';
                return markup;
              })()}
              <span class="${ID}_Error_Message ${ID}_ATB_Error"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
    /* eslint-enable indent */

    const el = temp.children[0];
    this.component = el;
    this.elements = {
      inputs: el.querySelectorAll('input, select'),
      wasteCheckbox: el.querySelector(`#${ID}_Checkbox_Wastage`),
      slideToggleInput: el.querySelector(`.${ID}_Toggle_Input`),
      boardLengthSelect: el.querySelector(`.${ID}_BoardLength_Select`),
      areaWidthInput: el.querySelector(`.${ID}_Width_Input`),
      areaLengthInput: el.querySelector(`.${ID}_Length_Input`),
      areaWidthLabel: el.querySelector(`.${ID}_Width_Input_Label`),
      areaLengthLabel: el.querySelector(`.${ID}_Length_Input_Label`),
      valuesContainer: el.querySelector(`.${ID}_Output_Values_Container`),
      totalDeckingOutput: el.querySelectorAll(`.${ID}_Decking_Output_Value`),
      addToBasket: el.querySelector(`#${ID}_CTA_Delivery`),
      addClickAndCollect: el.querySelector(`#${ID}_CTA_ClickAndCollect`),
      errorMessage: el.querySelector(`.${ID}_ATB_Error`),
      calculateCta: el.querySelector(`.${ID}-update button`),
    };

    return true;
  }

  /** Bind event handlers */
  bindEvents() {
    const {
      component,
      elements,
      model,
      validate,
      updateModel,
      updateView,
    } = this;

    const {
      inputs,
      wasteCheckbox,
      areaWidthInput,
      areaLengthInput,
      addToBasket,
      addClickAndCollect,
      errorMessage,
      calculateCta,
    } = elements;

    /** Updates component if validation is passed */
    const updateComponent = (e) => {
      const { target } = e;
      const isToggle = target.classList.contains(`${ID}_Toggle_Input`);

      if (isToggle || validate.call(this)) {
        updateModel.call(this);
        updateView.call(this);
      }
    };

    // Bind validation / form update to input changes
    for (let i = 0; i < inputs.length; i += 1) {
      const input = inputs[i];

      if (input.nodeName.toUpperCase() === 'SELECT') {
        // jQuery is needed to bind change events to custom select elements
        // that were created with window.TPCustomDropdown
        // eslint-disable-next-line no-loop-func
        window.jQuery(input).on('change', (e) => {
          // If board length is selected, redirect to that product URL
          const url = input.selectedOptions[0].getAttribute('data-url');
          if (url && window.location.pathname !== url) {
            // Update and save model in session storage and set refresh to true
            // so we know to scroll down to the calculator component automatically
            window.sessionStorage.setObject(ID, {
              model: updateModel.call(this),
              refresh: true,
            });

            window.location.pathname = url;
          } else {
            updateComponent(e);
          }
        });
      } else {
        input.addEventListener('change', updateComponent);
      }
    }

    calculateCta.addEventListener('click', updateComponent);

    // Add to bag
    if (addToBasket) {
      addToBasket.addEventListener('click', () => {
        const outOfStock = document.querySelector('.outofStockError') && document.querySelector('.outofStockError').style.display !== 'none';

        if (outOfStock) {
          // Show error
          errorMessage.textContent = 'Sorry, this product is out of stock';
          errorMessage.style.display = 'block';
        } else {
          // Add to bag
          DeckingCalculator.addToCart(model.numberOfBoardsNeeded);
        }
      });
    }

    if (addClickAndCollect) {
      addClickAndCollect.addEventListener('click', () => {
        DeckingCalculator.addClickAndCollect(model.numberOfBoardsNeeded);
      });
    }

    // GA events
    wasteCheckbox.addEventListener('change', () => {
      events.send(ID, 'Clicked', '5 percent allowance');
    });
    areaWidthInput.addEventListener('change', () => {
      events.send(ID, 'Clicked', 'Width');
    });
    areaLengthInput.addEventListener('change', () => {
      events.send(ID, 'Clicked', 'Length');
    });
    if (addToBasket) {
      addToBasket.addEventListener('click', () => {
        events.send(ID, 'Clicked', 'Calculator Add To Bag');
      });
    }
    viewabilityTracker(component, () => {
      events.send(ID, 'View', 'Decking Calculator', { sendOnce: true });
    });

    return true;
  }

  /** Update calculator model */
  updateModel() {
    const { model, elements } = this;
    const {
      slideToggleInput,
      areaWidthInput,
      areaLengthInput,
      boardLengthSelect,
      wasteCheckbox,
    } = elements;

    // Measurement Unit
    model.measurementUnit = slideToggleInput.checked ? 'ft' : 'm';

    // Waste
    model.includeWaste = wasteCheckbox.checked;

    // Custom area dimensions
    model.areaWidth = Number(areaWidthInput.value);
    model.areaLength = Number(areaLengthInput.value);
    model.deckingBoardLength = boardLengthSelect.selectedOptions[0].value || null;
    model.calculatedArea = DeckingCalculator.calculateArea(
      model.areaWidth,
      model.areaLength,
      model.measurementUnit,
    );

    // Calculations
    model.lengthOfDeckingNeeded = model.calculatedArea / model.deckingBoardWidth;
    model.numberOfBoardsNeeded = (() => {
      let val;

      if (model.deckingBoardLength) {
        val = model.lengthOfDeckingNeeded / model.deckingBoardLength;

        // Add 5% waste if checked
        if (model.includeWaste) val += ((val / 100) * 5);

        // Round up to nearest whole
        val = Math.ceil(val);
      } else {
        val = null;
      }

      return val;
    })();

    return model;
  }

  /** Update calculator view */
  updateView() {
    const { convertLength } = DeckingCalculator;
    const { model, elements } = this;
    const { boardLengthSelect, totalDeckingOutput } = elements;
    const { measurementUnit, numberOfBoardsNeeded } = model;

    // Change text inside board length dropdown to match selected measurement
    const customBoardLengthSelect = boardLengthSelect.nextElementSibling;

    const boardLengthSelectOptions = [].concat(
      Array.prototype.slice.call(boardLengthSelect.querySelectorAll('option')),
      Array.prototype.slice.call(customBoardLengthSelect.querySelectorAll('ul > li')), // Custom select element
    );
    for (let i = 0; i < boardLengthSelectOptions.length; i += 1) {
      const option = boardLengthSelectOptions[i];
      const measurement = option.value || option.getAttribute('data-value');
      if (measurement) {
        const newValue = `${convertLength(measurement, 'mm', measurementUnit).toFixed(2)} ${measurementUnit}`;

        // Update text to display length in chosen unit
        option.innerText = newValue;

        // If option is select, update the active element in the custom select element
        const isSelected = option.getAttribute('data-selected');
        if (isSelected) {
          customBoardLengthSelect.querySelector('.dropdown-opener').innerText = newValue;
        }
      }
    }

    // Update total number of decking boards needed
    for (let i = 0; i < totalDeckingOutput.length; i += 1) {
      totalDeckingOutput[i].textContent = numberOfBoardsNeeded || '__';
    }

    return true;
  }

  /** Inital render */
  renderView() {
    const {
      component,
      elements,
      sessionStorage,
    } = this;
    const { boardLengthSelect } = elements;

    // Render main component
    const productDetailContainer = document.body.querySelector('#ProductDetail .tpProductInfo');
    productDetailContainer.insertAdjacentElement('afterend', component);

    // Style select dropdown
    new window.TPCustomDropdown({
      el: boardLengthSelect,
    });

    // If page was refreshed due to board length change, scroll to component
    if (sessionStorage && sessionStorage.refresh) {
      window.scrollTo(0, component.getBoundingClientRect().top + window.scrollY - 25);
    }
  }

  /**
   * Validates the form and handles error messages
   * returns true if validation is passed and false if it isn't
   * @returns {boolean}
   */
  validate() {
    const { elements } = this;
    const { inputs } = elements;

    // Input validation
    const validation = {
      // Generic field validation
      number(input) {
        const { parentNode, value } = input;

        const isValid = !Number.isNaN(parseFloat(value));

        if (isValid) {
          parentNode.classList.remove(`${ID}_Input_Error`); // Valid
        } else {
          parentNode.classList.add(`${ID}_Input_Error`); // Invalid
        }

        return isValid;
      },

      // Specific input validation
      TP146d_Width: input => validation.number(input),
      TP146d_Length: input => validation.number(input),
      TP146d_BoardLength(input) {
        const { parentNode } = input;

        // Placeholder selection is invalid
        const isValid = !!input.selectedOptions[0].value;

        if (isValid) {
          parentNode.classList.remove(`${ID}_Input_Error`); // Valid
        } else {
          parentNode.classList.add(`${ID}_Input_Error`); // Invalid
        }

        return isValid;
      },
    };

    let formIsValid = true;

    // Update model/view on input change
    for (let i = 0; i < inputs.length; i += 1) {
      const input = inputs[i];
      const validateInput = typeof validation[input.name] === 'function' ? validation[input.name] : () => true;
      const validationResult = validateInput(input);

      if (!validationResult && formIsValid) {
        formIsValid = false;
      }
    }

    return formIsValid;
  }

  /**
   * Converts a number from one unit to another
   * @param {number|string} value Number to convert
   * @param {string} from Unit to convert from
   * @param {string} to  Unit to convert to
   * @returns {number} Converted measurement
   */
  static convertLength(value, from, to) {
    // Convert 'from' value to millimetres
    let valueInMillimetres;
    switch (from) {
      case 'mm':
        valueInMillimetres = value;
        break;

      case 'm':
        valueInMillimetres = value * 1000;
        break;

      case 'ft':
        valueInMillimetres = value * 304.8;
        break;

      default:
        break;
    }

    // Convert millimetres value to 'to' measurement
    let valueInNewUnit;
    switch (to) {
      case 'mm':
        valueInNewUnit = valueInMillimetres;
        break;

      case 'm':
        valueInNewUnit = valueInMillimetres / 1000;
        break;

      case 'ft':
        valueInNewUnit = valueInMillimetres / 304.8;
        break;

      default:
        break;
    }

    return valueInNewUnit;
  }

  /**
   * Calculate area in mm²
   * @param {number} width Width in metres
   * @param {number} length Length in metres
   * @param {string} measurementUnit m or ft
   * @returns {number} Area in mm²
   */
  static calculateArea(width, length, measurementUnit) {
    let value;

    switch (measurementUnit) {
      case 'm':
        value = (width * 1000) * (length * 1000);
        break;

      case 'ft':
        value = (width * 304.8) * (length * 304.8);
        break;

      default:
        break;
    }

    return value;
  }

  /**
   * Gets the currently selected decking board length in mm (if available)
   * @returns {string}
   */
  static getDeckingBoardLength() {
    const lengthDropdownLabel = [].filter.call(document.querySelectorAll('.tpVariantsWrapper label'), el => el.innerText.trim().toLowerCase() === 'length:')[0];
    const lengthInTechSpecsLabel = [].filter.call(document.querySelectorAll('.attrib'), el => el.innerText.trim().toLowerCase() === 'length')[0];
    let length;

    if (lengthDropdownLabel) {
      // Get length from dropdown
      const lengthDropdown = lengthDropdownLabel.nextElementSibling;
      const optionText = lengthDropdown.selectedOptions[0].innerText.trim();
      const optionSelected = optionText.toLowerCase() !== 'please select';
      length = optionSelected ? Number(optionText.match(/\d+/)[0]) : null;
    } else if (lengthInTechSpecsLabel) {
      // Get length from tech specs
      const lengthInTechSpecs = lengthInTechSpecsLabel.nextElementSibling;
      length = Number(lengthInTechSpecs.innerText.trim().match(/\d+/)[0]);
    } else {
      throw new Error(`${ID} - Could not retrieve decking board length`);
    }

    return length;
  }

  /**
   * Gets the decking board width in metres from the technical specs
   * @returns {number}
   */
  static getDeckingBoardWidth() {
    const widthSpec = [].filter.call(document.querySelectorAll('.attrib'), el => el.innerText.trim().toUpperCase() === 'WIDTH');
    const widthText = widthSpec[0].nextElementSibling.innerText.trim();
    const widthVal = Number(widthText.match(/[\d.]+/)[0]);
    let widthInMetres;

    if (/mm/.test(widthText)) {
      // Value is in millimetres
      widthInMetres = widthVal;
    } else if (/cm/.test(widthText)) {
      // Value is in centimetres, convert to millimetres
      widthInMetres = widthVal * 100;
    } else if (/m/.test(widthText)) {
      // Value is in metres, convert to millimetres
      widthInMetres = widthVal * 1000;
    } else {
      throw new Error(`${ID} - Could not retrieve decking width`);
    }

    return widthInMetres;
  }

  /**
   * Add product to cart
   * @param {number} qty Quanitity to add
   * @param {HTMLElement} form Form reference
   */
  static addToCart(qty, form) {
    const $ = window.jQuery;

    // Set quantity value
    const originalQtyInput = document.querySelector('#qty');
    originalQtyInput.value = qty;

    // Default add to cart tracking already on site
    (() => {
      const { product } = window.ACC; // API
      if (product.isMOQPresent()) {
        if (product.isQtyMoreThanMOQ()) {
          product.addProductForDelivery();
        } else {
          $('input#addToCartButton.add_to_cart_button').prop('type', 'button');
          $('.moqErrorMsg').show();
        }
      }
    })();

    const originalAddToCartButton = document.querySelector('#addToCartButton');
    originalAddToCartButton.click();

    return true;
  }

  /**
   * Add product for click and collect
   * @param {number} qty Quanitity to add
   */
  static addClickAndCollect(qty) {
    // Set quantity value
    const originalQtyInput = document.querySelector('#qty');
    originalQtyInput.value = qty;

    window.ACC.collectionBranchLocator.showPopup();

    return true;
  }
}
