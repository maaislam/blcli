import shared from '../../../../../../core-files/shared';
import { closeIconRegular } from '../assets/svg';
import button from '../components/button';
import close from '../components/close';
import productCards from '../components/productCards';
import initSwiper from './initSwiper';
import removePlpChanges from './removePlpChanges';
import { getCompareList } from './utils';

const { ID, VARIATION } = shared;

const addBorder = () => {
  const compareCheckBoxes = document.querySelectorAll('[data-qaid="option-name"]');
  compareCheckBoxes.forEach((compareCheckBox) => {
    compareCheckBox.parentElement.parentElement.classList.add(`${ID}__add-border`);
  });
};
export const renderPlpChanges = () => {
  const { pageType } = window.blDataLayer;

  if (pageType !== 'plp' || !document.querySelector('[data-qaid="button-click-and-collect"]')) {
    removePlpChanges();
    return;
  }

  addBorder();
  if (VARIATION !== '2') return;
  //get compare list
  getCompareList().then((compareList) => {
    //console.log('compareList:', compareList);
    if (compareList.length < 2) {
      //remove or hide existing compare list
      removePlpChanges();
      return;
    }
    //render compare list

    const anchorPoint = document.body;

    const htmlStr = `<div class='${ID}__recommendations'>
        <div class="inner-wrapper">
          ${close(ID, closeIconRegular, 'close', `${ID}__recommendationsClose`)}
          <div class='${ID}__recommendations-content'>
            <div class='${ID}__productSection'>
              ${productCards(ID, compareList)}
            </div>
            <div class='${ID}__buttonGroup'>
              ${button(ID, `Compare ${compareList.length} products`, 'primary', 'compare-all')}
              ${button(ID, 'Clear all', 'secondary', 'clear-all')}
            </div>
          </div>
        </div>
      </div>`;
    removePlpChanges();
    anchorPoint.insertAdjacentHTML('beforeend', htmlStr);
    //init slider
    initSwiper(`.${ID}__productCards`);
  });
};
