/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { onFormPage } from './on-form-page';
import { onPaketePage } from './on-pakete-page';

const { VARIATION } = shared;

export default () => {
  setup();

  fireEvent('Conditions Met');

  // Control / v1 tracking of interactions
  if (window.location.pathname === '/pakete/') {
    const optionsDiv = document.querySelector('#page-wrapper');

    if(optionsDiv) {
      optionsDiv.addEventListener('click', e => {

        // Aktivieren button click
        if(e.target.closest('.swiper-slide a.btn-green')) {
          const article = e.target.closest('article');
          if(article) {
            const title = article.querySelector('h3');

            if(title) {
              const eventName = title.innerText.trim();
              fireEvent(`Click - choose option - ${eventName}`);
            }
          }
        }

        // Labels in v1
        if(e.target.closest(`.${shared.ID}-item__free-months`)) {
          const article = e.target.closest(`.${shared.ID}-item`);
          if(article) {
            const title = article.querySelector('h4');

            if(title) {
              const eventName = title.innerText.trim();
              fireEvent(`Click - Free-label - ${eventName}`);
            }
          }
        }

        if(e.target.closest(`.${shared.ID}-premium-item-step`)) {
          const article = e.target.closest(`.${shared.ID}-item-wrapper`);
          if(article) {
            const title = article.querySelector('h4');

            if(title) {
              const eventName = title.innerText.trim();
              fireEvent(`Click - Premium-label - ${eventName}`);
            }
          }
        }

        // User clicked app button
        if(e.target.closest('.btn.px-2')) {
          const btn = e.target.closest('.btn.px-2');
          const btnText = btn.innerText.trim();

          if(btnText.match(/SAT-TV/i)) {
            fireEvent(`Click - user clicked tab button - SAT-TV Pakete`);
          } else if(btnText.match(/TV-APP/i)) {
            fireEvent(`Click - user clicked tab button - TV-App Pakete`);
          } else {
            fireEvent(`Click - user clicked tab button - ${btnText.toLowerCase()}`);
          }
        }
      });
    }
  }

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') return;

  if (window.location.pathname === '/pakete/') onPaketePage();

  if (window.location.pathname === '/hardware/paketauswahl/') onFormPage();
};
