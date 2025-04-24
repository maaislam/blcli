import { pollerLite } from '../../../../../lib/uc-lib';
import { events } from '../../../../../lib/utils';
import gaEventParameters from './gaEventParameters';


export default () => {
  function uppercaseFirstLetter(text) {
    text = text.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
    return text;
  }

  const navIcon = document.querySelector('i.header_icon.ico-navicon.iconShop');
  navIcon.addEventListener('click', (e) => {
    const mainCategories = document.querySelectorAll('.nav_category.bg-white.pb-3.nav_category-selected ul.nav_group.list-unstyled.m-0.px-3 li.yCmsComponent.nav_groupLink.font-weight-light.js-navSwitchCategory');
    [].forEach.call(mainCategories, (cat) => {
      const catName = cat.querySelector('a').innerText;
      // cat.setAttribute('data-ga-action', `${catName}`);
      cat.addEventListener('click', () => {
        let categoryClicked = catName;
        categoryClicked = uppercaseFirstLetter(categoryClicked);
        gaEventParameters.action = categoryClicked;

        if (categoryClicked === 'Our Offers' || categoryClicked === 'New In') {
          // events.send(`${gaEventParameters.category}`, `${gaEventParameters.action}`, `${gaEventParameters.label}`, { sendOnce: true });
          // alert(`line 28 - category: ${gaEventParameters.category}, action: ${gaEventParameters.action}, label: ${gaEventParameters.label}`);
        }
        setTimeout(function(){ 
          const subCategoryList = document.querySelector('.nav_category.bg-white.pb-3.nav_category-selected');
          // console.log(`SUBCATEGORY   LIST   : `);
          // console.log(subCategoryList);
          const levelTwoSubCategories = subCategoryList.querySelectorAll('ul.nav_group.list-unstyled.m-0.px-3 li');

          [].forEach.call(levelTwoSubCategories, (twoSubCat) => {
            // console.log('LEVEL  TWO  SUB  CATEGORY  :');
            // console.log(twoSubCat);
            // console.log('------------------------------');
            twoSubCat.addEventListener('touchstart', () => {
              const subCatLink = twoSubCat.querySelector('a');
              let twoSubCatClicked = subCatLink.innerText.trim();
              const label = uppercaseFirstLetter(twoSubCatClicked);
              gaEventParameters.label = label;

              if (subCatLink.getAttribute('href') === "#") {
                pollerLite(['.nav_category.bg-white.pb-3.nav_category-selected .MP158-subLevel'], () => {
                  const levelThreeSubCategories = document.querySelectorAll('.nav_category.bg-white.pb-3.nav_category-selected .MP158-subLevel li.yCmsComponent');
                  [].forEach.call(levelThreeSubCategories, (threeSubCat) => {
                    // console.log('LEVEL  THREE  SUB  CATEGORY  :');
                    // console.log(threeSubCat);
                    // console.log('=======================================');
                    threeSubCat.addEventListener('click', () => {
                      const threeSubCatLink = threeSubCat.querySelector('a');
                      let threeSubCatClicked = threeSubCatLink.innerText.trim();
                      const subLabel = uppercaseFirstLetter(threeSubCatClicked);
                      if (gaEventParameters.label.indexOf(':') === -1) {
                        gaEventParameters.label = `${gaEventParameters.label}:${subLabel}`;
                        // events.send(`${gaEventParameters.category}`, `${gaEventParameters.action}`, `${gaEventParameters.label}`, { sendOnce: true });
                        // alert(`line 59 - category: ${gaEventParameters.category}, action: ${gaEventParameters.action}, label: ${gaEventParameters.label}`);
                      }
                    });
                  });
                });
              } else {
                // events.send(`${gaEventParameters.category}`, `${gaEventParameters.action}`, `${gaEventParameters.label}`, { sendOnce: true });
                // console.log(`line 63 - category: ${gaEventParameters.category}, action: ${gaEventParameters.action}, label: ${gaEventParameters.label}`);
              }
            });
          });
        }, 1000); 
      });
    })
  });
};