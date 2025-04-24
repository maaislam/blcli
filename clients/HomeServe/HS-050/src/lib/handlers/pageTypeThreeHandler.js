import shared from '../../../../../../core-files/shared';
import navData from '../navData';

const pageTypeThreeHandler = () => {
  const { VARIATION } = shared;

  const generateDropdown = (menuItems) => `
          <ul class="dropdown-menu drop-down-multilevel">
              <li class="d-flex drop-down-wrapper">
                  <ul class="sub-menu">
                      ${menuItems
                        .map(
                          (item) => `
                          <li>
                              <a class="dropdown-item dropdown-item-link" href="${item.url}">${item.text}</a>
                          </li>`
                        )
                        .join('')}
                  </ul>
              </li>
          </ul>`;

  // Function to generate the entire navigation
  const createNav = () => `
          <ul class="navbar-nav me-auto mb-2 mb-lg-0" >
              ${Object.keys(navData)
                .map((key) => {
                  const dropdown = navData[key];
                  return dropdown.length > 0
                    ? `
                      <li class="nav-item dropdown">
                          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">${key}</a>
                          ${generateDropdown(dropdown)}
                      </li>`
                    : `
                      <li class="nav-item">
                          <a href="${dropdown.url || '/contact-us'}" class="nav-link">${dropdown.text || 'CONTACT US'}</a>
                      </li>`;
                })
                .join('')}
          </ul>`;

  if (VARIATION !== 'control') {
    // Insert the new navigation into the DOM
    const newNavHtml = createNav();
    const navContainer = document.querySelector('#ddMenu');

    navContainer.style.display = 'none';
    navContainer.insertAdjacentHTML('beforebegin', newNavHtml);
  }

  // Add event listeners for hover effects on primary menu items
  const primaryMenuItems = document.querySelectorAll('.nav-item.dropdown');

  primaryMenuItems.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      item.querySelector('.dropdown-menu').classList.add('show');
      //fireEvent(`Menu Interaction - ${item.querySelector('.nav-link').textContent}`);
    });
    item.addEventListener('mouseleave', () => {
      item.querySelector('.dropdown-menu').classList.remove('show');
    });

    // item.addEventListener('click', () => {
    //fireEvent(`Menu Interaction - ${item.querySelector('.nav-link').textContent}`);
    // });
  });
};

export default pageTypeThreeHandler;
