import {
  fullStory,
  events
} from '../../../../../lib/utils';
import settings from './settings';
events.analyticsReference = '_gaUAT';
const {
  ID,
  VARIATION
} = settings;

/**
 * Standard experiment setup
 */
function setup() {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
}

const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop;
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, c - c / 8);
  }
};

function initInvasion() {
  const popUp = document.querySelectorAll(`.${ID}_cartPopUp .${ID}_button`);
  const carousel = document.querySelectorAll(`.${ID}_carousel .${ID}_carousel__itemWrap`);
  const CTAs = document.querySelectorAll(`.${ID}_ctas .${ID}_button`);
  Array.prototype.forEach.call(popUp, function(popUpButton){
    popUpButton.addEventListener('click', function(e){
      e.preventDefault();
      if(e.target.id === 'viewBag'){
        document.querySelector('#aViewBag').click();
      } else {
        document.querySelector('#aCheckout').click();
        localStorage.removeItem('addToCartCounter');
      }
      const buttonType = e.target.textContent;
      events.send(settings.ID, 'Clicked on', buttonType);
    });
  });
  Array.prototype.forEach.call(carousel, function(carouselItem){
    carouselItem.addEventListener('click', function(e){
      events.send(settings.ID, 'Clicked on', 'product recommendations');
    });
  });
  Array.prototype.forEach.call(CTAs, function(CTA){
    CTA.addEventListener('click', function(e){
      const catName = e.target.textContent;
      events.send(settings.ID, 'Clicked on', `shop ${catName} call to action `);
    });
  });
}
export {
  setup,
  initInvasion,
  scrollToTop
}; // eslint-disable-line
