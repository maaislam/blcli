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
        <a class="${shared.ID}-linklist__link" href="/collections/wellbeing-pod-luxe">
          <img class="${shared.ID}-linklist__img" src="https://cdn.shopify.com/s/files/1/0028/2568/3008/products/PodLuxewithWire_75926d6e-aff9-4c7a-829e-e2530b5c8668_750x750.jpg">
          <div class="${shared.ID}-linklist__desc">
            <span class="${shared.ID}-linklist__title">Wellbeing Pod Luxe</span>
          </div>
        </a>
      </li>
      <li>
        <a class="${shared.ID}-linklist__link" href="/collections/the-wellbeing-pod">
          <img class="${shared.ID}-linklist__img" src="https://cdn.shopify.com/s/files/1/0028/2568/3008/products/PodwithWire_750x750.jpg">
          <div class="${shared.ID}-linklist__desc">
            <span class="${shared.ID}-linklist__title">Wellbeing Pod</span>
          </div>
        </a>
      </li>
      <li>
        <a class="${shared.ID}-linklist__link" href="/collections/the-wellbeing-pod-mini">
          <img class="${shared.ID}-linklist__img" src="https://c.zmags.com/assets/images/6082d69a7826492627564c00_300x300.jpeg">
          <div class="${shared.ID}-linklist__desc">
            <span class="${shared.ID}-linklist__title">Wellbeing Pod Mini</span>
          </div>
        </a>
      </li>
      <li>
        <a class="${shared.ID}-linklist__link" href="/collections/essential-oil-blends">
          <img class="${shared.ID}-linklist__img" src="https://cdn.shopify.com/s/files/1/0028/2568/3008/products/PNS_Essential_Oil_box_and_product_750x750.jpg">
          <div class="${shared.ID}-linklist__desc">
            <span class="${shared.ID}-linklist__title">Essential Oil Blends</span>
          </div>
        </a>
      </li>
      <li>
        <a class="${shared.ID}-linklist__link" href="/collections/candles">
          <img class="${shared.ID}-linklist__img" src="https://cdn.shopify.com/s/files/1/0028/2568/3008/products/Real_Luxuxury_3_wick_product_750x750.jpg">
          <div class="${shared.ID}-linklist__desc">
            <span class="${shared.ID}-linklist__title">Candles</span>
          </div>
        </a>
      </li>
      <li>
        <a class="${shared.ID}-linklist__link" href="/collections/reed-diffusers">
          <img class="${shared.ID}-linklist__img" src="https://cdn.shopify.com/s/files/1/0028/2568/3008/products/PNS_Reed_Diffuser_product_750x750.jpg">
          <div class="${shared.ID}-linklist__desc">
            <span class="${shared.ID}-linklist__title">Reed Diffusers</span>
          </div>
        </a>
      </li>
      <li>
        <a class="${shared.ID}-linklist__link" href="/collections/pillow-mist">
          <img class="${shared.ID}-linklist__img" src="https://cdn.shopify.com/s/files/1/0028/2568/3008/products/PNSPillowMistBox_Product_jpg_c7a3a202-d4cc-495a-9556-0459eee6a8a5_750x750.png">
          <div class="${shared.ID}-linklist__desc">
            <span class="${shared.ID}-linklist__title">Pillow Mists</span>
          </div>
        </a>
      </li>
      <li>
        <a class="${shared.ID}-linklist__link" href="/collections/mists">
          <img class="${shared.ID}-linklist__img" src="https://cdn.shopify.com/s/files/1/0028/2568/3008/products/Real_Luxury_Home_Mist_box_and_product_750x750.jpg">
          <div class="${shared.ID}-linklist__desc">
            <span class="${shared.ID}-linklist__title">Home Mists</span>
          </div>
        </a>
      </li>
    </ul>
  </div>

  ${wellbeingLinks}

  <div class="${shared.ID}-col">
    <a class="${shared.ID}-imgcta" href="/collections/candles">
      <img class="${shared.ID}-imgcta__img" src="${ref}Mask%20Group%20(5).jpg">
      <span class="${shared.ID}-imgcta__text ${shared.ID}-imgcta__text--white">Candles</span>
    </a>
  </div>
`;

export default html;
