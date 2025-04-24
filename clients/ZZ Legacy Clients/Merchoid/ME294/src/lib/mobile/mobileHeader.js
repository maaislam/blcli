/**
 * Brand logic on mobile nav
 */


import shared from "../../../../../../core-files/shared";
import { getCookie } from "../../../../../../lib/utils";

export default () => {
 
  const { ID } =  shared;

  const mobileHeader = document.querySelector('.page-header');

  // change logo
  const logo = mobileHeader.querySelector('.logo-wrapper');

  const navToggle = mobileHeader.querySelector('.nav-toggle');
  logo.insertAdjacentElement('beforebegin', navToggle);

  const newSearchIcon = document.createElement('div');
  newSearchIcon.classList.add(`${ID}-search`);
  newSearchIcon.innerHTML = `<span></span>`;
  mobileHeader.querySelector('.header-right-links__cart-links').insertAdjacentElement('afterbegin', newSearchIcon);

  const footerTitle = document.querySelectorAll(`.footer-top .col-md-4.col-lg-3`);
  for (let index = 0; index < footerTitle.length; index += 1) {
      const element = footerTitle[index];
      if(element.querySelector('h2') && element.querySelector('h2').textContent.indexOf('Search Products') > -1) {
          element.style.display = 'none';
      }
  }

  
  

  const addHeaderSearch = () => {
      const mainSearchBox = `
      <div class="${ID}-mainHeader ${ID}_searchBox">
          <div class="${ID}_closeSearch"></div>
       </div>`;
      document.querySelector('.page-header').insertAdjacentHTML('beforeend', mainSearchBox);
  }

  addHeaderSearch();

  const moveFooterSearch = () => {
      const searchBox = document.querySelector(`.page-footer .form.minisearch`);
      document.querySelector(`.${ID}-mainHeader.${ID}_searchBox`).appendChild(searchBox);

  }
  moveFooterSearch();

 

  const search = document.querySelector(`.${ID}-mainHeader.${ID}_searchBox`);
  document.querySelector(`.header-right-links__cart-links .${ID}-search`).addEventListener('click', () => {
      if(search.classList.contains(`${ID}_searchActive`)){
          search.classList.remove(`${ID}_searchActive`);
      } else {
          search.classList.add(`${ID}_searchActive`);
      }
  });

  search.querySelector(`.${ID}_closeSearch`).addEventListener('click', () => {
      search.classList.remove(`${ID}_searchActive`);
  });

  /*if(window.innerWidth < 1024) {
      const reviewBar = document.querySelector('.review-fans');
      if(reviewBar) {
          //reviewBar.insertAdjacentElement('beforebegin', search);
      }
  }*/
}