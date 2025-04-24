import shared from '../../../../../../core-files/shared';

const setupUi = () => {
  const { ID } = shared;
  const sliderContainer = document.querySelector('[impression-list-type]');
  const showMoreBtn = document.querySelector('.component-btn');
  const listItemWrapper = sliderContainer.querySelector('ul');
  const listItems = sliderContainer.querySelectorAll('li');

  sliderContainer.classList.add('swiper');

  listItemWrapper.classList.add('swiper-wrapper');

  listItems.forEach((item) => {
    item.classList.add('swiper-slide');
  });

  const navBtns = ` <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>`;

  const headlines = `
  
      <div class="${ID}__headline-wrapper">
        <div class="title">A taste of what’s inside..</div>
        <div class="subtitle">A collection of 27 chocolates inspired by your favourite desserts – from tarts to macarons via brownies. </div>
      </div>
    
    `;

  const attachpoint = document.querySelector('.component-toolbar');

  if (document.querySelector(`.${ID}__headline-wrapper`)) {
    document.querySelector(`.${ID}__headline-wrapper`).remove();
  }

  attachpoint.insertAdjacentHTML('afterend', headlines);

  showMoreBtn.click();

  if (document.querySelector('.swiper-button-prev')) return;
  sliderContainer.insertAdjacentHTML('afterend', navBtns);
};

export default setupUi;
