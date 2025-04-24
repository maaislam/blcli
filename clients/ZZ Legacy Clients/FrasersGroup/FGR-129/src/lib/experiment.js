/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
 import debounce from 'lodash/debounce';
 import { setup, fireEvent } from '../../../../../core-files/services';
 import shared from '../../../../../core-files/shared';
 import { events, observer } from '../../../../../lib/utils';

// Force set analytics reference
events.analyticsReference = '_gaUAT';

export default () => {
  setup();

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // -----------------------------
  // ...

  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if(shared.VARIATION == 'control') {
    return;
  }

  // Write experiment code here
  // ...

  const bl__object_to_string = (obj) => {
    var keys = Object.keys(obj)
    var array = []
    for (var i = 0; i < keys.length; i++) {
      if (keys[i] && obj[keys[i]]) {
        var key = bl__normalise_string(keys[i]) || 'null'
        var value = bl__normalise_string(obj[keys[i]]) || 'null'
        array.push(key + '=' + value)
      }
    }
    return array.join(';')
  }

  const bl__normalise_string = (str) => {
    if (!str) {
      return null
    }
    // Ensure we're working with strings, not other data types
    str = str.toString()
    if (!typeof str === 'string' && !str instanceof String) {
      return null
    }
    // Convert to lowercase
    // Trim whitespace
    // Replace non alphanumeric characters with underscores
    // Trim leading/trailing underscores
    // Trim repeated underscores
    str = str.toLowerCase().trim().replace(/[^a-z0-9\/\.,_-]+/g, "_").replace(/^_+|_+$/g, '').replace(/_{2,}/g, '_');
    return str
  }

  const bl__get_el_index = (config) => {
    if (!config.click_el) { return false }
    var click_el = config.click_el.closest(config.el_selector)
    // Get an array of block references within the HTML container
    var all_els_container = click_el.closest(config.container_selector)
    var all_els_array = Array.prototype.slice.call(all_els_container.querySelectorAll(config.el_selector))
    if (!all_els_array) { return false; }
    // Loop through block references and filter out any 'spacer' blocks
    var position = 0;
    var total = 0;
    for (var i = 0; i < all_els_array.length; i++) {
      // Only increase counter if the block doesn't contain a spacer
      if (!config.exclude_selector || !all_els_array[i].querySelector(config.exclude_selector)) {
        total = total + 1;
      }
      if (i == all_els_array.indexOf(click_el)) {
        position = total
      }
    }
    // Return it
    return {
      position: position,
      total: total
    }
  }

  var bl__item_click_handler = function (e) {
    var item_el, checkbox_el, interaction_type, element_el, element_name_el, element_name, element_value, item_results, filter_position_data, item_position_data = null
    var interaction_data = {}
    var el = e.target
    item_el = el.closest('.FilterListItem')
    if (!item_el) { return false }
    // Status
    interaction_type = 'select'
    checkbox_el = item_el.querySelector('span[role="checkbox"]')
    if (checkbox_el && checkbox_el.getAttribute('aria-checked') == 'true') {
      interaction_type = 'deselect'
    }
    // Parent name
    element_el = item_el.closest('.productFilter')
    if (element_el) {
      element_name_el = element_el.querySelector('.productFilterTitle')
      interaction_data.element_name = element_name_el ? bl__normalise_string(element_name_el.innerText) : null
    }
    // Value
    element_value = item_el.getAttribute('data-productname')
    interaction_data.element_value = bl__normalise_string(element_value)
    // Item results
    item_results = item_el.getAttribute('data-productcount')
    interaction_data.results = bl__normalise_string(item_results)
    // Number of filters
    filter_position_data = bl__get_el_index({
      click_el: element_el,
      el_selector: '.productFilter',
      container_selector: '#filterlist'
    })
    if (filter_position_data && filter_position_data.position) {
      interaction_data.item_list_count = filter_position_data.total
      interaction_data.item_list_position = filter_position_data.position
    }
    // Number of filter items
    item_position_data = bl__get_el_index({
      click_el: item_el,
      el_selector: '.FilterListItem',
      container_selector: '.productFilterList'
    })
    if (item_position_data && item_position_data.position) {
      interaction_data.sub_item_list_count = item_position_data.total
      interaction_data.sub_item_list_position = item_position_data.position
    }
    var interaction_data_string = bl__object_to_string(interaction_data)

    // FOR GA PUSH
    var mergedEventLabel = 'interaction_type=' + interaction_type + ';' + interaction_data_string

    fireEvent(mergedEventLabel, true);
  }

  var bl__sort_click_handler = function (e) {
    var el = e.target
    var item_el = el.closest('.FilterListItem, .ddlSortOption')
    var item_name = bl__normalise_string(item_el.innerText)
    var interaction_data = {
      element_name: 'sort',
      element_value: item_name
    }
    var interaction_data_string = bl__object_to_string(interaction_data)

    // FOR GA PUSH
    var mergedEventLabel = 'interaction_type=select;' + interaction_data_string

    fireEvent(mergedEventLabel, true);
  }

  var bl__deselect_click_handler = function (e) {
    var el = e.target
    var item_el = el.closest('.selectedFilterToggle')
    if (!item_el) { return false }

    var item_label = item_el.querySelector('.selectedFilterLabel')
    if (!item_label) { return false }

    var item_name = bl__normalise_string(item_label.innerText)
    var interaction_data = {
      element_value: item_name
    }
    var interaction_data_string = bl__object_to_string(interaction_data)

    // FOR GA PUSH
    var mergedEventLabel = 'interaction_type=deselect;' + interaction_data_string

    fireEvent(mergedEventLabel, true);
  }

  window.dataLayer = window.dataLayer || []

  document.addEventListener("click", function (e) {
    if (e.target.closest('.ddlSortOption, .MobSortSelector .FilterListItem input')) {
      bl__sort_click_handler(e)
    } else if (e.target.closest('.selectedFilterToggle')) {
      bl__deselect_click_handler(e)
    } else if (e.target.closest('#filterlist .FilterListItem')) {
      bl__item_click_handler(e)
    } 

    if (e.target.closest('#clrallfltrs') || e.target.closest('.inlineClearAllFilters')) {
      fireEvent('interaction_type=clearall', true);
    }

    if (e.target.classList.contains('productFilterClear')) {
      let filterClearedFrom = e.target.closest('.productFilter').querySelector('.productFilterTitle').innerText.toLowerCase().replaceAll(' ', '_');
      fireEvent('interaction_type=clearfilter;cleared_from=' + filterClearedFrom, true);
    }

    if(window.location.href.indexOf('sportsdirect') > -1) {
      if (e.target.id == 'PriceFilterTextEntryApply') {

        let priceFilterMin = document.getElementById('PriceFilterTextEntryMin').value;
        let priceFilterMax = document.getElementById('PriceFilterTextEntryMax').value;

        fireEvent('interaction_type=select;element_name=price;element_value=' + priceFilterMin + '-' + priceFilterMax, true);
      }
    } 
    
  }, true);

  if (window.location.href.indexOf('houseoffraser') > -1) {

    const wrap = document.querySelector('.PriceRTag #amount');
    observer.connect(wrap, debounce(() => {
      setTimeout(() => {
        fireEvent('interaction_type=select;element_name=price;element_value=' + wrap.innerText.toLowerCase().replaceAll(' ', '_').replaceAll('£',''), true);    
      }, 500)       

    }, {
      config: {
        attributes: true,
        childList: true,
        subtree: false,
      }
    }))

  }

  
};
