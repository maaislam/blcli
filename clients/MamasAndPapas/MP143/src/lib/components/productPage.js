import { scrollTo, events } from '../../../../../../lib/utils';

export default () => {
  if (sessionStorage.getItem('MP143-clickedReview')) {
    const productReviews = document.querySelector('.feefoOverlay');
    const feefoWidget = document.querySelector('.feefo-review-widget-product');
    if (productReviews && feefoWidget) {
      const reviewWidgetPosition = feefoWidget.getBoundingClientRect().y + window.scrollY;
      scrollTo(reviewWidgetPosition - 100);
      sessionStorage.removeItem('MP143-clickedReview');
      events.send('MP143', 'User saw', 'Reviews section of PDP');
    }
  }

  const productReviews = document.querySelector('.feefoOverlay');
  const feefoWidget = document.querySelector('.feefo-review-widget-product');
  if (productReviews && feefoWidget) {
    productReviews.addEventListener('click', () => {
      const reviewWidgetPosition = feefoWidget.getBoundingClientRect().y + window.scrollY;
      scrollTo(reviewWidgetPosition - 100);
      events.send('MP143', 'Clicked', 'Reviews on PLP');
    });
  }
};
