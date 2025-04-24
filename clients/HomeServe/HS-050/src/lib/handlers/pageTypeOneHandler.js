import shared from '../../../../../../core-files/shared';
import { isMobile } from '../helpers/utils';
import navData from '../navData';

const pageTypeOneHandler = () => {
  const { ID, VARIATION } = shared;

  const generateDropdown = (menuItems) => `
    <ul class="dropdown-menu">
        <li>
          <ul>
            ${menuItems
              .map(
                (item) => `
              <li>
                  <a href="${item.url}" class="navlink">${item.text}<span class="caret"></span></a>
              </li>`
              )
              .join('\n')}
          </ul>
        </li>
        
    </ul>`;

  // Function to generate the entire navigation
  const createNav = () => {
    const visibiltyClasses = isMobile() ? 'visible-xs visible-ms visible-sm' : 'visible-md visible-lg';

    const htmlStr = `
      <ul class="nav navbar-nav navbar-left ${ID}__newnav">
        <li class="visible-md visible-lg">
          <a href="/" class="navlink"><img src="/-/media/UK/MenuIcons/HomeNavIcon.png?h=24&amp;w=24&amp;la=en&amp;hash=0EFCE93F113B76A6182DB8D824D08CBA" alt="Home"></a>
        </li>
        ${Object.keys(navData)
          .map((key) => {
            const dropdown = navData[key];
            return dropdown.length > 0
              ? `
                <li class="dropdown ${visibiltyClasses}">
                    <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" data-hover="dropdown" data-delay="0" aria-expanded="false" href="#">${key} <span class="caret"></span></a>
                    ${generateDropdown(dropdown)}
                </li>`
              : `
                <li class="dropdown ${visibiltyClasses}">
                    <a href="/contact-us" class="navlink">${key}</a>
                </li>`;
          })
          .join('\n')}
      </ul>`;

    return htmlStr;
  };
  if (VARIATION !== 'control') {
    // Insert the new navigation into the DOM
    const newNavHtml = createNav();
    const navContainer = document.querySelector('.navbar-nav');
    navContainer.style.display = 'none';
    navContainer.insertAdjacentHTML('beforebegin', newNavHtml);
  }
  const primaryMenuItems = document.querySelectorAll(`.${ID}__newnav > li`);

  primaryMenuItems.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      item.classList.add('open');
      //fireEvent(`Menu Interaction - ${item.querySelector('.navlink').textContent}`);
    });
    item.addEventListener('mouseleave', () => {
      item.classList.remove('open');
    });

    item.addEventListener('click', () => {
      //fireEvent(`Menu Interaction - ${item.querySelector('.navlink').textContent}`);
    });
  });
};

export default pageTypeOneHandler;
