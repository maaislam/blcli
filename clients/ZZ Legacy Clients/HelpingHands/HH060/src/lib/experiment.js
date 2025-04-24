/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';
import { events } from '../../../../../lib/utils';

export default () => {
  setup();

  const hero = document.querySelector('#hero');
  const heroBtn = document.querySelector('#hero .btn-block');
  if (hero && heroBtn) {
    events.send(`${shared.ID}-${shared.VARIATION}`, 'Initialised');

    heroBtn.parentNode.innerHTML = `
      <div class="${shared.ID}-jobwrap">
        <div class="${shared.ID}-jobwrap__slide1">
          <div class="${shared.ID}-jobwrap__inner">
            <div class="HH027_separator">or</div>

            <h2>Are you an existing customer or job seeker?</h2>
            <p>Click the link below to find the pages you need</p>

            <p>
              <a class="btn btn-default btn-block ${shared.ID}-init" 
                role="button">Find the correct contact details</a>
            </p>
          </div>
        </div>

        <div class="${shared.ID}-jobwrap__slide2">
          <div class="${shared.ID}-jobwrap__inner">
            <div>
              <h2>Existing Customers</h2>
              <p>Find your local branch number</p>

              <p>
                <a class="btn btn-default btn-block ${shared.ID}-existing-link ${shared.ID}-bg-teal" 
                  href="https://www.helpinghandshomecare.co.uk/existing-customers/"
                  role="button">Existing Customers</a>
              </p>
            </div>

            <div>
              <h2>Jobs</h2>
              <p>See our job postings</p>

              <p>
                <a class="btn btn-default btn-block ${shared.ID}-jobs-link ${shared.ID}-bg-pink" 
                  href="https://www.helpinghandshomecare.co.uk/jobs/"
                  role="button">Jobs</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    `;

    const slide1 = document.querySelector(`.${shared.ID}-jobwrap__slide1`);
    const slide2 = document.querySelector(`.${shared.ID}-jobwrap__slide2`);
    const init = document.querySelector(`.${shared.ID}-init`);

    if (init && slide1 && slide2) {
      init.addEventListener('click', () => {
        slide1.classList.add(`${shared.ID}-hide`);
        slide2.classList.add(`${shared.ID}-show`);

        hero.classList.add(`${shared.ID}-hero--active`);

        events.send(`${shared.ID}-${shared.VARIATION}`, 'Click', 'Init Link');

        if (window.innerWidth < 500 && window.scrollY > 350) {
          window.scroll({
            top: 340,
            behavior: 'smooth',
          });
        }
      });
    }

    const existingLink = document.querySelector(`.${shared.ID}-existing-link`);
    const jobsLink = document.querySelector(`.${shared.ID}-jobs-link`);

    if (existingLink) {
      existingLink.addEventListener('click', () => {
        events.send(`${shared.ID}-${shared.VARIATION}`, 'Click', 'Existing Link');
      });
    }
    if (jobsLink) {
      jobsLink.addEventListener('click', () => {
        events.send(`${shared.ID}-${shared.VARIATION}`, 'Click', 'Jobs Link');
      });
    }
  }
};
