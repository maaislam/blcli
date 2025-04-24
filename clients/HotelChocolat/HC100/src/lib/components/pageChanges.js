import shared from "../../../../../../core-files/shared";

const { ID, VARIATION } = shared;

export default () => {

  if(VARIATION === '1') {

     // Page title
    const pageTitle = document.querySelector('#main h1');
    if (pageTitle) {
      pageTitle.textContent = 'The Podster Coffee System';
    }

    // change into text
    const introText = document.querySelector('#page_heading h3');
    if (introText) {
      introText.textContent = 'Barista-grade coffee, from sustainable pods, at home';
    }

    // move qty
    const inStockMessage = document.querySelector('.availability-block');
    if (inStockMessage) {
      const qty = document.querySelector('.inventory');
      qty.insertAdjacentElement('beforeend', inStockMessage);
    }

  }

 
  // move price
  const price = document.querySelector('.price-wrapper');
  if (price) {
    price.insertAdjacentHTML(`beforeend`, `<div class="${ID}-delivery">Price includes delivery</div>`);
  }


  // add new CTA
  const addBtn = `<div class="${ID}-add">Add to bag</a>`;
  document.querySelector('.inventory').insertAdjacentHTML('afterend', addBtn);

  // move reviews
  const reviews = document.querySelector('.product-review-links.product-review-links-top');
  const reviewRating = reviews.querySelector('.bv-rating span');
  
  if (reviews && reviewRating) {
    if(VARIATION === '1') {
      const introText = document.querySelector('#page_heading h3');
      introText.insertAdjacentElement('afterend', reviews);
    } else {
      const title = document.querySelector(`.${ID}-title`);
      title.insertAdjacentElement('afterend', reviews);
    }
    reviews.insertAdjacentHTML('beforeend', `<div class="${ID}-reviewRating">${reviewRating.innerText}</div><div class="${ID}-readReviews">Read Reviews</div>`);
  }

  // add YT video
  const video = `<div class="${ID}-video"><div id="player"></div></div>`;
  document.querySelector(`.${ID}-vid`).insertAdjacentHTML('afterbegin', video);


  // remove ingredients on mobile
  const mobileTab = document.querySelectorAll('.tab-mobile-title');
  if(mobileTab) {
      for (let index = 0; index < mobileTab.length; index += 1) {
          const element = mobileTab[index];
          if(element.textContent.trim() === 'INGREDIENTS') {
              element.style.display = 'none';
          }
      }
  }

  if(VARIATION === '2') {
    const subBtn = `<a href="https://www.hotelchocolat.com/on/demandware.store/Sites-HotelChocolat-Site/en_GB/Configurator-Show" class="${ID}-subAdd">Proceed to subscriptions</a>`;
    document.querySelector('.inventory').insertAdjacentHTML('afterend', subBtn);
  }
}

