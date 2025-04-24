import shared from '../../../../../../core-files/shared';

import navData from '../navData';

const pageTypeFourHandler = () => {
  const { VARIATION } = shared;
  // Function to create the dropdown menu
  const generateDropdown = (menuItems) => `
        <ul class="dropdown-menu canvas-drop-down-multilevel ">
            ${menuItems
              .map(
                (item) => `
                <li>
                    <a class="dropdown-item canvas-dropdown-item-link rotate45" href="${item.url}">${item.text}</a>
                </li>`
              )
              .join('')}
        </ul>`;

  // Function to create the entire navigation
  const createNav = () => `
        <ul class="navbar-nav" id="ddCanvasMenu">
            ${Object.keys(navData)
              .map((key) => {
                const dropdown = navData[key];
                return dropdown.length > 0
                  ? `
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle canvas-navi-link rotate45" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">${key}</a>
                        ${generateDropdown(dropdown)}
                    </li>`
                  : `
                    <li class="nav-item">
                        <a class="nav-link dropdown-toggle canvas-navi-link rotate45" href="${dropdown.url || '/contact-us'}">${
                      key || 'CONTACT US'
                    }</a>
                    </li>`;
              })
              .join('')}
        </ul>`;

  if (VARIATION !== 'control') {
    // Insert the new navigation into the DOM
    const newNavHtml = createNav();
    const navContainer = document.querySelector('#ddCanvasMenu');
    navContainer.style.display = 'none';
    navContainer.insertAdjacentHTML('beforebegin', newNavHtml);
  }

  // Add event listeners for hover effects on primary menu items
  const primaryMenuItems = document.querySelectorAll('.nav-item.dropdown');

  primaryMenuItems.forEach((item) => {
    item.addEventListener('click', () => {
      //item.querySelector('.nav-link').classList.toggle('show');
      item.querySelector('.nav-link').classList.toggle('nav-bar-icon-rotate');

      //fireEvent(`Menu Interaction - ${item.querySelector('.nav-link').textContent}`);
    });
  });
};

export default pageTypeFourHandler;
