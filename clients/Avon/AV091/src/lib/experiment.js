/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, fireEvent } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';

const makeChanges = () => {

  // Top section changes

  const mobileNav = document.querySelector('#header-navigation-mobile');
  if (mobileNav) {

    // Top section changes
    const firstLevel = mobileNav.querySelector('.first-level');
    if (firstLevel) {
      const links = firstLevel.querySelectorAll('.first-level-listing');

      // Sale Link
      const saleLink = links[1].querySelector('a');
      if (saleLink) {
        saleLink.href = '/collections/sale';
        saleLink.innerText = 'Sale';
        saleLink.addEventListener('click', () => {
          fireEvent('Sale link clicked');
        })
      };

      // Sample shop link
      const sampleShopLink = links[2].querySelector('a');
      if (sampleShopLink) {
        sampleShopLink.href = '/collections/sample';
        sampleShopLink.innerText = 'Sample Shop';
      };

      // Handle About Avon
      const aboutLink = links[3].querySelector('a');
      if (aboutLink) {
        // aboutLink.style.display = 'none';
        const customerServicesLink = mobileNav.querySelectorAll('.footer-links-parent')[2];
        if (customerServicesLink) {
          customerServicesLink.insertAdjacentElement('afterend', links[3]);
          links[3].style.listStyle = 'none';
        }
      };

      // Bestsellers link
      const bestsellersLink = links[4].querySelector('a');
      if (bestsellersLink) {
        bestsellersLink.href = '/collections/bestsellers';
        bestsellersLink.innerText = 'Bestsellers';
      };

      // New links
      const newLink = links[5].querySelector('a');
      if (newLink) {
        newLink.href = '/collections/new';
        newLink.innerText = 'New';
      };
    };

    // Account section changes
    const accountSection = mobileNav.querySelector('#mobile-navigation-account');
    if (accountSection) {
    //   const links = accountSection.querySelectorAll('li');
    //   console.log(links)
    //   const newLink = `
    //     <li>
    //       <a href="https://rep.avon.uk.com/REPSuite/loginMain.page">
    //         Rep Login
    //       </a>
    //     </li>
    //   `;
    //   const newLink2 = `
    //   <li>
    //     <a href="/pages/store">
    //       Find My Rep
    //     </a>
    //   </li>
    // `;
    //   links[1].insertAdjacentHTML('afterend', newLink);
    //   links[1].insertAdjacentHTML('afterend', newLink2);
      accountSection.innerHTML = '';
      const accountLinks = `
        <li class="${shared.ID}__first-li">
          <a href="/account/login">
            Customer Login
          </a>
        </li>
        <li class="${shared.ID}__second-li">
          <a href="/account/register">
            Register
          </a>
        </li>
        <li class="${shared.ID}__last-li">
          <a href="/pages/store">
            Find My Rep
          </a>
        </li>
        <li class="${shared.ID}__rep-li">
          <a href="https://rep.avon.uk.com/REPSuite/loginMain.page">
            Rep Login
          </a>
        </li>
      `;
      accountSection.insertAdjacentHTML('afterbegin', accountLinks);
    }
  }

}

export default () => {
  setup();
  const { rootScope, ID, VARIATION } = shared;

  /** Make all changes - can be re-run on page re-render / App_LayoutChanged */
  const init = () => {
    fireEvent('Conditions Met');

    // -----------------------------
    // Add events that apply to both variant and control
    // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
    // -----------------------------
    // ...

    // -----------------------------
    // If control, bail out from here
    // -----------------------------
    if(VARIATION == 'control') {
      return;
    }

    // -----------------------------
    // Write experiment code here
    // -----------------------------
    // ...
    setTimeout(() => {
      makeChanges();
    }, 2000)
  };

  // Make device specific changes when layout changes
  // rootScope.$on('App_LayoutChanged', () => {
  //   setTimeout(init, 500);
  // });

  init();
};
