import { fullStory } from '../../../../../lib/utils';
import settings from './settings';
import { eventFire } from './../../../../../lib/utils';

const { ID, VARIATION } = settings;

/**
 * Standard experiment setup
 */
function setup() {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
}

function addExperimentElements(item) {
  // Add experiment class to pizza
  item.classList.add('PJ069-elements');
  // -- Get Size options and 
  // Create new select 
  const selectOptions = item.querySelector('select.variationDropDown.ddlSize').options;
  const selectedIndex = selectOptions.selectedIndex;
  const selectedSizeValue = selectOptions[selectedIndex].getAttribute('value');
  let newSizeSelection = '';
  for (let i = 0; i < selectOptions.length; i += 1) {
    const value = selectOptions[i].getAttribute('value');
    let className = '';
    switch(value) {
      case 'Extra Extra Large':
        className = 'Extra';
        break;
      default:
        className = value;
    }
    const text = selectOptions[i].innerText.trim();
    const res = text.split(",");
    if (res.length === 3 || res.length === 2) {
      let size = '';
      let price = '';
      if (res.length === 3) {
        size = res[0].trim();
        price = res[2].trim();
      } else {
        size = res[0].trim();
        if (size === "Extra Extra Large") {
          size = "XXL";
        }
        price = res[1].trim();
      }

      if (i !== selectedIndex) {
        newSizeSelection += `<li class="PJ069-pickSize__option PJ069-pickSize__${className}" value="${value}">
          <div class="PJ069-text">${size},</div>
          <div class="PJ069-text">${price}</div>
        </li>`;
      } else {
        newSizeSelection += `<li class="PJ069-pickSize__option PJ069-pickSize__${className} active" value="${value}">
          <div class="PJ069-text">${size},</div>
          <div class="PJ069-text">${price}</div>
        </li>`;
      }
    }
  }
  // -- Get Crust options and 
  // Create new select 
  const crustSelectOptions = item.querySelector('select.variationDropDown.ddlBase').options;
  const crustSelectedIndex = crustSelectOptions.selectedIndex;
  const selectedCrustValue = crustSelectOptions[crustSelectedIndex].getAttribute('value');
  let newCrustSelection = '';
  for (let i = 0; i < crustSelectOptions.length; i += 1) {
    const value = crustSelectOptions[i].getAttribute('value');
    let text = crustSelectOptions[i].innerText.trim();
    let className = '';
    switch(text) {
      case 'Authentic Thin Crust':
        text = 'Authentic Thin';
        className = 'Authentic';
        break;
      case 'Stuffed Crust + £2.50':
        text = 'Stuffed (+ 2.50)';
        className = 'Stuffed';
        break;
      default:
        className = 'Original';
    }
    let defaultSelection = '';
    if (i === crustSelectedIndex) {
      defaultSelection = 'active';
    }
    newCrustSelection += `<li class="PJ069-pickCrust__option PJ069-pickCrust__${className} ${defaultSelection}" value="${value}">
      <div class="PJ069-text">${text}</div>
    </li>`;
  }
  // -- For Vegan pizzas and any pizzas with only 2 crust options
  // Add Stuffed as Inactive
  if (crustSelectOptions.length === 2) {
    newCrustSelection += `<li class="PJ069-pickCrust__option PJ069-pickCrust__Stuffed inactive unavailable" value="Stuffed Crust">
      <div class="PJ069-text">Stuffed (+ £2.50)</div>
    </li>`;
  }

  /**
   * @desc Create new lightbox content
   * add new Select containers
   */
  const newContent = `<div class="PJ069-pickSize__wrapper">
    <div class="PJ069-pickSize__label">Pick a size</div>
    <div class="PJ069-pizzaSizes__container">
      <ul class="PJ069-pizzaSizes">
        <li class="PJ069-pizzaSize pizzaSize__Small">9.5"</li>
        <li class="PJ069-pizzaSize pizzaSize__Medium">11.5"</li>
        <li class="PJ069-pizzaSize pizzaSize__Large">13.5"</li>
        <li class="PJ069-pizzaSize pizzaSize__Extra">15.5"</li>
      </ul>
    </div>
    <div class="PJ069-pickSize__container">
      <ul class="PJ069-pickSize__options" id="${selectedSizeValue}-selected">
        ${newSizeSelection}
      </ul>
    </div>  
  </div>
  
  <div class="PJ069-pickCrust__wrapper">
    <div class="PJ069-pickCrust__label">Pick a crust</div>
    <div class="PJ069-pickCrust__container">
      <ul class="PJ069-pickCrust__options" id="Original-selected">
        ${newCrustSelection}
      </ul>
    </div>  
  </div>`;
  item.querySelector('.quantCustomise.pizzasCustomise.dipsCustomise.controlContainer .PRSeparator').insertAdjacentHTML('afterend', newContent);

  // -- Show size of pizza in inches above Size selection
  const pizzaSizes = item.querySelectorAll('.PJ069-pizzaSize');
  pizzaSizes[selectedIndex].classList.add('show');

  const quantityInputLabel = `<label class="PJ069-inputLabel">Quantity</label>`;
  const quantityInput = item.querySelector('.inputs input.quantity');
  quantityInput.insertAdjacentHTML('beforebegin', quantityInputLabel);

  // -- Selection Event Listeners
  bindSizeSelectEventListener(item);
  bindCrustSelectEventListener(item);
}

