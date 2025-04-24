import { observer, events, pollerLite, getCookie, setCookie } from '../../../../../lib/utils';

export default () => {
  const moveEl = (el, ref, pos) => {
    if (!el || !ref) return;

    ref.insertAdjacentElement(pos, el);
  }

  const addHTML = (ref, html, pos) => {
    if (!html || !ref) return;

    ref.insertAdjacentHTML(pos, html);
  }

  const wrap = document.querySelector('.input_here');
  const blueText = document.querySelector('.item_info .notifications');
  const buttons = document.querySelector('.item_info .navTab-holder');

  const form = document.querySelector('#addToCartForm');
  if (form) {
    form.setAttribute('autcomplete', 'off');
  }

  // RE Jig Checkboxs and Blue text above
  moveEl(blueText, buttons, 'afterend');

  addHTML(buttons, `
      <div class="HSSUpdates-title">
          <h2>Collect or Deliver?</h2>
      </div>
      `, 'afterbegin');


  addHTML(blueText, `
      <div class="HSSUpdates-helpText">
          <div class="HS-collectText">
          <p>Enter your postcode</p>
          </div>

          <div class="HS-deliverText">
          <p>Enter your postcode</p>
          </div>
      </div>
      `, 'afterend');

  // Attach a new buttons event
  buttons.addEventListener('click', (e) => {
    const thisLi = e.target.closest('li');
    if (thisLi) {
      if (thisLi.classList.contains('delivery_head')) {
        wrap.classList.add('HS-delivery');
      } else {
        wrap.classList.remove('HS-delivery');
      }
    }
  });

  // Change input placeholders
  const delInput = document.querySelector('input#deliveryGeocodingPDP');
  const colInput = document.querySelector('input#branchNameForAvailCheckPDP');
  const colInputTwo = document.querySelector('input#branchNameForAvailCheck')

  delInput ? delInput.setAttribute('placeholder', 'Start typing and enter your postcode...') : null
  colInput ? colInput.setAttribute('placeholder', 'Start typing and enter your postcode...') : null
  colInputTwo ? colInputTwo.setAttribute('placeholder', 'Start typing and enter your postcode...') : null

  delInput ? delInput.setAttribute('type', 'search') : null
  colInput ? colInput.setAttribute('type', 'search') : null
  colInputTwo ? colInputTwo.setAttribute('type', 'search') : null

  // delInput ? delInput.value = '' : null;
  // colInput ? colInput.value = '' : null;

  // Detect input lengths and add class
  delInput.addEventListener('keypress', (e) => {
    if (e.target.value.length > 2) {
      wrap.classList.add('HS-showDates')
    } else {
      wrap.classList.add('HS-showDates')
    }
  });

  // Chevk for initial value
  if (delInput && delInput.value && delInput.value.length > 2) {
    wrap.classList.add('HS-showDates')
  }

  colInput.addEventListener('keypress', (e) => {
    if (e.target.value.length > 2) {
      wrap.classList.add('HS-showDates')
    } else {
      wrap.classList.add('HS-showDates')
    }
  });


  if (colInput && colInput.value && colInput.value.length > 2) {
    wrap.classList.add('HS-showDates')
  }


  colInputTwo.addEventListener('keypress', (e) => {
    if (e.target.value.length > 2) {
      wrap.classList.add('HS-showDates')
    } else {
      wrap.classList.add('HS-showDates')
    }
  });


  if (colInputTwo && colInputTwo.value && colInputTwo.value.length > 2) {
    wrap.classList.add('HS-showDates')
  }

  // ---------------------------------
  // Set input values on load
  // ---------------------------------
  setTimeout(() => {
    if (delInput.value == '') {
      if (getCookie('HS-delInput')) {
        const delVal = getCookie('HS-delInput');

        delInput.value = delVal;
        delInput.dispatchEvent(new Event('change'));

        const delExtra = getCookie('HS-delInputExtra');
        try {
          const ourJason = JSON.parse(delExtra);
          Object.keys(ourJason).forEach(j => {
            const input = document.querySelector(`.check_input_delivery [name="${j}"]`);
            if (input) {
              input.value = ourJason[j];
            }
          });
        } catch (e) {}
      }
    }
    if (colInput.value == '') {
      if (getCookie('HS-colInput')) {
        const delVal = getCookie('HS-colInput');

        colInput.value = delVal;
        //colInput.dispatchEvent(new Event('keypress'));
      }
    }
    if (colInputTwo.value == '') {
      if (getCookie('HS-colInputTwo')) {
        const delVal = getCookie('HS-colInputTwo');

        colInputTwo.value = delVal;
        //colInputTwo.dispatchEvent(new Event('keypress'));
      }
    }

    // Check for filled inputs
    if (delInput.value !== '') {
      wrap.classList.add('HS-showDates')
    }
    if (colInput.value !== '') {
      wrap.classList.add('HS-showDates')
    }
    if (colInputTwo.value !== '') {
      wrap.classList.add('HS-showDates')
    }
  }, 1000);

  // On CTA press store address input
  const submitBtn = document.querySelector('#selectUserSeeAvailButton');
  const addressInput = document.querySelector('input#branchNameForAvailCheck');


  if (getCookie('HS-input')) {
    const ckVal = getCookie('HS-input');

    addressInput.value = ckVal;
    addressInput.dispatchEvent(new Event('keypress'));
  }

  submitBtn.addEventListener('click', () => {
    setCookie('HS-input', addressInput.value);

    if (delInput.value !== '') {
      setCookie('HS-delInput', delInput.value);
    }
    if (colInput.value !== '') {
      setCookie('HS-colInput', colInput.value);
    }
    if (colInputTwo.value !== '') {
      setCookie('HS-colInputTwo', colInputTwo.value);
    }
  });


  const contentArea = document.querySelector('#tabContent');

  // Check for filled inputs
  if (delInput.value !== '') {
    wrap.classList.add('HS-showDates')
  }
  if (colInput.value !== '') {
    wrap.classList.add('HS-showDates')
  }
  if (colInputTwo.value !== '') {
    wrap.classList.add('HS-showDates')
  }


  observer.connect(contentArea, () => {
    const calPopup = document.querySelector('#ui-datepicker-div');

    //if (delInput.value == '') {
    //  if (getCookie('HS-delInput')) {
    //    const delVal = getCookie('HS-delInput');
    //
    //    delInput.value = delVal;
    //    //delInput.dispatchEvent(new Event('keypress'));
    //  }
    //}
    //if (colInput.value == '') {
    //  if (getCookie('HS-colInput')) {
    //    const delVal = getCookie('HS-colInput');
    //
    //    colInput.value = delVal;
    //    //colInput.dispatchEvent(new Event('keypress'));
    //  }
    //}
    //if (colInputTwo.value == '') {
    //  if (getCookie('HS-colInputTwo')) {
    //    const delVal = getCookie('HS-colInputTwo');
    //
    //    colInputTwo.value = delVal;
    //    //colInputTwo.dispatchEvent(new Event('keypress'));
    //  }
    //}

    setTimeout(() => {
      if (delInput.value == '') {
        if (getCookie('HS-delInput')) {
          const delVal = getCookie('HS-delInput');

          delInput.value = delVal;
          //delInput.dispatchEvent(new Event('keypress'));
        }
      }
      if (colInput.value == '') {
        if (getCookie('HS-colInput')) {
          const delVal = getCookie('HS-colInput');

          colInput.value = delVal;
          //colInput.dispatchEvent(new Event('keypress'));
        }
      }
      if (colInputTwo.value == '') {
        if (getCookie('HS-colInputTwo')) {
          const delVal = getCookie('HS-colInputTwo');

          colInputTwo.value = delVal;
          //colInputTwo.dispatchEvent(new Event('keypress'));
        }
      }

      // Store cookie
      if (delInput.value !== '') {
        setCookie('HS-delInput', delInput.value);
        setCookie('HS-delInputExtra', JSON.stringify({
          'addressLine1': document.querySelector('.check_input_delivery [name=addressLine1]')?.value,
          'addressLine2': document.querySelector('.check_input_delivery [name=addressLine2]')?.value,
          'addressLine3': document.querySelector('.check_input_delivery [name=addressLine3]')?.value,
          'addressCity': document.querySelector('.check_input_delivery [name=addressCity]')?.value,
          'addressCountry': document.querySelector('.check_input_delivery [name=addressCountry]')?.value,
          'postCodeForAddress': document.querySelector('.check_input_delivery [name=postCodeForAddress]')?.value,
        }));
      }

      if (colInput.value !== '') {
        setCookie('HS-colInput', colInput.value);
      }

      if (colInputTwo.value !== '') {
        setCookie('HS-colInputTwo', colInputTwo.value);
      }
    }, 1000);
  }, {
    config: {
      attributes: true,
      childList: true,
      subtree: true
    }
  });
}