import prepareControl from './prepareControl';
import triggerEvent from './triggerEvent';

const clickHandler = (ID, fireEvent) => {
  document.body.addEventListener('click', (e) => {
    prepareControl(ID);
    const target = e.target;
    const targetMatched = (desiredMatch) => target.matches(desiredMatch) || target.closest(desiredMatch);

    if (targetMatched(`.${ID}__menubar-item--Pages`)) {
      const controlPages = document.querySelector('[data-item-id="diaporamaBtn"]');
      triggerEvent(controlPages);
    } else if (targetMatched(`.${ID}__menubar-item--Scrollshop`)) {
      const scrollshop = document.querySelector('[data-item-id="menuBtn"]');
      triggerEvent(scrollshop);
    } else if (targetMatched(`.${ID}__menubar-item--Search`)) {
      const searchIcon = document.querySelector('[data-item-id="searchIcon"]');
      triggerEvent(searchIcon);
    } else if (targetMatched(`.${ID}__menubar-item--Brochures`)) {
      const categorySwiper = document.querySelector(`.${ID}__catalog-swiper`);

      const isCatSwiperHidden = categorySwiper.classList.contains(`${ID}__hide`);
      const buttonTitle = target.closest(`.${ID}__menubar-item--Brochures`).querySelector('.title');
      const repnameContainer = document.querySelector(`.${ID}__repname`);

      fireEvent('User clicks “Show” or “Hide” Brochure');

      document.querySelector(`.${ID}__repname .subtitle`).classList.toggle(`${ID}__hide`);
      if (isCatSwiperHidden) {
        categorySwiper.classList.add(`slide-in-bottom`);
        categorySwiper.classList.remove(`slide-out-bottom`, `${ID}__hide`);

        buttonTitle.innerText = 'Hide Brochures';
        document.querySelectorAll(`.v7__elem__catalog__slide-page-image`).forEach((item) => {
          item?.classList.add(`${ID}__catalog--image`);
        });
        document.querySelectorAll(`.v7__elem__catalog__slide-page-wrapper`).forEach((item) => {
          item?.classList.add(`${ID}__catalogslide--wrapper`);
        });
        setTimeout(() => {
          categorySwiper.classList.remove(`slide-in-bottom`);
        }, 1000);
      } else {
        categorySwiper.classList.add(`slide-out-bottom`);
        categorySwiper.classList.remove(`slide-in-bottom`);
        buttonTitle.innerText = 'Show Brochures';
        repnameContainer.classList.add('slide-down');
        document.querySelectorAll(`.v7__elem__catalog__slide-page-image`).forEach((item) => {
          item?.classList.remove(`${ID}__catalog--image`);
        });
        document.querySelectorAll(`.v7__elem__catalog__slide-page-wrapper`).forEach((item) => {
          item?.classList.remove(`${ID}__catalogslide--wrapper`);
        });
        setTimeout(() => {
          categorySwiper.classList.add(`${ID}__hide`);
          repnameContainer.classList.remove('slide-down');
        }, 1000);
      }
    } else if (targetMatched(`.${ID}__cartbtn`) || targetMatched(`.${ID}AG095__menubar-item--Basket`)) {
      const cartBtn = document.querySelector('[data-item-id="wishlistButton"]');
      triggerEvent(cartBtn);
      fireEvent('User clicks the basket');
    }
  });
};

export default clickHandler;
