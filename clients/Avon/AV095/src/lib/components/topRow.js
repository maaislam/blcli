import miniCart from './miniCart';
import { deleteItem } from './delItem';

const renderTopRow = (testId, response) => {
  //collect updated basket data

  //check if user bought 3 of any items
  const basketItems = response.items;

  const samplesInCart = basketItems.filter((item) => item.title.split(' ').includes('Sample'));

  document.querySelectorAll(`.${testId}.page-header`).forEach((header) => {
    header.querySelector('.container-fluid').innerHTML = '';
  });

  renderNewContent(miniCart, samplesInCart, samplesInCart.length, testId);
};

const renderNewContent = (miniCart, items, quantity, testId) => {
  const arrDown = `
<svg width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 1L7.5 6L1 0.999999" stroke="black" stroke-width="2" stroke-linecap="round"/>
</svg>
`;
  const arrUp = `
  <span class="start-hidden AV095-hide">
  <svg width="15" height="8" viewBox="0 0 15 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 7L7.5 2L14 7" stroke="black" stroke-width="2" stroke-linecap="round"/>
</svg>

  </span>
`;
  const tick = `
  <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.28003 10.0998L3.79512 13.8724C4.1943 14.4712 5.07627 14.465 5.46697 13.8606L13.6 1.27982" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
</svg>
`;

  const checkoutBtn =
    quantity > 0
      ? `<a href="/checkout" class="${testId}-pg-header__checkout--btn btn btn-primary">Checkout</a>`
      : `<button disabled class="${testId}-pg-header__checkout--btn btn btn-primary">Checkout</button>`;

  const pageHeader = document.querySelectorAll(`.${testId}.page-header`);
  const newContent = `
  <div class="${testId}-pg-header">
  <div class="${testId}-pg-header__title">Sample Shop</div>
  <div class="${testId}-pg-header__discount--msg">3/3 Added (£1.00)</div>
  <div class="${testId}-pg-header__cart">
        <div>${quantity > 0 ? `${'<span>View Summary</span>' + '<span >' + arrDown + '</span>' + arrUp}` : ''}</div>
        <div class="${testId}-hide start-hidden ${testId}__cart--dropdown">${miniCart(items, testId)}</div>
  </div>
  ${checkoutBtn}
  </div>
  <div class="AV095__sample-added AV095-hide">${tick}<span>Sample Added</span></div>
  <div class="AV095__sample-removed AV095-hide">Sample Removed</div>
  `;
  pageHeader.forEach((header) => {
    header.querySelector('.container-fluid').innerHTML = newContent;
  });
  deleteItem(testId);
};

//const qualifyForDiscount = (items) => items.length >= 3; //.some((item) => item.quantity >= 3);

export default renderTopRow;
