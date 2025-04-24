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
      <a class="${ID}-leftLink" href="/webstore/l/diamonds/"></a>
        <div class="${ID}-leftTextWrapper">

          <div class="${ID}-buttons_wrap">
            <a class="${ID}-firstCTA ${ID}-button" href="https://www.ernestjones.co.uk/webstore/l/engagement-rings/"><span>Shop</span> Engagement Rings</a>
            <a class="${ID}-lastCTA ${ID}-button" href="https://www.ernestjones.co.uk/webstore/l/diamonds/"><span>Shop</span> Diamond Jewellery</a>
          </div>
        </div>
    </div>
    <div class="${ID}-rightSide_half_1">
      <a href="https://www.ernestjones.co.uk/webstore/l/wedding-rings/"></a>
      <div class="${ID}-button">
        <a href="https://www.ernestjones.co.uk/webstore/l/wedding-rings/">
          <span>Shop</span> Wedding Rings
        </a>
      </div>
    </div>
    <div class="${ID}-rightSide_half_2">
      <a href="/webstore/l/tag-heuer-watches/?icid=ej-tn-watches-lux-tag-heuer"></a>
      <div class="${ID}-button">
        <a href="/webstore/l/tag-heuer-watches/?icid=ej-tn-watches-lux-tag-heuer">
          <span>Shop</span> Tag Heuer
        </a>
        </div>
    </div>
    
    </div>`;
  } else {
    heroBanner.innerHTML = 
      `<div class="${ID}-leftSide">
        <a class="${ID}-leftLink" href="https://www.ernestjones.co.uk/webstore/l/jewellery/select%7Cthe+diamond+event/">
        <img src="https://service.maxymiser.net/cm/images-us/ernestjones-co-uk/F5A15C10B0AA25B12F6540533CF656038F7F64308F3DB5B4159E545AD5992CED.jpg?meta=/LIVE---EJ050---100-noCTA-0908/EJ_Diamond_Event_1440x1300.jpg"/>
        </a>
        <div class="${ID}-buttons_wrap">
          <a class="${ID}-lastCTA ${ID}-button" href="https://www.ernestjones.co.uk/webstore/l/jewellery/select%7Cthe+diamond+event/"><span>Shop</span>Shop Engagement</a>
          <a class="${ID}-firstCTA ${ID}-button" href="https://www.ernestjones.co.uk/webstore/l/jewellery/select%7Cthe+diamond+event/"><span>Shop</span>Shop Watches</a>
        </div>
      </div>
      <div class="${ID}-rightSide_half_1">
        <a href="https://www.ernestjones.co.uk/webstore/l/tag-heuer-watches/?icid=ej-tag-sis-all"></a>
        <div class="${ID}-button">
          <a href="https://www.ernestjones.co.uk/webstore/l/tag-heuer-watches/?icid=ej-tag-sis-all">
            <span>Shop</span> TAG
          </a>
        </div>
      </div>
      
      <div class="${ID}-rightSide_half_2">
      <a href="https://www.ernestjones.co.uk/webstore/l/watches/select%7Cnew/?icid=ej-tn-watches-coll-ne"></a>
      <div class="${ID}-button">
        <a href="https://www.ernestjones.co.uk/webstore/l/watches/select%7Cnew/?icid=ej-tn-watches-coll-ne">
          <span>Shop</span>10% off
        </a>
        </div>
    </div>
      <div class="${ID}-rightSide_full">
      <a href="https://www.ernestjones.co.uk/webstore/engagement-ring-buyers-guide.cdo?icid=ej-tn-engagement-guide"></a>
        <div class="${ID}-bannerText">
        <a href="https://www.ernestjones.co.uk/webstore/engagement-ring-buyers-guide.cdo?icid=ej-tn-engagement-guide">
          <h2>Engagement ring buying guide</h2>
          </a>
        </div> 
      </div>`
  }

  document.querySelector('.hero-banner').insertAdjacentElement('beforebegin', heroBanner);
  
  document.querySelector(`.${ID}-leftLink`).addEventListener("click", function() {
    events.send(`EJ050 - Variation ${VARIATION}`, `Clicked shop diamond jewellery sale on mobile`);
  });


  document.querySelector('.EJ050-firstCTA').addEventListener("click", function() {
    events.send(`EJ050 - Variation ${VARIATION}`, `Clicked shop engagement button`);
  });

  document.querySelector('.EJ050-lastCTA').addEventListener("click", function() {
    events.send(`EJ050 - Variation ${VARIATION}`, `Clicked shop diamond jewellery sale button`);
  });

  document.querySelector('.EJ050-rightSide_half_1').addEventListener("click", function() {
    events.send(`EJ050 - Variation ${VARIATION}`, `Clicked wedding rings`);
  });

  document.querySelector('.EJ050-rightSide_half_2').addEventListener("click", function() {
    events.send(`EJ050 - Variation ${VARIATION}`, `Clicked Tag`);
  });


};
