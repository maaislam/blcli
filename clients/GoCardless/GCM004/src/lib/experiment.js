//import { setup, fireEvent } from '../../../../../../globalUtil/trackings/services';
import clickHandler from './clickHandler';
import calcBanner from './components/calcBanner';
import observeDOM from './helpers/observeDOM';
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION } = shared;

const init = () => {
  setup();
  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  // const calculatorUrl = 'https://gocardless102.outgrow.us/valuecalculator/';
  const newCalcUrl = 'https://gocardless102.outgrow.us/cost-of-churn-cro';

  const anchorElem = document.querySelectorAll(`.css-95l7bd`)[1];

  const controlCalc = document.querySelector(`a.css-sk7pc7`).closest('.css-95l7bd');
  controlCalc.classList.add(`${ID}__hide`);

  //remove and render
  document.querySelector(`.${ID}__calcbanner`)?.remove();
  anchorElem.insertAdjacentHTML('beforebegin', calcBanner(ID, newCalcUrl));
};

export default () => {
  setup();
  fireEvent('Conditions Met');
  clickHandler(ID, fireEvent, VARIATION);
  if (VARIATION == 'control') {
    return;
  }
  const mutationCallback = (mutation) => {
    const { addedNodes, removedNodes } = mutation;
    const modifiedNodes = [...addedNodes, ...removedNodes];
    if (modifiedNodes.some((node) => node.nodeType == 1 && node.matches(`.${ID}__calcbanner`))) {
      return;
    }
    setTimeout(init, 1000);
  };
  observeDOM('#___gatsby', mutationCallback);
};
