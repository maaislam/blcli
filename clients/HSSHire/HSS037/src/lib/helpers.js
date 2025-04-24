import { fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export const addMostPopularTag = (allPrices, data, newBlock) => {
  let parentContainer = null;
  for (let i = 0; i < allPrices.length; i += 1) {
    const priceBlock = allPrices[i];

    if (priceBlock.querySelector(`.HSS031-text strong`)) {
      let blockText = priceBlock.querySelector(`.HSS031-text strong`).innerText.trim().toLowerCase();

      if (VARIATION == '1') {
        if (blockText.toLowerCase() == data.replace.toLowerCase()) {
          parentContainer = priceBlock.closest('.price-row');
  
          priceBlock.classList.add('replace-this');
          if (!parentContainer.querySelector(`.price-blk.${ID}-most-popular`)) {
            priceBlock.insertAdjacentHTML('afterend', newBlock);
          }
          clickShowTooltip(parentContainer);
          break;
        } else if (blockText.toLowerCase() == data.highlight.toLowerCase()) {
          parentContainer = priceBlock.closest('.price-row');

          priceBlock.classList.add('highlight-this');
          priceBlock.classList.add(`${ID}-most-popular`);
          let banner = `<div class="banner">
            <div>Most Popular <span class="tooltiptext">Average hire time based on ${data.number_of_customers_hired} customers who hired this product.</span></div>
          </div>`
          priceBlock.insertAdjacentHTML('afterbegin', banner);
          clickShowTooltip(parentContainer);
          break;
        } else if (data.replace.toLowerCase() == "" && data.highlight.toLowerCase() == "") {
          parentContainer = priceBlock.closest('.price-row');

          let banner = `<div class="banner">
            <div>Most Popular <span class="tooltiptext">Average hire time based on ${data.number_of_customers_hired} customers who hired this product.</span></div>
          </div>`;
          if (!parentContainer.querySelector(`.${ID}-most-popular`)) {
            parentContainer.insertAdjacentHTML('beforeend', newBlock);
          }
          
          clickShowTooltip(parentContainer);
          break;
        }
      }
    }
    if (VARIATION == '1' || (VARIATION == '2' && data.v2 == true)) {
      if (priceBlock && priceBlock.getAttribute('style') && priceBlock.getAttribute('style').indexOf('none') > -1) {
        if (priceBlock && priceBlock.parentElement) {
          priceBlock.parentElement.removeChild(priceBlock);
        }
      }
    }
  }

  if (VARIATION == '2' && data.v2 == true) {
    parentContainer = allPrices[0].closest('.price-row');
    if (!parentContainer.querySelector(`.price-blk.${ID}-most-popular`)) {
      parentContainer.insertAdjacentHTML('beforeend', newBlock);
    }
    
    clickShowTooltip(parentContainer);
    hoverOverTooltip(parentContainer);
  }
};

export const clickShowTooltip = (parentContainer) => {
  if (parentContainer.querySelector(`.${ID}-most-popular`) && parentContainer.querySelector(`.${ID}-most-popular .banner`)) {
    parentContainer.querySelector(`.${ID}-most-popular`).addEventListener('click', (e) => {
      parentContainer.querySelector(`.${ID}-most-popular .banner`).classList.add('active');
  
      fireEvent(`Click - Tooltip`);
      fireEvent(`Visible - Tooltip`);
  
      setTimeout(() => {
        parentContainer.querySelector(`.${ID}-most-popular .banner`).classList.remove('active');
      }, 3000);
    });
  }
};

export const hoverOverTooltip = (parentContainer) => {
  if (parentContainer.querySelector(`.${ID}-most-popular`) && parentContainer.querySelector(`.${ID}-most-popular .banner`)) {
    parentContainer.querySelector(`.${ID}-most-popular .banner`).addEventListener('mouseover', (e) => {
      fireEvent(`Conditions Met - Hover over Tooltip`);
      fireEvent(`Visible - Tooltip`);
  
    });
  }
};