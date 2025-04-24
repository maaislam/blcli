import { activeRadioButton, inactiveRadioButton, dropDownCloseIcon, dropDownOpenIcon } from '../assets/icons';

const variantDropDown = (id, data, activeCardSku) => {
  const html = `
          <div class="${id}__variantDropDown">
              <div class="${id}__variantDropDownContainer" tabindex="0" role="button">
                    <div class="${id}__selectedItem">
                        <div class="${id}__selectedText"
                        aria-controls="${id}__optionsContainer"
                        aria-expanded="false"
                        aria-live="polite"
                        id="dropdown-label"
                        >
                            View more screw sizes
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
                        ${data
                          .map((item) => {
                            return `
                                <a role="option" tabindex="-1" href="${item.url}" class="${id}__item ${
                              activeCardSku.sku.toLowerCase() === item.sku.toLowerCase() ? `${id}__active` : ``
                            }">
                                    <span>
                                            <span class="${id}__icon">${
                              activeCardSku.sku.toLowerCase() === item.sku.toLowerCase()
                                ? `${activeRadioButton}`
                                : `${inactiveRadioButton}`
                            }</span>
                                            <span class="${id}__text">D: ${item.diameter} x L: ${item.length}</span>
                                    </span>
                                    <div class="${id}__price static-data">£${item.price}</div>
                                </a>
                            `;
                          })
                          .join('\n')}
                    </div>  
              </div>
          </div>
      `;
  return html.trim();
};

export default variantDropDown;
