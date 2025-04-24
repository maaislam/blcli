import shared from '../../../../../../core-files/shared';
import wellbeingLinks from './inc/wellbeing-links';

const ref = 'https://blcro.fra1.digitaloceanspaces.com/ne303/';

const html = `
  <div class="${shared.ID}-col">
    <h2 class="${shared.ID}-col-heading">
      Shop by Product
    </h2>

    <ul class="${shared.ID}-linklist">
      <li>
        <a class="${shared.ID}-linklist__link" href="/collections/super-shower-power-body-cleanser">
          <img class="${shared.ID}-linklist__img" src="https://cdn.shopify.com/s/files/1/0028/2568/3008/products/SuperShowerPower500ml_750x750.jpg">
          <div class="${shared.ID}-linklist__desc">
            <span class="${shared.ID}-linklist__title">Super Shower Power Body Cleanser</span>
          </div>
        </a>
      </li>
      <li>
        <a class="${shared.ID}-linklist__link" href="/collections/anti-bacterial-hand-sanitiser-gel">
          <img class="${shared.ID}-linklist__img" src="https://cdn.shopify.com/s/files/1/0028/2568/3008/products/Clean_Happyhandsanitiserspraybox_product_750x750.jpg">
          <div class="${shared.ID}-linklist__desc">
            <span class="${shared.ID}-linklist__title">Anti-bacterial Hand Sanitisers</span>
          </div>
        </a>
      </li>
      <li>
        <a class="${shared.ID}-linklist__link" href="/collections/body-washes-lotions">
          <img class="${shared.ID}-linklist__img" src="https://cdn.shopify.com/s/files/1/0028/2568/3008/products/CompleteBlissWash_Lotion_750x750.jpg">
          <div class="${shared.ID}-linklist__desc">
            <span class="${shared.ID}-linklist__title">Hand & Body Washes & Lotions</span>
          </div>
        </a>
      </li>
      <li>
        <a class="${shared.ID}-linklist__link" href="/collections/body-butter">
          <img class="${shared.ID}-linklist__img" src="https://cdn.shopify.com/s/files/1/0028/2568/3008/products/BedtimeHeroMagButter_750x750.jpg">
          <div class="${shared.ID}-linklist__desc">
            <span class="${shared.ID}-linklist__title">Magnesium Body Butter</span>
          </div>
        </a>
      </li>
      <li>
        <a class="${shared.ID}-linklist__link" href="/collections/intensive-skin-treatment-candles">
          <img class="${shared.ID}-linklist__img" src="https://cdn.shopify.com/s/files/1/0028/2568/3008/products/Real_Luxury_Intensive_skin_candle_box_and_product_750x750.jpg">
          <div class="${shared.ID}-linklist__desc">
            <span class="${shared.ID}-linklist__title">Intensive Skin Treatment Candle</span>
          </div>
        </a>
      </li>
      <li>
        <a class="${shared.ID}-linklist__link" href="/collections/body-oils-scrubs">
          <img class="${shared.ID}-linklist__img" src="${ref}nb4.jpg">
          <div class="${shared.ID}-linklist__desc">
            <span class="${shared.ID}-linklist__title">Body Oils & Body Scrubs</span>
          </div>
        </a>
      </li>
      <li>
        <a class="${shared.ID}-linklist__link" href="/collections/bath-oils-foams">
          <img class="${shared.ID}-linklist__img" src="${ref}nb5.jpg">
          <div class="${shared.ID}-linklist__desc">
            <span class="${shared.ID}-linklist__title">Bath Foams & Bath Oils</span>
          </div>
        </a>
      </li>
      <li>
        <a class="${shared.ID}-linklist__link" href="/collections/natural-soap">
          <img class="${shared.ID}-linklist__img" src="https://cdn.shopify.com/s/files/1/0028/2568/3008/products/GreatDaySoapBox_Product_750x750.jpg">
          <div class="${shared.ID}-linklist__desc">
            <span class="${shared.ID}-linklist__title">Natural Soap Bar</span>
          </div>
        </a>
      </li>
      <li>
        <a class="${shared.ID}-linklist__link" href="/collections/hand-balms">
          <img class="${shared.ID}-linklist__img" src="https://cdn.shopify.com/s/files/1/0028/2568/3008/products/30mlhandbalms_750x750.jpg">
          <div class="${shared.ID}-linklist__desc">
            <span class="${shared.ID}-linklist__title">Hand Balms</span>
          </div>
        </a>
      </li>
    </ul>
  </div>

  ${wellbeingLinks}

  <div class="${shared.ID}-col">
    <a class="${shared.ID}-imgcta" href="/collections/super-shower-power-body-cleanser">
      <img class="${shared.ID}-imgcta__img" src="${ref}Mask%20Group%20%286%29.jpg">
      <span class="${shared.ID}-imgcta__text ${shared.ID}-imgcta__text--white">Super Shower Power</span>
    </a>
  </div>
`;

export default html;
