/**
 * SD003 - Set Delivery Expectations (1)
 * Dev: JT
 * @author User Conversion
 */
import { setup } from './services';
import settings from './settings';
import { cacheDom } from '../../../../../lib/cache-dom';
import { FL060 } from './FL060/index';
import { events } from '../../../../../lib/utils';
import { pollerLite } from '../../../../../lib/uc-lib';

events.analyticsReference = '_gaUAT';

const activate = () => {
  setup();
  const { VARIATION, ID } = settings;
  // Control = V4
  if (VARIATION == '4') {
    events.send(ID, 'Control');
    return false;
  } else {
    events.send(ID, `Variation ${VARIATION}`);
  }


  // run FL060
  FL060(VARIATION);

  // Main Delivery options
  pollerLite(['#DeliveryOptionsList .DeliveryOptionsItem'], () => {
    const delOptions = document.querySelectorAll('#DeliveryOptionsList .DeliveryOptionsItem label');
    for (let i = 0; delOptions.length > i; i += 1) {
      delOptions[i].addEventListener('click', () => {
        
        // Remove any active ticks
        const activeTicks = document.querySelectorAll('#DeliveryOptionsList .SD003-tick.SD003-tickActive');
        if (activeTicks.length) {
          for (let b = 0; activeTicks.length > b; b += 1) {
            activeTicks[b].classList.remove('SD003-tickActive');
          }
        }
      })
    }
  });

  // V2 = V1 + Make standard del default on page 3. Add prices as ‘+£X.xX for NDD’
  if (VARIATION == '2') {
    // Detect page 3.
    pollerLite(['#DeliveryOptionsList .DeliveryOptionsItem:first-of-type  label'], () => {
      const firstDelOption = document.querySelector('#DeliveryOptionsList .DeliveryOptionsItem:first-of-type  label');
      const contButton = document.querySelector('.CheckoutLeft .ProgressButContain .AddressContainBut.DeliveryContinueButton');
      if (firstDelOption) {
        firstDelOption.click();
        if (contButton) {
          contButton.style.display = 'block';
        }
      }
    });
      // Main Delivery options
      // pollerLite(['#DeliveryOptionsList .DeliveryOptionsItem'], () => {
      //   const delOptions = document.querySelectorAll('#DeliveryOptionsList .DeliveryOptionsItem label');
      //   for (let i = 0; delOptions.length > i; i += 1) {
      //     delOptions[i].addEventListener('click', () => {
            
      //       // Remove any active ticks
      //       const activeTicks = document.querySelectorAll('.SD003-tick.SD003-tickActive');
      //       if (activeTicks.length) {
      //         for (let b = 0; activeTicks.length > b; b += 1) {
      //           activeTicks[b].classList.remove('SD003-tickActive');
      //         }
      //       }
      //     })
      //   }
      // });
  }

  // V3 - V1 + Show Delivery cost in basket overview ‘Estimated delivery £4.99’. Once changes return text to ‘Delivery £X.xX’. Same as total. ‘Estimated total’ > ‘Total’. The targeting here needs to be on the /deliverychoices page only.
  if (VARIATION == '3' && window.location.href.indexOf('/deliverychoices') > -1) {
    const basket = document.querySelector('.CheckoutLeft');
    const delLabel = basket.querySelector('#ShippingRow #ShippingLabel');
    const delPrice = basket.querySelector('#ShippingRow #BasketSummaryShippingValue');
    const totalLabel = basket.querySelector('span[id*="_basketSummary_TotalLabel"]');
    const totalValue = basket.querySelector('.TotalSumm #TotalValue');

    const ogLabel = delLabel.textContent;
    const ogPrice = delPrice.textContent;
    const ogTotal = totalValue.textContent;

    totalLabel.textContent = 'Estimated Total';
    delLabel.textContent = 'Estimated Delivery';
    delPrice.textContent = '£4.99';

    // Add min delivery to estimated total cost value.
    const totalValueNum = parseFloat(totalValue.textContent.replace('£', ''));
    const totalEstimate = totalValueNum + 4.99;

    totalValue.textContent = `£${totalEstimate.toFixed(2)}`;

    // Main Delivery options
    pollerLite(['#DeliveryOptionsList .DeliveryOptionsItem'], () => {
      const delOptions = document.querySelectorAll('#DeliveryOptionsList .DeliveryOptionsItem label');
      for (let i = 0; delOptions.length > i; i += 1) {
        delOptions[i].addEventListener('click', () => {
          
          // // Remove any active ticks
          // const activeTicks = document.querySelectorAll('.SD003-tick.SD003-tickActive');
          // if (activeTicks.length) {
          //   for (let b = 0; activeTicks.length > b; b += 1) {
          //     activeTicks[b].classList.remove('SD003-tickActive');
          //   }
          // }


          delLabel.textContent = ogLabel;
          delPrice.textContent = ogPrice;
          totalLabel.textContent = 'Total';
          totalValue.textContent = ogTotal;
        })
      }
    });


    // Collection Choices
    pollerLite(['.CheckWrap .CollectionPointListItem'], () => {
      const delOptions = document.querySelectorAll('.CheckWrap .CollectionPointListItem');
      for (let i = 0; delOptions.length > i; i += 1) {
        delOptions[i].addEventListener('click', () => {
          delLabel.textContent = ogLabel;
          delPrice.textContent = ogPrice;
          totalLabel.textContent = 'Total';
          totalValue.textContent = ogTotal;
        })
      }
    });

    // Change Method Links
    pollerLite(['.changeDeliveryMethodButton'], () => {
      const changeMethodBtns = document.querySelectorAll('.changeDeliveryMethodButton');
      for (let i = 0; changeMethodBtns.length > i; i += 1) {
        changeMethodBtns[i].addEventListener('click', () => {
          totalLabel.textContent = 'Estimated Total';
          delLabel.textContent = 'Estimated Delivery';
          delPrice.textContent = '£4.99';

          totalValue.textContent = `£${totalEstimate.toFixed(2)}`;
        })
      }
    });

  }


};

export default activate;
