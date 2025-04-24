import { fullStory, poller } from '../../../../../lib/utils';
import shared from './shared';
import { pollerLite } from '../../../../../lib/uc-lib';
import nextAvailable from './nextAvailable';

/**
 * Pass data to shared object
 * @param {Object} data
 */
export const share = (data) => {
  Object.keys(data).forEach((key) => {
    shared[key] = data[key];
  });
};

/**
 * Standard experiment setup
 */
export const setup = () => {
  const { ID, VARIATION } = shared;

  /** Use fullStory API to tag screen recording with experiment info */
  fullStory(ID, `Variation ${VARIATION}`);

  /** Namespace with body classes for easier CSS specificity */
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
};


export const checkOfficeHours = (startTime, endTime) => {
  const { ID, VARIATION } = shared;

  let currentDate = new Date();

  let startDate = new Date(currentDate.getTime());
  startDate.setHours(startTime.split(":")[0]);
  startDate.setMinutes(startTime.split(":")[1]);
  startDate.setSeconds(startTime.split(":")[2]);

  let endDate = new Date(currentDate.getTime());
  endDate.setHours(endTime.split(":")[0]);
  endDate.setMinutes(endTime.split(":")[1]);
  endDate.setSeconds(endTime.split(":")[2]);
  
  const valid = startDate < currentDate && endDate > currentDate;

  return valid;
};


export const addOutOfOfficeElementsDesktop = () => {
  const { ID, VARIATION } = shared;

  const navBarContainer = document.querySelector(`.navbar.navbar-default#main-nav`);
  const stickyNavContainer = document.querySelector(`.container-fluid.visible-lg.visible-md.HH035_stickyBar`);
  const newEl = `<div class="${shared.ID}-container__wrapper">
    <div class="${shared.ID}-container">Our offices are currently closed so please <a href="https://www.helpinghandshomecare.co.uk/about-us/contact-us/request-a-callback/">request a callback</a> and we will call you at a time that suits you</div>
  </div>`;

  navBarContainer.insertAdjacentHTML('beforebegin', newEl);

  stickyNavContainer.insertAdjacentHTML('afterend', newEl);

  const topMenu = document.querySelectorAll('ul#menu-top-menu')[1];
  const requestCallEl = topMenu.querySelector('li.request-a-call');
  requestCallEl.classList.add(`${shared.ID}-requestCall`);

  pollerLite(['.HH046-numbox.row div.col-xs-12'], () => {
    document.querySelectorAll('.HH046-numbox.row div.col-xs-12')[0].setAttribute('style', 'padding-top: 15px;');
  });
  // --- Purple box
  pollerLite(['.HH041-ctas .HH041-cta1'], () => {
    const hh041CTA = document.querySelector('.HH041-ctas .HH041-cta1');
    const paragraph = hh041CTA.querySelector('p');
    paragraph.innerHTML = `Our offices are currently closed but we can call you when we're open if you fill out this quick <a href="https://www.helpinghandshomecare.co.uk/about-us/contact-us/request-a-callback/">request a callback</a> form.`;
    paragraph.insertAdjacentHTML('afterend', `<p>Or, you can call from ${nextAvailable.availableHour} ${nextAvailable.availableDay}.</p>`);
  });
  pollerLite(['.HH046-infinity.InfinityNumber'], () => {
    document.querySelectorAll('a.HH046-infinity.InfinityNumber')[1].setAttribute('style', 'font-size: 2.3rem;');
    // const hh046CTA = document.querySelectorAll('.container-fluid.visible-lg.visible-md .HH046-infinity.InfinityNumber')[1];
    const paragraph = `<p class="${shared.ID}-outOfOffice" style="font-size: 12px !important;width: 100%;margin: auto;text-align: center;font-weight: 600;position: relative;top: -5px;">Our offices are currently closed. </br>Please <a href="https://www.helpinghandshomecare.co.uk/about-us/contact-us/request-a-callback/" style="font-size: 12px !important; color: #40B784; text-decoration: underline;">request a callback</a> and we can ring you.</p>`;
    document.querySelectorAll('span.HH046-numbox__info.glyphicon.glyphicon-info-sign')[0].insertAdjacentHTML('afterend', paragraph);
    document.querySelectorAll('span.HH046-numbox__info.glyphicon.glyphicon-info-sign')[1].insertAdjacentHTML('afterend', paragraph);
  });
  
};


export const addOutOfOfficeElementsMobile = () => {
  const { ID, VARIATION } = shared;

  pollerLite(['.HH044_section.HH044_section--care'], () => {
    document.querySelector('.HH044_section.HH044_section--care').classList.add(`${shared.ID}_section`);

    const ctaEl = document.querySelector('.HH044_callBtn');
    const ctaHref = document.querySelector('.HH044_callBtn #HH044_careNumber').getAttribute('href');
    const telNumber = ctaEl.innerText;

    ctaEl.innerText = `Request a callback`;
    ctaEl.outerHTML = `<div class="${shared.ID}_callBtn"><i class="${shared.ID}-glyphicon-earphone glyphicon glyphicon-earphone"></i><a href=${ctaHref}>Request a callback</a><div>`;
    // ----
    document.querySelector(`.${shared.ID}_callBtn a`).setAttribute('href', '/about-us/contact-us/request-a-callback/');

    const hh047text = `<div class='${shared.ID}-text__wrapper'>
      <div class='${shared.ID}-text'>
        <p>Our offices are currently closed but if you <a href='https://www.helpinghandshomecare.co.uk/about-us/contact-us/request-a-callback/'>request a callback</a>, we will get back to you!</p>
      </div>
    </div>`;
    document.querySelector(`.${shared.ID}_section`).insertAdjacentHTML('afterbegin', hh047text);

    const hh047subtext = `<div class="${shared.ID}_mobile HH044_section HH008_mobile">
      <p>
        <img src="/wp-content/uploads/icon-contact-experts.png">
        Our Experts are here to help, give us a call on <a href='${ctaHref}'>${telNumber}</a>. Our team is available from: <br> Mon - Fri: 8am - 7pm Sat &amp; Sun: 9am - 5:30pm
      </p>
    </div>`;
    document.querySelector('.HH044_section.HH008_mobile').outerHTML = `${hh047subtext}`;

    // --- Purple Box
    pollerLite(['.HH041-ctas .HH041-cta1'], () => {
      const hh041CTA = document.querySelector('.HH041-ctas .HH041-cta1');
      const paragraph = hh041CTA.querySelector('p');
      paragraph.innerHTML = `Our offices are currently closed but we can call you when we're open if you fill out this quick <a href="https://www.helpinghandshomecare.co.uk/about-us/contact-us/request-a-callback/">request a callback</a> form.`;
      paragraph.insertAdjacentHTML('afterend', `<p>Or, you can call from ${nextAvailable.availableHour} ${nextAvailable.availableDay}.</p>`);
    });
  });
};
