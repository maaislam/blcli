import sizeGuide from './sizeGuide';
import { getCookie, setCookie, events } from '../../../../../lib/utils';
import settings from './settings';

const buildModule = {
  render: {
    renderGuide(gender, country) {
      // Set to UK as default
      const ukGuideToUse = sizeGuide('uk');
      const usGuideToUse = sizeGuide('us');

      const htmlGuide = document.createElement('div');
      htmlGuide.classList.add('ME168-sizes');
      for (let key in ukGuideToUse) {
        if (!ukGuideToUse.hasOwnProperty(key)) continue;
        const objectUk = ukGuideToUse[key];
        const sizeRow = `
          <div class="ME168-size ME168-uk-size ME168-show">
            <p>${key}</p>
            <p class="ME168-gender-1 ME168-gender-active">${objectUk[1]}</p>
            <p class="ME168-gender-0">${objectUk[0]}</p>
          </div>
        `;
        htmlGuide.insertAdjacentHTML('beforeend', sizeRow);
      }
      for (let key in usGuideToUse) {
        if (!usGuideToUse.hasOwnProperty(key)) continue;
        const objectUs = usGuideToUse[key];
        const sizeRow = `
          <div class="ME168-size ME168-us-size">
            <p>${key}</p>
            <p class="ME168-gender-1 ME168-gender-active">${objectUs[1]}</p>
            <p class="ME168-gender-0">${objectUs[0]}</p>
          </div>
        `;
        htmlGuide.insertAdjacentHTML('beforeend', sizeRow);
      }
      return htmlGuide;
    },
    addHTML(gender, country) {
      let showUsSizes = false;
      if (wc_aelia_currency_switcher_params.selected_currency === 'USD') {
        showUsSizes = true;
      }
      const html = `
        <div class="ME168-sizeGuide">
        <div class="ME168-container">
            <div class="ME168-close">
              <span></span><span></span>
            </div>
            <h2>Merchoid Size Guide</h2>

            <div class="ME168-country">
              ${showUsSizes ? '<p>Currently showing <span id="ME168-country-name">US</span> Sizing <span id="ME168-change-country" class="ME168-us"> Change</span></p>' : '<p>Currently showing <span id="ME168-country-name">UK</span> Sizing <span id="ME168-change-country" class="ME168-uk"> Change</span></p>'}
            </div>

            <div class="ME168-gender">
              <ul>
                <li data-val="M" class="ME168-gender-choice">
                  <p>Men</p>
                </li>
                <li data-val="F" class="ME168-gender-choice">
                  <p>Women</p>
                </li>
              </ul>
            </div>

              ${this.renderGuide(gender, country).outerHTML}

            <div class="ME168-copy">
              <p>Worried about sizing? Don't be! With our <strong>100 day returns policy</strong>, if you're not happy with anything you can send your stuff back to us</p>
            </div>
          </div>
        </div>
      `;
      const existingElement = document.querySelector('.ME168-sizeGuide');
      if (existingElement) {
        existingElement.parentNode.removeChild(existingElement);
      }
      document.body.insertAdjacentHTML('beforeend', html);
      events.send(settings.ID, 'Active', 'Size Guide is Active', { sendOnce: true });
    },
  },
  toggle: {
    addEvents() {
      // Query elements
      const sizeGuideEl = document.querySelector('.ME168-sizeGuide');
      const sizeTable = document.querySelector('.ME168-sizes');
      const male = sizeTable.querySelectorAll('.ME168-gender-1');
      const female = sizeTable.querySelectorAll('.ME168-gender-0');
      const genderChoice = document.querySelectorAll('.ME168-gender .ME168-gender-choice');
      
      // Click event for gender
      const clickEvent = (el) => {
        const activeGender = document.querySelector('.ME168-active-gender');
        if (activeGender) {
          activeGender.classList.remove('ME168-active-gender');
        }
        if (el) {
          const gender = el.getAttribute('data-val');
          // Male
          if (gender === 'M') {
            el.classList.add('ME168-active-gender');
            setCookie('ME168-gender', 'M', 999);

            for (let j = 0; female.length > j; j += 1) {
              female[j].classList.remove('ME168-gender-active');
            }
            for (let m = 0; male.length > m; m += 1) {
              male[m].classList.add('ME168-gender-active');
            }
          }
          // Female
          if (gender === 'F') {
            el.classList.add('ME168-active-gender');
            setCookie('ME168-gender', 'F', 999);
            
            for (let j = 0; female.length > j; j += 1) {
              female[j].classList.add('ME168-gender-active');
            }
            for (let m = 0; male.length > m; m += 1) {
              male[m].classList.remove('ME168-gender-active');
            }
          }
        }
      };
      
      if (genderChoice.length) {
        for (let i = 0; genderChoice.length > i; i += 1) {
          genderChoice[i].addEventListener('click', () => {
            clickEvent(genderChoice[i]);
            events.send(settings.ID, 'Click', 'Toggled Gender', { sendOnce: true });
          });
        }
      }
      
      // Country change selector
      const countryChange = document.getElementById('ME168-change-country');
      const countryText = document.getElementById('ME168-country-name');
      const UKSizes = document.querySelectorAll('.ME168-size.ME168-uk-size');
      const USSizes = document.querySelectorAll('.ME168-size.ME168-us-size');

      if (countryChange) {
        countryChange.addEventListener('click', (e) => {
          if (e.currentTarget.classList.contains('ME168-uk')) {
            setTimeout(() => {
              countryChange.classList.remove('ME168-uk');
              countryChange.classList.add('ME168-us');
              countryText.innerText = 'US';
              for (let i = 0; UKSizes.length > i; i += 1) {
                UKSizes[i].classList.remove('ME168-show');
              }
              for (let i = 0; USSizes.length > i; i += 1) {
                USSizes[i].classList.add('ME168-show');
              }
            }, 200);
          }
          if (e.currentTarget.classList.contains('ME168-us')) {
            setTimeout(() => {
              countryChange.classList.remove('ME168-us');
              countryChange.classList.add('ME168-uk');
              countryText.innerText = 'UK';
              for (let i = 0; UKSizes.length > i; i += 1) {
                UKSizes[i].classList.add('ME168-show');
              }
              for (let i = 0; USSizes.length > i; i += 1) {
                USSizes[i].classList.remove('ME168-show');
              }
            }, 200);
          }
          events.send(settings.ID, 'Click', 'User changed country', { sendOnce: true });
        });
      }

      // Close btn
      const close = document.querySelector('.ME168-close');
      if (close) {
        close.addEventListener('click', () => {
          sizeGuideEl.classList.remove('ME168-show-guide');
          events.send(settings.ID, 'Click', 'Close size guide', { sendOnce: true });
        });
      }
    },
    openGuide() {
      const sizeGuideEl = document.querySelector('.ME168-sizeGuide');
      const sizeGuideCta = document.querySelector('.size-guide-wrapper a.size-guide-init');
      if (sizeGuideCta) {
        sizeGuideCta.addEventListener('click', (e) => {
          e.preventDefault();
          sizeGuideEl.classList.add('ME168-show-guide');
          events.send(settings.ID, 'Saw', 'User saw size guide');
        });
      }
    },
    setGender() {
      const sizeTable = document.querySelector('.ME168-sizes');
      const male = sizeTable.querySelectorAll('.ME168-gender-1');
      const female = sizeTable.querySelectorAll('.ME168-gender-0');
      const genderChoice = document.querySelectorAll('.ME168-gender .ME168-gender-choice');
      // Check for Gender cookie
      const genderCookie = getCookie('ME168-gender');

      if (genderCookie) {
        const activeGender = document.querySelector('.ME168-active-gender');
        if (activeGender) {
          activeGender.classList.remove('ME168-active-gender');
        }
        // Male
        if (genderCookie === 'M') {
          genderChoice[0].classList.add('ME168-active-gender');
          for (let j = 0; female.length > j; j += 1) {
            female[j].classList.remove('ME168-gender-active');
          }
          for (let m = 0; male.length > m; m += 1) {
            male[m].classList.add('ME168-gender-active');
          }
        }
        // Female
        if (genderCookie === 'F') {
          genderChoice[1].classList.add('ME168-active-gender');
          for (let j = 0; female.length > j; j += 1) {
            female[j].classList.add('ME168-gender-active');
          }
          for (let m = 0; male.length > m; m += 1) {
            male[m].classList.remove('ME168-gender-active');
          }
        }
      }
    },
  },
};
export default buildModule;
