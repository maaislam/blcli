/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup } from './services';
import { pollerLite, observer } from '../../../../../lib/utils';
import settings from './shared';

export default () => {
  setup();

  const inStockAlready = () => {
    let pass = false;
    if (window.location.href.indexOf('availability-true') > -1) {
      pass = true;
    };

    return pass;
  }


  const hideInStockLabel = () => {
    const addedLabels = document.querySelectorAll('.af-tag');
    for (let i = 0; addedLabels.length > i; i += 1) {
      const thisSpan = addedLabels[i].querySelector('.tag-description > span');

      if (thisSpan && thisSpan.textContent.trim() == 'In stock') {
        addedLabels[i].classList.add('AF-hide')
      }
    }
  }

  if (window.innerWidth >= 749) {

    pollerLite(['a.af-accordion-element span.af-bold'], () => {
      // Find Options Row
      const topOptions = document.querySelectorAll('a.af-accordion-element span.af-bold');
      const opTitle = Array.from(topOptions).filter((title) => title.textContent.trim() == 'Options');
  
      if (!opTitle[0]) return;
      if (inStockAlready()) return;
  
  
      opTitle[0].click();
  
  
      pollerLite(['.content.active label span'], () => {
        const openLabels = document.querySelectorAll('.content.active label span');
  
        const stockLabel = Array.from(openLabels).filter((label) => label.textContent.trim() == 'In stock');
  
        if (!stockLabel[0]) return;
        
  
        stockLabel[0].click();
  
        setTimeout(() => {
          opTitle[0].click();

          hideInStockLabel();
        }, 500);
  
      });
    })
  }


  if (window.innerWidth < 749) {
    // Temp hide filters
    document.body.classList.add('AF011-hideFilters');

    pollerLite(['#browse-form > div > a.button'], () => {
      const btn = document.querySelector('#browse-form > div > a.button');
      
      btn.click();

      // Poll for menu
      pollerLite(['.accordion-navigation', '.af-accordion-element strong'], () => {
        const moreFilters = document.querySelector('.af-accordion-element strong');
        moreFilters.click();

        setTimeout(() => {
          pollerLite(['a.af-accordion-element span.af-bold'], () => {

            // Find Options Row
            const topOptions = document.querySelectorAll('a.af-accordion-element span.af-bold');
            
            const opTitle = Array.from(topOptions).filter((title) => title.textContent.trim() == 'Options');
            
            if (!opTitle[0]) return;
            if (inStockAlready()) return;
    
            opTitle[0].click();
    
    
            pollerLite(['.content.active label span'], () => {
              const openLabels = document.querySelectorAll('.content.active label span');
              
              const stockLabel = Array.from(openLabels).filter((label) => label.textContent.trim() == 'In stock');
              
              if (!stockLabel[0]) return;
              
              
              stockLabel[0].click();
    
              btn.click();

              document.body.classList.remove('AF011-hideFilters');
    
            });
  
          })
        }, 500);

      });

    });

    setTimeout(() => {
      document.body.classList.remove('AF011-hideFilters');
    }, 2000);
  }
  
  const bod = document.body;
  observer.connect(bod, () => {
    if (!bod.classList.contains(settings.ID)) {
      bod.classList.add(settings.ID);
    }
  }, {
    config: {
      attributes: true,
      childList: false,
      subtree: false
    }
  })

};
