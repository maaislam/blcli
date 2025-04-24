import { fireEvent } from '../../../../../../core-files/services';
import shared from '../../../../../../core-files/shared';

const { ID } = shared;
const dropdownChange = (action = 'toggle') => {
  const dropdown = document.querySelector(`.${ID}__variants-container`);
  const dpName = document.querySelector(`.${ID}__variants-dp--title .name`);
  const dpArrow = document.querySelector(`.${ID}__variants-dp--title .arrow`);
  fireEvent('User interacts with variant selector');
  if (action === 'close') {
    dropdown.classList.add(`${ID}__hide`);
    dpArrow.classList.remove(`up`);
    const currentSel = document.querySelector(`.${ID}__variants-dp`).dataset.selected;
    if (dropdown.classList.contains(`${ID}__hide`)) {
      dpName.innerHTML = currentSel;
    }
    return;
  }
  dropdown.classList.toggle(`${ID}__hide`);
  dpArrow.classList.toggle(`up`);
  const currentSel = document.querySelector(`.${ID}__variants-dp`).dataset.selected;
  if (dropdown.classList.contains(`${ID}__hide`)) {
    dpName.innerHTML = currentSel;
  } else {
    dpName.innerHTML = 'Select Option';
    const outofStock = document.querySelector(`.${ID}__variants-dp`).dataset.stock === 'false';
    if (outofStock && !document.body.classList.contains(`${ID}__out-of-stock--seen`)) {
      document.body.classList.add(`${ID}__out-of-stock--seen`);
      fireEvent('User sees an out of stock message');
    }
  }
};

export default dropdownChange;
