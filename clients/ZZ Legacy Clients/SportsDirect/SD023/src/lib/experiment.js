/**
 * SD023 - A to Z Navigation
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion JT
 */
import { setup } from './services';
import { events } from '../../../../../lib/utils';
import settings from './shared';
import { addSearch } from './addSearch';
import { scrollToEl } from './scrollTo';

events.analyticsReference = '_gaUAT';



export default () => {
  setup();

  const { ID, VARIATION } = settings;

  if (VARIATION == 2) {
    events.send(ID, `${ID} Control`);
    return false;
  } else {
    events.send(ID, `${ID} Variation ${VARIATION} Active`, `Variation ${VARIATION} is active`);    
  }

  const topMenuWrap = document.querySelector('#topMenuWrapper');

  if (!document.querySelector('.InnerTopMenu')) {
    topMenuWrap.insertAdjacentHTML('afterbegin', `<div class="InnerTopMenu"></div>`);
  }

  const navRef = document.querySelector('.InnerTopMenu');
  const menu = document.querySelector('#topMenu');
  if (!document.querySelector('.SD023-nav')) {
    navRef.insertAdjacentHTML('afterbegin', `
      <div class="SD023-nav">
        <button id="SD023-browse">Browse by A-Z</button>
      </div>
    `);
    navRef.insertAdjacentElement('beforeend', menu);
    addSearch();
  }


  


  // Events
  const navBtn = document.querySelector('button#SD023-browse');
  const searchModal = document.querySelector('.SD023-searchContainer');
  const searchModalWrap = document.querySelector('.SD023-searchContainer--wrap');


  const closeDropdown = () => {
    searchModal.classList.remove('SD-active');
    document.body.classList.remove('SD-scrollStop');

    setTimeout(() => {
      if (!document.querySelector('.SD023-searchContainer.SD-active')) {
        document.body.classList.remove('SD-scrollStop');
      }
    }, 500);
  }

  const toggleDropdown = () => {
    searchModal.classList.toggle('SD-active');
    document.body.classList.toggle('SD-scrollStop');

    setTimeout(() => {
      if (!document.querySelector('.SD023-searchContainer.SD-active')) {
        document.body.classList.remove('SD-scrollStop');
      }
    }, 500);
  }

  navBtn ? navBtn.addEventListener('click', (e) => {
    e.preventDefault();
    toggleDropdown();
  }) : null;

  navBtn ? navBtn.addEventListener('mouseover', (e) =>{
    toggleDropdown();
  }) : null;

  searchModalWrap ? searchModalWrap.addEventListener('mouseleave', (e) => {
    closeDropdown();
  }) : null;


  // Click outside
  const bodyWrap = document.querySelector('.mp-container');
  bodyWrap.addEventListener('click', (event) => {
    const isClickInside = searchModalWrap.contains(event.target);
    const isClickInsideBtn = navBtn.contains(event.target);
    if (!isClickInside && !isClickInsideBtn) {
      searchModal.classList.remove('SD-active');
      document.body.classList.remove('SD-scrollStop');
    }
  });


  const anchorEls = document.querySelectorAll('.SD023-searchContainer a[href^="#"]');
  const container = document.querySelector('.SD023-searchContainer .lettersBoxesColumn');
  const anchorElsArr = Array.from(anchorEls);
  anchorElsArr.forEach(anchor => {
    if (!anchor.getAttribute('href')) return;
    const hrefId = anchor.getAttribute('href');
    const el = document.querySelector(hrefId);
    if (!el) return;
    const row = el.closest('tr');
    
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        
        container.scroll({
          top: row.offsetTop,
          left: 0,
          behavior: 'smooth'
        });
    });

  });


  const menuLinks = document.querySelectorAll('.SD023 .SD023-searchContainer--wrap table .letItems a');
  const menuLinksArr = Array.from(menuLinks);

  menuLinksArr.forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const { target } = e;
      const text = target.textContent.trim();
      events.send(ID, `${ID} Click`, `${ID} Clicked ${text ? text : 'menu item'}`);  
    });
  });

};
