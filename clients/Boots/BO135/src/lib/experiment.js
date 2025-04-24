/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
import { pollerLite } from './../../../../../lib/utils';
import shared from '../../../../../core-files/shared';
import navMarkup from './navMarkup';
import brands from './brands';
import categories from './categories';

export default () => {
  const { ID, VARIATION } = shared;

  setup();

  fireEvent('Conditions Met');

  if (window.usabilla_live){
    window.usabilla_live('trigger', `${ID} V${VARIATION} trigger`);
  }
  
  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...

 
   // -----------------------------
  //  Nav tracking
  // -----------------------------
  const tracking = () => {
    const allLinks = document.querySelectorAll('#estore_header_bottom_row .departmentMenu a[href^="https"]');
    for (let index = 0; index < allLinks.length; index += 1) {
      const element = allLinks[index];
      
      element.addEventListener('click', () => {
        const linkName = element.textContent.trim();
        fireEvent('Clicked nav link ' + linkName);
      });
    }
  }
  if(VARIATION == 'control') {
    tracking();
  } else {

    // -----------------------------
    //  Add the top level links
    // -----------------------------
    navMarkup();
    
    // -----------------------------
    //  Add all the data and new links
    // -----------------------------
    brands();
    categories();
    
    // -----------------------------
    //  Fix for mobile header
    // -----------------------------
    if(window.innerWidth <= 600) {
      const allDepartments = document.querySelectorAll(`#global_navigation li`);
      for (let index = 0; index < allDepartments.length; index += 1) {
        const element = allDepartments[index];

        // force the header to appear on click
        element.addEventListener('click', () => {
          const elName = element.querySelector('.menuItemLabel');
          if(elName) {
          // nav click link event
          }
          if(VARIATION !== 'control') {
            setTimeout(() => {
              document.getElementById('estore_header_top_row').scrollIntoView();
            }, 300);
        }  
        });
      }
    }

    // -----------------------------
    //  Desktop nav height fix
    // -----------------------------

    const openNav = (el) => {

      if(el.querySelector('.departmentMenu').classList.contains('active')){
            document.querySelector('#globalNavigationContainer').style.height = '0px';
            globalNavigationContainer.style.height = '0px';

            element.querySelector('.departmentButton').addEventListener('click', () => {
              document.querySelector('#global_navigation').style = 'overflow: hidden';
            }); 
      }
    }
    

    const newLinks = document.querySelectorAll(`.${ID}-lvl1`);
    for (let index = 0; index < newLinks.length; index++) {
        const element = newLinks[index];
        if(window.innerWidth >= 601 && window.innerWidth < 1280) {
            element.querySelector('.departmentButton').addEventListener('mouseenter', () => {
              openNav(element);
            }); 

            element.querySelector('.departmentButton').addEventListener('click', () => {
              openNav(element);
            }); 
        } else {
          // element.querySelector('.departmentButton').addEventListener('click', () => {
          //   console.log('click')
          //   setTimeout(() => {
          //     if(element.querySelector('.departmentMenu').classList.contains('active')){
          //       document.querySelector('#global_navigation').style = 'overflow: hidden';              
          //     } else {
          //       document.querySelector('#global_navigation').removeAttribute('style');
          //     }
          //   }, 300)
          // }); 
        }
    }

    // -----------------------------
    //  Orientation change
    // -----------------------------
    window.addEventListener('orientationchange', function() {
      // After orientationchange, add a one-time resize event
      var afterOrientationChange = function() {
          window.location.reload();
          // Remove the resize event listener after it has executed
          window.removeEventListener('resize', afterOrientationChange);
      };
      window.addEventListener('resize', afterOrientationChange);
    });



    tracking();
  }
    
  


  

};
