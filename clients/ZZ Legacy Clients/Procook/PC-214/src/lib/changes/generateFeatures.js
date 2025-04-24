import shared from '../../../../../../core-files/shared';
import { pollerLite, observer } from '../../../../../../lib/uc-lib';
// import data from '../data';
import { getUrlParameter, addUrlParameter, updateUrlParameter, checkNonStickParameter } from '../helpers';

const { ID, VARIATION } = shared;

export default (url, allFilters) => {
  pollerLite([`#${ID}-features`], () => {
    document.querySelector(`.filter#features .filterBoxTitle`).insertAdjacentHTML('afterend', `<div class="filterBoxDropDown"><ul></ul></div>`);
    if (url == '/shop/cookware/induction'
    || url == '/shop/cookware/frying-pans'
    || url == '/shop/cookware/saucepans'
    || url == '/shop/cookware/stainless-steel'
    || url == '/shop/cookware/sets') {
      const getHobTypeOptions = document.querySelectorAll(`#${ID}-usage ul li`);
      for (let i = 0; i < getHobTypeOptions.length; i += 1) {
        let opt = getHobTypeOptions[i];
        if (opt.querySelector('label').innerText.trim().toLowerCase().indexOf('dishwasher safe') > -1) {
          document.querySelector(`.filter#features ul`).insertAdjacentElement('beforeend', opt);
          break;
        }
      }

      // --- Add Non-Stick option
      let opt = `<li>
        <div class="filterInput">
          <input type="checkbox" class="nonStick selsts" value="Non-Stick" id="filterFeaturesNonStick">
        </div>
        <label for="filterFeaturesOption1" class="filterText">Non-Stick</label>
        <span class="clear"></span>
      </li>`;
      if (!document.querySelector(`input#filterFeaturesNonStick`)) {
        document.querySelector(`.filter#features ul`).insertAdjacentHTML('beforeend', opt);
      }
      
      const nonStickValue = 'gourmetnonstick+aluminiumceramicnonstick+aluminiumgranitenonstick+aluminiumnonstick+stainlesssteelnonstick';
      const nonStickCheckbox = document.querySelector(`input#filterFeaturesNonStick`);
      if (checkNonStickParameter(url)) {
        nonStickCheckbox.checked = true;
      }
      nonStickCheckbox.addEventListener('click', (e) => {
        if (nonStickCheckbox.checked) {
          if (window.location.href.indexOf('filter_products') > -1) {
            location.search = 'filter_products=' + getUrlParameter('filter_products') + `+${nonStickValue}`;
            // window.location.href = updateUrlParameter(window.location.href, 'filter_products', nonStickValue);
          } else {
            location.search = 'filter_products=' + getUrlParameter('filter_products') + `+${nonStickValue}`;
            // window.location.href = addUrlParameter(window.location.href, 'filter_products', nonStickValue);
          }
        } else {
          // window.location.href = updateUrlParameter(window.location.href, 'filter_products', '');
          const filterString = getUrlParameter('filter_products');
          const filtersArray = filterString.split('+')
          const newFilters = filtersArray.filter(f => !f.match(/nonstick/));
          location.search = 'filter_products=' + newFilters.join('+')
        }
      });
      


      const getMaterialOptions = document.querySelectorAll(`#${ID}-material ul li`);
      for (let i = 0; i < getMaterialOptions.length; i += 1) {
        let opt = getMaterialOptions[i];
        if (opt.querySelector('label').innerText.trim().toLowerCase().indexOf('uncoated') > -1) {
          opt.querySelector('label').innerText = 'Uncoated';
          document.querySelector(`.filter#features ul`).insertAdjacentElement('beforeend', opt);
          break;
        }
      }
      

      // --- Observe any URL changes for Non Stick filter 
      let oldHref = document.location.href;
      let bodyList = document.querySelector("body");
      const observer = new MutationObserver(function(mutations) {
              mutations.forEach(function(mutation) {
                  if (oldHref != document.location.href) {
                    oldHref = document.location.href;
                    if (checkNonStickParameter(url)) {
                      nonStickCheckbox.checked = true;
                    } else {
                      nonStickCheckbox.checked = false;
                    }
                  }
              });
          });
      const config = {
          childList: true,
          subtree: true
      };
      
      observer.observe(bodyList, config);
    }
  });
};