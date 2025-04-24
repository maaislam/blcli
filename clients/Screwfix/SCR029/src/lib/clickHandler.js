import { fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { ID } = shared;

export const clickHandler = (event) => {
  const { target } = event;
  //console.log(target, "target")
  if (target.closest(`.${ID}__banner_img`)) {
    const targetParent = target.closest(`.${ID}__banner_img`);
    const brandClicked = targetParent.querySelector(`.${ID}__img_title`).textContent;
    fireEvent(`User interacts with brand quicklinks | ${brandClicked}`);
  } else if (target.closest('form[role="search"]')) {
    //console.log(`User interacts with search`);
    fireEvent(`User interacts with search`);
  } else if (target.closest('[data-qaid^="category-list-option"]')) {
    const targetParent = target.closest('[data-qaid^="category-list-option"]');
    const brand = targetParent.querySelector('[data-qaid="category-name"]').childNodes[0].textContent;
    if (brand) {
      //console.log(`User interacts with brand filters : ${brand}`);
      fireEvent(`User interacts with categories : ${brand}`);
    }
  } else if (target.closest('[data-qaid="filter-simple-options-list"]') && target.closest('li')) {
    const targetParent = target.closest('li');
    const brand =
      window.innerWidth > 640
        ? targetParent.querySelector('input').value
        : targetParent.querySelector('[data-qaid="filter-simple-option-name"]').childNodes[0].textContent;
    //console.log(navigation, "navigation")
    //console.log(menu, "menu")
    if (brand && !targetParent.querySelector('input').checked) {
      //console.log(`User interacts with navigation : ${navigation}`);
      fireEvent(`User interacts with brand filter : ${brand}`);
    }
  }
};
