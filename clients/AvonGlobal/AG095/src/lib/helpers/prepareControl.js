const prepareControl = (ID) => {
  const cookieBtn = document.getElementById('gdpr-cookie-button');
  const topBrochureMenu = document.querySelector('[data-item-id="topBrochureMenu"]');
  topBrochureMenu.classList.add(`${ID}__topBrochureMenu`);
  cookieBtn.classList.add(`${ID}__cookie-container`);
  cookieBtn.querySelector('p').innerText = '';

  document.body.classList.add(`${ID}__mainWrapper`);

  //adjust catlog size

  document.querySelectorAll(`.v7__elem__catalog__slide-page-image`).forEach((item) => {
    item?.classList.add(`${ID}__catalog--image`);
  });
  document.querySelectorAll(`.v7__elem__catalog__slide-page-wrapper`).forEach((item) => {
    item?.classList.add(`${ID}__catalogslide--wrapper`);
  });

  document.querySelector('[data-item-id="shareBtnContainer"]').classList.add(`${ID}__shareBtn`);

  //pdp cart btn
  document.querySelector('.basket_section')?.classList.add(`${ID}__basket-section`);

  //hide control catalog slider
  document.querySelector('[data-item-id="topBrochureMenu"]').classList.add(`${ID}__hide`);
  document.querySelector('[data-item-id="shoppingWith"]').classList.add(`${ID}__hide`);
};

export default prepareControl;
