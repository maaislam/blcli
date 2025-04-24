import shared from '../../../../../../core-files/shared';

import navData from '../navData';

const pageTypeTwoHandler = () => {
  const { VARIATION } = shared;
  // Function to create nested submenus
  const generateSubmenu = (submenuItems) => `
     <ul class="hs-primary-nav__child secondary">
         ${submenuItems
           .map(
             (subitem) => `
             <li class="hs-primary-nav__child-item">
                 <a class="hs-primary-nav__link" href="${subitem.url}">${subitem.text}</a>
             </li>`
           )
           .join('')}
     </ul>`;

  // Function to create dropdowns
  const generateDropdown = (menuItems) => `
     <ul class="hs-primary-nav__child">
         ${menuItems
           .map(
             (item) => `
             <li class="hs-primary-nav__child-item${item.submenu ? ' has-dropdown' : ''}">
                 <a class="hs-primary-nav__link" href="${item.url}">${item.text}</a>
                 ${item.submenu ? generateSubmenu(item.submenu) : ''}
             </li>`
           )
           .join('')}
     </ul>`;

  // Function to generate the entire navigation
  const createNav = () => `
     <ul class="hs-primary-nav__parent">
         ${Object.keys(navData)
           .map((key) => {
             const dropdown = navData[key];
             return dropdown.length > 0
               ? `
                 <li class="hs-primary-nav__parent-item has-dropdown">
                     <a class="hs-primary-nav__link" href="#">${key}</a>
                     ${generateDropdown(dropdown)}
                 </li>`
               : `
                 <li class="hs-primary-nav__parent-item">
                     <a href="/contact-us" class="hs-primary-nav__link">${key}</a>
                 </li>`;
           })
           .join('')}
     </ul>`;

  if (VARIATION !== 'control') {
    // Insert the new navigation into the DOM
    const newNavHtml = createNav();
    const navContainer = document.querySelector('.hs-primary-nav__parent');
    navContainer.style.display = 'none';
    navContainer.insertAdjacentHTML('beforebegin', newNavHtml);
  }
  // Add event listeners for hover effects on primary menu items
  const primaryMenuItems = document.querySelectorAll('.hs-primary-nav__parent-item');

  primaryMenuItems.forEach((item) => {
    item.addEventListener('click', () => {
      item.classList.toggle('opened');
      item.querySelector('.hs-primary-nav__child').classList.toggle('opened');
      //fireEvent(`Menu Interaction - ${item.querySelector('.hs-primary-nav__link').textContent}`);
    });

    item.addEventListener('mouseenter', () => {
      //fireEvent(`Menu Interaction - ${item.querySelector('.hs-primary-nav__link').textContent}`);
    });
  });
};

export default pageTypeTwoHandler;
