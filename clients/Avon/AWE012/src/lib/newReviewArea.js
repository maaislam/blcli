const newReviewArea = (id, ratingVal, fireEvent) => {
  document.querySelectorAll(`${id}__review--box yotpo`).forEach((item) => {
    item.remove();
  });

  const parentContainer = document.querySelector(`.${id}__rating--share`);
  const clonedStars1 = parentContainer.querySelector('.yotpo-stars').cloneNode(true);
  const clonedStars2 = clonedStars1.cloneNode(true);

  const numOfReview = parentContainer.querySelector('a').innerText;

  const content = `
    <div class="${id}__review--box yotpo">
        <div class="top-row star-clickable">
            <div class="title">Top bewertet!</div>
            <a href="#yotpo-main-widget" class="${id}__yotpo-star yotpo-bottomline pull-left"></a>
           
            <div class="rating-value">${ratingVal}/5</div>
        </div>
        <div class="bottom-row">
            <div class="rev-count"><a href="#yotpo-main-widget">${numOfReview}</a></div>
            <div class="submit-review"><a href="#yotpo-main-widget">Produkt Bewerten</a></div>
        </div>
    </div>`;

  parentContainer.querySelector('.yotpo-display-wrapper').insertAdjacentHTML('beforeend', content);
  document.querySelector('.MobileImages')?.insertAdjacentHTML('afterend', content);

  const starDesktop = document.querySelectorAll(`.${id}__yotpo-star`)[0];
  const starMobile = document.querySelectorAll(`.${id}__yotpo-star`)[1];

  starDesktop.append(clonedStars1);
  starMobile?.append(clonedStars2);

  starDesktop.closest(`.${id}__review--box`).classList.add(`${id}__desktop-show`);
  starMobile?.closest(`.${id}__review--box`).classList.add(`${id}__desktop-hide`);

  document.querySelector('.standalone-bottomline').classList.add(`${id}__hide`);
  document.querySelector('.Review').classList.add(`${id}__hide`);
  document.querySelector('.Sharing').classList.add(`${id}__desktop-show`);

  document.body.addEventListener('click', (e) => {
    if (
      e.target.classList.contains('AWE012__yotpo-star') ||
      e.target.classList.contains('rev-count') ||
      e.target.closest('.bottom-row')
    ) {
      fireEvent('Customer has clicked number of reviews and/or the stars ');
    }
  });
};

export default newReviewArea;
