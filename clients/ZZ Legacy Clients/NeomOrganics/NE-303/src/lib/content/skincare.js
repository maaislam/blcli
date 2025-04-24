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
        <a class="${shared.ID}-linklist__link" href="/collections/perfect-nights-sleep-overnight-facial-cream">
          <img class="${shared.ID}-linklist__img" src="https://cdn.shopify.com/s/files/1/0028/2568/3008/products/PNSOvernightFacialCreamBox_Product_LidOn_750x750.jpg?v=1629881427">
          <div class="${shared.ID}-linklist__desc">
            <span class="${shared.ID}-linklist__title">Overnight Facial Cream</span>
          </div>
        </a>
      </li>
      <li>
        <a class="${shared.ID}-linklist__link" href="/collections/wonder-balm">
          <img class="${shared.ID}-linklist__img" src="https://cdn.shopify.com/s/files/1/0028/2568/3008/products/GreatDayWonderBalmBoxandProduct_750x750.png">
          <div class="${shared.ID}-linklist__desc">
            <span class="${shared.ID}-linklist__title">The Wonder Balm</span>
          </div>
        </a>
      </li>
      <li>
        <a class="${shared.ID}-linklist__link" href="/collections/cleansing-balm">
          <img class="${shared.ID}-linklist__img" src="https://cdn.shopify.com/s/files/1/0028/2568/3008/products/Great_Day_Glow_Face_Wash_750x750.jpg">
          <div class="${shared.ID}-linklist__desc">
            <span class="${shared.ID}-linklist__title">Cleansers</span>
          </div>
        </a>
      </li>
      <li>
        <a class="${shared.ID}-linklist__link" href="/collections/face-oil">
          <img class="${shared.ID}-linklist__img" src="https://cdn.shopify.com/s/files/1/0028/2568/3008/products/neom-perfect-night_s-sleep-face-oil_750x750.jpg">
          <div class="${shared.ID}-linklist__desc">
            <span class="${shared.ID}-linklist__title">Face Oil</span>
          </div>
        </a>
      </li>
      <li>
        <a class="${shared.ID}-linklist__link" href="/collections/face-serum">
          <img class="${shared.ID}-linklist__img" src="https://cdn.shopify.com/s/files/1/0028/2568/3008/products/Great_Day_Glow_Serum_750x750.jpg">
          <div class="${shared.ID}-linklist__desc">
            <span class="${shared.ID}-linklist__title">Face Serum</span>
          </div>
        </a>
      </li>
      <li>
        <a class="${shared.ID}-linklist__link" href="/products/white-jade-facial-roller">
          <img class="${shared.ID}-linklist__img" src="${ref}jr.jpg">
          <div class="${shared.ID}-linklist__desc">
            <span class="${shared.ID}-linklist__title">Jade Roller</span>
          </div>
        </a>
      </li>
      <li>
        <a class="${shared.ID}-linklist__link" href="/collections/wellbeing-fragrances">
          <img class="${shared.ID}-linklist__img" src="https://cdn.shopify.com/s/files/1/0028/2568/3008/products/HappinessWellbeingFragranceProduct_Box_750x750.jpg">
          <div class="${shared.ID}-linklist__desc">
            <span class="${shared.ID}-linklist__title">Perfume</span>
          </div>
        </a>
      </li>
    </ul>
  </div>

  ${wellbeingLinks}

  <div class="${shared.ID}-col">
    <a class="${shared.ID}-imgcta" href="/collections/perfect-nights-sleep-overnight-facial-cream">
      <img class="${shared.ID}-imgcta__img" src="${ref}Mask%20Group%20(7).jpg">
      <span class="${shared.ID}-imgcta__text ">Overnight Facial Cream</span>
    </a>
  </div>
`;

export default html;
