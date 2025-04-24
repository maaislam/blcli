import { toTitleCase } from './sortBrandText';
import { events, pollerLite } from '../../../../../lib/utils';

events.analyticsReference = '_gaUAT';

export const buildFilters = (brands, ref) => {
  
  if (!ref || !brands) return;

  const clearAll = document.querySelector('#clrallfltrs');

  // Ensure only 5 brands are added
  if (brands && brands.length > 5) {
    brands.pop();
  }

  const alreadyFiltered = (brandName) => {
    const spans = document.querySelectorAll(`.selectedFilters span.selectedFilterLabel`);
    
    if (spans) {
      for (let i = 0; spans.length > i; i += 1) {
        // console.log('span ', spans[i].innerHTML.toUpperCase());
        // console.log('brand ', brandName);
        if (spans[i].innerHTML.toUpperCase() == brandName) {
          return true;
        }
      }
    }

  };

  if (!document.querySelector('.FL082-brands')) {
    //<li class="FL092-rightChev"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAS1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADmYDp0AAAAGHRSTlMA98RFDQ5H9MY+zckH50sRoyM3urhgXyI5PPZgAAAAnElEQVRYw+2XSw7CMAwFXULa0ibQ8vX9T4pSsUAsPZXox28/ozh2pFh+c+2aIYo9KatqDwyjKjOkTA2nZiZDd3FDSWu/yVC54ctw4IajGzZgqN0w5fwxJGoYhFZRCzzDTex5FkGVgCEXw0gFLzv/mEqgjbzTNgY6SHiU6WNyfpV8cH4RfGR8u1cefPbBujE730e6eP5x9TXwaP1/AykpIfHjA+miAAAAAElFTkSuQmCC"/></li>
    ref.insertAdjacentHTML('afterbegin', `
      <div class="FL082-brands">
        <p><strong>Shop By Brand</strong></p>
  
        <div class="FL082-brands--list">
          <ul>
            ${brands.map((brand) => `
              <li class="${alreadyFiltered(brand) ? 'FL082-hide' : ''}">
                <button class="FL082-brandBtn" data-brand="${brand ? toTitleCase(brand) : ''}">${brand}</button>
              </li>
            `).join(' ')}
  
            <li><button id="FL082-moreBrands">+ More Brands</button></li>
          </ul>
        </div>
      </div>
    `);
    
    pollerLite(['.FL082-brandBtn'], () => {
      // Attach events
      const addedLinks = document.querySelectorAll('.FL082-brandBtn');
      
      let url = '';
      for (let i = 0; addedLinks.length > i; i += 1) {
        addedLinks[i].addEventListener('click', (e) => {
          e.preventDefault();
          const brandName = addedLinks[i].getAttribute('data-brand');
          if (brandName) {
            
            // Find matching brand link
            let filterToClick = document.querySelector(`div[data-productname="${toTitleCase(brandName)}"] a span.FilterName`);
            if (!filterToClick) {
              filterToClick = document.querySelector(`div[data-productname="${brandName.toUpperCase()}"] a span.FilterName`);
            }
            filterToClick.click();
            url = window.location.href;
            e.preventDefault();
    
            events.send('FL082', 'FL082 Click', `User clicked on ${brandName} link`);
    
            // Remove this filter
            addedLinks[i].classList.add('FL-hide');
          }
        });
      }


      clearAll ? clearAll.addEventListener('click', () => {
        const hiddenEls = document.querySelectorAll('.FL082-hide');
        const hiddenBar = document.querySelector('.FL082-remove');
        for (let i = 0; hiddenEls.length > i; i += 1) {
          hiddenEls[i].classList.remove('FL082-hide');
        }
        hiddenBar ? hiddenBar.classList.remove('FL082-remove') : null;
      }): null;

    });
  }

};