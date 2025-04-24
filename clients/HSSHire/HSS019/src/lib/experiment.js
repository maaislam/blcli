/**
 * HSS019 - Category Navigation Usability
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { pollerLite, observer } from '../../../../../lib/uc-lib';
import shared from './shared';
import { events } from '../../../../../lib/utils';

const { ID, VARIATION } = shared;

const activate = () => {
  if (shared.VARIATION == 'control') {
    events.send('CRO Experiment', `${shared.ID}`, 'Control - Activated', { sendOnce: true });
  } else {
    // rest of experiment code
    events.send('CRO Experiment', `${shared.ID}`, 'V1 - Activated', { sendOnce: true });
    setup();
    console.log(`--${shared.ID}  is running`);
    let device = '';
    if (window.innerWidth <= 420) {
      device = 'mobile';
    } else {
      device = 'desktop';
    }

    const searchByCatOriginal = document.querySelectorAll('#menu .all_menu')[0];
    
    const searchByCatContent = searchByCatOriginal.outerHTML;
    searchByCatOriginal.setAttribute('style', 'display: none;');
    searchByCatOriginal.insertAdjacentHTML('afterend', searchByCatContent);
    const searchByCatNew = document.querySelectorAll('#menu .all_menu')[1];
    searchByCatNew.classList.add(`${shared.ID}-all_menu`);

    // ---- Re-order menu options based on Experiment Priority Order
    const preArrangedItems = searchByCatNew.querySelectorAll('li.firstlevel');
    let listArray = [];
    let menuData = {};

    [].forEach.call(preArrangedItems, (item) => {
      const option = item.querySelector('a').innerText.trim();
      listArray.push(option);
      menuData[`${option}`] = item.outerHTML;

      // --- Move 'Air con & cooling' to second position (based on A-Z order)
      if (option == 'Air Con & Cooling') {
        preArrangedItems[0].insertAdjacentHTML('afterend', menuData[`${option}`]);
        item.setAttribute('style', 'display: none !important;');
      }
    });
    const priorityOrder = ["Access Equipment",
    "Lift and Shift (Lifting and Handling)",
    "Powered Access",
    "Breaking and Drilling", 
    "Sanding and Fixing", 
    "Sawing and Cutting", 
    "Concreting and Compaction", 
    "Garden & Landscaping", 
    "Painting and Decorating", 
    "Plumbing and Pipework", 
    "Welding",
    "Surveying and Location", 
    "Cleaning & Floorcare",
    "Heating", 
    "Air Con & Cooling", 
    "Lighting Equipment", 
    "Power", 
    "Pumping and Drying",
    "Building and Siteworks",
    "Safety, Ventilation and Extraction", 
    "Covid Protection"];

    // let reorderedContent = '';
    // for (let i = 0; i < priorityOrder.length; i += 1) {
    //   const opt = priorityOrder[i];
    //   reorderedContent += menuData[`${opt}`];
    // }

    // document.querySelector(`.${shared.ID}-all_menu .categories ul`).innerHTML = reorderedContent;

    // --- Replace images with URL - e.g. https://www.hss.com/medias/sys_master/images/images/8873805807646.jpg
    const menuImages = searchByCatNew.querySelectorAll('.firstlevel ul.product_list a.productMainLink .thumb img.b-lazy');
    [].forEach.call(menuImages, (img) => {
      if (img.getAttribute('data-src') !== null) {
        const imgUrl = img.getAttribute('data-src');
        img.setAttribute('src', `${imgUrl}`);
      }
      
    });


    // ---- Show / Hide new dropdown
    const greyBackground = document.querySelector('#menu-greyout');
    const searchByCatItem = document.querySelector(`.${shared.ID}-all_menu`);
    const newSubMenu = searchByCatItem.querySelector(`.sub_menu`);

    searchByCatItem.addEventListener('mouseover', () => {
      // if (searchByCatNew.querySelector('li.firstlevel.active')) {
      //   searchByCatNew.querySelector('li.firstlevel.active ul').setAttribute('style', 'display: none;');
      //   searchByCatNew.querySelector('li.firstlevel.active').classList.remove('active');
      // }

      greyBackground.style.display = 'block';
      newSubMenu.classList.add('openednow');
      newSubMenu.style.display = 'block';

      const dropdownContainer = searchByCatItem.querySelector('.sub_menu.hire_mega_menu.drop_show');
      searchByCatItem.addEventListener('mouseleave', () => {
        newSubMenu.classList.remove('openednow');
        newSubMenu.style.display = 'none';

        if (searchByCatNew.querySelector('li.firstlevel.active')) {
          searchByCatNew.querySelector('li.firstlevel.active ul').setAttribute('style', 'display: none;');
          searchByCatNew.querySelector('li.firstlevel.active').classList.remove('active');

          // --- Active Sub-categories
          if (searchByCatNew.querySelectorAll('li.firstlevel li.active').length > 0) {
            const activeSubCategories = searchByCatNew.querySelectorAll('li.firstlevel li.active');
            [].forEach.call(activeSubCategories, (cat) => {
              cat.classList.remove('active');
            });
          }

          // --- Visible sub products
          if (searchByCatNew.querySelectorAll('li.firstlevel ul ul.product_list.shown').length > 0) {
            const visibleSubElements = searchByCatNew.querySelectorAll('li.firstlevel ul ul.product_list.shown');
            [].forEach.call(visibleSubElements, (el) => {
              el.classList.remove('shown');
              el.setAttribute('style', 'display: none;');
            });
          }
        }
      });
    });

    // ---- Show / Hide second level
    const firstLevelItems = searchByCatNew.querySelectorAll('li.firstlevel');
    [].forEach.call(firstLevelItems, (item) => {
      item.addEventListener('mouseover', () => {
        greyBackground.style.display = 'block';
        if (searchByCatNew.querySelector('li.firstlevel.active')) {
          searchByCatNew.querySelector('li.firstlevel.active ul').setAttribute('style', 'display: none;');
          searchByCatNew.querySelector('li.firstlevel.active').classList.remove('active');
        }
        searchByCatNew.querySelector('li.firstlevel.active');
        item.classList.add('active');

        const submenu = item.querySelector('ul');
        submenu.setAttribute('style', 'display: block;');
        // if (submenu.querySelector('li.active')) {
        //   // submenu.querySelector('li.active ul').setAttribute('style', 'display: none;');
        //   submenu.querySelector('li.active').classList.remove('active');
        // }
        const sublistItems = submenu.querySelectorAll('li');
        [].forEach.call(sublistItems, (subItem) => {
          subItem.classList.add(`${shared.ID}-subItem`);
          subItem.addEventListener('mouseover', () => {
            if (submenu.querySelector('li.active')) {
              submenu.querySelector('li.active').classList.remove('active');
            }
            if (submenu.querySelector('ul.product_list.shown')) {
              submenu.querySelector('ul.product_list.shown').setAttribute('style', 'display: none;');
              submenu.querySelector('ul.product_list.shown').classList.remove('shown');
            }
            subItem.classList.add('active');
            subItem.querySelector('ul.product_list').setAttribute('style', 'display: block;');
            subItem.querySelector('ul.product_list').classList.add('shown');
          });
          
        });
        

      });
    });
    
  }
  
};


export default activate;
