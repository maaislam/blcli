/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import cards from './components/Cards';
import { catCardData } from './data';
import obsIntersection from './helper/observeIntersection';
import { getCategoryId } from './utils';

const { ID, VARIATION } = shared;

export default () => {
  setup();

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  const renderData = catCardData.filter((item) => !item.id.includes(getCategoryId()));
  console.log(`BL test ${ID} render data`, renderData);
  if (renderData.length === 0 || renderData.length === 5) return;

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    fireEvent('Conditions Met');
    return;
  }
  const anchorElm = document.querySelector('main > .wrp');

  anchorElm.insertAdjacentHTML('afterend', cards(ID, renderData));

  const intersectionCallback = (entry) => {
    if (entry.isIntersecting && !document.querySelector(`.${ID}__seen`)) {
      entry.target.classList.add(`${ID}__seen`);
      // console.log('Conditions Met');
      fireEvent('Conditions Met', shared);
    }
  };
  const relatedCategory = document.querySelector(`.${ID}__relatedcategory`);
  obsIntersection(relatedCategory, 0.5, intersectionCallback);

  document.querySelector(`.${ID}__categorycards`).addEventListener('click', ({ target }) => {
    const pageCategory = catCardData.filter((item) => item.id.includes(getCategoryId()))[0];
    if (target.closest(`a.${ID}__categorycard`)) {
      const cardClicked = target.closest(`a.${ID}__categorycard`);

      fireEvent(`User clicks on category tile - ${cardClicked.dataset.category} | ${pageCategory.category} `);
    }
  });
};

// https://www.screwfix.com/c/bathrooms-kitchens/shower-valves/cat820336
// https://www.screwfix.com/c/bathrooms-kitchens/shower-heads/cat820278
// https://www.screwfix.com/c/bathrooms-kitchens/shower-kits-riser-rails/cat820282
// https://www.screwfix.com/c/bathrooms-kitchens/bathroom-taps/cat7310006
// https://www.screwfix.com/c/bathrooms-kitchens/bathroom-tap-sets/cat14640002
