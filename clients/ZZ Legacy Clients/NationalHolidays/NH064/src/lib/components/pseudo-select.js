import settings from '../settings';

/**
 * PseudoSelect
 */
const PseudoSelect = (props) => {
  const options = props.options;

  let optionContent = '';

  if(props.selectedContent) {
    optionContent += `<li class="${settings.ID}-pseudoselect__result">${props.selectedContent}</li>`;
  }

  options.forEach((opt) => {
    optionContent += `<li 
      class="${settings.ID}-pseudoselect__option ${opt.selected ? (settings.ID)+'-pseudoselect__option--selected' : ''}" 
      data-ident="${opt.ident}">${opt.rawValue}</li>`;
  });

  let extraClasses = '';
  if(options.length > 8) {
    extraClasses += `${settings.ID}-pseudoselect--scrollable`;
  }

  return `
    <div class="${settings.ID}-pseudoselect ${extraClasses}">
      <div class="${settings.ID}-pseudoselect__inner">
        ${optionContent}
      </div>
    </div>
  `;
};

/**
 * Toggle pseudo select toggle state
 */
export const pseudoSelectToggle = (cb) => {
  const pseudoSelect = document.querySelector(`.${settings.ID}-pseudoselect`);
  const isOpen = pseudoSelect.classList.contains(`${settings.ID}-pseudoselect--open`);

  if(isOpen) {
    pseudoSelect.classList.remove(`${settings.ID}-pseudoselect--open`);
  } else {
    pseudoSelect.classList.add(`${settings.ID}-pseudoselect--open`);
  }
  
  if(typeof cb === 'function') {
    const isNowOpen = !isOpen;
    cb(isNowOpen);
  }
};

/**
 * Close select
 */
export const pseudoSelectClose = () => {
  const pseudoSelect = document.querySelector(`.${settings.ID}-pseudoselect`);
  pseudoSelect.classList.remove(`${settings.ID}-pseudoselect--open`);
};

/**
 * Set raw value
 */
export const setDropdownResult = (content) => {
  const result = document.querySelector('.NH064-pseudoselect__result');
  if(result) {
    result.innerHTML = content;
  }
};

/**
 * When option chosen via dropdown, set dropdown result
 */
export const handleChooseDropdownOption = (cb) => {
  const opts = document.querySelectorAll('.NH064-pseudoselect__option');
  [].forEach.call(opts, (opt) => {
    opt.addEventListener('click', (e) => {
      markAllOptionsNotSelected();

      setDropdownResult(e.currentTarget.innerHTML);
      pseudoSelectClose();

      e.currentTarget.classList.add(`${settings.ID}-pseudoselect__option--selected`);

      if(typeof cb == 'function') {
        cb(e.currentTarget);
      }
    });
  });
};

export const pseudoSelectIsOpen = () => {
  const pseudoSelect = document.querySelector(`.${settings.ID}-pseudoselect`);
  const pseudoSelectIsOpen = pseudoSelect.classList.contains(`${settings.ID}-pseudoselect--open`);

  return pseudoSelectIsOpen;
};

const markAllOptionsNotSelected = () => {
  const opts = document.querySelectorAll('.NH064-pseudoselect__option');
  [].forEach.call(opts, (opt) => {
    opt.classList.remove(`${settings.ID}-pseudoselect__option--selected`);
  });
};

export default PseudoSelect;
