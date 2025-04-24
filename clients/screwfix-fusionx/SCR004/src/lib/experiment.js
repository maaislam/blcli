import shared from '../../../../../core-files/shared';
import { setup, fireEvent } from '../../../../../core-files/services';
import productBanner from './components/productBanner';
import obsIntersection from './helpers/obsIntersection';

const { ID, VARIATION } = shared;

const init = () => {
  //-----------------------------
  //Write experiment code here
  //-----------------------------
  //...
  if (document.querySelector(`.${ID}__productbanner`)) {
    return;
  }

  //replace with fireEvent

  const anchorElem = document.querySelector('[data-qaid="product-tile"]').parentElement;
  anchorElem.insertAdjacentHTML('afterend', productBanner(ID));
};

export default () => {
  setup(); //use if needed
  //fireEvent('Experiment Loaded'); //use if needed
  console.log(ID);

  document.body.addEventListener('click', ({ target }) => {
    if (target.closest(`.${ID}__productbanner--col3 a`)) {
      //replace with fireEvent
      fireEvent('user clicked on view product button');
    }
  });
  const intersectionAnchor = document.querySelector('[data-qaid="pdp-tabs"]');
  const intersectionCallback = (entry) => {
    if (entry.isIntersecting && !document.querySelector(`.${ID}__seen`)) {
      entry.target.classList.add(`${ID}__seen`);
      //replace with fireEvent
      fireEvent('Conditions Met');
      fireEvent('User saw product banner');
    }
  };
  obsIntersection(intersectionAnchor, 0.3, intersectionCallback);
  //-----------------------------
  //If control, bail out from here
  //-----------------------------
  if (VARIATION === 'control') {
    return;
  }

  init();
};
