import { fullStory } from '../../../../../lib/utils';
import settings from './settings';

const { ID, VARIATION } = settings;

/**
 * Standard experiment setup
 */
function setup() {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
}
function generateOfferBlock(type){
  const offerName = localStorage.getItem(`${ID}-offerSelected`).trim();
  const reg = /[+-]?\d+(\.\d+)?/g;
  const match = offerName.match(reg);
  let priceToReach;
  if(match.length === 1){
    priceToReach = match[0];
  } else {
    priceToReach = match[1];
  }
  const offer = document.createElement('div');
  if(type === 'pizza' || type === 'sides'){
    let curStore = window.location.pathname.split('/');
    curStore[3] = '';
    const curLink = curStore.join('/');
    offer.classList.add(`${ID}_offerWrap`);
    offer.innerHTML = `
      <div class="${ID}_offer__linkHolder">
        <div class="${ID}_offer__linkWrap">
          <a class="${ID}_offer__link" href="${curLink}/create-your-own.aspx" id="ctl00_cphBody__objMenuHeader_hypCYO" class="create_own" onclick="dataLayer.push({'event': 'GAevent', 'eventCategory': 'Menu', 'eventAction': 'CYO', 'eventLabel': ''});">
            <img src="https://dp8v87cz8a7qa.cloudfront.net/43831/5ca3e3a81cf281554244520.jpg" alt="">
          </a>
        </div>
        <!--end link-->
        <div class="${ID}_offer__linkWrap">
          <a class="${ID}_offer__link" href="${curLink}/half-and-half.aspx" id="ctl00_cphBody__objMenuHeader_hypHH" class="half_half" onclick="dataLayer.push({'event': 'GAevent', 'eventCategory': 'Menu', 'eventAction': 'HalfAndHalf', 'eventLabel': ''});">
            <img src="/images/2019assets/try_half_half.jpg" alt="">
          </a>
        </div>
        <!--end link-->
      </div>
      <div class="${ID}_offer">
        <div class="${ID}_offer__content">
          <div class="${ID}_offer__header">
            <h4 class="${ID}_offer__title">${offerName}</h4>
          </div>
          <!--End header-->
          <div class="${ID}_offer__body">
            <div class="${ID}_offer__sliderWrap">
              <h5 class="${ID}_offer__title"></h5>
              <span class="${ID}_offer__price">£0</span>
              <div class="${ID}_offer__slider">
                <span class="${ID}_offer__bar"></span>
              </div>
              <span class="${ID}_offer__price">£${priceToReach}</span>
            </div>
          </div>
          <!--End body-->
        </div>
      </div>
    `;
    if(window.outerWidth <= 768){
        document.querySelector('.main.mainMobileInside').insertAdjacentElement('afterbegin', offer);
    } else {
      if(document.querySelector('.PJ053-banner-desktop')){
        document.querySelector('.PJ053-banner-desktop').insertAdjacentElement('beforebegin', offer);
      } else if (document.querySelector('.PJMCont.padded')) {
        document.querySelector('.PJMCont.padded').insertAdjacentElement('beforebegin', offer);
      } else {
        document.querySelector('.main').insertAdjacentElement('afterbegin', offer);
      }
    }
  } else {
    let curStore = window.location.pathname.split('/');
    curStore[3] = '';
    const curLink = curStore.join('/') + '/pizzas.aspx';
    offer.classList.add(`${ID}_offerWrap`);
    offer.classList.add(`${ID}_offerWrap--error`);
    offer.innerHTML = `
      <div class="${ID}_offer">
        <div class="${ID}_offer__content">
          <div class="${ID}_offer__header">
            <h4 class="${ID}_offer__title">${offerName}</h4>
          </div>
          <!--End header-->
          <div class="${ID}_offer__body">
            <div class="${ID}_offer__sliderWrap">
              <div class="${ID}_offer__slider">
                <p>Sorry the offer you selected is applicable to <a href="${curLink}">Pizzas</a> only, but don't worry you can still add sides to your order.</p>
              </div>
            </div>
          </div>
          <!--End body-->
        </div>
      </div>
    `;
    document.querySelector('.main').insertAdjacentElement('afterbegin', offer);
    document.body.classList.add(`${ID}_errorBlock`);
  }
}
function modifycounter(outstanding) {
  /*
  * Since asp adds an inline style to the cart
  * when the page reload check if there's a style
  * then apply a class on the body to push the test down
  * to avoid the cart to be on top of it
  */
  if(document.querySelector('.basketNotification').getAttribute('style')){
    document.body.classList.add(`${ID}--cartActive`);
  } else {
    document.body.classList.remove(`${ID}--cartActive`);
  }
  /*
  * On every page reload triggered by asp
  * calculare the total and act based on how much
  * the user still need to spend
  */
  const offerName = localStorage.getItem(`${ID}-offerSelected`).trim();
  const reg = /[+-]?\d+(\.\d+)?/g;
  const match = offerName.match(reg);
  const total = parseFloat(document.querySelector('#hdnBasketValue').getAttribute('value').replace('£', ''));
  const target = document.querySelector(`.${ID}_offer__bar`);

  /**
   * @desc If basket messages do not exist on check
   * then hide loader
   */
  if (!document.querySelector('#ctl00__objHeader_trBasketMessageMobile') && !document.querySelector('#ctl00__objHeader_trBasketTotalMobile').previousElementSibling) {
    document.querySelector('.PJ074_offerWrap').setAttribute('style', 'display: none !important;');
  } 

  if(!outstanding || outstanding <= 0){
    target.setAttribute('style', 'width:100%;');
    target.parentElement.setAttribute('data-offer', '100');
    document.querySelector(`.${ID}_offer__sliderWrap .${ID}_offer__title`).textContent = 'Offer activated';
    document.querySelector(`.${ID}_offer__sliderWrap`).classList.add(`${ID}_offer__sliderWrap--completed`);
  } else if(total <= 0){
    if(total != 0) {
      document.querySelector(`.${ID}_offer__sliderWrap .${ID}_offer__title`).textContent = 'Offer activated';
    } else {
      const offerString = localStorage.getItem(`${ID}-offerSelected`).substr(0, 3);
      document.querySelector(`.${ID}_offer__sliderWrap .${ID}_offer__title`).innerHTML = `Spend <strong>£${(outstanding).toFixed(2)}</strong> to get <strong>${offerString}</strong> off`;
    }
    target.removeAttribute('style');
    target.parentElement.removeAttribute('data-offer');
    document.querySelector(`.${ID}_offer__sliderWrap`).classList.remove(`${ID}_offer__sliderWrap--completed`);
  } else {
    const offerString = localStorage.getItem(`${ID}-offerSelected`).substr(0, 3);
    document.querySelector(`.${ID}_offer__sliderWrap .${ID}_offer__title`).innerHTML = `Spend <strong>£${(outstanding).toFixed(2)}</strong> more to get <strong>${offerString}</strong> off`;
    target.setAttribute('style', `width:${(100 * (parseFloat(match[1]) - outstanding) / parseFloat(match[1])).toFixed(0)}%`);
    target.parentElement.setAttribute('data-offer', (100 * (parseFloat(match[1]) - outstanding) / parseFloat(match[1])).toFixed(0));
    document.querySelector(`.${ID}_offer__sliderWrap`).classList.remove(`${ID}_offer__sliderWrap--completed`);
  }
  
  // document.querySelector(`.${ID}_offerWrap`).scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
}

export { setup, generateOfferBlock, modifycounter }; // eslint-disable-line
