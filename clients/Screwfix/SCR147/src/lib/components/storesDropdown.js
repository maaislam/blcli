import { dropDownCloseIcon, dropDownOpenIcon, inactiveRadioButton } from '../../../../SCR097/src/lib/assets/icons';

const storesDropdown = (id, data) => {
  const html = `
    <div class="${id}__storesDropdown">
        <div class="${id}__variantDropDownContainer" tabindex="0" role="button">
              <div class="${id}__selectedItem" >
                  <div class="${id}__selectedText"
                    aria-controls="${id}__optionsContainer"
                    aria-expanded="false"
                    aria-live="polite"
                    id="dropdown-label"
                  >
                    Nearby Stores
                  </div>
                  <div class="${id}__dropdownIcon">
                    ${dropDownCloseIcon}
                    ${dropDownOpenIcon}
                  </div>
              </div>
              <div class="${id}__optionsContainer"
                aria-labelledby="dropdown-label" 
                aria-hidden="true"
                role="listbox"
              >
                ${data?.nearestStores.map((item) => {
                  const {branchCode, name} = item.storeInfo.store.basic;
                  const {distanceText} = item.storeInfo.carRoute;
                  const branchStock = item.products[0].branchStock;
                  const productAvailabilityStatus = item.products[0].productAvailabilityStatus;
                  // const status = item.basketItemsInStock;

                  return `
                    <div 
                      role="option" 
                      tabindex="-1" 
                      class="${id}__item" 
                      data-stock="${branchStock}" 
                      data-status="${productAvailabilityStatus}"
                      data-branch-code="${branchCode}"
                    >
                      <span class="${id}__storeName">
                        <span class="${id}__icon">${inactiveRadioButton}</span>      
                        <span class="${id}__name">${name}</span>      
                      </span>
                      <div class="${id}__distanceText">(${distanceText})</div>
                    </div>
                  `;
                  }).join('\n')}
              </div>  
        </div>
        <div class="${id}__clearButtonWrapper">
          <span class="${id}__clearButton" tabindex="0">Change postcode</span>
        </div>
    </div>
  `;
  return html.trim();
};

export default storesDropdown;
