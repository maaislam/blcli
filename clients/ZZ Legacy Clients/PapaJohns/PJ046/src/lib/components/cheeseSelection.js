import { events, scrollTo } from '../../../../../../lib/utils';
import { pollerLite, observer } from '../../../../../../lib/uc-lib';

export default () => {
  const cheeseSelectionContainer = `
  <div class='PJ046-extraCheese noCheese'>
    <div class='PJ046-cheeseImage'></div>
    <div class='PJ046-cheeseDescription'>
      <div class='cheeseTitle'>No Cheese</div>
      <div class='cheeseText'>Our pizzas come with cheese as standard, however if you'd like to remove all cheese, please select this option</div>
    </div>
    <div class='PJ046-cheeseBtn'>
      <div class='removeBtn active'>Remove</div>
    </div>
  </div>
  <div class='PJ046-extraCheese extraCheese'>
    <div class='PJ046-cheeseImage'></div>
    <div class='PJ046-cheeseDescription'>
      <div class='cheeseTitle'>Extra Cheese</div>
      <div class='cheeseText'>This pizza already comes with cheese as standard, however you can add a single or double portion of extra cheese</div>
    </div>
    <div class='PJ046-cheeseBtn'>
      <div class='singleBtn'>Single</div>
      <div class='doubleBtn'>Double</div>
    </div>
  </div>`;

  pollerLite(['.PJ046-cheese'], () => {
    document.querySelector('.PJ046-cheese').insertAdjacentHTML('afterend', cheeseSelectionContainer);
  });

  /* On click of cheese option */
  const selectCheese = () => {
    const sizeHeading = document.querySelector('.PJ046-size_section h3');
    const cheeseSection = document.querySelector('.PJ046-cheese_section');
    const cheeseOptionsButtons = cheeseSection.querySelectorAll('.PJ046-cheeseBtn div');
    const removeCheeseContainer = cheeseSection.querySelector('.PJ046-extraCheese.noCheese');
    const removeCheeseBtn = cheeseSection.querySelector('.noCheese .PJ046-cheeseBtn .removeBtn');
    const toppingsHeading = document.querySelector('.PJ046-toppings_section h3');
    const toppingsHeadingOnPage = toppingsHeading.getBoundingClientRect().y + window.scrollY;
    const sizeHeadingOnPage = sizeHeading.getBoundingClientRect().y + window.scrollY;

    // Extra Cheese Options
    for (let index = 0; index < cheeseOptionsButtons.length; index += 1) {
      const element = cheeseOptionsButtons[index];
      element.addEventListener('click', (e) => {
        events.send('PJ046', 'cheese-option-clicked');

        const isAlreadyActive = e.currentTarget.classList.contains('PJ046-cheese_active');

        // remove active if any are
        [].forEach.call(cheeseOptionsButtons, (item) => {
          item.classList.remove('PJ046-cheese_active');
        });

        if(!isAlreadyActive) {
          // make current active
          e.currentTarget.classList.add('PJ046-cheese_active');
        }
        function updateRemoveAllCheeseBtnText() {
          if (removeCheeseBtn) {
            if (removeCheeseBtn.innerText !== 'Remove') {
              removeCheeseBtn.innerText = 'Remove';
              removeCheeseBtn.classList.add('active');
            }
          }
        }
        const portionSelected = e.currentTarget.innerText;
        if (portionSelected === 'Single') {
          window.__doPostBack('ctl00_cphBody__objCustomise__rptCheeseOptions_ctl00_lbSingle'.replace(/_/g, '$').replace(/\$\$/g, '$_'), '');
          updateRemoveAllCheeseBtnText();
        } else if (portionSelected === 'Double') {
          window.__doPostBack('ctl00_cphBody__objCustomise__rptCheeseOptions_ctl00_lbDouble'.replace(/_/g, '$').replace(/\$\$/g, '$_'), '');
          updateRemoveAllCheeseBtnText();
        }

        // no cheese option - deselect, if selected
        const noCheeseSelected = document.querySelector('.PJ046-cheeseBtn .removeBtn');
      });
    }
    // window.__doPostBack(buttonToClick.id.replace(/_/g, '$').replace(/\$\$/g, '$_'), '');
    
    const noCheeseOptionContainer = `<div id="ctl00_cphBody__objCustomise_pnlCheeseRemove" class="errorMessage removeCheeseCustomise">
        <p>All cheese will be removed from your pizza.</p>
    </div>`;


    // No Cheese Option - Select
    removeCheeseBtn.addEventListener('click', (e) => {
      events.send('PJ046', 'remove-cheese-clicked');
      /**
       * @desc Here No Cheese Selection is being selected and added as message on Order Summary
       */
      
      // Hide Remove 
      if (removeCheeseBtn.classList.contains('active')) {
        const hiddenSummaryToppings = document.querySelectorAll('.customiseBox span.ingredient');
        // Check toppings selected 
        // If toppings less than one (excluding Cheese topping), then show Error Message
        let minimumToppingNumber = true;
        [].forEach.call(hiddenSummaryToppings, (topping) => {
          const toppingName = topping.innerText.trim();
          if (toppingName !== 'Cheese Delete') {
            minimumToppingNumber = false;
          }
        });
        if (!minimumToppingNumber) {
          // removeCheeseBtn.classList.remove('active');
          // removeCheeseBtn.innerText = 'I want cheese';
          // document.querySelector('.noCheese').classList.add('PJ046-cheese_active');
          window.__doPostBack('ctl00_cphBody__objCustomise__rptCheeseOptions_ctl01_lbRemoveCheese'.replace(/_/g, '$').replace(/\$\$/g, '$_'), '');

          [].forEach.call(cheeseOptionsButtons, (item) => {
            item.classList.remove('PJ046-cheese_active');
          });
        } else {
          const minimumToppingsErrorContainer = `<div id="ctl00_cphBody__objCustomise_pnlTooFewToppingError" class="errorMessage">
            <p>You must have at least one topping selected</p>
          </div>`;
          document.querySelector('div.PJ046-characteristics__wrapper ul').insertAdjacentHTML('beforeend', minimumToppingsErrorContainer);
        }
        window.__doPostBack('ctl00_cphBody__objCustomise__rptCheeseOptions_ctl01_lbRemoveCheese'.replace(/_/g, '$').replace(/\$\$/g, '$_'), '');

      } else {
        window.__doPostBack('ctl00_cphBody__objCustomise__rptCheeseOptions_ctl01_lbRemoveCheese'.replace(/_/g, '$').replace(/\$\$/g, '$_'), '');
        removeCheeseBtn.classList.add('active');
        removeCheeseBtn.innerText = 'Remove';
      }
    });
  };

  selectCheese();
};

