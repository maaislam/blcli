import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import setContentToEthicalBusiness from './helpers/setContentToEthicalBusiness';
import updateCategoryCarousel from './helpers/updateCategoryCarousel';
import updateEthicalbusinessCarousel from './helpers/updateEthicalbusinessCarousel';
import updateTrendingCarousel from './helpers/updateTrendingCarousel';

const { ID, VARIATION } = shared;

const init = () => {
  const isMobile = () => document.querySelector('nav.stuckMenu');
  const trendingCarousel = document.querySelector('.HCN-newinblock-container');
  trendingCarousel.classList.add(`${ID}__trendingCarousel`);
  const categoryCarousel = document.querySelector('.HCN-category-carousel-block');
  const categoryCarouselWrapper = document.querySelector('.HCN-category-carousel-block .HCN-category-carousel-wrapper');

  const categoryHeaderHTML = `<div class='${ID}__categoryHeader'>
    <h2 class="${ID}__title">Luxury Chocolate & Gifts</h2>
    <p class="${ID}__details">
      <span class='${ID}__expandedArea'>Explore our exquisite selection of <a href='https://www.hotelchocolat.com/uk/shop/collections/products/chocolate-box/'>boxed chocolates</a>, luxury chocolate treats, and cacao-infused alcohol gifts for every special occasion...</span>
      <span class="${ID}__readMore">read more</span>
    </p>
    <p class="${ID}__fullDetails">
      Explore our exquisite selection of <a href='https://www.hotelchocolat.com/uk/shop/collections/products/chocolate-box/'>boxed chocolates</a>, luxury chocolate treats, and cacao-infused alcohol gifts for every special occasion — from birthdays and 
      <a href='https://www.hotelchocolat.com/uk/shop/gift-ideas/shop-by-occasion/anniversary/'>anniversaries</a> to 
      <a href='https://www.hotelchocolat.com/uk/shop/gift-ideas/shop-by-occasion/sorry/'>heartfelt apologies</a>.
      Original, authentic, ethical: our three guiding principles have inspired us to establish over 120 chocolate shops, cafés, restaurants, and our luxurious Rabot Estate hotel in Saint Lucia. Collect your order in-store or experience the joy of next-day chocolate delivery.
    </p>
  </div>`;
  categoryCarouselWrapper.insertAdjacentHTML('afterbegin', categoryHeaderHTML);

  trendingCarousel.insertAdjacentElement('afterend', categoryCarousel);

  updateTrendingCarousel(ID);
  updateEthicalbusinessCarousel(ID);

  setContentToEthicalBusiness(ID);

  if (!isMobile()) return;

  const findOutMoreBtn = document.querySelector('.HCN-button.HCN-ethical_btn');
  const ethicalProgressBar = document.querySelector('.HCN-ethicalbusiness-progress-bar-container');
  const newFindOutMoreBtn = `<div class='${ID}__ethicalFindOutMoreBtn'>
      ${findOutMoreBtn.outerHTML}
    </div>`;
  ethicalProgressBar.insertAdjacentHTML('afterend', newFindOutMoreBtn);

  updateCategoryCarousel(ID);
};

export default () => {

  setup();

  fireEvent('Conditions Met');

  document.body.addEventListener('click', (event) => {
    const { target } = event;

    if (target.closest(`.${ID}__readMore`) && document.querySelector('nav.stuckMenu')) {
      const categoryHeader = target.closest(`.${ID}__categoryHeader`);
      categoryHeader.classList.add(`${ID}__expanded`);
    }
  });


  if (VARIATION == 'control') {
    return;
  }

  init();

};
