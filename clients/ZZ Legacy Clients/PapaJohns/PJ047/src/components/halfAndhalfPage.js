import { events } from '../../../../../lib/utils';

export default () => {
  /* Page Layout */
  const pageTitle = document.createElement('div');
  pageTitle.classList.add('PJ047-topTitle');
  pageTitle.innerHTML = '<h2>Half & Half</h2><div class="PJ047-pizza_image"></div>';

  document.querySelector('.main .halfPage').appendChild(pageTitle);


  const mainPage = document.querySelector('.menuItems');
  /* Create order summary box */
  const orderSummaryBoxTop = document.createElement('div');
  orderSummaryBoxTop.classList.add('PJ047-order_summary');
  orderSummaryBoxTop.innerHTML = `
  <div class="PJ047-order">
    <div class="PJ047_title">Half & Half</div>
    <div class="PJ047-base">Base: <span>Select your base</span></div>
    <div class="PJ047-size">Size: <span>Select your size</span></div>
    <div class="PJ047-halves">Halves: <span class="PJ047-half1">Select your first half</span><span class="PJ047-half2">Select your second half</span></div>
  </div>
  <div class="PJ047-price">Total: <span></span></div>
  <div class="PJ047-addToBag">Add to basket</div>`;

  mainPage.appendChild(orderSummaryBoxTop);
  mainPage.insertBefore(orderSummaryBoxTop.cloneNode(true), mainPage.firstChild);

  /* Add title to the pizza types */
  const pizzasTitle = document.createElement('div');
  pizzasTitle.classList.add('PJ047-pizzas');
  pizzasTitle.innerHTML = '<h3>Select Halves <span>(Tap and select two options)</span></h3><div class="PJ047-pizza_section"></div>';

  document.querySelector('#ctl00_cphBody__objHalfAndHalf_upHalf1').insertAdjacentElement('beforebegin', pizzasTitle);

  /**
   * @desc update the price in the order summary boxes
   */
  const updatePrice = () => {
    // add the total price to the summary box
    const bothPricesInSummary = document.querySelectorAll('.PJ047-order_summary');
    const price = document.querySelector('.choiceText .price').textContent.trim();

    for (let index = 0; index < bothPricesInSummary.length; index += 1) {
      const element = bothPricesInSummary[index];
      if (price !== '') {
        element.querySelector('.PJ047-price span').textContent = price;
        element.querySelector('.PJ047-addToBag').classList.add('PJ047_cta_show');
      }
    }
  };

  /* eslint-disable */
  function functionWithError() {
    updatePrice();
  }
  window.prm.add_endRequest(function (sender, error) {
    try {
      functionWithError();
    } catch (e) {} 
  });
  /* eslint-disable */

  /**
   * @desc on click of the new basket button, click the old one
   */
  const addToBasket = () => {
    const basketCTA = document.querySelector('.choiceText .greenButton');
    const newBasketCTA = document.querySelectorAll('.PJ047-addToBag');

    for (let index = 0; index < newBasketCTA.length; index += 1) {
      const element = newBasketCTA[index];
      element.addEventListener('click', (e) => {
        basketCTA.click();

        if(e.currentTarget === newBasketCTA[0]){
          events.send('PJ047', 'clicked', '(Top) Add to basket CTA', { sendOnce: true });
        } else {
          events.send('PJ047', 'clicked', '(Bottom) Add to basket CTA', { sendOnce: true });
        }
      });
    }
  };
  addToBasket();

};