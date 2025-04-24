import { events } from './../../../../../lib/utils';
import shared from './shared';
import { addPoller, addEventListener, addObserver } from './winstack';


export const fireEvent = (label) => {
  const { ID, VARIATION, CLIENT, LIVECODE } = shared;

  events.sendAuto(VARIATION, label);

}

export const getSiteDeliveryThreshold = () => {
  const { ID, VARIATION } = shared;

  let minTotal = {};

  if (window.location.pathname.indexOf('/us/') > -1) {
    minTotal.amount = 150;
    minTotal.currency = '$';
  } else {
    minTotal.amount = 75;
    minTotal.currency = '£';
  }

  return minTotal;
}

export const calculateLoader = (siteMinTotal) => {
  const { ID, VARIATION } = shared;

  console.log(siteMinTotal);
  // let miniBasket;
  // if (document.querySelector('.c-drawer--bag')) {
  //   miniBasket = document.querySelector('.c-drawer--bag');
  // } else if (document.querySelector('.c-header .dropdown-menu')) {
  //   miniBasket = document.querySelector('.c-header .dropdown-menu');
  // }
  let totalOfBasket = document.querySelector('.c-bag__total__value .c-bag__total__price.c-bag__price span').innerText.trim();
  totalOfBasket = totalOfBasket.replace(`${siteMinTotal.currency}`, '');
  totalOfBasket = parseFloat(totalOfBasket);
  console.log(totalOfBasket);
  let percentage = ( totalOfBasket * 100) / siteMinTotal.amount;
  console.log(`${percentage}%`);
  console.log('- - - - -');

  return percentage;
}

export const calculateFreeDeliveryRemainingAmount = (miniBasket) => {
  const { ID, VARIATION } = shared;

  // const totalOfBasket = bvHelpers.dataObject.bag.subTotal;
  // alert(!!miniBasket.querySelector('.c-bag__total__value .c-bag__total__price.c-bag__price span'));
  let minTotal = getSiteDeliveryThreshold();
  let totalOfBasket = miniBasket.querySelector('.c-bag__total__value .c-bag__total__price.c-bag__price span').innerText.trim();
  totalOfBasket = totalOfBasket.replace(`${minTotal.currency}`, '');
  totalOfBasket = parseFloat(totalOfBasket);

  let remainingAmount = 0;
  
  if (minTotal.amount > totalOfBasket) {
    remainingAmount = minTotal.amount - totalOfBasket;
  }

  return remainingAmount;
}

export const addDeliveryLoaderBar = (device, miniBasket) => {
  const { ID, VARIATION } = shared;
  
  let loaderMessage = '';
  let minTotal = getSiteDeliveryThreshold();
  let remainingAmount = calculateFreeDeliveryRemainingAmount(miniBasket);


  if (remainingAmount > 0) {
    loaderMessage = `<div class="${ID}-freeDelivery__wrapper">
      <div class="${ID}-freeDelivery__msg">${minTotal.currency}<span class="amount">${remainingAmount.toFixed(2)}</span> away from FREE delivery</div>
      <div class="${ID}-loader__wrapper">
        <div class="${ID}-loader">
          <div class="loader-border">
            <div class="loader-fill" style="width: ${calculateLoader(minTotal)}%;"></div>
          </div>
        </div>
      </div>
    </div>`;
  }

  if (device == 'mobile'
  && loaderMessage !== '') {
    miniBasket.querySelector('.u-center').insertAdjacentHTML('beforebegin', loaderMessage);
  } else if (loaderMessage !== '') {
    miniBasket.querySelector('.c-header .dropdown-menu .l-grid').insertAdjacentHTML('beforebegin', loaderMessage);
  }

}

export const checkBagVisible = () => {
  if(window.innerWidth < 961) {
    // Mobile
    const draw = document.querySelector('.c-drawer--bag');
    if(draw) {
      addPoller([
        () => {
          return draw.getAttribute('data-drawer-visible') == 'bag';
        }
      ], () => {
        // showNewSuccessMessage();
        // alert('this is mobile');
        // draw.querySelector('.u-center').insertAdjacentHTML('beforebegin', '<div>Hello mobile</div>');

        addDeliveryLoaderBar('mobile', draw);

      }, {
        multiplier: 1,
        wait: 20
      });
    }
  } else {
    // Desktop
    const bag = document.querySelector('.c-header .dropdown-menu');
    if(bag) {
      addPoller([
        () => {
          return !!bag.querySelector('.c-popover');
        }
      ], () => {
        // showNewSuccessMessage();
        // alert('this is desktop');

        // bag.insertAdjacentHTML('beforeend', '<div>Hello desktop</div>');

        addDeliveryLoaderBar('desktop', bag);
        
      }, {
        multiplier: 1,
        wait: 20
      });
    }
  }
};

export const updateLoader = () => {
  const { ID, VARIATION } = shared;

  let miniBasket;
  if (document.querySelector('.c-drawer--bag')) {
    miniBasket = document.querySelector('.c-drawer--bag');
  } else if (document.querySelector('.c-header .dropdown-menu')) {
    miniBasket = document.querySelector('.c-header .dropdown-menu');
  }
  console.log('>>>inside update loader');
  let remainingAmount = calculateFreeDeliveryRemainingAmount(miniBasket);
  let siteMinTotal = getSiteDeliveryThreshold();
  // siteMinTotal = siteMinTotal.amount;
  if (remainingAmount <= siteMinTotal.amount) {
    document.querySelector(`.${ID}-freeDelivery__wrapper`).setAttribute('style', 'display: block;');

    let percentage = calculateLoader(siteMinTotal);

    if (percentage < 100) {
      document.querySelector(`.${ID}-freeDelivery__wrapper .${ID}-freeDelivery__msg span.amount`).innerHTML = remainingAmount.toFixed(2);
      document.querySelector(`.${ID}-freeDelivery__wrapper .${ID}-loader .loader-fill`).setAttribute('style', `width: ${percentage}%;`);

      document.querySelector(`.${ID}-freeDelivery__wrapper`).removeAttribute('style');
    } else {
      document.querySelector(`.${ID}-freeDelivery__wrapper`).setAttribute('style', 'display: none;');
    }
    
  } else {
    document.querySelector(`.${ID}-freeDelivery__wrapper`).setAttribute('style', 'display: none;');
  }
  

  

}