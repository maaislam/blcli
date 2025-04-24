/**
 * IDXXX - Description
 * @author User Conversion
 */
import { setup, clickEl } from './services';
import { cacheDom } from './../../../../../lib/cache-dom';
import { events, getCookie, setCookie } from './../../../../../lib/utils';
import { pollerLite } from './../../../../../lib/uc-lib';
import { observer } from './../../../../../lib/uc-lib';
import settings from './settings';

const activate = () => {
  const { ID, VARIATION } = settings;
  setup();

  // Experiment code
  const gridViewBtn = cacheDom.get('.page-productGrid.feature-design .view_mode_buttons span.grid_button');
  const listViewBtn = cacheDom.get('.page-productGrid.feature-design .view_mode_buttons span.list_button');
  const thirtyPageBtn = cacheDom.get('ul.perpage_list li:nth-of-type(2) a');
  const productForms = cacheDom.getAll('.prod form.plp_add_to_cart_form');

  // Trigger clicks
  const hasRun = getCookie('hasRun');
  if (window.location.href.indexOf('&perPage=30') === -1) {
    if (thirtyPageBtn) {
      clickEl(thirtyPageBtn);
    }
  }
  if (!hasRun) {
    if (thirtyPageBtn) {
      if (!thirtyPageBtn.parentElement.classList.contains('active')) {
        clickEl(thirtyPageBtn);
        setCookie('hasRun', true, 99);
        events.send(ID, 'Active', '30 products to view');
      }
    }
  }
  if (!document.querySelector('#r_content.grid_view')) {
    // If not already on grid view
    clickEl(gridViewBtn);
    events.send(ID, 'Active', 'Grid view active');
  }

  // Add new CTA's (grid + list)
  if (gridViewBtn && listViewBtn) {
    const ref = cacheDom.get('.prod_nav_top.prod_list_pagination');
    if (ref) {
      if (!document.querySelector('.TP139d-views')) {
        ref.insertAdjacentHTML('beforeend', `
          <div class="TP139d-views">
            <button id="TP139d-list">List View</button>
            <button id="TP139d-grid" class="TP139d-active">Grid View</button>
          </div>
        `);
      }
      const newListView = document.getElementById('TP139d-list');
      const newGridView = document.getElementById('TP139d-grid');
      if (newListView && newGridView) {
        newListView.addEventListener('click', () => {
          events.send(ID, 'Click', 'List View');
          if (!document.querySelector('#r_content.list_view')) {
            clickEl(listViewBtn);
            newGridView.classList.remove('TP139d-active');
            newListView.classList.add('TP139d-active');

            // Remove login links
            const addedLinks = document.querySelectorAll('a.TP139d-login');
            Array.from(addedLinks).forEach((link) => {
              link.classList.add('TP139d-hide');
            });
          }
        });
        newGridView.addEventListener('click', () => {
          events.send(ID, 'Click', 'Grid View');
          if (!document.querySelector('#r_content.grid_view')) {
            clickEl(gridViewBtn);
            if (!newGridView.classList.contains('TP139d-active')) {
              newGridView.classList.add('TP139d-active');
            }
            newListView.classList.remove('TP139d-active');
            
            // Remove login links
            const addedLinks = document.querySelectorAll('a.TP139d-login');
            Array.from(addedLinks).forEach((link) => {
              link.classList.remove('TP139d-hide');
            });
          }
        });
      }
    }
  }

  // Add login link if not logged in.
  const { loggedIn } = window.dataLayer[0];
  const addLoginLink = (el) => {
    if (el) {
      el.insertAdjacentHTML('afterend', `
        <a class="TP139d-login" href="https://www.travisperkins.co.uk/login">Log in for your account prices</a>
      `);
    }
  };
  if (loggedIn === 'no') {
    Array.from(productForms).forEach((form) => {
      addLoginLink(form);
    });
  }

  // Events
  const atbBtns = document.querySelectorAll('.tpQ_button input#addToCartButton');
  const collectBtns = document.querySelectorAll('.ccButton input#addForCollectButton');
  const loginLinks = document.querySelectorAll('a.TP139d-login');
  const viewCountLinks = document.querySelectorAll('.n_prods li a');
  if (atbBtns.length) {
    Array.from(atbBtns).forEach((btn) => {
      btn.addEventListener('click', () => {
        events.send(ID, 'Click', 'Add to bag');
      });
    });
  }
  if (collectBtns.length) {
    Array.from(collectBtns).forEach((btn) => {
      btn.addEventListener('click', () => {
        events.send(ID, 'Click', 'Click and Collect');
      });
    });
  }
  if (loginLinks.length) {
    Array.from(loginLinks).forEach((btn) => {
      btn.addEventListener('click', () => {
        events.send(ID, 'Click', 'Log in for account prices');
      });
    });
  }

  if (viewCountLinks.length) {
    Array.from(viewCountLinks).forEach((btn) => {
      btn.addEventListener('click', () => {
        const count = btn.innerText.trim();
        events.send(ID, 'Click', `${count} products to view`);
      });
    });
  }

  // Remove cookie that sets mode view
  setCookie('products_view_mode', 'list_view', 99);

  // Observe what product view is showing
  const rContent = document.querySelector('#r_content');
  const newListView = document.getElementById('TP139d-list');
  const newGridView = document.getElementById('TP139d-grid');
  if (rContent.classList.contains('grid_view')) {
    if (newListView.classList.contains('TP139d-active')) {
      newListView.classList.remove('TP139d-active');
    }
    newGridView.classList.add('TP139d-active');
  }
  if (rContent.classList.contains('list_view')) {
    if (newGridView.classList.contains('TP139d-active')) {
      newGridView.classList.remove('TP139d-active');
    }
    newListView.classList.add('TP139d-active');
  }
};

export default activate;
