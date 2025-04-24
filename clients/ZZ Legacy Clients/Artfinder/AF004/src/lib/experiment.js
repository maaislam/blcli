/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { observer, pollerLite } from '../../../../../lib/utils';
import settings from './shared';
import AF003Test from './AF003';

const { VARIATION, ID } = settings;

export default () => {
  setup();

  const middleWareInput = document.querySelector('input[name="csrfmiddlewaretoken"]');
  const middleWareVal = middleWareInput.value;
  
  let ref = document.querySelector('.af-box.mt0.mcb'); // 

  if (window.location.pathname === '/checkout/payment-method/') {
    ref = document.querySelector('.column.medium-5');
  }

  if (window.location.pathname.indexOf('shipping_address') > -1) {
    if (window.innerWidth < 649) {
      ref = document.querySelector('.medium-7.small-12.column.small-only-text-center');
    } else {
      ref = document.querySelector('.medium-5.small-12.column');
    }
  }

  // Check for promo banner
  pollerLite(['.offer-bar'], () => {
    const bannerEl = document.querySelector('.offer-bar');
    window.localStorage.setItem('DiscountBannerHTML', JSON.stringify(bannerEl.outerHTML));
  });

  const formHtml = `
    <form class="pad pad-m pad-responsive-for-small-only" id="AF-OG-form" action="/checkout/voucher/">
      <input type="hidden" name="csrfmiddlewaretoken" value="${middleWareVal ? middleWareVal : ''}">
      <label class="text-center mb40">
          <input class="mb0" type="text" name="discount_code" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="Promotional or Gift card code">
          <span class="control-group alert-input hidden js-error"></span>
      </label>
      <span class="help-block"></span>
      <p class="text-center">
          <button class="large-button last js-apply-voucher" id="popup-login-submit" type="submit">
              <span>Apply Code</span>
          </button>
      </p>
    </form>
  `;

  const toggleHtml = `
  <div class="AF004-discount af-box mt0 mcb">
    <div class="AF-toggle">
      <p>Apply promotional code or gift card</p> 
      <span class="AF-arrow"><i class="af-non-animated mini icon icon-arrow-down" data-toggle="assistance"></i><i class="af-non-animated mini icon icon-arrow-up af-hide" data-toggle="assistance"></i></span>
    </div>
    
    <div class="AF-form pad pad-m pad-responsive-for-small-only">

      <input type="text"  autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="Promotional or Gift card code"/>

      <button class="large-button last js-apply-voucer" id="AF-apply">
        <span>Apply Code</span>
      </button>

    </div>
    
  <div>`
  ;


  let refPos = 'beforebegin';
  if (window.location.pathname === '/checkout/payment-method/' || window.location.pathname.indexOf('shipping_address') > -1) {
    refPos = 'afterbegin';
  }

  // if (window.innerWidth < 649) {
  //   refPos = 'afterend';
  //   if (window.location.pathname.indexOf('shipping_address') > -1) {
  //     refPos = 'beforeend';
  //   }
  // }
  
  document.body.insertAdjacentHTML('afterbegin', formHtml);
  ref.insertAdjacentHTML(refPos, toggleHtml)

  const toggle = document.querySelector('.AF-toggle');

  const toggleFunc = (e) => e.currentTarget.classList.toggle('AF-active');

  toggle ? 
    toggle.addEventListener('click', (e) => toggleFunc(e))
  : null


  // Form input, copy to original.
  const input = document.querySelector('.AF-form input[type="text"]');
  const submit = document.querySelector('.AF-form button');

  const ogFormMsg = document.querySelector('#AF-OG-form span.js-error');
  const oldInput = document.querySelector('#AF-OG-form input[type="text"]');
  const oldSubmit = document.querySelector('#AF-OG-form button[type="submit"]');

  const resetIt = (input) => {
    if (!input || input.value.length < 1) return;

    oldInput.value = input.value;
    oldSubmit.click();

    input.value = '';
  };

  submit ? submit.addEventListener('click', (e) => {
    e.preventDefault();

    if (document.querySelector('.AF004-message')) {
      removeMessages()
    }

    resetIt(input);

    return;

  }) : null;


  input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      // code for enter
      resetIt(input);
    }

    removeMessages()
  });


  const removeMessages = () => {
    const els = document.querySelectorAll('.AF004-message');
    for (let i = 0; els.length > i; i += 1) {
      if (els[i] && els[i].parentNode) {
        els[i].parentNode.removeChild(els[i]);
      }
    }
  }

  // Observe for failure
  observer.connect(ogFormMsg, () => {
    const messageText = ogFormMsg.innerText;

    removeMessages();
    
    submit.insertAdjacentHTML('afterend', `
      <div class="AF004-message">
        <p>${messageText}</p>
      </div>
    `)

    const el = document.querySelector('.AF004-message');
    if (el && el.parentNode) {
      setTimeout(() => {
        el.parentNode.removeChild(el);        
      }, 8000);
    }
  }, {
    config: {
      attributes: true,
      childList: true,
      subtree: false,
    }
  });


  // Observer for success
  const discountRow = document.querySelector('#js-discount');
  observer.connect(discountRow, () => {
    const messageText = discountRow.innerText;

    removeMessages();

    setTimeout(() => {
      if (!discountRow.classList.contains('hide')) {
        submit.insertAdjacentHTML('afterend', `
          <div class="AF004-message AF-green">
            <p>${messageText}</p>
          </div>
        `)
    
        const el = document.querySelector('.AF004-message');
        if (el && el.parentNode) {
          setTimeout(() => {
            el.parentNode.removeChild(el);        
    
            toggle.click()
          }, 8000);
        }
      }
    }, 500);

    // pollerLite(['span[data-recalculate="code"]'], () => {
    //   const codeSpan = document.querySelector('span[data-recalculate="code"]');
    //   console.log({codeSpan});
    //   console.log(codeSpan.textContent)
    //   if (codeSpan.textContent !== 'None') {
        
    //   }

    // });

  }, {
    config: {
      attributes: true,
      childList: false,
      subtree: false,
    }
  })

  if (window.location.pathname.indexOf('shipping_address') > -1 && VARIATION == 2) {
    AF003Test();
  }
  

  pollerLite(['.off-canvas-wrap .inner-wrap'], () => {
    const discountRef = document.querySelector('.off-canvas-wrap .inner-wrap');
  
    if (window.location.href.indexOf('checkout/') > -1) {
      if (!document.querySelector('div[data-type="voucher"]')) {
        const storedHTML = window.localStorage.getItem('DiscountBannerHTML');
        if (!storedHTML) return;
  
        const html = JSON.parse(storedHTML);
  
        discountRef.insertAdjacentHTML('afterbegin', html);
  
        document.body.classList.add('AF-hideClick')
      }
    }
  });

  const bod = document.body;
  observer.connect(bod, () => {
    if (!bod.classList.contains(ID)) {
      bod.classList.add(ID);
    }
  }, {
    config: {
      attributes: true,
      childList: false,
      subtree: false
    }
  })
};
