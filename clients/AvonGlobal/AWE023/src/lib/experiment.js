import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import progressBar from './component/progressBar';
import progressCalc from './helpers/progressCalc';

const { ID, VARIATION } = shared;
const renderUpdate = () => {
  setTimeout(() => {
    const subTotalText = document.querySelector('.Cart-SubTotal').textContent;
    const subTotalNumber = parseFloat(subTotalText.replace(/[^\d.,]/g, '').replace(',', '.'));

    progressCalc(ID, subTotalNumber);
  }, 1000);
};

const init = () => {
  const anchorPoint = document.querySelector('.CartHeader');

  if (document.querySelector(`.${ID}__basketUpsellSection`)) {
    document.querySelector(`.${ID}__basketUpsellSection`).remove();
  }
  anchorPoint.insertAdjacentHTML('beforebegin', progressBar(ID, '50,00'));

  renderUpdate();
};

export default () => {
  setup();

  fireEvent('Conditions Met');

  const basketTotal = document.querySelector('.Cart-SubTotal').textContent;
  fireEvent(`initial basket total', ${basketTotal}`);

  if (VARIATION == 'control') {
    return;
  }

  init();

  document.body.addEventListener('click', (e) => {
    const { target } = e;

    if (target.closest('.AG013-NEW_VI_updateLink.ng-scope') || target.closest('[ng-click^="UpdateCart"]')) {
      renderUpdate();
    } else if (target.closest('.QtyUp')) {
      fireEvent('User interacts with quantity up');
    } else if (target.closest('.QtyDown')) {
      fireEvent('User interacts with quantity down');
    } else if (target.closest('[ng-click^="CheckOutMobile"]')) {
      const basketTotal = document.querySelector('.Cart-SubTotal').textContent;
      fireEvent(`final basket total', ${basketTotal}`);
    }
  });
};
