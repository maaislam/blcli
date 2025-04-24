import { events } from '../../../../../../lib/utils';

export default () => {
  const products = document.querySelectorAll('.productCard');
  for (let index = 0; index < products.length; index += 1) {
    const element = products[index];
    const productReview = element.querySelector('.productCard_title a img');
    if (productReview) {
      productReview.addEventListener('click', () => {
        sessionStorage.setItem('MP143-clickedReview', 1);
        events.send('MP143', 'Clicked', 'review on PLP');
      });
    }
  }
};
