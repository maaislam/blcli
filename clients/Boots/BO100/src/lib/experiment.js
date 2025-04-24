/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { events } from '../../../../../lib/utils';
import { cookieOpt, setup } from './services';
import shared from './shared';

export default () => {
  const { ID, VARIATION } = shared;

  setup();
  cookieOpt();

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }

  /*  ----------------
    Experiment code 
    ------------------ */
    const linkClicks = () => {
    
      if(VARIATION !== 'control') {
        const allInnerDepartments = document.querySelector('#topLevelMenu_1590591');
        document.querySelector('#topLevelMenu .topLevelMenuListItem').insertAdjacentElement('afterend', allInnerDepartments);

        // hide department link
        const shopDepartmentLink = document.querySelector('#topLevelMenu #topLevelLink_1590591');
        shopDepartmentLink.parentNode.style = 'display: none';
      }
      // on click of any department links
      const allDepartments = document.querySelectorAll(`#global_navigation li`);
      for (let index = 0; index < allDepartments.length; index += 1) {
        const element = allDepartments[index];

        if(VARIATION !== 'control') {
          if(element.classList.contains('mobileNavBackButtons') && element.getAttribute('onclick') === 'toggle(document.getElementById("departmentMenu")),setUpMobileBurgerMenu(this,"departmentMenu"),deactivate(document.getElementById("topLevelMenu_1590591"))') {
            element.style = 'display: none !important';
          }
        }

        // force the header to appear on click
        element.addEventListener('click', () => {
          const elName = element.querySelector('.menuItemLabel');
          if(elName) {
            events.send(`Experimentation`, `Boots - ${ID} V${VARIATION}`, `Nav link ${elName.textContent.trim()}`);
          }
          if(VARIATION !== 'control') {
            setTimeout(() => {
              document.getElementById('estore_header_top_row').scrollIntoView();
            }, 200);
         } 
        });
      }
  }

  // pharmacy link
  const addPharmLink = () => {
    const healthLinks = document.querySelector('#departmentMenu_1590591_1595014 .categoryMenuListItem');
    healthLinks.insertAdjacentHTML('afterend',`<li class="categoryMenuListItem ${ID}-pharmacy"><a href="https://www.boots.com/online/pharmacy/"><p class="categoryLinkOutput"><span class="menuItemLabel lowerLevelMenuListItem">visit Boots pharmacy</span></p></a></li>`);
  }
  if(VARIATION !== 'control') {
   addPharmLink();
  }

  linkClicks();

  const departmentLinkMove = () => {
     // on click of any department links
    const no7Link = document.querySelector('#topLevelLink_2480179').parentNode;
    const beautySkinLink = document.querySelector('#departmentLink_1595015').parentNode;

    beautySkinLink.insertAdjacentElement('beforebegin', no7Link);
  }

  const prescriptionsMove = () => {
    const presLink = document.querySelector('#topLevelLink_1597112').parentNode;
    const pharmLink = document.querySelector(`.categoryMenuListItem.${ID}-pharmacy`);

    pharmLink.insertAdjacentElement('afterend', presLink);
  }

  if(VARIATION === '2') {
    departmentLinkMove();
  } 

  if(VARIATION === '3') {
    prescriptionsMove();
  } 
};
