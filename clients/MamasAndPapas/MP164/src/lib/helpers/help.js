import { getCookie, setCookie } from '../../../../../../lib/utils';
import { pollerLite } from '../../../../../../lib/uc-lib';

/**
 * @desc Returns page event, e.g PLP
 */
export const whatPage = () => {
  if (document.body) {
    // PDP
    if (document.body.classList.contains('pageType-ProductPage')) {
      return 'PDP'
    }
    // PLP
    if (document.body.classList.contains('pageType-CategoryPage')) {
      return 'PLP'
    }
  }
};

/**
 * @desc builds and adds the modal to the DOM.
 * @param {Element} ref if null, will be document.body
 * @param {String} pos if null, will be 'beforeend'
 * @param {String} message 
 */
export const buildModal = (ref, pos, message) => {
  if (!ref) {
    ref = document.body;
  }

  // Check if message is a strin
  ref.insertAdjacentHTML(pos ? pos : 'beforeend', `
    <div class="MP164-PDP--modal">
      <span class="close">
        <i class="ico ico-cross close-btn closeBtn"></i>
      </span>
      ${message ? message.outerHTML : '<p>Placeholder message here...</p>'}
    </div>
  `);
};

/**
 * @desc Runs the callback function after passed seconds.
 * @param {Int} milSecs 
 * @param {Function} cb 
 */
export const timer = (milSecs, cb) => {
  setTimeout(() => {
    cb();
  }, milSecs);
};

/**
 * @desc Checks whether cookie is stored after seeing modal.
 */
export const seenModal = () => {
  const c = getCookie('MP164-shown');
  if (c) {
    return true;
  } else {
    return false;
  }
};

/**
 * @desc Shows modal.
 */
export const showModal = () => {
  const addedModal = document.querySelector('.MP164-PDP--modal');
  if (addedModal) {
    addedModal.classList.add('show');

    const closeBtn = addedModal.querySelector('span.close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        addedModal.classList.remove('show');
        setCookie('MP164-shown', 'true', 1);
      });
    }
  }
};

/**
 * @desc Attaches event to mobile title, if title is touched,
 * run callback function.
 * @param {Function} cb 
 */
export const titleTrigger = (cb) => {
  const title = document.querySelector('.pdp__header.pdp-mobile h2');
  if (title) {
    title.addEventListener('touchstart', (e) => {
      console.log('touched');
      cb();
    });
  }
}

/**
 * @desc Builds up the message
 * This is decided on a few parameters, e.g price.
 */
export const whatMessage = () => {
  // Check for price match
  const priceMatchEl = document.querySelector('.js-detailPane .pdp__header__subheading.top-0');

  const messageToReturn = document.createElement('div');

  // Get the delivery data
  var options = { weekday: 'long', month: 'long', day: 'numeric' };
  const { product } = window.universal_variable;
  const { unit_sale_price } = product;
  let d = new Date();
  let delDay = d.setDate(d.getDate() + 5);
  // let delDate = d.setDate(d.getDay() + 5);
  // let delMonth = d.getMonth();
  // console.log('month ', delMonth);
  // console.log('day ', delDate);
  // var weekday = new Array(7);
  //   weekday[0] = "Sunday";
  //   weekday[1] = "Monday";
  //   weekday[2] = "Tuesday";
  //   weekday[3] = "Wednesday";
  //   weekday[4] = "Thursday";
  //   weekday[5] = "Friday";
  //   weekday[6] = "Saturday";
  // var n = weekday[d.getDay()];
  const theDate = new Intl.DateTimeFormat('en-GB', options).format(delDay);


  // Over £50
  if (unit_sale_price >= 50) {
    
    // return `
    //   <p>Free Standard Delivery</p>
    //   <p>Buy this product today and get it by ${n} at the latest</p>
    // `
    messageToReturn.insertAdjacentHTML('beforeend', `
      <p><span class="star"></span> <span>Free Standard Delivery</span></p>
    `);
  }

  // Under 50
  if (unit_sale_price < 50) {
    messageToReturn.insertAdjacentHTML('beforeend', `
      <p><span class="star"></span> <span>Spend over £50 to qualify for free delivery</span></p>
    `);
  }

  // 2 year guarantee
  messageToReturn.insertAdjacentHTML('beforeend', `
    <p><span class="star"></span> Comes with a <span>2 year Guarantee</span></p>
  `);

  // Check rating.
  pollerLite(['.feefo-review-badge-wrapper-product span.feefowidget-reviews-total'], () => {
    const feefoEl = document.querySelector('.feefo-review-badge-wrapper-product span.feefowidget-reviews-total');
    console.log('feelo el', feefoEl);
    if (feefoEl) {
      const feefoRating = feefoEl.textContent.replace(/\(|\)/g, '');
      const rating = parseFloat(feefoRating);
  
      if (rating >= 4) {
        messageToReturn.insertAdjacentHTML('beforeend', `
          <p><span class="star"></span> <span>Highly rated</span> by other customers</p>
        `);
      }
    }
  });

  // Price Match
  pollerLite(['.pdp__header.pdp-mobile h2'], () => {
    if (priceMatchEl && priceMatchEl.textContent) {
      const title = document.querySelector('.pdp__header.pdp-mobile h2');
      // return `
      //   <p>Price Match Guarantee. We’re the cheapest price for this item, offering a price match guarantee</p>
      //   <p>${title.textContent} is selling out fast</p>
      // `;
      messageToReturn.insertAdjacentHTML('beforeend', `
        <p><span class="star"></span> <span>Price matched</span> against our competitors</p>
      `);
    }
  });

  // Get it
  messageToReturn.insertAdjacentHTML('beforeend', `
    <p><span class="star"></span> Get it by <span>${theDate}<span></p>
  `);

  return messageToReturn;

};