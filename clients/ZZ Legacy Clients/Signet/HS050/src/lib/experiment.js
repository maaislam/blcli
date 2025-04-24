/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { events } from '../../../../../lib/utils';

export default () => {
  setup();

  const { ID, VARIATION } = shared;

  const heroBanner = document.createElement('div');
  heroBanner.classList.add(`${ID}-heroBanner`);

  if(shared.VARIATION === '1') {

    heroBanner.innerHTML = 
    `<div class="${ID}-leftSide">
      <a href="https://www.hsamuel.co.uk/webstore/l/jewellery/select%7cdiamonds+offer//">
        <img src="https://service.maxymiser.net/cm/images-us/1/1/2/5D5B22907910C03F49D6AA5D56B60BB17A8571DE30529745150BCBCB74875872/hsamuel-co-uk/HS050---Homepage-Banners/HS20W20_Wk7_Save50_Off_250_1000x800_IFC.jpg"/>
      </a>
      <div class="${ID}-buttons_wrap">
        <a class="${ID}-firstCTA ${ID}-button" href="https://www.hsamuel.co.uk/webstore/l/recipient%7Chim/select%7Cspend+more+save+more/?icid=hs-hp-spring1-50off250-him"><span>Shop</span> for him</a>
        <a class="${ID}-secondCTA ${ID}-button" href="https://www.hsamuel.co.uk/webstore/l/recipient%7Cher/select%7Cspend+more+save+more/?icid=hs-hp-spring1-50off250-her"><span>Shop</span> for her</a>
      </div>
    </div>
    <div class="${ID}-rightSide_half_1">
      <a href="/webstore/l/select%7Csale/stock+position%7Cin+stock/"></a>
      <div class="${ID}-button">
        <a href="/webstore/l/select%7Csale/stock+position%7Cin+stock/">
          Up to half price Diamond Rings
        </a>
      </div>
    </div>
    <div class="${ID}-rightSide_half_2">
    <a href="/webstore/l/watches/recipient%7Chim/select%7Csale/"></a>
      <div class="${ID}-button">
      <a href="/webstore/l/watches/recipient%7Chim/select%7Csale/">
          Up to half price Men's Watches
      </a>
      </div>
    </div>`;
} else {
    heroBanner.innerHTML = 
      `<div class="${ID}-leftSide">
          <a href="https://www.hsamuel.co.uk/webstore/l/jewellery/select%7c15pc+off+diamonds/">
          <img src="https://service.maxymiser.net/cm/images-us/hsamuel-co-uk/877CA9616AB8976CB7704CEB2E6C5D5D88FF718FDFCAF82A308B2F02AB1D7A25.jpg?meta=/LIVE---HS050---100-Tiles-0808/HS20W63_15_EXTRA_Diamonds_Ends_Midnight_1440x1260.jpg"/>
        </a>
        <div class="${ID}-buttons_wrap">
          <a class="${ID}-firstCTA ${ID}-button" href="https://www.hsamuel.co.uk/webstore/l/jewellery/select%7c15pc+off+diamonds/"><span>Shop</span> sale</a>
          <a class="${ID}-secondCTA ${ID}-button" href="https://www.hsamuel.co.uk/webstore/l/jewellery/select%7c15pc+off+diamonds/"><span>Shop</span> for her</a>
        </div>
      </div>
      <div class="${ID}-rightSide_half_1">
        <a href="https://www.hsamuel.co.uk/webstore/l/jewellery/select%7cdiamonds+offer/"></a>
        <div class="${ID}-button">
          <a href="https://www.hsamuel.co.uk/webstore/l/jewellery/select%7cdiamonds+offer/">
            Shop diamond jewellery
          </a>
        </div>
      </div>
      <div class="${ID}-rightSide_half_2">
        <a href="https://www.hsamuel.co.uk/webstore/l/jewellery/category%7Crings/occasion%7Cengagement/?Nf=P_Current_Price%7CBTWN+0+1000"></a>
        <div class="${ID}-button">
          <a href="https://www.hsamuel.co.uk/webstore/l/jewellery/category%7Crings/occasion%7Cengagement/?Nf=P_Current_Price%7CBTWN+0+1000">
            Shop engagement rings
          </a>
        </div>
      </div>
      <div class="${ID}-rightSide_full">
        <a href="https://www.hsamuel.co.uk/webstore/l/watches/select%7Csale/"></a>
        <div class="${ID}-bannerText">
           <h3>Up to Half Price Watches*</h3>
           <div class="${ID}-button">
           <a href="https://www.hsamuel.co.uk/webstore/l/watches/select%7Csale/">
           Shop now
           </a>
         </div>
        </div> 
      </div>`
  }

  document.querySelector('.hero-banner').insertAdjacentElement('beforebegin', heroBanner);


  document.querySelector(`.${ID}-leftSide a:first-of-type`).addEventListener("click", function() {
    events.send(`${ID} - Variation ${VARIATION}`, `Clicked spring savings`);
  });

  document.querySelector(`.${ID}-leftSide .${ID}-firstCTA`).addEventListener("click", function() {
    events.send(`${ID} - Variation ${VARIATION}`, `Clicked spring savings for him`);
  });
  document.querySelector(`.${ID}-leftSide .${ID}-secondCTA`).addEventListener("click", function() {
    events.send(`${ID} - Variation ${VARIATION}`, `Clicked spring savings for her`);
  });
  
  document.querySelector(`.${ID}-rightSide_half_1 a`).addEventListener("click", function() {
    events.send(`${ID} - Variation ${VARIATION}`, `Clicked half price Diamonds`);
  });
  document.querySelector(`.${ID}-rightSide_half_1 .${ID}-button a`).addEventListener("click", function() {
    events.send(`${ID} - Variation ${VARIATION}`, `Clicked half price Diamonds`);
  });
  

  document.querySelector(`.${ID}-rightSide_half_2`).addEventListener("click", function() {
    events.send(`${ID} - Variation ${VARIATION}`, `Clicked half price watches`);
  });
  document.querySelector(`.${ID}-rightSide_half_2 .${ID}-button a`).addEventListener("click", function() {
    events.send(`${ID} - Variation ${VARIATION}`, `Clicked half price watches`);
  });

  document.querySelector(`.${ID}-rightSide_full .${ID}-button a`).addEventListener("click", function() {
    events.send(`${ID} - Variation ${VARIATION}`, `Clicked hello spring banner`);
  });

  

  // document.querySelector(`.${ID}-rightSide_full a`).addEventListener("click", function() {
  //   events.send(`${ID} - Variation ${VARIATION}`, `Clicked Mothers day banner`);
  // });
  // document.querySelector(`.${ID}-rightSide_full .${ID}-button a`).addEventListener("click", function() {
  //   events.send(`${ID} - Variation ${VARIATION}`, `Clicked Mothers day banner`);
  // });

};
