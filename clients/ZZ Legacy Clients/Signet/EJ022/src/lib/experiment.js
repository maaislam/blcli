/**
 * @author User Conversion
 */
import { setup } from './services';
import newFinanceMessage from './components/newFinanceMessage';
import settings from './settings';
import deliveryMessage from './components/deliveryMessage';
import usps from './components/usps';
import bringOutAccordianInfo from './components/bringOutAccordianInfo';
import scrollToElement from './components/scrollTo';

const activate = () => {
  setup();

  const productChanges = () => {
    /**
     * finance message changes
     */
    const financeMessage = document.querySelector('.buying-buttons-ifc .buying-buttons-ifc__message');
    if (financeMessage) {
      newFinanceMessage();
    }

    /*
    * review changes
    */
    const reviews = window.digitalData.product[0].productInfo.ratingCount;
    if (reviews > 0) {
      const reviewStars = document.querySelector('.buying-info .ratings-images');
      const reviewStarsImg = reviewStars.querySelector('img').getAttribute('src');
      reviewStars.insertAdjacentHTML('beforeend', `<div class="${settings.ID}-allReviews"><span class="${settings.ID}-reviewStars" style="background-image:url(${reviewStarsImg})"></span>Read all reviews</div>`);

      const scrollToReview = () => {
        scrollToElement(document.querySelector('#bazaarContainer'));
      };
    
      const readAll = document.querySelector(`.${settings.ID}-allReviews`);
      readAll.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        scrollToReview();
      });

      // move reviews
      const priceBlock = document.querySelector('.buying-info__pricing');
      priceBlock.insertAdjacentElement('afterend', reviewStars);
    }
    /*
    * stock and delivery message
    */
    deliveryMessage();

    // move the compare section
    const compareSection = document.querySelector('.compare-wish');
    if (compareSection) {
      document.querySelector('.pdpContent .tableContainer').appendChild(compareSection);
    }
  };
  productChanges();


  // add the USPs
  if (settings.VARIATION === '2') {
    usps();
  }

  if (settings.VARIATION === '3') {
    bringOutAccordianInfo();
  }
};

export default activate;
