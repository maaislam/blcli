/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {
  //console.log("SCR004 Running")

  setup();

  //fireEvent('Conditions Met');
  document.body.addEventListener('click', ({ target }) => {
    if (target.closest(`.${ID}__main_container`)) {
      fireEvent('Interactions with glove promotion banner.');
    }
  });

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    const breadCrumbs = document.querySelectorAll('.inner ul li.bc__dt a span');
    if (breadCrumbs.length > 0 && breadCrumbs[1]?.innerText === 'Safety Footwear') {
      fireEvent('Conditions Met');
      fireEvent('User visits a safety footwear PDP page.');
    }
    return;
  }

  const breadCrumbs = document.querySelectorAll('.inner ul li.bc__dt a span');
  if (breadCrumbs.length > 0 && breadCrumbs[1]?.innerText === 'Safety Footwear') {
    fireEvent('Conditions Met');
    fireEvent('User visits a safety footwear PDP page.');

    let getData = document.querySelector('.toggle.toggle--off') ? true : false;
    //true = Inc VAT false = Ex VAT

    let elem = `<div class="${ID}__main_container">
                      <a class="${ID}__product_link" href="https://www.screwfix.com/p/site-120-pu-palm-dip-gloves-black-large/458fr"
                        <div class=${ID}__wrapper>
                        <div class="${ID}__title_info">
                          <h3 class="${ID}__header">Get Fully Protected</h3>
                          <div class="${ID}__sub_header">Add our bestselling protective gloves to your basket</div>
                        </div>
                        <div class="${ID}__img_info_wrapper">
                          <img class="${ID}__product_img" src="https://media.screwfix.com/is/image//ae235?src=ae235/458FR_P&$prodImageMedium$"></img>
                        <div class="${ID}__img_tagline">SITE 120 PU PALM DIP GLOVES BLACK LARGE (458FR)</div>
                        </div>
                        <div class="${ID}__cta_scetion">
                          <div class="pr__pricepoint">
                            <div id="product_price" class="pr__price">
                              <span class="pound">
                                £</span>1<span class="pence">${getData ? '.24' : '.49'}<span class="incvat">${
      getData ? 'EX VAT' : 'INC VAT'
    }</span></span>
                              </div>
          
                            </div>
                            <div class="${ID}__cta_btn-wrapper">
                              <button class="${ID}__cta_btn">View Product</button>
                            </div>
                          </div>
                          
                        </div>
                      </a>
                    </div>
        `;

    if (document.querySelector('.wrp.boxed.boxed--short')) {
      document.querySelector('.wrp.boxed.boxed--short').insertAdjacentHTML('afterend', elem);
      document.querySelector(`.${ID}__cta_btn`).addEventListener('click', () => {
        window.location('https://www.screwfix.com/p/site-120-pu-palm-dip-gloves-black-large/458fr');
      });
    }
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
};
