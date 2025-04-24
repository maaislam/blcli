import '../../../../../../lib/utils/extendWebStorage';
import settings from '../../lib/settings';
import shared from '../../lib/shared';
import { events, viewabilityTracker } from '../../../../../../lib/utils';

const { ID } = settings;

export default class PavingCalculator {
  constructor() {
    this.sessionStorage = window.sessionStorage.getObject(ID);

    this.isPack = shared.productType === 'pack';

    this.model = this.sessionStorage && this.sessionStorage.model ? this.sessionStorage.model : {
      measurementUnit: 'm',
      includeWaste: true,
      pavingWidth: this.isPack ? null : PavingCalculator.getPavingWidth(),
      pavingLength: this.isPack ? null : PavingCalculator.getPavingLength(),
      coverage: this.isPack ? PavingCalculator.getCoverage() : null,
      areaWidth: 1,
      areaLength: 2,
      qtyNeeded: null,
      minimumQty: 1,
    };

    this.elementCache = {
      originalAddToCartButton: document.querySelector('#addToCartButton'),
      originalClickAndCollectButton: document.querySelector('#addForCollectButton'),
      lengthSelect: (() => {
        const lengthSelectLabel = [].filter.call(document.querySelectorAll('.tpVariantsWrapper label'), el => el.innerText === 'Dimensions:')[0];
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
      addToCartDisabled,
      clickAndCollectDisabled,
      model,
      isPack,
    } = this;
    const {
      measurementUnit,
      includeWaste,
      areaWidth,
      areaLength,
      qtyNeeded,
    } = model;

    const temp = document.createElement('div');
    /* eslint-disable indent */
    temp.innerHTML = `
    <div class="${ID}_Paving_Calculator_Container">
      <h3 class="${ID}_Paving_Calculator_Header">Paving Calculator</h3>
      <div class="${ID}_Paving_Calculator_Components_Container">

        <div class="${ID}_Calculation_Input_Container">
          <p class="${ID}_Calculation_Input_Header ${ID}_Wrap">
            Enter your measurements below to calculate an approximate amount of paving slabs needed.
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
              <span class="${ID}_Paving_Output ${ID}_Bold"><span class="${ID}_Paving_Output_Value">${qtyNeeded || '__'}</span> ${isPack ? 'packs' : 'Paving Slabs'} to cover this area</span>
              ${(() => {
                // CTA section
                let markup = `<div class="${ID}_CTA_Block">`;

                if (addToCartDisabled && clickAndCollectDisabled) {
                  const lengthSelected = (() => {
                    const select = document.querySelector('#variantList');
                    return !select || (select && select.selectedOptions[0].innerText.trim().toLowerCase() !== 'please select');
                  })();
                  if (model.pavingLength && lengthSelected) {
                    markup += `<p class="${ID}_CTA_Error">Sorry, this length is currently unavailable. Other lengths for this product may be available</p>`;
                  }
                } else {
                  markup += `<p class="${ID}_CTA_Label">Add <span class="${ID}_Paving_Output_Value ${ID}_Bold">${qtyNeeded || '__'}</span> ${isPack ? 'packs' : 'Paving Slabs'} for:</p>`;

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
      areaWidthInput: el.querySelector(`.${ID}_Width_Input`),
      areaLengthInput: el.querySelector(`.${ID}_Length_Input`),
      areaWidthLabel: el.querySelector(`.${ID}_Width_Input_Label`),
      areaLengthLabel: el.querySelector(`.${ID}_Length_Input_Label`),
      valuesContainer: el.querySelector(`.${ID}_Output_Values_Container`),
      totalPavingOutput: el.querySelectorAll(`.${ID}_Paving_Output_Value`),
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
      input.addEventListener('change', updateComponent);
    }

    calculateCta.addEventListener('click', updateComponent);

    // TODO: UP TO HERE
    // On change of slab length, if the product is on a different URL check to see if
    // it is available for delivery. If not, hide the add to cart CTA
    // $.ajax({
    //   type: 'GET',
    //   url: '/Travis-Perkins-Treated-Timber-Paving-Slab-35mm-x-148mm-x-3m-%28Finished-Size-32mm-x-144mm-x-3m%29/p/885815',
    //   success: (data) => {
    //     console.log('got data');
    //     const $data = $(data);
    //     const $form = $data.find('#addToCartForm');
    //     const eligibleForDelivery = !$form.find('#addToCartButton')[0].disabled;
    //   },
    // });

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
          PavingCalculator.addToCart(model.qtyNeeded);
        }
      });
    }

    if (addClickAndCollect) {
      addClickAndCollect.addEventListener('click', () => {
        PavingCalculator.addClickAndCollect(model.qtyNeeded);
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
      events.send(ID, 'View', 'Paving Calculator', { sendOnce: true });
    });

    return true;
  }

  /** Update calculator model */
  updateModel() {
    const {
      model,
      elements,
      isPack,
    } = this;
    const {
      slideToggleInput,
      areaWidthInput,
      areaLengthInput,
      wasteCheckbox,
    } = elements;

    // Measurement Unit
    model.measurementUnit = slideToggleInput.checked ? 'ft' : 'm';

    // Waste
    model.includeWaste = wasteCheckbox.checked;

    // Custom area dimensions
    model.areaWidth = Number(areaWidthInput.value);
    model.areaLength = Number(areaLengthInput.value);

    if (isPack) {
      model.qtyNeeded = (() => {
        let coverageVal = model.coverage;
        if (model.measurementUnit === 'ft') {
          coverageVal *= 3.28084;
        }

        let val = (model.areaWidth * model.areaLength) / coverageVal;

        // Add 5% waste if checked
        if (model.includeWaste) val += ((val / 100) * 5);

        // Round up to nearest whole
        return Math.ceil(val);
      })();
    } else {
      model.pavingLength = PavingCalculator.getPavingLength();
      model.calculatedArea = PavingCalculator.calculateArea(
        model.areaWidth,
        model.areaLength,
        model.measurementUnit,
      );

      // Calculations
      model.lengthOfPavingNeeded = model.calculatedArea / model.pavingWidth;
      model.qtyNeeded = (() => {
        let val;

        if (model.pavingLength) {
          val = model.lengthOfPavingNeeded / model.pavingLength;

          // Add 5% waste if checked
          if (model.includeWaste) val += ((val / 100) * 5);

          // Round up to nearest whole
          val = Math.ceil(val);
        } else {
          val = null;
        }

        return val;
      })();
    }

    return model;
  }

  /** Update calculator view */
  updateView() {
    const { model, elements } = this;
    const { totalPavingOutput } = elements;
    const { qtyNeeded } = model;

    // Update total number of paving slabs needed
    for (let i = 0; i < totalPavingOutput.length; i += 1) {
      totalPavingOutput[i].textContent = qtyNeeded || '__';
    }

    return true;
  }

  /** Inital render */
  renderView() {
    const {
      component,
      sessionStorage,
    } = this;

    // Render main component
    const productDetailContainer = document.body.querySelector('#ProductDetail .tpProductInfo');
    productDetailContainer.insertAdjacentElement('afterend', component);

    // If page was refreshed due to slab length change, scroll to component
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
      TP148d_Width: input => validation.number(input),
      TP148d_Length: input => validation.number(input),
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
   * Gets the currently selected paving slab length in mm (if available)
   * @returns {string}
   */
  static getPavingLength() {
    const lengthInTechSpecsLabel = [].filter.call(document.querySelectorAll('.attrib'), el => el.innerText.trim().toLowerCase() === 'length')[0];
    let length;

    if (lengthInTechSpecsLabel) {
      // Get length from tech specs
      const lengthInTechSpecs = lengthInTechSpecsLabel.nextElementSibling;
      length = Number(lengthInTechSpecs.innerText.trim().match(/\d+/)[0]);
    } else {
      throw new Error(`${ID} - Could not retrieve paving slab length`);
    }

    return length;
  }

  /**
   * Gets the paving slab width in metres from the technical specs
   * @returns {number}
   */
  static getPavingWidth() {
    const widthInTechSpecsLabel = [].filter.call(document.querySelectorAll('.attrib'), el => el.innerText.trim().toLowerCase() === 'width');
    let widthInMetres;

    if (widthInTechSpecsLabel) {
      const widthText = widthInTechSpecsLabel[0].nextElementSibling.innerText.trim();
      const widthVal = Number(widthText.match(/[\d.]+/)[0]);

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
        throw new Error(`${ID} - Could not retrieve paving width`);
      }
    }

    return widthInMetres;
  }

  /**
   * Gets pack coverage
   * @returns {number}
   */
  static getCoverage() {
    const coverageInTechSpecsLabel = [].filter.call(document.querySelectorAll('.attrib'), (el) => {
      const name = el.innerText.trim().toLowerCase();
      return name === 'coverage' || name === 'pack coverage';
    });
    let coverage;

    if (coverageInTechSpecsLabel) {
      const coverageText = coverageInTechSpecsLabel[0].nextElementSibling.innerText.trim();
      coverage = Number(coverageText.match(/[\d.]+/)[0]);
    }

    return coverage;
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
