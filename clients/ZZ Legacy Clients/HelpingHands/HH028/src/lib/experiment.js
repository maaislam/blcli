/**
 * HH028 - PPC Landing Page
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, getGoogleMaps } from './services';
import shared from './shared';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import dataContent from './data-content';

const { ID, VARIATION } = shared;

export default () => {
  setup();
  // getGoogleMaps();
  // Write experiment code here
  
  let device = '';
  if (innerWidth > 800) {
    device = 'desktop';
  } else {
    device = 'mobile';
  }
  const deviceClass = `${shared.ID}-${device}`;

  const mainBanner = document.querySelector(`#hero.title-bg`);
  mainBanner.classList.add(`${deviceClass}`);

  const phoneContent = document.querySelector('.phone-number.InfinityNumber');
  const phoneHref = phoneContent.getAttribute('href');
  const phoneData = phoneContent.getAttribute('data-ict-discovery-number');
  let phoneNumber = phoneContent.innerText.trim();

  phoneNumber = phoneNumber.replace(/\D*(\d{4})\D*(\d{3})\D*(\d{4})\D*/, '$1 $2 $3');

  mainBanner.setAttribute('style', 'background-image: url("https://www.helpinghandshomecare.co.uk/wp-content/uploads/1F4X1910.jpg")');
  mainBanner.classList.add(`${shared.ID}-banner__wrapper`);
  const bannerContent = `<div class="${shared.ID}-container container text-center">
    <p id="${shared.ID}-banner-heading">Call us today on:</p>
    <div class="${shared.ID}-call__wrapper">
      <div class="${shared.ID}-phone__icon"></div>
      <a class="${shared.ID}-call" href="${phoneHref}" data-ict-discovery-number="${phoneData}">${phoneNumber}</a>
    </div>
    <p class="${shared.ID}-banner-text">Alternatively, speak to someone face to face:</p>
    <a href="/about-us/contact-us/book-a-home-visit/" class="${shared.ID}-btn btn btn-default" role="button">Book a free home visit</a>
  </div>`;

  mainBanner.innerHTML = bannerContent;

  observer.connect(document.querySelector('.phone-number.InfinityNumber'), () => {
    // console.log('[048] --- SOMETHING CHANGED! --');
    const phoneContent = document.querySelector('.phone-number.InfinityNumber');
    const phoneHref = phoneContent.getAttribute('href');
    const phoneData = phoneContent.getAttribute('data-ict-discovery-number');
    let phoneNumber = phoneContent.innerText.trim();
    phoneNumber = phoneNumber.replace(/\D*(\d{4})\D*(\d{3})\D*(\d{4})\D*/, '$1 $2 $3');

    const updatedPhoneNumber = `<a class="${shared.ID}-call" href="${phoneHref}" data-ict-discovery-number="${phoneData}">${phoneNumber}</a>`;
    document.querySelector(`a.${shared.ID}-call`).outerHTML = updatedPhoneNumber;
  }, {
    throttle: 200,
    config: {
      attributes: true,
      childList: false,
      // subtree: true,
    },
  });

  const branchFinderContainer = `<div class="${shared.ID}-branchFinder__wrapper">
    <h2 class="${shared.ID}-branchFinder__title">Where do you need care?</h2>
    <form class="${shared.ID}_BranchFinder-form" id="locations-search" role="search" method="get" action="/locations-results/">
      <div class="row">
        <div class="col-xs-12">
          <div class="${shared.ID}_BranchFinder">
            <input class="${shared.ID}_BranchFinder-input" type="text" placeholder="Enter postcode or town" value="" name="loc" id="s" autocomplete="off">
            <button class="${shared.ID}_BranchFinder-cta" type="submit">Go!</button>
          </div>
          <div class="${shared.ID}_BranchFinder-error" style="display:none;">
            <p>Sorry, we didn’t recognise that location. Please double check the information or <a href="/about-us/contact-us/free-home-care-consultation/ ">contact us.</a></p>
          </div>
        </div>
      </div>
    </form>
  </div>`;

  let mainContent = '';

  for (const key in dataContent) {
    if (dataContent.hasOwnProperty(key)) {
      const content = dataContent[key];
      if (device === 'desktop') {
        mainContent += `<li class="${shared.ID}-main__tile">
        <div class="${shared.ID}-tile__image"></div>
        <div class="${shared.ID}-tile__content">
          ${content.title}
          ${content.text}
        </div>
      </li>`;
      } else if (device === 'mobile') {
        mainContent += `<li class="${shared.ID}-main__tile">
        ${content.title}
        <div class="${shared.ID}-tile__image"></div>
        <div class="${shared.ID}-tile__content">
          ${content.text}
        </div>
      </li>`;
      }
    }
  }

  const mainContainer = `<div class="${shared.ID}-main__wrapper ${deviceClass}">
    <div class="${shared.ID}-main__container">
      <h2 class="${shared.ID}-main__title">3 reasons to choose Helping Hands</h2>
      <ul class="${shared.ID}-main__content">
        ${mainContent}
      </ul>
    </div>
  </div>
  ${branchFinderContainer}`;
  
  const heroBanner = document.querySelector('div#hero');
  heroBanner.insertAdjacentHTML('afterend', mainContainer);

  if (innerWidth > 420) {
    window.addEventListener('resize', () => {   
      window.location.reload();
    });
  }
};
