import { fullStory, viewabilityTracker, events } from '../../../../lib/utils';


/**
 * {{TP131}} - {{Brick calculator}}
 */

const Run = () => {
  const $ = window.jQuery;
  const Exp = {
    /**
     * @desc Variation settings. Useful for when multiple variations are developed
     * in a single project so you can just toggle the variation number in production
     */
    settings: {
      ID: 'TP131',
      VARIATION: '1',
    },
    cache: (() => {
      const docVar = document;
      const bodyVar = docVar.body;
      const productDetailContainer = bodyVar.querySelector('#ProductDetail .tpProductInfo');
      const quantityInput = docVar.getElementById('qty');
      const addToCartButton = docVar.getElementById('addToCartButton');
      const brickHeight = bodyVar.querySelector('div#tab-techspecs tbody > tr > td:last-child').textContent.trim().replace(/\smm/g, '');
      const quantityError = bodyVar.querySelector('.moqErrorMsg');
      const outofStockError = $('.noStockErrorMsg');
      // Reassigned after markup has rendered, when calculator is initialised
      let wastageCheckbox;
      let slideToggleInput;
      let heightInput;
      let lengthInput;
      let heightLabel;
      let lengthLabel;
      let totalBricksOutput;
      let totalPacksOutput;
      let totalPacksButtonNumber;
      let valuesContainer;
      let TP131ErrorMessageATB;
      let TP131ErrorMessageATBJQ;
      // Maintains state of calculator
      const calculatorState = {
        measurementUnit: 'm',
        includeWaste: true,
        useHeight: 60,
        inputHeight: 1,
        inputLength: 2,
        packQuantity: 0,
        addToBasketQ: 1,
        minimumQuantity: 1,
      };
      // Update brick height if needed (based on DOM attribute)
      if (brickHeight === '73') {
        calculatorState.useHeight = 50;
      }
      // Set minimum pack quantity
      calculatorState.minimumQuantity = parseInt(quantityError.textContent.trim().replace(/Delivery minimum order qty: /g, ''), 10);

      return {
        docVar,
        bodyVar,
        productDetailContainer,
        quantityInput,
        addToCartButton,
        brickHeight,
        wastageCheckbox,
        slideToggleInput,
        valuesContainer,
        heightInput,
        lengthInput,
        heightLabel,
        lengthLabel,
        totalBricksOutput,
        totalPacksOutput,
        totalPacksButtonNumber,
        calculatorState,
        outofStockError,
        TP131ErrorMessageATB,
        TP131ErrorMessageATBJQ,
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
      // Default running event
      events.send(Exp.settings.ID, 'View', `${Exp.settings.ID} activated - Variation ${Exp.settings.VARIATION}`);
    },
    services: {
      /**
       * @desc Inits all page level tracking
       */
      tracking: () => {
        const { settings } = Exp;
        fullStory(settings.ID, `Variation ${settings.VARIATION}`);
      },
      getPackQuantity() {
        const allSpecs = Exp.cache.bodyVar.querySelectorAll('div#tab-techspecs tbody tr');
        for (let i = 0, n = allSpecs.length; i < n; i += 1) {
          const currentSpec = allSpecs[i];
          const specTitle = currentSpec.querySelector('.attrib');
          if (specTitle.textContent.toUpperCase().trim() === 'PACK QUANTITY') {
            Exp.cache.calculatorState.packQuantity = parseInt(currentSpec.querySelector('td:last-child').textContent.trim(), 10);
            break;
          }
        }
      },
    },
    components: {
      setupElements() {
        const { render, calculatorFunctions } = Exp;
        // Get quantity
        Exp.services.getPackQuantity();
        // Markup rendered, add calculator functions
        render.brickCalculator();
        calculatorFunctions.initializeCalculator();
      },
    },
    render: {
      // Container for brick calculator without any functionality
      brickCalculator() {
        // Individual component markup
        // Calculator inputs
        const calculatorInputContainer = `
          <div class="TP131_Calculator_Input_Container TP131_Wrap">
            <div class="TP131_Input_Container">
              <div class="TP131_Input_Label_Container">
                <span class="TP131_Calculator_Input_Label">Height:</span>
                <span class="TP131_Error_Message">Please enter a valid number</span>
              </div>
              <input type="text" name="TP131_Height" class="TP131_Calculator_Input TP131_Height_Input" value="1" /><span class="TP131_Measurement_Unit TP131_Height_Input_Label"></span>
            </div>
            <div class="TP131_Input_Container">
              <div class="TP131_Input_Label_Container">
                <span class="TP131_Calculator_Input_Label">Length:</span>
                <span class="TP131_Error_Message">Please enter a valid number</span>
              </div>
              <input type="text" name="TP131_Length" class="TP131_Calculator_Input TP131_Length_Input" value="2" /><span class="TP131_Measurement_Unit TP131_Length_Input_Label"></span>
            </div>
            <div class="TP131-update">
              <button>Update</button>
            </div>
          </div>
        `;

        // Toggle Component
        const calculatorMarkup = `
          <div class="TP131_Calculation_Input_Container">
            <p class="TP131_Calculation_Input_Header TP131_Wrap">
              Enter your measurements below to calculate an approximate amount of bricks needed.
              <br /><span class="TP131_Bold">Please allow for up to 5% wastage</span><br />
              Calculator accounts for 10mm joints
            </p>
            
            <div class="TP131_Toggle_Container">
              <span class="TP131_Toggle_Option TPT131_Option_Metres">Metres</span>
              <label class="TP131_Switch">
                <input type="checkbox" class="TP131_Toggle_Input" />
                <span class="TP131_Slider"></span>
              </label>
              <span class="TP131_Toggle_Option TPT131_Option_Feet">Feet</span>
            </div>
            
            <div class="TP131_Checkbox_Container">
              <input type="checkbox" id="TP131_Checkbox_Wastage" />
              <label for="TP131_Checkbox_Wastage" class="TP131_Checkbox_Wastage_Label">Include 5% wastage</label>
            </div>

            ${calculatorInputContainer}
          </div>
        `;

        const calculationOutputMarkup = `
          <div class="TP131_Output_Container">
            <div class="TP131_Calculation_Output_Container">
              <span class="TP131_Calculation_Output_Header">You will need approximately:</span>
              <div class="TP131_Output_Values_Container TP131_Wrap TP131_Single">
                <span class="TP131_Brick_Output TP131_Bold"><span class="TP131_Brick_Output_Value"></span> bricks</span>
                <span class="TP131_Brick_Pack_Output">(<span class="TP131_Pack_Number"></span> packs)</span>
                <span class="TP131_Add_Delivery">Add <span class="TP131_Packs_To_Add TP131_Bold"></span> pack<span class="TP131_Pack_Plural TP131_Bold">s</span> for delivery</span>
                <span class="TP131_Error_Message TP131_ATB_Error">Sorry, this product is out of stock</span>
              </div>
            </div>
            <div class="TP131_Split_Packs_Container">
              <span class="TP131_Split_Pack_Header">Want to split a pack?</span>
              <span class="TP131_Split_Pack_Text">Call your local branch to get a delivery for the exact amount you need</span>
              <a href="/branch-locator" class="TP131_Split_Pack_Link">Branch Locator</a>
            </div>
          </div>
        `;

        Exp.cache.productDetailContainer.insertAdjacentHTML('afterend', `
          <div class="TP131_Brick_Calculator_Container">
            <h3 class="TP131_Brick_Calculator_Header">Brick Calculator</h3>
            <div class="TP131_Brick_Calculator_Components_Container">
              ${calculatorMarkup}
              ${calculationOutputMarkup}
              </div>
          </div>
        `);
      },
    },
    calculatorFunctions: {
      // Activates all helper functions for the calculator, stores selectors to DOM elements
      initializeCalculator() {
        // Store Selectors
        Exp.cache.wastageCheckbox = Exp.cache.docVar.getElementById('TP131_Checkbox_Wastage');
        Exp.cache.slideToggleInput = Exp.cache.bodyVar.querySelector('.TP131_Toggle_Input');
        Exp.cache.valuesContainer = Exp.cache.bodyVar.querySelector('.TP131_Output_Values_Container');
        Exp.cache.heightInput = Exp.cache.bodyVar.querySelector('.TP131_Height_Input');
        Exp.cache.lengthInput = Exp.cache.bodyVar.querySelector('.TP131_Length_Input');
        Exp.cache.heightLabel = Exp.cache.bodyVar.querySelector('.TP131_Height_Input_Label');
        Exp.cache.lengthLabel = Exp.cache.bodyVar.querySelector('.TP131_Length_Input_Label');
        Exp.cache.totalBricksOutput = Exp.cache.bodyVar.querySelector('.TP131_Brick_Output_Value');
        Exp.cache.totalPacksOutput = Exp.cache.bodyVar.querySelector('.TP131_Pack_Number');
        Exp.cache.totalPacksButtonNumber = Exp.cache.bodyVar.querySelector('.TP131_Packs_To_Add');
        Exp.cache.TP131ErrorMessageATB = Exp.cache.bodyVar.querySelector('.TP131_ATB_Error');
        Exp.cache.TP131ErrorMessageATBJQ = $(Exp.cache.TP131ErrorMessageATB);
        // Bind event listeners
        this.handleHeightInput();
        this.handleLengthInput();
        this.handleToggle();
        this.handleWastageCheckbox();
        // Render initial values
        this.renderValues();
        // Check if add for deilvery button is enabled, if so add event listener
        // Else add styling class to hide add packs button
        if (!Exp.cache.addToCartButton.disabled) {
          // Activate event listener to add quantity to bag
          Exp.bindExperimentEvents.handleAddToBasket();
        } else {
          Exp.cache.bodyVar.querySelector('.TP131_Output_Container').classList.add('TP131_Hide_Add_For_Delivery');
        }
        // Track viewability
        Exp.bindExperimentEvents.addViewabilityTracker();
      },
      handleToggle() {
        Exp.cache.slideToggleInput.addEventListener('change', (e) => {
          // Update state based on toggle
          if (e.target.checked) {
            Exp.cache.calculatorState.measurementUnit = 'feet';
          } else {
            Exp.cache.calculatorState.measurementUnit = 'm';
          }
          // Call render
          this.renderValues();
        });
      },
      handleHeightInput() {
        Exp.cache.heightInput.addEventListener('blur', (e) => {
          // Send event
          events.send(`${Exp.settings.ID}`, 'Clicked', 'Height', { sendOnce: true });
          // Validate input
          const inputElement = e.target;
          const inputElementParent = inputElement.parentNode;
          const inputValue = parseFloat(inputElement.value);
          // Next line disabled, using isNaN expectedly
          // eslint-disable-next-line
          if (!isNaN(inputValue)) {
            inputElementParent.classList.remove('TP131_Input_Error');
            // Valid input, Remove error class, update state and call render
            Exp.cache.calculatorState.inputHeight = inputValue;
            this.renderValues();
          } else {
            // Toggle error class
            inputElementParent.classList.add('TP131_Input_Error');
          }
        });
      },
      handleLengthInput() {
        Exp.cache.lengthInput.addEventListener('blur', (e) => {
          // Send event
          events.send(`${Exp.settings.ID}`, 'Clicked', 'Length', { sendOnce: true });
          // Validate input
          const inputElement = e.target;
          const inputElementParent = inputElement.parentNode;
          const inputValue = parseFloat(inputElement.value);
          // Next line disabled, using isNaN expectedly
          // eslint-disable-next-line
          if (!isNaN(inputValue)) {
            // Valid input, update state and call render
            inputElementParent.classList.remove('TP131_Input_Error');
            Exp.cache.calculatorState.inputLength = inputValue;
            this.renderValues();
          } else {
            // Toggle error class
            inputElementParent.classList.add('TP131_Input_Error');
          }
        });
      },
      handleWastageCheckbox() {
        Exp.cache.wastageCheckbox.checked = true;
        Exp.cache.wastageCheckbox.addEventListener('change', (e) => {
          events.send(`${Exp.settings.ID}`, 'Clicked', '5 percent allowance', { sendOnce: true });
          // Set calculator state accordingly
          if (e.target.checked) {
            Exp.cache.calculatorState.includeWaste = true;
          } else {
            Exp.cache.calculatorState.includeWaste = false;
          }
          // Call render
          this.renderValues();
        });
      },
      // Updates calculator output values
      renderValues() {
        let calculatedArea = 0;
        // Pre-calculation if using feet as measurement
        if (Exp.cache.calculatorState.measurementUnit === 'feet') {
        // Next line exceeds lenght
        // eslint-disable-next-line
          calculatedArea = (Exp.cache.calculatorState.inputHeight * Exp.cache.calculatorState.inputLength) / 3.28084;
        } else {
        // Next line exceeds lenght
        // eslint-disable-next-line
          calculatedArea = Exp.cache.calculatorState.inputHeight * Exp.cache.calculatorState.inputLength;
        }
        // General calculations
        // Next line exceeds lenght
        // eslint-disable-next-line
        let totalBricks = calculatedArea * Exp.cache.calculatorState.useHeight;
        // Add 5% wastage if checked
        if (Exp.cache.calculatorState.includeWaste) {
          totalBricks += ((totalBricks / 100) * 5);
        }
        Exp.cache.totalBricksOutput.textContent = Math.ceil(totalBricks);
        const packTotal = totalBricks / Exp.cache.calculatorState.packQuantity;
        Exp.cache.totalPacksOutput.textContent = packTotal.toFixed(2);
        // Update state
        Exp.cache.calculatorState.addToBasketQ = Math.ceil(packTotal);
        // Edit markup
        Exp.cache.totalPacksButtonNumber.textContent = Exp.cache.calculatorState.addToBasketQ;
        Exp.cache.heightLabel.textContent = Exp.cache.calculatorState.measurementUnit;
        Exp.cache.lengthLabel.textContent = Exp.cache.calculatorState.measurementUnit;
        if (Exp.cache.calculatorState.addToBasketQ === 1) {
          Exp.cache.valuesContainer.classList.add('TP131_Single');
        } else {
          Exp.cache.valuesContainer.classList.remove('TP131_Single');
        }
        /* Check quantity, if calculated quantity is not greater than or equal to minimum,
        * slide down error
        */
        if (Exp.cache.calculatorState.addToBasketQ >= Exp.cache.calculatorState.minimumQuantity) {
          Exp.cache.TP131ErrorMessageATBJQ.slideUp();
        } else {
          Exp.cache.TP131ErrorMessageATB.textContent = `A minimum of ${Exp.cache.calculatorState.minimumQuantity} packs are required for delivery. Please scroll up to adjust the quantity`;
          Exp.cache.TP131ErrorMessageATBJQ.slideDown();
        }
      },
    },
    bindExperimentEvents: {
      handleAddToBasket() {
        const addPacksForDeliveryButton = Exp.cache.bodyVar.querySelector('.TP131_Add_Delivery');
        addPacksForDeliveryButton.addEventListener('click', () => {
          /* Take packs to add from calclator state, set as quantity input value
          * click add to bag
          * Send event
          */
          events.send(`${Exp.settings.ID}`, 'Clicked', 'Calculator Add To Bag', { sendOnce: true });
          /*
          * Check if out of stock message is not visible, if not then add to bag
          * otherwise display error message
          * */
          if (Exp.cache.outofStockError.is(':visible')) {
            Exp.cache.TP131ErrorMessageATB.textContent = 'Sorry, this product is out of stock';
            Exp.cache.TP131ErrorMessageATBJQ.slideDown();
          } else {
            Exp.cache.quantityInput.value = Exp.cache.calculatorState.addToBasketQ;
            Exp.cache.addToCartButton.click();
          }
        });
      },
      addViewabilityTracker() {
        const renderedBrickCalculator = Exp.cache.bodyVar.querySelector('.TP131_Brick_Calculator_Container');
        viewabilityTracker(renderedBrickCalculator, () => {
          events.send(`${Exp.settings.ID}`, 'View', 'Brick Calculator', { sendOnce: true });
        });
      },
    },
  };

  Exp.init();
};

export default Run;
