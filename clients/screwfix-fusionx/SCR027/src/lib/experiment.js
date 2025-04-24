import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import deliveryBanner from './components/deliveryBanner';
import obsIntersection from './helpers/obsIntersection';

const { ID, VARIATION } = shared;

export default () => {
  setup(); //use if needed
  //fireEvent('Conditions Met'); //use if needed
  console.log("SCR027 Running...");
  //-----------------------------
  //If control, bail out from here
  //-----------------------------
  //if (VARIATION === 'control') {
  //}

  //-----------------------------
  //Write experiment code here
  //-----------------------------
  //...
  const isMobile = window.matchMedia('(max-width: 640px)').matches;
  
  document.querySelectorAll(`[data-qaid="pdp_sticky_product_footer"] p`)[0].classList.add(`${ID}__hide`);
  const anchorElem = isMobile ? document.querySelector(`[data-qaid="pdp-price"]`) : document.querySelectorAll(`[data-qaid="pdp_sticky_product_footer"] p`)[0];
  
  isMobile ? anchorElem.classList.add(`${ID}__custom_width`) : ""
  
  

  if (document.querySelector(`.${ID}__deliverybanner`)) return;
  if (VARIATION !== 'control') {
    anchorElem.insertAdjacentHTML('afterend', deliveryBanner(ID));
  }

  const intersectionCallback = (entry) => {
    //console.log(entry);
    if (entry.isIntersecting && !document.querySelector(`.${ID}__seen`)) {
      entry.target.classList.add(`${ID}__seen`);
      fireEvent('Conditions Met');
      fireEvent('Customer scrolls to the price on PDP');
      //console.log('Conditions Met');
    }
  };

  obsIntersection(anchorElem, 0.3, intersectionCallback);

  if (VARIATION === 'control') {
    return;
  }
  document.querySelector(`.${ID}__deliverybanner a`).addEventListener('click', () => {
    fireEvent('Customer clicks “learn more”');
  });
};
