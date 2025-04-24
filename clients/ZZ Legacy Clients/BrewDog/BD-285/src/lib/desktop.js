import data from './data';
import { h, render } from 'preact';
import DesktopSlidingNav from './components/DesktopSlidingNav';
import shared from '../../../../../core-files/shared';

export default () => {
  document.body.classList.add(`${shared.ID}-desktop`);

  const pageWrap = document.querySelector('.page-wrapper');
  if(pageWrap) {
    pageWrap.insertAdjacentHTML('afterend', `
      <div class="${shared.ID}-wrapper"></div>
    `);

    const wrapper = document.querySelector(`.${shared.ID}-wrapper`);

    const loggedIn = !!document.querySelector('a[href="https://www.brewdog.com/uk/customer/account/logout/"]');

    const salutation = '';
    const handleClose = () => {
      wrapper.classList.remove(`${shared.ID}-wrapper--active`);
    };

    // Extra Nav Links
    const extraNavContent = (
      <div className="DesktopSlidingNav__extra-nav">
        <h2>Our Headliners</h2>
        <div class="DesktopSlidingNav__extra-nav-inner">
          <div class="DesktopSlidingNav__extra-nav-item">
            <a href="/uk/the-headliners-24-x-can" class="DesktopSlidingNav__extra-nav-item-inner">
              <img src="https://ucds.ams3.digitaloceanspaces.com/BD-285/headlinerspack.jpg" />
              <h3>Headliners Pack</h3>
              <p>A full-tilt fruit machine of a New England IPA.</p>
            </a>
          </div>
          <div class="DesktopSlidingNav__extra-nav-item">
            <a href="/uk/punk-ipa-24-x-can" class="DesktopSlidingNav__extra-nav-item-inner">
              <img src="https://ucds.ams3.digitaloceanspaces.com/BD-285/punkipa.jpg" />
              <h3>Punk IPA</h3>
              <p>A full-tilt fruit machine of a New England IPA. Punk IPA.</p>
            </a>
          </div>
          <div class="DesktopSlidingNav__extra-nav-item">
            <a href="https://www.brewdog.com/uk/lost-lager-24-x-can" class="DesktopSlidingNav__extra-nav-item-inner">
              <img src="https://ucds.ams3.digitaloceanspaces.com/BD-285/hllostlager.jpg" />
              <h3>Lost Lager</h3>
              <p>A full-tilt fruit machine of a New England IPA. Lost Lager.</p>
            </a>
          </div>
          <div class="DesktopSlidingNav__extra-nav-item">
            <a href="https://www.brewdog.com/catalog/product/view/id/8812/s/hazy-jane-5/category/914/" class="DesktopSlidingNav__extra-nav-item-inner">
              <img src="https://ucds.ams3.digitaloceanspaces.com/BD-285/punkipa.jpg" />
              <h3>Hazy Jane</h3>
              <p>Hazy Jane... A full-tilt fruit machine of a New England IPA. Hazy Jane.</p>
            </a>
          </div>
          <div class="DesktopSlidingNav__extra-nav-item">
            <a href="https://www.brewdog.com/uk/elvis-juice-4-can" class="DesktopSlidingNav__extra-nav-item-inner">
              <img src="https://ucds.ams3.digitaloceanspaces.com/BD-285/headlinerspack.jpg" />
              <h3>Elvis Juice</h3>
              <p>Elvis. Juice. A full-tilt fruit machine of a New England IPA. Elvis Juice.</p>
            </a>
          </div>
        </div>
      </div>
    );

    // ----------------------
		// Render Nav
    // ----------------------
    render((
      <DesktopSlidingNav 
        defaultGroup='Shop'
        loggedIn={loggedIn}
        extraMenuContent={extraNavContent}
        data={data} salutation={salutation} closeHandler={handleClose}
      >
      </DesktopSlidingNav>
    ), wrapper);
    
    // ----------------------
		// Replace existing nav & initialise menu
    // ----------------------
    const headerLinks = document.querySelector('.header');
    if(headerLinks) {
      headerLinks.insertAdjacentHTML('afterbegin', `
        <div class="${shared.ID}-links">
          <div class="${shared.ID}-links__inner">
            <a>Shop</a>
            <a>Visit</a>
            <a>Community</a>
            ${loggedIn ? `<a href="/customer/account">My Account</a>` : ''}
          </div>
        </div>
      `);

      const links = document.querySelector(`.${shared.ID}-links`);
      if(links) {
        links.addEventListener('mouseenter', () => {
          wrapper.classList.add(`${shared.ID}-wrapper--active`);
          wrapper.classList.add(`${shared.ID}-wrapper--desktop`);
        });
      }
    }

    // ----------------------
    // Event tracking
    // ----------------------
    wrapper.addEventListener('click', e => {
      const groupItem = e.target.closest('.DesktopSlidingNav__groups-item');
      if(groupItem) {
        fireEvent('Click Group Item - ' + groupItem.innerText.trim());
      }

      const extraLinks = e.target.closest('.DesktopSlidingNav__extra-links');
      const extraLinksLink = e.target.closest('a[href]');
      if(extraLinks && extraLinksLink) {
        fireEvent('Click Extra Link - ' + extraLinksLink.innerText.trim());
      }
    });

    [].forEach.call(document.querySelectorAll('.DesktopSlidingNav__level-1 .DesktopSlidingNav__listing li a'), l => {
      l.addEventListener('click', (e) => {
        fireEvent('Click Level 1 - ' + e.currentTarget.innerText.trim());
      });
    });

    [].forEach.call(document.querySelectorAll('.DesktopSlidingNav__level-2 .DesktopSlidingNav__listing li a'), l => {
      l.addEventListener('click', (e) => {
        fireEvent('Click Level 2 - ' + e.currentTarget.innerText.trim());
      });
    });

    [].forEach.call(document.querySelectorAll('.DesktopSlidingNav__wbcircle'), l => {
      l.addEventListener('click', (e) => {
        fireEvent('Click Circle - ' + e.currentTarget.innerText.trim());
      });
    });

    [].forEach.call(document.querySelectorAll('.DesktopSlidingNav__extra-nav h2 a'), l => {
      l.addEventListener('click', (e) => {
        fireEvent('Click See All');
      });
    });

    [].forEach.call(document.querySelectorAll('.DesktopSlidingNav__extra li a'), l => {
      l.addEventListener('click', (e) => {
        fireEvent('Click Secondary Nav Link - ' + e.currentTarget.innerText.trim());
      });
    });

    [].forEach.call(document.querySelectorAll('.DesktopSlidingNav__back'), l => {
      l.addEventListener('click', (e) => {
        fireEvent('Click Menu Link Back - ' + e.currentTarget.innerText.trim());
      });
    });
  }
};
