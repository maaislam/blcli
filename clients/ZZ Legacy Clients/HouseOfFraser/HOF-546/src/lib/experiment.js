/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { events } from '../../../../../lib/utils';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;

export default () => {
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (shared.VARIATION == 'control') {
    return;
  }

  // Write experiment code here
  // ...

  var isEchoVarBrainlab = {
    init: function () {
      this.addclientsJs();
    },
    addclientsJs: function () {
      var d1 = document.getElementById('BodyWrap');
      d1.insertAdjacentHTML(
        'beforebegin',
        `<div class="question-popup">
			<h2>Just a quick question...</h2>
		</div>`
      );

      setTimeout(function () {
        document.querySelector('.question-popup').style.display = 'none';
      }, 1999);

      var step_content = `
			<div class="servey-section custom-servery-section">
			    <div class="servey-header">
			        <p class="confirmation-title">Thank you! - Your order has been processed. Order number <strong>SD12345</strong></p>
			    </div>
			    <div class="servey-main-content">
			    
			    
			        <div class="servey-step servey-step-one show">
			            <div class="servey-progressbar">
			                <span class="bg-pink"></span>
			                <span></span>
			                <span></span>
			                <span></span>
			            </div>
			            <div class="servey-step-title">
			                <h4>Who did you shop for?</h4>
			            </div>
			            <div class="servey-options" id="step-one-radio">
			                <label class="label-container">Myself
			                    <input type="radio" name="shop_for" id="myself" value="Myself">
			                    <span class="checkmark"></span>
			                  </label>
			                  <label class="label-container">Family
			                    <input type="radio" name="shop_for" id="family" value="Family">
			                    <span class="checkmark"></span>
			                  </label>
			                  <label class="label-container">Multiple
			                    <input type="radio" name="shop_for" id="multiple" value="Multiple">
			                    <span class="checkmark"></span>
			                  </label>
			                  <label class="label-container">The home
			                    <input type="radio" name="shop_for" id="the_home" value="The home">
			                    <span class="checkmark"></span>
			                  </label>
			            </div>
			            <div class="survey-pagination">
			                <button class="servey-step-previous servey-step-one-previous">Previous</button>
			                <button class="servey-step-next servey-step-one-next" id="servey-step-one-next">Next</button>
			            </div>
			        </div>
			        
			        
			        <div class="servey-step servey-step-two">
			            <div class="servey-progressbar">
			                <span class="bg-pink"></span>
			                <span class="bg-pink"></span>
			                <span></span>
			                <span></span>
			            </div>
			            <div class="servey-step-title">
			                <h4>What factors contributed the most to your decision to purchase today? (Pick up to 3) 
			                </h4>
			            </div>
			            <div class="servey-options" id="step-two-checkbox">
			                <label class="container-checkbox">Pricing
			                    <input type="checkbox" name="purchase_factors" value="Pricing" class="purchase-factors">
			                    <span class="checkbox-checkmark"></span>
			                </label>
			                <label class="container-checkbox">Product availability
			                    <input type="checkbox" name="purchase_factors" value="Product availability" class="purchase-factors">
			                    <span class="checkbox-checkmark"></span>
			                </label>
			                <label class="container-checkbox">Designers available
			                    <input type="checkbox" name="purchase_factors" value="Designers available" class="purchase-factors">
			                    <span class="checkbox-checkmark"></span>
			                </label>
			                <label class="container-checkbox">New Products 
			                    <input type="checkbox" name="purchase_factors" value="New Products" class="purchase-factors">
			                    <span class="checkbox-checkmark"></span>
			                </label>
			                <label class="container-checkbox">Ease of returns process
			                    <input type="checkbox" name="purchase_factors" value="Ease of returns process" class="purchase-factors">
			                    <span class="checkbox-checkmark"></span>
			                </label>
			                <label class="container-checkbox">Ease of the buying online process 
			                    <input type="checkbox" name="purchase_factors" value="Ease of the buying online process" class="purchase-factors">
			                    <span class="checkbox-checkmark"></span>
			                </label>
			                <label class="container-checkbox">Delivery speed
			                    <input type="checkbox" name="purchase_factors" value="Delivery speed" class="purchase-factors">
			                    <span class="checkbox-checkmark"></span>
			                </label>
			                <label class="container-checkbox">Delivery price
			                    <input type="checkbox" name="purchase_factors" value="Delivery price" class="purchase-factors">
			                    <span class="checkbox-checkmark"></span>
			                </label>
			                <label class="container-checkbox">Exclusive to house of Fraser products
			                    <input type="checkbox" name="purchase_factors" value="Exclusive to house of Fraser products" class="purchase-factors">
			                    <span class="checkbox-checkmark"></span>
			                </label>
			            </div>
			            <div class="survey-pagination">
			                <button class="servey-step-previous servey-step-two-previous">Previous</button>
			                <button class="servey-step-next servey-step-two-next" id="servey-step-two-next">Next</button>
			            </div>
			        </div>
			        
			        
			        <div class="servey-step servey-step-three">
			            <div class="servey-progressbar">
			                <span class="bg-pink"></span>
			                <span class="bg-pink"></span>
			                <span class="bg-pink"></span>
			                <span></span>
			            </div>
			            <div class="servey-step-title">
			                <h4>What was the main reason for buying the items that you did today?</h4>
			            </div>
			            <div class="servey-options" id="step-three-radio">
			                <label class="label-container">Replacing old favourites
			                    <input type="radio" name="buying_reason" value="Replacing old favourites">
			                    <span class="checkmark"></span>
			                  </label>
			                <label class="label-container">Changed size
			                    <input type="radio" name="buying_reason" value="Changed size">
			                    <span class="checkmark"></span>
			                  </label>
			                  <label class="label-container">Gifting
			                    <input type="radio" name="buying_reason" value="Gifting">
			                    <span class="checkmark"></span>
			                  </label>
			                  <label class="label-container">Treating myself ( no real reason)
			                    <input type="radio" name="buying_reason" value="Treating myself ( no real reason)">
			                    <span class="checkmark"></span>
			                  </label>
			                  <label class="label-container">Other please specify
			                    <input type="radio" name="buying_reason" value="Other please specify">
			                    <span class="checkmark"></span>
			                  </label>
			            </div>
			            <div class="survey-pagination">
			                <button class="servey-step-previous servey-step-three-previous">Previous</button>
			                <button class="servey-step-next servey-step-three-next"id="servey-step-three-next">Next</button>
			            </div>
			        </div>
        
        
        
			        <div class="servey-step servey-step-four">
			            <div class="servey-progressbar">
			                <span class="bg-pink"></span>
			                <span class="bg-pink"></span>
			                <span class="bg-pink"></span>
			                <span class="bg-pink"></span>
			            </div>
			            <div class="servey-step-title">
			                <h4>Which of the following best describes the style you are shopping for today?</h4>
			            </div>
			            <div class="servey-options" id="step-four-radio">
			                  <label class="label-container">Forever wardrobe staples
			                    <input type="radio" name="buying_purpose" value="Forever wardrobe staples">
			                    <span class="checkmark"></span>
			                  </label>
			                  <label class="label-container">Streetwear
			                    <input type="radio" name="buying_purpose" value="Streetwear">
			                    <span class="checkmark"></span>
			                  </label>
			                  <label class="label-container">Formal wear
			                    <input type="radio" name="buying_purpose" value="Formal wear">
			                    <span class="checkmark"></span>
			                  </label>
			                  <label class="label-container">Chic
			                    <input type="radio" name="buying_purpose" value="Chic">
			                    <span class="checkmark"></span>
			                  </label>
			                  <label class="label-container">Smart Casual
			                    <input type="radio" name="buying_purpose" value="Smart Casual">
			                    <span class="checkmark"></span>
			                  </label>
			                  <label class="label-container">Sport / fitness /activities
			                    <input type="radio" name="buying_purpose" value="Sport / fitness /activities">
			                    <span class="checkmark"></span>
			                  </label>
			                  <label class="label-container">New Season trends
			                    <input type="radio" name="buying_purpose" value="New Season trends">
			                    <span class="checkmark"></span>
			                  </label>
			                  <label class="label-container">Basics
			                    <input type="radio" name="buying_purpose" value="Basics">
			                    <span class="checkmark"></span>
			                  </label>
			                  <label class="label-container">On trend
			                    <input type="radio" name="buying_purpose" value="On trend">
			                    <span class="checkmark"></span>
			                  </label>
			            </div>
			            <div class="survey-pagination">
			                <button class="servey-step-previous servey-step-four-previous">Previous</button>
			                <button class="servey-step-next servey-step-four-next" id="servey-step-four-next">Next</button>
			            </div>
			        </div>
			        
			        
			        <div class="servey-step servey-step-five">
			            <div class="success-circle"><span></span></div>
			            <div class="servey-step-title">
			                <h4>Thank you for your feedback!</h4>
			            </div>
			            <div class="servey-step-five-go-to-home">
			                <a href="https://www.houseoffraser.co.uk/">Go to home page</a>
			            </div>
			        </div>
			        
			        
			        
			    </div>
			</div>
		`;

      var d2 = document.querySelector('div.container-fluid.ContentWrapper');
      d2.insertAdjacentHTML('beforebegin', step_content);

      const getRadioValue = (name) => {
        const radios = document.getElementsByName(name);
        let val;
        Object.keys(radios).forEach((obj, i) => {
          if (radios[i].checked) {
            val = radios[i].value;

            if (val != '') {
              radios[i].closest('.servey-options').nextElementSibling.children[1].style.opacity = '1';
              radios[i].closest('.servey-options').nextElementSibling.children[1].style.pointerEvents = 'inherit';
            }
          }
        });
        return val;
      };

      document.getElementById('step-one-radio').addEventListener('change', (e) => {
        getRadioValue('shop_for');
      });

      const getRadioValue2 = (name) => {
        const radios = document.getElementsByName(name);
        let val;
        Object.keys(radios).forEach((obj, i) => {
          if (radios[i].checked) {
            if (val != '') {
              radios[i].closest('.servey-options').nextElementSibling.children[1].style.opacity = '1';
              radios[i].closest('.servey-options').nextElementSibling.children[1].style.pointerEvents = 'inherit';
            }
          } else {
            if (document.querySelectorAll("input[name='purchase_factors']:checked").length === 0) {
              document.getElementById('servey-step-two-next').style.opacity = '.5';
              document.getElementById('servey-step-two-next').style.pointerEvents = 'none';
            }
          }
        });
        return val;
      };

      document.getElementById('step-two-checkbox').addEventListener('change', (e) => {
        getRadioValue2('purchase_factors');
      });

      document.getElementById('step-three-radio').addEventListener('change', (e) => {
        getRadioValue('buying_reason');
      });

      document.getElementById('step-four-radio').addEventListener('change', (e) => {
        getRadioValue('buying_purpose');
      });

      var checks = document.querySelectorAll('.purchase-factors');
      var max = 3;
      for (var i = 0; i < checks.length; i++) checks[i].onclick = selectiveCheck;
      function selectiveCheck(event) {
        var checkedChecks = document.querySelectorAll('.purchase-factors:checked');
        if (checkedChecks.length >= max + 1) {
          return false;
        }
      }

      var next = document.getElementsByClassName('servey-step-next');

      var nextShow = function () {
        this.closest('.servey-step').classList.remove('show');
        this.closest('.servey-step').nextElementSibling.classList.add('show');
      };

      for (var i = 0; i < next.length; i++) {
        next[i].addEventListener('click', nextShow, false);
      }

      var previous = document.getElementsByClassName('servey-step-previous');

      var previousShow = function () {
        this.closest('.servey-step').classList.remove('show');
        this.closest('.servey-step').previousElementSibling.classList.add('show');
      };

      for (var i = 0; i < previous.length; i++) {
        previous[i].addEventListener('click', previousShow, false);
      }

      document.getElementById('servey-step-four-next').addEventListener('click', (e) => {
        var step_1value = document.querySelector('input[name="shop_for"]:checked').value;

        var checkboxes = document.getElementsByName('purchase_factors');
        var step_2value = '';
        for (var i = 0, n = checkboxes.length; i < n; i++) {
          if (checkboxes[i].checked) {
            step_2value += ', ' + checkboxes[i].value;
          }
        }
        if (step_2value) step_2value = step_2value.substring(1);

        var step_3value = document.querySelector('input[name="buying_reason"]:checked').value;
        var step_4value = document.querySelector('input[name="buying_purpose"]:checked').value;

        fireEvent(
          `Who did you shop for? Ans:${step_1value},` +
            `What factors contributed the most to your decision to purchase today? Ans:${step_2value},` +
            `What was the main reason for buying the items that you did today? Ans:${step_3value},` +
            `Which of the following best describes the style you are shopping for today? Ans:${step_4value}`
        );
      });
    },
  };

  (function isPollFnBrainlab() {
    if (document.querySelector('body .ContentWrapper')) {
      try {
        isEchoVarBrainlab.init();
      } catch (e) {
        console.log(e);
      }
    } else {
      setTimeout(isPollFnBrainlab, 25);
    }
  })();
};
