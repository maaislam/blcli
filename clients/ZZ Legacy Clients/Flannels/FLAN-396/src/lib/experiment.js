/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */

import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
 import { events, logMessage, pollerLite, observer } from '../../../../../lib/utils';

// Force set analytics reference
events.analyticsReference = '_gaUAT';
const { ID, VARIATION } = shared;
let linkType;

const createElement = (links) => {
  let insertHTML = `
  
    <li class="${ID}-seo-links">
    
      

      <div class="${ID}-seo-links--inner">

        <h2> Can't find what you're looking for? </h2>

        <div class="${ID}-seo-links--content">

          <span class="${ID}-seo-links--contentfiltertext">Filter by ${linkType == "CATG" ? `Category` : `Designer`}</span>
        
          ${links.map((link) => {
            
            let newHref = window.location.href.substring(0, window.location.href.indexOf('#'));

            let innerText = link.innerText;
            if(innerText.indexOf('(') > -1) {
              innerText = innerText.substring(0, innerText.indexOf('(')-1).trim();
            }
            if(linkType == "CATG") {
              newHref = newHref + '#dcp=1&dppp=100&OrderBy=rank&Filter=CATG%5E' + encodeURI(innerText);
            } else {
              newHref = newHref + '#dcp=1&dppp=100&OrderBy=rank&Filter=ABRA%5E' + encodeURI(innerText);
            }
            return `<a href="${newHref}" class="${ID}-seo-links--link">${innerText}</a>`;
            


          }).join('')}
        
        </div>
    
    
    
    </li>
  
  
  
  `;


  let insertionPoint = document.getElementById('navlist');

  if(VARIATION == 1 && window.outerWidth > 500) {
    let allNodes = insertionPoint.querySelectorAll('li');
    let lastNode = allNodes[allNodes.length - 1];
    lastNode.remove();
  }

  if(!document.querySelector(`.${ID}-seo-links`)) {

    if(VARIATION == 3) {
      if(window.outerWidth > 1022) {
        pollerLite(['.sortOptionsContainer'], () => {
          insertionPoint = document.querySelector('.sortOptionsContainer');
          insertionPoint.insertAdjacentHTML('afterend', insertHTML);
        });
      } else {
        pollerLite(['#lblCategoryCopy'], () => {
          insertionPoint = document.getElementById('lblCategoryCopy');
          insertionPoint.insertAdjacentHTML('afterend', insertHTML);
        });        
      }
    } else {
      insertionPoint.insertAdjacentHTML('beforeend', insertHTML);
    }

  }
  

  let allQuickLinks = document.querySelectorAll(`.${ID}-seo-links--link`);

  [].slice.call(allQuickLinks).forEach((link) => {

    link.addEventListener('click', (e) => {
      let linkText = e.currentTarget.innerText;
      let linkHref = e.currentTarget.href;
      let linkClickMessage = `Click - link clicked with text: ${linkText} and href: ${linkHref}`;
      window.scrollTo(0,0);
      fireEvent(linkClickMessage, true);

    });
    
  });


}

const startExperiment = () => {

  pollerLite(['#FilterContainer'], () => {

    let allSiblingLinks;
    if(document.querySelector('.FilterListItem.CATG') && document.querySelectorAll('.FilterListItem.CATG').length > 5) {
      allSiblingLinks = [].slice.call(document.querySelectorAll('.FilterListItem.CATG'));
      linkType = "CATG";
    } else {
      allSiblingLinks = [].slice.call(document.querySelectorAll('.FilterListItem.ABRA'));
      linkType = "ABRA";
    }

    if(allSiblingLinks.length > 0) {

      allSiblingLinks = allSiblingLinks.sort((a, b) => b.getAttribute('data-productcount') - a.getAttribute('data-productcount'));  
      allSiblingLinks = allSiblingLinks.slice(0,5);
      
      createElement(allSiblingLinks);

      fireEvent(`Visible - ${linkType == "CATG" ? `Category Links` : `Designer Links`} used to display element `, true);

    } else {

      fireEvent("Nothing found or displayed", true);

    }


    const navlist = document.getElementById('navlist');
    
    observer.connect(navlist, () => {
      setTimeout(() => {
        if(!document.querySelector(`.${ID}-seo-links`)) {
          // when page reloaded, element recreated using original asl element
          createElement(allSiblingLinks);
        } 
        
      }, 500);
    }, {
      config: {
        attibutes: true,
        childList: true,
        subTree: false,
      },
    });


  });

}

const addEvents = () => {



  let scrollWatch = new window.IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {

        let seenPLPEntryMessage = "Visible - user has scrolled to the end of the PLP";
        if(VARIATION == 1 || VARIATION == 2) {
          seenPLPEntryMessage = "Visible - user has scrolled to the end of the PLP";
        }
        fireEvent(seenPLPEntryMessage, true);

        scrollWatch.unobserve(document.querySelector(`.pagination-bottom #divPagination`));
      }
    });
  }, { root: null });

  scrollWatch.observe(document.querySelector(`.pagination-bottom #divPagination`));





}

export default () => {
  setup();

  fireEvent('Conditions Met');

  logMessage(ID + " Variation: "+VARIATION);

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...

  addEvents();

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(shared.VARIATION == 'control') {
    return;
  }

  // Write experiment code here
  // ...

  startExperiment();
};
