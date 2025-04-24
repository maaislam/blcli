/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { cacheDom } from '../../../../../lib/cache-dom';
import { observer, events } from '../../../../../lib/utils';
import settings from './shared';

events.analyticsReference = '_gaUAT';


export default () => {
  setup();

  const { ID, VARIATION } = settings;

  if (VARIATION == 3) { // Control
    events.send(ID, `${ID} Control', 'Control is active`);
    return false;
  } else {
    events.send(ID, `${ID} Variation ${VARIATION}', 'Test is active`);
  }

  const headerRef = cacheDom.get('.CheckoutHeader');
  const totalSpan = document.querySelector('span#TotalValue');
  const bodyWrap = cacheDom.get('#BodyWrap');
  const headerEl = cacheDom.get('#BodyWrap > header');
  const headerHeight = headerEl.clientHeight;
  let difference = totalSpan.textContent;
  

  const updateTotal = (el, amount) => {
    if (el && amount) {
      el.textContent = '';
      el.insertAdjacentHTML('beforeend', `
        ${amount}
        <span></span>
      `)
      events.send(ID, 'SD021 Total Update');

      // console.log('before diff ,', difference);
      difference = parseFloat(difference) - parseFloat(amount);
      // console.log('after diff ,', difference);
    }
  };


  const showBanner = (bannerEl) => {
    if (!bannerEl) return;
    if (!bannerEl.classList.contains('SD-show')) {
      bannerEl.classList.add('SD-show');
      events.send(ID, 'SD021 Banner Shown');
      setTimeout(() => {
        bannerEl.classList.remove('SD-show');
      }, 4000);
    }
  }


  // Add to header initially
  if (totalSpan && !document.querySelector(`.${ID}-headerTotal`)) {
    headerRef.insertAdjacentHTML('beforeend', `
      <div class="${ID}-headerTotal">
        <p>${totalSpan.textContent} <span></span></p>
      </div>
    `);
  }


  // Add notification banner
  const wrap = cacheDom.get('#BodyWrap');
  
  wrap.insertAdjacentHTML('beforeend', `
    <div class="${ID}-notificationBanner" style="opacity: 0; visibility: hidden; ${VARIATION == 1 && `top: ${headerHeight ? headerHeight + 10 : '57'}px"`}>
      <p>Your basket has been updated <span class="SD-tick"></span></p>
    </div>
  `);

  const notificationBannerEl = document.querySelector('.SD021-notificationBanner');


  // Store added el
  const headerTotal = document.querySelector('.SD021-headerTotal p');
  

  // Observer the original total now
  setTimeout(() => {
    observer.connect(totalSpan, () => {
      const totalSpanText = totalSpan.textContent;
      if (totalSpanText && totalSpanText !== headerTotal.textContent) {
        updateTotal(headerTotal, totalSpanText);
  
        showBanner(notificationBannerEl);
      }
    }, {
      config: {
        attributes: false, 
        childList: true,
        subtree: true,
      }
    });
  }, 500);


  // Window scroll for fixed header
  
  window.addEventListener('scroll', (e) => {
  
    if (window.scrollY > headerHeight) {
      bodyWrap.classList.add('onScroll');
    } else if (window.scrollY < headerHeight) {
      bodyWrap.classList.remove('onScroll');
    }
  });


 
  // Header total, on click, scroll to summary
  const summaryEl = document.getElementById('TotalRow');
  headerTotal ? headerTotal.addEventListener('click', () => {
    
    if (summaryEl) {
      events.send(ID, 'SD021 Click', 'Clicks on down arrow');
      summaryEl.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
    }
  }) : null;


};
