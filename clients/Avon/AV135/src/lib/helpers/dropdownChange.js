import { fireEvent } from '../../../../../../core-files/services';
import shared from '../../../../../../core-files/shared';

const { ID } = shared;
const dropdownChange = (action = 'toggle') => {
  //console.log('dp test 01');
  //console.log(`dp test ${action}`);
  const dropdown = document.querySelector(`.${ID}__variants-container`);
  const dpName = document.querySelector(`.${ID}__variants-dp--title .name`);
  const dpArrow = document.querySelector(`.${ID}__variants-dp--title .arrow`);
  const overlay = document.getElementById(`${ID}__overlay`);

  fireEvent('User interacts with variant selector');
  if (action === 'close') {
    //console.log('dp test 02');
    dropdown.classList.add(`${ID}__hide`);
    dpArrow.classList.remove(`up`);

    overlay.classList.remove('active');
    const currentSel = document.querySelector(`.${ID}__variants-dp`).dataset.selected;
    if (dropdown.classList.contains(`${ID}__hide`)) {
      //console.log('dp test 03');
      dpName.innerHTML = currentSel;
    }
    return;
  }

  dropdown.classList.toggle(`${ID}__hide`);
  dpArrow.classList.toggle(`up`);
  overlay.classList.toggle('active');
  const currentSel = document.querySelector(`.${ID}__variants-dp`).dataset.selected;

  if (dropdown.classList.contains(`${ID}__hide`)) {
    //console.log('dp test 04');
    dpName.innerHTML = currentSel;
  } else {
    //console.log('dp test 05');
    dpName.innerHTML = 'Select Option';
    const outofStock = document.querySelector(`.${ID}__variants-dp`).dataset.stock === 'false';

    if (outofStock && !document.body.classList.contains(`${ID}__out-of-stock--seen`)) {
      //console.log('dp test 06');
      document.body.classList.add(`${ID}__out-of-stock--seen`);
      fireEvent('User sees an out of stock message');
    }
  }
};

export default dropdownChange;
