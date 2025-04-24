export default (content) => {
  // Add - Top Redirect Link
  const pageTitleContainer = document.querySelector('.plp-title');
  const pageTitle = pageTitleContainer.querySelector('h1');
  const productCount = pageTitleContainer.querySelector('span.total-count');
  const text = content.link;
  const url = content.url;
  const screenWidth = window.innerWidth;

  const redirectContainer = `<div class='MP148-viewAll__link'>
    <a href='${url}'>${text}</a>
  </div>`;
  if (screenWidth > 420) {
    pageTitle.insertAdjacentHTML('afterend', redirectContainer);
  } else {
    productCount.insertAdjacentHTML('afterend', redirectContainer);
  }
  
  // Add - Bottom Redirect Link
  const footerContainer = document.querySelector('footer');

  const redirectContainerBottom = `<div class='MP148-viewAllFooter__wrapper'>
    <div class='MP148-viewAllFooter'>
      <div class='MP148-viewAll__text'>Not found what you were looking for?</div>
      <div class='MP148-viewAll__link bottom'>
        <a href='${url}'>${text}</a>
      </div>
    </div>
  </div>`;
  footerContainer.insertAdjacentHTML('beforebegin', redirectContainerBottom);
};