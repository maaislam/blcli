import {
  fullStory,
  events,
} from '../../../../../lib/utils';
import settings from './settings';

const {
  ID,
  VARIATION
} = settings;

/**
 * Standard experiment setup
 */
function setup() {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
}

function generateHint(version, obj) {
  var isOlderThan1y;
  var orderDate;
  var curSizeLength;
  var size;
  var code;
  var notCancelled = false;
  var match = false;
  var reference = document.querySelector('.c-product-details__title .c-product-details__code').textContent.trim();
  var element = document.createElement('div');
  element.classList.add(`${ID}_hintWrap`);
  obj.records.forEach(function (record) {
    var despatched = record.despatched;
    var shopSale = record.shopSale;
    if (despatched.length > 0) {
      despatched.forEach(function (item) {
        item.despatchedLines.forEach(function (despatcheditem) {
          curSizeLength = Object.keys(despatcheditem.size).length;
          orderDate = despatcheditem.orderDate;
          var ts = Date.parse(orderDate);
          var result = (ts + 31536000000) > (+new Date);
          if(result){
            isOlderThan1y = false;
          }
          code = despatcheditem.styleCode;
          size = despatcheditem.size.size;
        });
        notCancelled = true;
        if (code === reference && curSizeLength === 1 && isOlderThan1y === false) {
          match = true;
          localStorage.setItem('styleCode', JSON.stringify(code));
        }
      });
    } else if (shopSale.length > 0) {
      shopSale.forEach(function (item) {
        curSizeLength = Object.keys(item.size).length;
        orderDate = item.orderDate;
        var ts = Date.parse(orderDate);
        var result = (ts + 31536000000) > (+new Date);
        if(result){
          isOlderThan1y = false;
        }
        code = item.styleCode;
        size = item.size;
        notCancelled = true;
        if (code === reference && curSizeLength === 1 && isOlderThan1y === false) {
          match = true;
          localStorage.setItem('styleCode', JSON.stringify(code));
        }
      });
    }
  });
  if (notCancelled && match) {
    switch (version) {
      case '1':
        element.innerHTML = `
          <div class="${ID}_hint">
              <span class="${ID}_hint__notice ${window.innerWidth <= 768 ? 'mobile' : ''}"><b>You've previously bought this style in a ${size}</b></span>
          </div>
        `;
        break;
      case '2':
        element.innerHTML = `
          <div class="${ID}_hint ${ID}_hint--v2">
            <span class="${ID}_hint__notice">You've previously bought this style of bra in a <strong>${size}</strong></span>
          </div>
        `;
        break;
      case '3':
        element.innerHTML = `
          <div class="${ID}_hint ${ID}_hint--v3">
            <div class="${ID}_hint__notice"><span>${size}</span> <p>You've previously bought this style of bra in a</p></div>
          </div>
        `;
        break;
      default:
        break;
    }
    if (window.innerWidth < 768) {
      if(!document.querySelector(`.${ID}_hint`)){
        document.querySelector('.c-product-details__style-colours').insertAdjacentElement('afterend', element);
      }
      document.querySelector(`.${ID}_hint`).addEventListener('click', function () {
        events.send(ID, 'User clicked', 'previously-bought-cta');
        window.location = '/account/orders-and-returns/';
      });
      if(document.querySelector(`.${ID}_loaderWrap`)){
        document.querySelector(`.${ID}_loaderWrap`).remove();
      }
      document.querySelector('.c-page__main .l-grid__unit:last-child').classList.remove(`${ID}_loader`);
    } else {
      if(!document.querySelector(`.${ID}_hint`)){
        document.querySelector('.c-button--save-item__container').insertAdjacentElement('beforebegin', element);
      }
      document.querySelector(`.${ID}_hint`).addEventListener('click', function () {
        events.send(ID, 'User clicked', 'previously-bought-cta');
        window.location = '/account/orders-and-returns/';
      });
      if(document.querySelector(`.${ID}_loaderWrap`)){
        document.querySelector(`.${ID}_loaderWrap`).remove();
      }
      document.querySelector('.c-page__main .l-grid__unit:last-child').classList.remove(`${ID}_loader`);
    }
  }
}

function getHistory(version) {
  if(window.dataLayer[3].user){
    // document.querySelector('.c-page__main .l-grid__unit:last-child').classList.add(`${ID}_loader`);
    // const loader = document.createElement('div');
    // loader.classList.add(`${ID}_loaderWrap`);
    // loader.classList.add('BV008-loader');
    // loader.innerHTML = `
    //   <svg version="1.1" id="L4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    //     viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
    //     <circle fill="#f1466f" stroke="none" cx="25" cy="50" r="6">
    //       <animate
    //         attributeName="opacity"
    //         dur="1s"
    //         values="0;1;0"
    //         repeatCount="indefinite"
    //         begin="0.1"/>    
    //     </circle>
    //     <circle fill="#f1466f" stroke="none" cx="50" cy="50" r="6">
    //       <animate
    //         attributeName="opacity"
    //         dur="1s"
    //         values="0;1;0"
    //         repeatCount="indefinite" 
    //         begin="0.2"/>       
    //     </circle>
    //     <circle fill="#f1466f" stroke="none" cx="75" cy="50" r="6">
    //       <animate
    //         attributeName="opacity"
    //         dur="1s"
    //         values="0;1;0"
    //         repeatCount="indefinite" 
    //         begin="0.3"/>     
    //     </circle>
    //   </svg>
    // `;
    // document.querySelector('.c-page__main .l-grid__unit:last-child').insertAdjacentElement('afterbegin', loader);
    // setTimeout(() => {
    //   [].forEach.call(document.querySelectorAll('.BV008-loader'), (loader) => {
    //     if (loader && loader.parentNode) {
    //       loader.parentNode.removeChild(loader);
    //     }
    //   });
      // Force :before styles off
    //   const el = document.querySelector('.BV008_loader');
    //   if (el) {
    //     el.classList.add('BV008-removeLoader');
    //   }
    // }, 2000);
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
  
      if (xhr.readyState !== 4) return;
  
      if (xhr.status >= 200 && xhr.status < 300) {
        var resp = JSON.parse(xhr.response);
        generateHint(version, resp);
      } else {
        console.log('Unable to fetch data.');
      }
    };
    xhr.open('GET', 'https://www.bravissimo.com/api/orders?page=1&endDate=%7B%22years%22%3A%202%7D');
    xhr.send();
    // setTimeout(() => {
    //   [].forEach.call(document.querySelectorAll('.BV008-loader'), (loader) => {
    //     if (loader && loader.parentNode) {
    //       loader.parentNode.removeChild(loader);
    //     }
    //   });
    //   // Force :before styles off
    //   const el = document.querySelector('.BV008_loader');
    //   if (el) {
    //     el.classList.add('BV008-removeLoader');
    //   }
    // }, 1000);
  }
}

export {
  setup,
  getHistory,
}; // eslint-disable-line
