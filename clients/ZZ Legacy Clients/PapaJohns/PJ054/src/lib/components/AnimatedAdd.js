import { observer } from '../../../../../../lib/uc-lib';

/**
 * @desc animated "added" on pages
 */

export default () => {
  const url = window.location.href;

  // create and add the button
  const newAddButton = document.createElement('div');
  newAddButton.classList.add('PJ054-added_button');
  newAddButton.innerHTML = '<span>Added to basket</span>';
  document.querySelector('.header .hInner').appendChild(newAddButton);



  const allItems = document.querySelectorAll('.menuList');
  let addToBagButton;

  for (let index = 0; index < allItems.length; index += 1) {
    const element = allItems[index];

    if (url.indexOf('pizzas.aspx') > -1) {
      addToBagButton = element.querySelector('.butContainer a:last-child');
    } else {
      addToBagButton = element.querySelector('.buttons a');
    }
    if (addToBagButton) {
      // show the button on click
      addToBagButton.addEventListener('click', () => {
        observer.connect(document.getElementById('ctl00__objHeader_upHeaderSummary'), () => {
          document.querySelector('.PJ054-added_button').classList.add('PJ054-added_active');
        }, {
          config: { attributes: true, childList: true, subtree: false },
          throttle: 1000,
        });
        // hide the button
        setTimeout(() => {
          document.querySelector('.PJ054-added_button').remove();
        }, 5000);
      });
    }

    const basketDips = element.querySelector('.fancyContainer.fancyDips .greenButton');
    if (basketDips) {
      if (localStorage.getItem('PJ054-bItem')) {
        const numberOfBasketItems = parseFloat(document.querySelector('.basketIcon').textContent.trim());
        if (numberOfBasketItems > localStorage.getItem('PJ054-bItem')) {
          document.querySelector('.PJ054-added_button').classList.add('PJ054-added_active');
          localStorage.removeItem('PJ054-bItem', numberOfBasketItems);
          setTimeout(() => {
            document.querySelector('.PJ054-added_button').remove();
          }, 5000);
        }
      }
      basketDips.addEventListener('click', () => {
        const numberOfBasketItems = parseFloat(document.querySelector('.basketIcon').textContent.trim());
        localStorage.setItem('PJ054-bItem', numberOfBasketItems);
      });
    }
  }
};
