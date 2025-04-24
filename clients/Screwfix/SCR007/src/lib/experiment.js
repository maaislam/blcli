/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { pollerLite } from '../../../../../lib/utils';
import specItems from './components/specItems';
import uspCards from './components/uspCards';
import { isShoweringCategory, obsIntersection } from './utils';

const { ID, VARIATION } = shared;

export default () => {
  if (!isShoweringCategory()) return;

  setup();

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...
  document.body.addEventListener('click', ({ target }) => {
    if (target.closest('#product_add_to_trolley_image') || target.closest('.delivery-btn-col')) {
      fireEvent('user clicked Delivery');
    } else if (target.closest('[id^="add_for_collection_button"]') || target.closest('.collect-btn-col')) {
      fireEvent('user clicked Collection');
    } else if (target.closest(`.${ID}__specanchor`)) {
      fireEvent('User clicks the “View all specifications” CTA');
      // Gazi
      if (VARIATION != `control`) document.getElementById(`product_specification_more_ref`)?.click();
    }
  });

  const v2Callback = (entry) => {
    //console.log('1', entry);
    const { isIntersecting, target } = entry;
    if (isIntersecting && !document.querySelector(`.${ID}__seen-var`)) {
      target.classList.add(`${ID}__seen-var`);
      fireEvent('Conditions Met');
    }
  };
  const titleIntersection = (entry) => {
    //console.log('2', entry);
    const { isIntersecting, target, boundingClientRect } = entry;
    if (!isIntersecting && !document.querySelector(`.${ID}__seen-title`) && boundingClientRect.top < 0) {
      target.classList.add(`${ID}__seen-title`);
      fireEvent('Customer scrolls below the product title');
    }
  };

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  const titleIntersectionPoint = VARIATION !== '2' ? document.querySelector('#pr__media') : document.querySelector('.pr__prices');
  const titleIntersectRatio = VARIATION !== '2' ? 0 : 0.3;
  obsIntersection(titleIntersectionPoint, titleIntersectRatio, titleIntersection);
  if (VARIATION == 'control') {
    fireEvent('Conditions Met');
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  //collect data
  const specList = [...document.querySelectorAll('#product_specification_list>li')];
  const uspContents = [];
  specList.forEach((item) => {
    const validSubStrings = ['Suitable for', 'Delivers', 'Guarantee'];
    const isValid = validSubStrings.some((string) => item.innerText.includes(string));

    if (isValid || VARIATION === '2') {
      item.classList.add(`${ID}__hide`);
      uspContents.push(item.innerText);
    }
  });

  //console.log(uspContents);

  //render usps
  const uspAnchor = document.getElementById('BVQASummaryContainer');

  const usps = VARIATION === '2' ? specItems(ID, uspContents) : uspCards(ID, uspContents);

  uspAnchor.insertAdjacentHTML('afterend', usps);
  // fireEvent("Conditions Met");
  document.getElementById('product_specification_more').classList.add(`${ID}__hide`);

  const conditionMetAnchor =
    VARIATION !== '2' ? document.querySelector(`.${ID}__specscontainer`) : document.querySelector(`.${ID}__specitemscontainer`);

  obsIntersection(conditionMetAnchor, 0.5, v2Callback);
  //obsIntersection(titleIntersectionPoint, titleIntersectRatio, titleIntersection);

  if (VARIATION !== '2') {
    return;
  }

  const elemSelectors = ['.pr__product__logo', '#product_description', '#BVRRSummaryContainer', '#BVQASummaryContainer'];

  //clone divs that need moving

  pollerLite(elemSelectors, () => {
    setTimeout(() => {
      elemSelectors.forEach((item) => {
        const anchor = document.querySelector('.pr__pricepoint');
        const itemElm = document.querySelector(item);
        const clonedItem = itemElm.cloneNode(true);
        //if (itemElm?.getAttribute(`id`)?.includes(`product_description`)) clonedItem?.classList.add(`${ID}-product_description`);
        itemElm.classList.add(`${ID}__hide`);
        anchor.insertAdjacentElement('beforebegin', clonedItem);
      });
    }, 2000);
  });
};