/** 
 * @desc Select SIZE - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
**/
function bindSizeSelectEventListener(item) {
  console.log('[150] inside function');
  const sizeSelectDropdown = item.querySelector('select.variationDropDown.ddlSize');
  const sizeOptions = item.querySelectorAll('.PJ069-pickSize__option');
  [].forEach.call(sizeOptions, (option) => {
    option.addEventListener('click', () => {
      if (!option.classList.contains('inactive')) {
        const optionValue = option.getAttribute('value');
        // Remove pre-selected size
        item.querySelector('.PJ069-pickSize__option.active').classList.remove('active');
        item.querySelector('.PJ069-pizzaSize.show').classList.remove('show');
        
        // Add active class to selected option
        option.classList.add('active');
        let className = '';
        if (optionValue === 'Extra Extra Large') {
          className = 'Extra';
        } else {
          className = optionValue;
        }
        item.querySelector(`.PJ069-pizzaSize.pizzaSize__${className}`).classList.add('show');

        item.querySelector('ul.PJ069-pickSize__options').setAttribute('id', `${className}-selected`);
        
        // Amend Crust Options if Size selected is not available for Authentic or Stuffed
        if (optionValue === 'Small') {
          if (optionValue === 'Small') {
            item.querySelector('.PJ069-pickCrust__Authentic').classList.add('inactive');
            item.querySelector('.PJ069-pickCrust__Stuffed').classList.add('inactive');
          } else {
            item.querySelector('.PJ069-pickCrust__Authentic').classList.remove('inactive');
            item.querySelector('.PJ069-pickCrust__Stuffed').classList.add('inactive');
          } 
        } else {
          item.querySelector('.PJ069-pickCrust__Authentic').classList.remove('inactive');
          if (!item.querySelector('.PJ069-pickCrust__Stuffed').classList.contains('unavailable')) {
            item.querySelector('.PJ069-pickCrust__Stuffed').classList.remove('inactive');
          }
        }
        // if (optionValue === 'Small' || optionValue === 'Extra Extra Large') {
        //   if (optionValue === 'Small') {
        //     item.querySelector('.PJ069-pickCrust__Authentic').classList.add('inactive');
        //     item.querySelector('.PJ069-pickCrust__Stuffed').classList.add('inactive');
        //   } else {
        //     item.querySelector('.PJ069-pickCrust__Authentic').classList.remove('inactive');
        //     item.querySelector('.PJ069-pickCrust__Stuffed').classList.add('inactive');
        //   } 
        // } else {
        //   item.querySelector('.PJ069-pickCrust__Authentic').classList.remove('inactive');
        //   if (!item.querySelector('.PJ069-pickCrust__Stuffed').classList.contains('unavailable')) {
        //     item.querySelector('.PJ069-pickCrust__Stuffed').classList.remove('inactive');
        //   }
        // }

        // Change Selection in Background Dropdown
        changeSelect(sizeSelectDropdown, optionValue);
      }
    });
  });
}

/** 
 * @desc Select CRUST - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
**/
function bindCrustSelectEventListener(item) {
  const crustSelectDropdown = item.querySelector('select.variationDropDown.ddlBase');
  const crustOptions = item.querySelectorAll('.PJ069-pickCrust__option');
  [].forEach.call(crustOptions, (option) => {
    option.addEventListener('click', () => {
      if (!option.classList.contains('inactive')) {
        const optionValue = option.getAttribute('value');
        // Remove pre-selected size
        item.querySelector('.PJ069-pickCrust__option.active').classList.remove('active');
        
        // Add active class to selected option
        option.classList.add('active');
        const newId = optionValue.split(" ")[0];
        item.querySelector('ul.PJ069-pickCrust__options').setAttribute('id', `${newId}-selected`);

        // Amend Size Options if Crust selected is not available in Small
        if (newId === 'Authentic' || newId === 'Stuffed') {
          item.querySelector('.PJ069-pickSize__Small').classList.add('inactive');
          if (newId === 'Stuffed') {
            // item.querySelector('.PJ069-pickSize__Extra').classList.add('inactive');
          } else {
            item.querySelector('.PJ069-pickSize__Extra').classList.remove('inactive');
          }
        } else {
          item.querySelector('.PJ069-pickSize__Small').classList.remove('inactive');
          // item.querySelector('.PJ069-pickSize__Extra').classList.remove('inactive');
        }
        // Change Selection in Background Dropdown
        changeSelect(crustSelectDropdown, optionValue);
      }
    });
  });
}

function changeSelect(dropdown, selectedValue) {
  const dropdownOptions = dropdown.options;
  let opt;
  for (let i = 0; i < dropdownOptions.length; i += 1) {
    opt = dropdown.options[i];
    if (opt.value === selectedValue) {
      opt.selected = true;
      opt.selected = 'selected';
      break;
    }
  }
  eventFire(dropdown, 'change');
}

export { setup, addExperimentElements }; // eslint-disable-line
