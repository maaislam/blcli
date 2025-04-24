/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { checkIntersection } from '../../../../../evelyn/scrolling';
import { elementIsInView } from '../../../../../lib/utils';
import { observer } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

export default () => {

  setup();

  fireEvent('Conditions Met');
  
  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  const markup = `
    <div class="${ID}-dc">
    <div class="${ID}-dc__inner">
      <h2 class="h-sm">Is your prescription up to date?</h2>
      <p>Enter your last prescription date below</p>
      <div class="${ID}-dc__form">
        <select class="${ID}-dc__form-field" name="${ID}-dc__form-day" placeholder="DD"
          required
        >
          <option value="" disabled selected>DD</option>
          <option value="01">01</option>
          <option value="02">02</option>
          <option value="03">03</option>
          <option value="04">04</option>
          <option value="05">05</option>
          <option value="06">06</option>
          <option value="07">07</option>
          <option value="08">08</option>
          <option value="09">09</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
          <option value="21">21</option>
          <option value="22">22</option>
          <option value="23">23</option>
          <option value="24">24</option>
          <option value="25">25</option>
          <option value="26">26</option>
          <option value="27">27</option>
          <option value="28">28</option>
          <option value="29">29</option>
          <option value="30">30</option>
          <option value="31">31</option>
        </select>

        <span class="${ID}-dc__form-sep">/</span>

        <select class="${ID}-dc__form-field" name="${ID}-dc__form-month" placeholder="MM"
          required
        >
          <option value="" disabled selected>MM</option>
          <option value="01">01</option>
          <option value="02">02</option>
          <option value="03">03</option>
          <option value="04">04</option>
          <option value="05">05</option>
          <option value="06">06</option>
          <option value="07">07</option>
          <option value="08">08</option>
          <option value="09">09</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </select>

        <span class="${ID}-dc__form-sep">/</span>

        <select class="${ID}-dc__form-field" name="${ID}-dc__form-year" placeholder="YYYY" required>
          <option value="" disabled selected>YYYY</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
          <option value="2014">Pre-2015</option>
        </select>
      </div>
      <div class="${ID}-dc__results">
        <p class="${ID}-dc__result-text"></p>

        <div class="${ID}-dc__buttons">
          <a href="/book/location" class="${ID}-book">Book an eye test</a>
        </div>
      </div>
    </div>
    </div>
  `;

  const render = () => {
  
    const w = window.innerWidth;

    let posAfter = 0;
    if(480 < w && w < 992) {
      posAfter = 1;
    } else if(w >= 992) {
      posAfter = 2;
    }

    const items = document.querySelectorAll('.ss-plp-frames__container--frame');
    if(items && items[posAfter]) {
      items[posAfter].insertAdjacentHTML('afterend', markup);
    } else {
      items[items.length-1].insertAdjacentHTML('afterend', markup);
    }

    // -----------------------------
    // Logic Handling
    // -----------------------------
    const validator = () => {
      const d = document.querySelector(`[name="${ID}-dc__form-day"]`);
      const m = document.querySelector(`[name="${ID}-dc__form-month"]`);
      const y = document.querySelector(`[name="${ID}-dc__form-year"]`);

      if(d.value && m.value && y.value) {
        const ds = `${y.value}-${m.value}-${d.value}`;
        const date = new Date(ds);
        const now = new Date();

        if(date != 'Invalid Date') {
          const ageYears = (now - date) / 86400000 / 365;

          const txtElm = document.querySelector(`.${ID}-dc__result-text`);
          const resultsElm = document.querySelector(`.${ID}-dc__results`);

          const monthsLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

          if(y.value % 4 == 0) {
            monthsLength[1] = 29;
          }

          const invalidDay = monthsLength[m.value - 1] < d.value;

          if(txtElm && resultsElm) {
            if(!invalidDay && (ageYears > 0 && ageYears < 2)) {
              resultsElm.classList.add(`${ID}-dc__results--success`);
              resultsElm.classList.remove(`${ID}-dc__results--error`);
              resultsElm.classList.remove(`${ID}-dc__results--show-btn`);

              txtElm.innerHTML = 'Your prescription is up to date';

              fireEvent('Up to Date Prescription');
            } else {
              resultsElm.classList.add(`${ID}-dc__results--error`);
              resultsElm.classList.remove(`${ID}-dc__results--success`);
              resultsElm.classList.remove(`${ID}-dc__results--show-btn`);

              let msg = 'Your prescription is out of date';
              if(ageYears < 0) {
                msg = 'Please select a date in the past';
              } else if(isNaN(ageYears)) {
                msg = 'Please select a valid date';
              } else if(invalidDay) {
                msg = 'Please select a valid day and month';
              } else {
                // Only show button for valid date but out of date prescription
                resultsElm.classList.add(`${ID}-dc__results--show-btn`);
              }

              txtElm.innerHTML = msg;

              fireEvent('Out of Date Prescription');
            }
          }
        }
      }
    }

    [].forEach.call(document.querySelectorAll(`.${ID}-dc__form-field`), f => {
      f.addEventListener('change', e => {
        e.stopPropagation();

        fireEvent('Date Interaction', true);

        validator();
      });
    });

    // -----------------------------
    // Other Event Tracking
    // -----------------------------
    const book = document.querySelector(`.${ID}-book`);
    if(book) {
      book.addEventListener('click', e => {
        fireEvent('Clicked Book Button');
      });
    }

    const dc = document.querySelector(`.${ID}-dc`);
    if(dc) {
      if(elementIsInView(dc)) {
        fireEvent('In View', true);
      } else {
        checkIntersection(dc).then(e => {
          fireEvent('In View', true);
        });
      }
    }
  }

  const reRun = () => {
    [].forEach.call(document.querySelectorAll(`.${ID}-dc`), d => {
      d.remove();
    });

    render();
  };

  render();

  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      reRun();
    }, 2000);
  });

  const l = document.querySelector('.ss-plp-frames__container > div');
  if(l) {
    observer.connect(l, () => {
      setTimeout(() => {
        reRun();
      });
    }, {
      config: {
        childList: true,
        subtree: false
      }
    });
  }
};
