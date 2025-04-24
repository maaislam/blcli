/**
 * RC059 - Where we train course options
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import shared from './shared';

const { ID, VARIATION } = shared;


export default () => {
  setup();

  // Write experiment code here
  const breadcrumbs = document.querySelectorAll('.breadcrumb nav ol li');
  const lastBreadcrumb = breadcrumbs[breadcrumbs.length -1];
  const str = lastBreadcrumb.querySelector('a').innerText.trim();
  // --- Get location from breadcrumbs
  const location = str.split('-')[0].replace(' ', '');

  const venueDetails = document.querySelector('.venue-details-location');
  const iconLocation = venueDetails.querySelector('.icon-location');
  // --- Add Location Title
  iconLocation.insertAdjacentHTML('afterend', `<span class="${shared.ID}-location">${location}</span>`);

  const phoneEl = document.querySelector('.venue-details-number').parentNode;

  // --- Move Venue Map
  const venueMap = document.querySelector('.venue-details-map');
  phoneEl.insertAdjacentElement('afterend', venueMap);

  const links = document.querySelectorAll('.venue-details-link');
  const workplaceLink = links[1];
  workplaceLink.querySelector('a span').innerText = '> View work courses';
  const workplaceLinkEl = workplaceLink.parentNode;
  workplaceLinkEl.classList.add(`${shared.ID}-workplace__wrapper`);
  workplaceLink.querySelector('a').setAttribute('href', '/courses/first-aid-at-work-courses-uk-mainland/');

  // --- Add right courses content
  const workplaceContent = `<div class="${shared.ID}-course__image workplace__img"></div>
  <div class="${shared.ID}-course__title">
    <p>First aid at work courses</p>
  </div>
  <div class="${shared.ID}-course__text">
    <p>First aid training will give you the confidence to help your child, friends, family or even a stranger when they need it.</p>
  </div>`;

  document.querySelector(`.${shared.ID}-workplace__wrapper`).insertAdjacentHTML('afterbegin', workplaceContent);

  const publicLink = links[2];
  publicLink.querySelector('a span').innerText = '> View public courses';
  const publicLinkEl = publicLink.parentNode;
  publicLinkEl.classList.add(`${shared.ID}-public__wrapper`);
  publicLink.querySelector('a').setAttribute('href', '/courses/public-first-aid-courses/');

  const publicContent = `<div class="${shared.ID}-course__image public__img"></div>
  <div class="${shared.ID}-course__title">
    <p>Public first aid courses</p>
  </div>
  <div class="${shared.ID}-course__text">
    <p>For more than 35 years we have worked with companies of all types to reduce risks and save lives in the workplace.</p>
  </div>`;

  document.querySelector(`.${shared.ID}-public__wrapper`).insertAdjacentHTML('afterbegin', publicContent);

  const mainContainer = document.querySelector('.venue-details-info');

  const rightContainer = `<div class="${shared.ID}-courses__wrapper">
    <div class="${shared.ID}-courses__title">
      <a href='/courses/'>Find a course </a>
    </div>
  </div>`;
  mainContainer.insertAdjacentHTML('afterend', rightContainer);
  const coursesWrapper = document.querySelector(`.${shared.ID}-courses__wrapper`);
  coursesWrapper.insertAdjacentElement('beforeend', workplaceLinkEl);
  coursesWrapper.insertAdjacentElement('beforeend', publicLinkEl);


  // ---- Mobile View
  if (window.innerWidth < 768) {
    const viewMapContainer = `<span class="${shared.ID}-viewMap__wrapper">
      <p>View map</p>
      <span class="icon-menu-arrow">
        <svg role="presentation" width="10" height="15" viewBox="0 0 10 15" version="1.1" xmlns="http://www.w3.org/2000/svg" focusable="false">
          <title>Arrow icon</title>
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g transform="translate(-281 -169)" fill="#262626">
              <g transform="translate(0 60)"><g transform="translate(20 91)">
                <path d="M259.071 20.071h9v2h-8v8h-2v-10h1z" transform="rotate(135 263.071 25.071)"></path>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </span>
    </span>`;
    const getDirectionsEl = document.querySelector('p.venue-details-link.venue-details-directions');
    getDirectionsEl.insertAdjacentHTML('afterend', viewMapContainer);

    const viewMapLink = document.querySelector(`.${shared.ID}-viewMap__wrapper`);
    const viewMapIcon = document.querySelector(`.${shared.ID}-viewMap__wrapper .icon-menu-arrow svg`);
    viewMapLink.addEventListener('click', () => {
      venueMap.classList.toggle('show');

      if (venueMap.classList.contains('show')) {
        viewMapIcon.classList.add('mapOpen');
      } else {
        viewMapIcon.classList.remove('mapOpen');
      }
    });
  }
  
};
