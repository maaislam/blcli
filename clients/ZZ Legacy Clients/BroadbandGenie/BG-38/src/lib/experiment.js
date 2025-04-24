/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from './services';
import shared from './shared';
import throttle from 'lodash/throttle';

export default () => {
  if(localStorage.getItem(`${shared.ID}-closed`)) {
    return;
  }

  setup();

  let scrollEventFired = false;

  // Add pop
  const main = document.querySelector('.k-page-main');
  if(main) {

    fireEvent('Conditions Met');
  
    // Check scroll
    window.addEventListener('scroll', throttle(() => {
      // ---------------------
      // If postcode entered, don't show box
      // ---------------------
      if(window.location.href.match(/postcode=/)) {
        return;
      }

      // ---------------------
      // Check scroll position
      // ---------------------
      const checker = document.querySelector('.k-hero__text .pc-checker');
      const pcFilled = document.querySelector('.k-page-main .pc-filled');
      if(checker || pcFilled) {
        let checkerBb = checker.getBoundingClientRect();
        let pcFilledBb = pcFilled.getBoundingClientRect();

        if(checkerBb.height == 0) {
          checkerBb = pcFilledBb;
        }

        const nudgeBox = document.querySelector(`.${shared.ID}-nudge`);

        if(checkerBb.y < 0 && Math.abs(checkerBb.y) > checkerBb.height + 20) {
          if(scrollEventFired === false) {
            fireEvent('Visible After Scroll')
            scrollEventFired = true;
          }

          if(nudgeBox) {
            nudgeBox.classList.add(`${shared.ID}-nudge--show`);
          }
        } else if(nudgeBox) {
          nudgeBox.classList.remove(`${shared.ID}-nudge--show`);
        }
      }
    }, 200));

    if(shared.VARIATION == 'control') {
      return;
    }

    main.insertAdjacentHTML('beforeend', `
      <div class="${shared.ID}-nudge">
        <div class="${shared.ID}-nudge__inner">
          <h3>Check availability in your area</h3>

          <a class="${shared.ID}-nudge__close">&times;</a>

          <form class="${shared.ID}-checker" action="">
            <div class="${shared.ID}-checker__wrap -check">
              <img class="${shared.ID}-checker__searchicon" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTciIGhlaWdodD0iMTciIHZpZXdCb3g9IjAgMCAxNyAxNyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTcgMTJDMTAuMDM3NiAxMiAxMi41IDkuNTM3NTcgMTIuNSA2LjVDMTIuNSAzLjQ2MjQzIDEwLjAzNzYgMSA3IDFDMy45NjI0MyAxIDEuNSAzLjQ2MjQzIDEuNSA2LjVDMS41IDkuNTM3NTcgMy45NjI0MyAxMiA3IDEyWiIgc3Ryb2tlPSIjNkI2QjZFIiBzdHJva2Utd2lkdGg9IjIiLz4KPHBhdGggZD0iTTEzIDEyLjVMMTYgMTUuNSIgc3Ryb2tlPSIjNkI2QjZFIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K">
              <input value="" class="${shared.ID}-checker__input js--${shared.ID}-checker__input" id="${shared.ID}-checker__input" name="postcode" type="search" autocomplete="off" required="" placeholder="Your Postcode">
            </div>

            <button type="submit" class="${shared.ID}-checker__submit">Check<span> Availability</span></button>
          </form>
        </div>
        
      </div>
    `);

    const nudgeBox = document.querySelector(`.${shared.ID}-nudge`);
    const close = document.querySelector(`.${shared.ID}-nudge__close`);

    if(nudgeBox && close) {
      close.addEventListener('click', () => {
        fireEvent('Closed');

        nudgeBox.parentNode.removeChild(nudgeBox);
        localStorage.setItem(`${shared.ID}-closed`, 1);
      });
    }

    // Form submit
    const form = document.querySelector(`.${shared.ID}-checker`);
    const input = document.querySelector(`.${shared.ID}-checker__input`);

    if(form && input) {
      input.addEventListener('keyup', () => {
        input.setCustomValidity('');
        input.reportValidity();
      });

      form.addEventListener('submit', e => {
        e.preventDefault();

        if(window.checkPostCode(input.value) == false) {
          fireEvent('Invalid Postcode');

          input.setCustomValidity('Invalid postcode');

          input.reportValidity();
        } else {

          fireEvent('Submitted Form');

          const rand = (Math.random() * 100000).toFixed(0);
          const url = window.location.pathname + '?bgtest' + rand + '#postcode=' + input.value.replace(/\s/, '');
          window.location = url;
        }
      });
    }
  }


};
