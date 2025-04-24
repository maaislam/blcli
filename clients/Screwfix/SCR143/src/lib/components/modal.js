import { searchIcon } from '../assets/icons';
import { searchData } from '../data/data';
import popularBrands from './popularBrands';
import popularCategories from './popularCategories';
import popularSearches from './popularSearches';
import sliderWrapper from './sliderWrapper';

// ${sliderWrapper(id)}

const modal = (id, data) => {
  const html = `
              <div class="${id}__modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" tabindex="-1">
                  <div class="${id}__modal-overlay"></div>
                  <div class="${id}__modal-container">
                      <div class="${id}__searchWrapper">
                        <div class="${id}__searchContainer">
                            <form class="${id}__searchBox">
                                <div class="${id}__inputWrapper">
                                     <input type="text" placeholder="Search drills, screws, deals" class="${id}__input" aria-label="Search for products" aria-describedby="search-instructions" autofocus/>
                                    <span class="${id}__divider"></span>
                                     <button type="submit" aria-label="Submit search">
                                        <span class="${id}__icon">${searchIcon}</span>
                                    </button>
                                </div>
                                <div class="${id}__closeWrapper" aria-label="Close search modal" tabindex="0">Close</div>
                            </form>
                        </div>
                      </div>
                      <div class="${id}__dynamicSearchResults"></div>
                      <div class="${id}__staticSearchResults">
                            ${popularSearches(id, searchData['popular-brand-images'])}
                        
                      </div>
                  </div>
              </div>
          `;
  return html.trim();
};

export default modal;
