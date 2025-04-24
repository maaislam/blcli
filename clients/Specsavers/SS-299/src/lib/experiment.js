/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const bannerConfig = [
  {
    title: 'How do I amend my appointment?',
    text: 'Find everything you need to know to amend appointments and rebook for a better time.',
  },
  {
    title: 'Easily change your appointment date and time',
    text: 'Find everything you need to know to amend appointments and rebook for a better time.',
  }
];

export default () => {

  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  document.addEventListener('click', e => {
    if(e.target.closest(`.${ID}-ah--accordion`)) {
      fireEvent('Toggle Accordion');
    }
    if(e.target.closest(`.${ID}-cta`)) {
      fireEvent('Click Store Locator CTA');
    }
    if(e.target.closest(`.dev-smooth_accordion-toggle`)) {
      fireEvent('Open Email Example');
    }
    if(e.target.closest(`.${ID}-ac a`)) {
      fireEvent('Click Content Link - ' + e.target.closest(`.${ID}-ac a`).innerText);
    }
  });

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(VARIATION == 'control') {
    return;
  }

  const existingBanner = document.querySelector('.node-content-html5 header');

  // -----------------------------
  // Overtake Banner
  // -----------------------------
  const title = bannerConfig[VARIATION % 2 == 0 ? 1 : 0].title;
  const desc = bannerConfig[VARIATION % 2 == 0 ? 1 : 0].text;

  const bannerMarkup = `
    <div class="${ID}-bm">
      <h1>${title}</h1>
      <p>${desc}</p>
    </div>
  `;

  existingBanner.querySelector('.container').innerHTML = bannerMarkup;
  
  // -----------------------------
  // Create new markup
  // -----------------------------
  const pageMarkup = `
    <div class="${ID}-row">
      <div class="${ID}-a ${ID}-email">
        <div class="${ID}-ah">
          <img src="http://sb.monetate.net/img/1/1319/4145913.jpg" width="30" height="24">
          <h2>${VARIATION % 2 == 0 ? 'Check' : 'From'} your booking email</h2>
        </div>

        <div class="${ID}-ac">
          <div class="${ID}-ac__inner">
            <p>
              For eye tests that have been booked online you’ll find a link to amend your appointment in your booking 
              <strong>confirmation email</strong>. You can easily amend the date and the time of your 
              appointment.
            </p>
            <p>
              If you are unable to find your original confirmation email contact your store directly. 
              <a href="/stores">Find your store</a>
            </p>
          </div>
        </div>
      </div>
      <div class="${ID}-a">
        <div class="${ID}-ah">
          <img src="http://sb.monetate.net/img/1/1319/4145917.jpg" width="30" height="24">
          <h2>${VARIATION % 2 == 0 ? 'Call' : 'Get in touch with'} your local store</h2>
        </div>

        <div class="${ID}-ac">
          <div class="${ID}-ac__inner">
            <p>
              Just get back in touch with the <a href="/stores">store</a> and you can change your 
                appointment over the phone or in person.
            </p>
            <p>
              Hearing appointments cannot currently be amended online, so you will need to contact your store.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="${ID}-b">
      <h2>Find your store's details</h2>
      <p>
        <a class="${ID}-cta" href="/stores">Go to store locator</a>
      </p>
    </div>
    <div class="${ID}-row">
      <div class="${ID}-c">
        If you wish to change an appointment to a different type or store, the easiest way is to 
        cancel the current appointment and make a new booking.
      </div>
    </div>
  `;

  existingBanner.insertAdjacentHTML('afterend', pageMarkup);

  // Add the email dropdown to markup
  const target = document.querySelector(`.${ID}-email .${ID}-ac__inner`);
  const accord = document.querySelector('.dev-section .dev-smooth_accordion');

  if(target && accord) {
    target.insertAdjacentElement('beforeend', accord);

    let added = false;
    accord.addEventListener('click', e => {
      if(!added) {
        accord.querySelector('.dev-section')?.insertAdjacentHTML?.('afterbegin', `
          <div class="${ID}-email-info">
            <p>Email address: <strong>appointment@bookings.specsavers.co.uk</strong></p>
            <p>Subject line: <strong>Appointment booked</strong></p>
          </div>
        `);

        added=true;
      }
    });
  }

  // Hide existing content
  [].forEach.call(document.querySelectorAll(`.${ID}-row ~ .banner`), b => b.classList.add(`${ID}-hide`));

  // Collapsed accordions, applies on devices < 767px
  // and for variations 3 and 4
  if(VARIATION == 3 || VARIATION == 4) {
    [].forEach.call(document.querySelectorAll(`.${ID}-ah`), h => {
      h.classList.add(`${ID}-ah--accordion`);

      h.classList.add(`${ID}-ah--hidden`);
      h.nextElementSibling.classList.add(`${ID}-ac--hidden`);

      h.addEventListener('click', e => {
        h.classList.toggle(`${ID}-ah--hidden`);
        h.nextElementSibling.classList.toggle(`${ID}-ac--hidden`);
      });
    });
  }
  
};
