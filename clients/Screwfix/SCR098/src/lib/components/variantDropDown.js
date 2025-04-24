import { activeRadioButton, inactiveRadioButton, dropDownCloseIcon, dropDownOpenIcon } from '../assets/icons';
const variantDropDown = (id, data, activeHeight, activeWidth) => {
  const html = `
          <div class="${id}__variantDropDown">
              <div class="${id}__variantDropDownContainer">
                    <div class="${id}__selectedItem">
                        <div class="${id}__selectedText">
                            Select size: ${activeHeight}mm x ${activeWidth}mm
                        </div>
                        <div class="${id}__dropdownIcon">
                            ${dropDownCloseIcon}
                            ${dropDownOpenIcon}
                        </div>
                    </div>
                    <div class="${id}__optionsContainer">
                        ${data
                          .map((item, index) => {
                            return `
                                <a href="${item.URL}" data-height="${item.height}" data-width="${item.width}">
                                    <span>
                                    <span class="${id}__icon">${
                              index === 0 ? `${activeRadioButton}` : `${inactiveRadioButton}`
                            }</span>
                                    <span class="${id}__text">${item.description}</span>
                                    </span>
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
