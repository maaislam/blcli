import { fireEvent } from "../../../../../core-files/services";
import shared from "../../../../../core-files/shared";


const { ID } = shared;

export default () => {

  const addDropdowns = () => {
    const allFilters = document.querySelectorAll('#productsFacets fieldset:not([style*="display:none"]):not([style*="display: none"])');
    for (let index = 0; index < allFilters.length; index+=1) {
        const element = allFilters[index];

      
          const filterName = element.querySelector('.spanacce');
          

          const selectBox = document.createElement('div');
          selectBox.classList.add(`${ID}-filter`);
          

          selectBox.innerHTML = `
          <div class="${ID}-select-wrapper">
            <div class="${ID}-select">
                <div class="${ID}-select__trigger"><span>${filterName.textContent.trim()}</span>
                    <div class="arrow"></div>
                </div>
                <div class="${ID}-options">
              
                </div>
            </div>
        </div>`;


          const innerFilters = element.querySelectorAll('[id*=facetButton]');

          // if more than 6 filters, add the view more trigger
          if(allFilters.length > 6) {
            document.querySelector(`.${ID}-filterBar`).classList.add(`${ID}-viewMore`);
          }

          if(document.querySelector('.facetSelected')) {
            document.querySelector(`.${ID}-filterBar`).classList.add(`${ID}-filterSelected`);

            document.querySelector(`.${ID}-clearFilters`).addEventListener('click', () => {
              if( document.querySelector(`.${ID}-filterBar`)) {
                document.querySelector(`.${ID}-filterBar`).classList.remove(`${ID}-filterSelected`);
              }
                dojo.topic.publish('Facet_RemoveAll');
              
            });


          } else {
            document.querySelector(`.${ID}-filterBar`).classList.remove(`${ID}-filterSelected`);
          }
  
          // loop through the inner existing filters and create new ones
          for (let i = 0; i < innerFilters.length; i+=1) {
            const filterEl = innerFilters[i];

            const filterValue = filterEl.getAttribute('id');
            let filterText;

            if(filterEl.querySelector('.outline span') && filterEl.querySelector('.outline span').innerText !== '') {
              if(filterEl.querySelector('.facetCountContainer')) {
                filterText = `${filterEl.querySelector('[id*=facetLabel]').textContent.trim()} <span>${filterEl.querySelector('.facetCountContainer').textContent.trim()}</span>`
              } else {
                filterText = `${filterEl.querySelector('[id*=facetLabel]').textContent.trim()}`;
              }
            
            } else {
              if(filterEl.querySelector('.facetCountContainer')) {
                filterText = `${filterEl.querySelector('[id*=facetLabel]').getAttribute('title')}  & up <span>${filterEl.querySelector('.facetCountContainer').textContent.trim()}</span>`;
              } else {
                filterText = `${filterEl.querySelector('[id*=facetLabel]').getAttribute('title')}  & up`;
              }
            }

            if(filterValue && filterText) {
              const newFilter = document.createElement('span');
              newFilter.classList.add(`${ID}-option`);
              newFilter.setAttribute('data-value', filterValue);
              newFilter.innerHTML = filterText;
              selectBox.querySelector(`.${ID}-options`).appendChild(newFilter);
            }
          }

          document.querySelector(`.${ID}-filterBar .${ID}-container`).insertAdjacentElement('afterbegin', selectBox);
        

    }
  }

  addDropdowns();

  // filter events
  const filterEvents = () => {

    // toggle open on click
    for (const dropdown of document.querySelectorAll(`.${ID}-select-wrapper`)) {
      dropdown.addEventListener('click', function() {
          this.querySelector(`.${ID}-select`).classList.toggle('open');
      })
    }

  
    // remove open if others are clicked
    window.addEventListener('click', function(e) {
        for (const select of document.querySelectorAll(`.${ID}-select`)) {
            if (!select.contains(e.target)) {
                select.classList.remove('open');
            }
        }
    });


    // view more click
    if(document.querySelector(`.${ID}-viewMore`)) {
      const moreFilters = document.querySelector(`.${ID}-more .${ID}-moreText`);

      moreFilters.addEventListener('click', () => {
        if(document.querySelector(`.${ID}-viewMore`).classList.contains(`${ID}-showAll`)) {
          document.querySelector(`.${ID}-viewMore`).classList.remove(`${ID}-showAll`);
          moreFilters.textContent = 'View more filters';
        } else {
          document.querySelector(`.${ID}-viewMore`).classList.add(`${ID}-showAll`);
          moreFilters.textContent = 'View less filters';
        }
      });
    }

    // click filters
    const filters = document.querySelectorAll(`.${ID}-select .${ID}-option`);
    for (let index = 0; index < filters.length; index += 1) {
      const element = filters[index];
      element.addEventListener('click', (e) => {
        const targetEl = e.currentTarget.getAttribute('data-value');
        document.querySelector(`.row.facetContainer a[id^="${targetEl.replace(/'/g, "\\'").replace(/\?/g, "\\?").replace(/&/g, "\\&") }"`).click();
        
        fireEvent('Filter clicked');

        if(document.querySelector(`.${ID}-select.open`)) {
         document.querySelector(`.${ID}-select.open`).classList.remove('open');
        }
      });


      // check any already active
      const filterTargets = element.getAttribute('data-value');
      const matchingFilter = document.querySelector(`.row.facetContainer a[id="${filterTargets}"`);
      if(matchingFilter) {
        if(matchingFilter.parentNode.querySelector('input').checked == true) {
          element.classList.add(`selected`);
        } else {
          element.classList.remove(`selected`);
        }
      }
    }
    
  }
  filterEvents();

}