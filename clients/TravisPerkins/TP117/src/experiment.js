import { fullStory, viewabilityTracker, events } from '../../../../lib/utils';


/**
 * {{TP117}} - {{Bulk Bag Calculator}}
 */

const Run = () => {
  const $ = window.jQuery;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'TP117',
      VARIATION: '1',
    },
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      const productInformation = docVar.getElementById('productDetailUpdateable');
      const productQuantityInput = docVar.getElementById('qty');
      const productAddForDelivery = docVar.getElementById('addToCartButton');
      let TP117WidthInput;
      let TP117LengthInput;
      let TP117DepthInput;
      let TP117Container;
      let calculateButton;
      let addToBagButton;
      let displayCalculatedResult;
      // calculation result reassigned in calculate result function
      // eslint-disable-next-line
      let calculationResult = 1;

      return {
        docVar,
        bodyVar,
        productInformation,
        TP117WidthInput,
        TP117DepthInput,
        TP117LengthInput,
        calculateButton,
        addToBagButton,
        productQuantityInput,
        productAddForDelivery,
        calculationResult,
        displayCalculatedResult,
        TP117Container,
      };
    })(),
    init: () => {
      // Setup
      const { services } = Exp;
      const { settings } = Exp;
      const { components } = Exp;

      Exp.cache.bodyVar.classList.add(settings.ID);
      services.tracking();
      components.setupElements();
      const hide = document.getElementById(`${settings.ID}_flickerPrevention`);
      hide.parentElement.removeChild(hide);
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
        // Default running event
        events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
      },
    },
    components: {
      setupElements() {
        // Render calculator
        Exp.render.bulkBagCalculator();
        // Store selectors
        Exp.cache.TP117DepthInput = Exp.cache.docVar.getElementById('TP117_Depth');
        Exp.cache.TP117LengthInput = Exp.cache.docVar.getElementById('TP117_Length');
        Exp.cache.TP117WidthInput = Exp.cache.docVar.getElementById('TP117_Width');
        Exp.cache.addToBagButton = Exp.cache.bodyVar.querySelector('.TP117_Result_Add_To_Bag');
        Exp.cache.calculateButton = Exp.cache.bodyVar.querySelector('.TP117_Calculate_Button');
        Exp.cache.displayCalculatedResult = Exp.cache.bodyVar.querySelector('.TP117_Result_Value');
        Exp.cache.TP117Container = Exp.cache.bodyVar.querySelector('.TP117_Container');
        // Elements ready, build functions
        Exp.testFunctions.calculateResult();
        Exp.testFunctions.addToBag();
        Exp.cache.TP117DepthInput.addEventListener('blur', Exp.testFunctions.validateInput);
        Exp.cache.TP117LengthInput.addEventListener('blur', Exp.testFunctions.validateInput);
        Exp.cache.TP117WidthInput.addEventListener('blur', Exp.testFunctions.validateInput);
        // Add event tracking
        Exp.testFunctions.trackedElements();
      },
    },
    render: {
      bulkBagCalculator() {
        Exp.cache.productInformation.insertAdjacentHTML('afterend', `
        <div class="TP117_Container">
          <span class="TP117_Header">How Many Bulk Bags do I Need?</span>
          <div class="TP117_Calculator_Area">
            <div class="TP117_Calculator">
              <span class="TP117_Calculator_Header">This is a rough estimate of how many bulk bags you will need to fill an area. A single bulk bag will fill approximately 0.6m<span class="TP117_Superscript_Text">3</span></span>
              <div class="TP117_Calculator_Container">
                <div class="TP117_Calculator_Field_Container">
                  <label class="TP117_Label" for="TP117_Width">Width (m):</label>
                  <p class="TP117_Validation_Error_Message">Please enter a number</p>
                  <input class="TP117_Calc_Input" type="text" id="TP117_Width" value="1">
                </div>
                <div class="TP117_Calculator_Field_Container">
                  <label class="TP117_Label" for="TP117_Length">Length (m):</label>
                  <p class="TP117_Validation_Error_Message">Please enter a number</p>
                  <input class="TP117_Calc_Input" type="text" id="TP117_Length" value="1">
                </div>
                <div class="TP117_Calculator_Field_Container">
                  <label class="TP117_Label" for="TP117_Depth">Depth (cm):</label>
                  <p class="TP117_Validation_Error_Message">Please enter a number</p>
                  <input class="TP117_Calc_Input" type="text" id="TP117_Depth" value="10">
                </div>
                <button class="TP117_Calculate_Button" type="button">Calculate</button>
              </div>
            </div>
            <div class="TP117_Result_Area">
              <span class="TP117_Result_Header">You will need approximately:</span>
              <div class="TP117_Results_Text_Container">
                <span class="TP117_Result_Value">1</span>
                <span class="TP117_Result_Text">Bulk Bags</span>
              </div>
              <button class="TP117_Result_Add_To_Bag" type="button">Add To Bag</button>
            </div>
          </div>
        </div>
        `);
      },
    },
    testFunctions: {
      validateInput(e) {
        const inputValue = e.target.value.trim();
        const errorMessage = $(e.target).prev('.TP117_Validation_Error_Message');
        // Validate input using isNaN
        // eslint-disable-next-line
        if (!isNaN(inputValue)) {
          // Remove error class from input
          e.target.classList.remove('TP117_Input_Error');
          // Slide up error message if it is visible
          if (errorMessage.is(':visible')) {
            errorMessage.slideUp();
          }
        } else {
          // Add error styling class, slidedown relevant error message if not visible
          e.target.classList.add('TP117_Input_Error');
          if (!errorMessage.is(':visible')) {
            errorMessage.slideDown();
          }
        }
      },
      calculateResult() {
        Exp.cache.calculateButton.addEventListener('click', () => {
          // Send event
          events.send(`${Exp.settings.ID}`, 'Clicked', 'Calculate', { sendOnce: true });
          // Calculate number of bagged aggregates
          // Parse float on inputs
          const Length = parseFloat(Exp.cache.TP117LengthInput.value);
          const width = parseFloat(Exp.cache.TP117WidthInput.value);
          let depth = parseFloat(Exp.cache.TP117DepthInput.value);
          depth /= 100;

          const totalAggregates = Math.ceil((Length * width * depth) / 0.6);
          Exp.cache.calculationResult = totalAggregates;
          // Update calculated result text
          Exp.cache.displayCalculatedResult.textContent = totalAggregates;
        });
      },
      addToBag() {
        Exp.cache.addToBagButton.addEventListener('click', () => {
          // Send event
          events.send(`${Exp.settings.ID}`, 'Clicked', 'Add to Bag in Calculator', { sendOnce: true });
          // Clear input values
          Exp.cache.TP117DepthInput.value = 10;
          Exp.cache.TP117LengthInput.value = 1;
          Exp.cache.TP117WidthInput.value = 1;
          // Update quantity input and click current add to bag
          Exp.cache.productQuantityInput.value = Exp.cache.calculationResult;
          Exp.cache.productAddForDelivery.click();
        });
      },
      trackedElements() {
        // Click into inputs
        Exp.cache.TP117DepthInput.addEventListener('focus', () => {
          events.send(`${Exp.settings.ID}`, 'Clicked', 'Depth', { sendOnce: true });
        });
        Exp.cache.TP117LengthInput.addEventListener('focus', () => {
          events.send(`${Exp.settings.ID}`, 'Clicked', 'Length', { sendOnce: true });
        });
        Exp.cache.TP117WidthInput.addEventListener('focus', () => {
          events.send(`${Exp.settings.ID}`, 'Clicked', 'Width', { sendOnce: true });
        });
        // Calculator in view
        viewabilityTracker(Exp.cache.TP117Container, () => {
          events.send(`${Exp.settings.ID}`, 'View', 'Bulk Bag Calculator', { sendOnce: true });
        });
      },
    },
  };

  Exp.init();
};

export default Run;
