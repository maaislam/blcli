import data from './data';
import MobileSlidingNav from './components/MobileSlidingNav';
import shared from '../../../../../core-files/shared';
import { h, render } from 'preact';

export default () => {
  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...
  const extraNavContent = (
    <div className="MobileSlidingNav__extra-nav">
      <h2>New to Brewdog?
        <a href="/uk/shop">See All</a>
      </h2>
      <div class="MobileSlidingNav__wbcircles">
        <div class="MobileSlidingNav__wbcircle">
          <a href="/uk/the-headliners-24-x-can" class="MobileSlidingNav__wbcircle-inner">
            <img src="https://ucds.ams3.digitaloceanspaces.com/BD-285/headlinerspack.jpg" />
            <p>Headliners Pack</p>
          </a>
        </div>
        <div class="MobileSlidingNav__wbcircle">
          <a href="/uk/punk-ipa-24-x-can" class="MobileSlidingNav__wbcircle-inner">
            <img src="https://ucds.ams3.digitaloceanspaces.com/BD-285/punkipa.jpg" />
            <p>Punk IPA</p>
          </a>
        </div>
        <div class="MobileSlidingNav__wbcircle">
          <a href="https://www.brewdog.com/uk/lost-lager-24-x-can" class="MobileSlidingNav__wbcircle-inner">
            <img src="https://ucds.ams3.digitaloceanspaces.com/BD-285/hllostlager.jpg" />
            <p>Lost Lager</p>
          </a>
        </div>
        <div class="MobileSlidingNav__wbcircle">
          <a href="https://www.brewdog.com/uk/lost-lager-24-x-can" class="MobileSlidingNav__wbcircle-inner">
            <img src="https://ucds.ams3.digitaloceanspaces.com/BD-285/hllostlager.jpg" />
            <p>Elvis Juice</p>
          </a>
        </div>
        <div class="MobileSlidingNav__wbcircle">
          <a href="https://www.brewdog.com/uk/lost-lager-24-x-can" class="MobileSlidingNav__wbcircle-inner">
            <img src="https://ucds.ams3.digitaloceanspaces.com/BD-285/hllostlager.jpg" />
            <p>Hazy Jane</p>
          </a>
        </div>
      </div>
    </div>
  );
  
  const pageWrap = document.querySelector('.page-wrapper');
  if(pageWrap) {
    pageWrap.insertAdjacentHTML('afterend', `
      <div class="${shared.ID}-wrapper"></div>
    `);

    const wrapper = document.querySelector(`.${shared.ID}-wrapper`);

    const salutation = '';
    const handleClose = () => {
      wrapper.classList.remove(`${shared.ID}-wrapper--active`);
    };

    // ----------------------
		// Render Nav
    // ----------------------
    render((
      <MobileSlidingNav 
        defaultGroup='Shop'
        extraNavContent={extraNavContent}
        data={data} salutation={salutation} handleClose={handleClose}
      >
        <div>
          <p>
            <a href="/uk/shop/shopall">
              <img className="xborder-radius-12" 
                src="https://ucds.ams3.digitaloceanspaces.com/BD-285/officially.jpg" />
            </a>
          </p>

          <p><a className="xdefault xbutton" href="/uk/shop/shopall">Order Now</a></p>

          <ul className="MobileSlidingNav__extra-links">
            <li><a href="/uk/customer/account/">My Account</a></li>
            <li><a href="/uk/customer-services/contact-us">Help</a></li>
            <li><a href="/uk/shop/returns-and-refunds">Delivery & Returns</a></li>
          </ul>
        </div>
      </MobileSlidingNav>
    ), wrapper);

    // ----------------------
		// Initialise Menu
    // ----------------------
    const menu = document.querySelector('.header-mobile__actions > .header-mobile__actions__action .nav-toggle');
    if(menu) {
      menu.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();

        wrapper.classList.add(`${shared.ID}-wrapper--active`);
      }, {
        capture: true // Useful to ensure existing listeners don't fire
      });
    }

    // ----------------------
    // Event tracking
    // ----------------------
    wrapper.addEventListener('click', e => {
      const groupItem = e.target.closest('.MobileSlidingNav__groups-item');
      if(groupItem) {
        fireEvent('Click Group Item - ' + groupItem.innerText.trim());
      }

      const extraLinks = e.target.closest('.MobileSlidingNav__extra-links');
      const extraLinksLink = e.target.closest('a[href]');
      if(extraLinks && extraLinksLink) {
        fireEvent('Click Extra Link - ' + extraLinksLink.innerText.trim());
      }
    });

    [].forEach.call(document.querySelectorAll('.MobileSlidingNav__level-1 .MobileSlidingNav__listing li a'), l => {
      l.addEventListener('click', (e) => {
        fireEvent('Click Level 1 - ' + e.currentTarget.innerText.trim());
      });
    });

    [].forEach.call(document.querySelectorAll('.MobileSlidingNav__level-2 .MobileSlidingNav__listing li a'), l => {
      l.addEventListener('click', (e) => {
        fireEvent('Click Level 2 - ' + e.currentTarget.innerText.trim());
      });
    });

    [].forEach.call(document.querySelectorAll('.MobileSlidingNav__wbcircle'), l => {
      l.addEventListener('click', (e) => {
        fireEvent('Click Circle - ' + e.currentTarget.innerText.trim());
      });
    });

    [].forEach.call(document.querySelectorAll('.MobileSlidingNav__extra-nav h2 a'), l => {
      l.addEventListener('click', (e) => {
        fireEvent('Click See All');
      });
    });

    [].forEach.call(document.querySelectorAll('.MobileSlidingNav__extra li a'), l => {
      l.addEventListener('click', (e) => {
        fireEvent('Click Secondary Nav Link - ' + e.currentTarget.innerText.trim());
      });
    });

    [].forEach.call(document.querySelectorAll('.MobileSlidingNav__back'), l => {
      l.addEventListener('click', (e) => {
        fireEvent('Click Menu Link Back - ' + e.currentTarget.innerText.trim());
      });
    });
  }
};
