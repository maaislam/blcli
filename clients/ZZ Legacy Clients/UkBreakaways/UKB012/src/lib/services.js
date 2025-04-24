import {
  fullStory
} from '../../../../../lib/utils';
import settings from './settings';

const {
  ID,
  VARIATION
} = settings;
const filters = document.querySelectorAll('.left .filters .filter-category');
/**
 * Standard experiment setup
 */
function setup() {
  fullStory(ID, `Variation ${VARIATION}`);
  document.body.classList.add(ID);
  if (VARIATION > 1) document.body.classList.add(`${ID}-${VARIATION}`);
}

function attachEvents() {
  const customFilters = document.querySelectorAll(`.${ID}_tab__checkbox`);
  const tabs = document.querySelectorAll(`.${ID}_tab__headerContent`);
  const tabsBodies = document.querySelectorAll(`.${ID}_tab`);
  const removeFilterButtons = document.querySelectorAll(`.${ID}_remove`);
  [].forEach.call(customFilters, function (filter) {
    filter.addEventListener('click', function (e) {
      const curId = e.target.id;
      const anchors = document.querySelectorAll(`[data-clickedby="${curId}"] a`);
      [].forEach.call(anchors, function (anchor) {
        if (anchor.getAttribute('style') === 'display: block') {
          anchor.click();
        }
      });
    });
  });
  [].forEach.call(removeFilterButtons, function (button) {
    button.addEventListener('click', function (e) {
      const curId = e.target.getAttribute('data-remove');
      const anchors = document.querySelectorAll(`[data-clickedby="${curId}"] a`);
      [].forEach.call(anchors, function (anchor) {
        if (anchor.getAttribute('style') === 'display: block') {
          anchor.click();
        }
      });
    });
  });
  [].forEach.call(tabs, function (tab) {
    tab.addEventListener('click', function (e) {
      if (window.innerWidth > 768) {
        const target = e.target.getAttribute('data-tab');
        [].forEach.call(tabs, function (curTab) {
          if (curTab.classList.contains('active')) {
            curTab.classList.remove('active');
          }
        });
        e.target.classList.add('active');
        [].forEach.call(tabsBodies, function (body) {
          if (body.classList.contains('active')) {
            body.classList.remove('active');
          }
        });
        document.querySelector(`#${target}`).classList.add('active');
      } else {
        tab.addEventListener('click', function (e) {
          /*const target = e.target.getAttribute('for');
          const triggers = document.querySelectorAll(`.${ID}_tab__checkbox--trigger`);
          [].forEach.call(triggers, function(trigger){
            const isTriggerChecked = trigger.checked;
            const triggerName = trigger.id;
            if(target !== triggerName && isTriggerChecked){
              document.querySelector(triggerName).click();
            }
          });*/
        })
      }
    });
  });
}

function generateTabHeader(id) {
  const icons = [{
      dataIcon: 'pound',
      id: 'AdultPriceFilters',
      text: 'Price per adult',
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAA4CAMAAAC49krEAAAAk1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB6eSN1AAAAMHRSTlMAbfnhkoZhTykkHRTv6eW5GAX39fPaz6eiMgnKwX5pXllWQhDTrJh6YkY+LSGNc0rHOTKbAAABQ0lEQVRIx83T2XaCMBCA4YAgyKYssggCgru2nfd/uuo5Pc0Qkmku+19/JIdJwiSNjrXOF2kSHZuyrWImL77WMClypOwzAjHzOXerHCS1M9dnIKsT3QHkPQR3T+QuE9wmAHmNAM+g6DJ1rqlwC38KC5iU21fH6Y3z6cMTJp1hth2Yqht2uc+UWciZLlO3RrBkREcEHQqGCLoUBNSOgiY+Wyp80CRcIDhSsNH9mVJvPK6Fty6W7778uRtSkJQaM7gFeZXgPFC0F2ClgpY21N6aOhbcIMJe7tZsVhfOWVJKr5u3srkJVq84E7qgN8+o0Io1CS0OCxKeOLRJWHN4oNxocuhTcIkHTRSjO3mjYKu5oMsfQ+gR7ok2Lgyx7vfTRwRkyc+87gH8UfhmO9tUAjxZIwKNNowB/HPoa8KAacK9Hgztl/sG5hLTxTLOB0YAAAAASUVORK5CYII=',
      imageSelected: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAcCAMAAABWBG9SAAAAeFBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////GqOSsAAAAJ3RSTlMAtvv3w4IE5QzNknFTQicWEtK5rY2JdWtNSzkwKxsJ8O7bopt6Y13j1qgEAAAAqElEQVQoz4XR1w6DMAxAURcygLLKKru7/v8/rGQZgkXV3rccKYpiw9LUFNb3rdLBSnPkIxctlp1w7c5mQnSdGY8bu0yMlo5e1Y19nLL1SLWw7UWmQPQkrITxO1rim/AhbNaEahhShwrXwoAtx03JL4TQ2TVfMNMliYrqEVwJj0cUE3YSaxpSJszQ3Isvf/dTYS3tzB64MgYwjYcyz8ANdwWA/5Gv703DB59SKb+clscIAAAAAElFTkSuQmCC',
    },
    {
      dataIcon: 'calendar',
      id: 'DurationFilters',
      text: 'Duration',
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAfCAMAAAAshTY2AAAAgVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABtFS1lAAAAKnRSTlMAgcKtOkMsy7KeNNHw37yQuezo5dvIMSAD9eeolo53EM1uKOGhY2I8HRkCjmo8AAAA70lEQVQoz62QR66EMBBEjU3Gw5AzE37+df8DTmExyBskFtTiyaUntdotlrSBvgkrf7XdIwD/lp3Y261lbI1lQ3bXvNws+DB2Ct5pjJ3ruROfQGxsind+jSW+xfIYiVZu1ouIZaCz2GdT4Nrlm735JaJuWG3RdncxY0u+dAerhZ6cGlb6yJFY7U6O2VJK2aMwzEkNTearvfIoF0RkAkVKpGR4gq2UUj0upEZJ5ijI4YQfffk+L6vICikZoCblCTsrz/MKZGQFSSZ4kPUJO4+u6w4ISU4mE5jsbnXcjnEclwhJXoN8HN1KYz9P8bOv5f0FvGpbjd/dOIEAAAAASUVORK5CYII=',
      imageSelected: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAfCAMAAAAshTY2AAAAflBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////vroaSAAAAKXRSTlMAgcKuNDrMQy3Rj57w6LPfvbog7OXbA/XIppqVcykQ4eDJqXxsY2I8GdmKFSMAAADuSURBVCjPrY9HjoQwFESNbbLNkHP35FD3v+AUFk2zQWJBLZ5cetJXWSwpAzOLXcrefD5bCuBvZyf2cmsFm95Zxe67l18EN2en4BHtbPKetOKVwtkcj/w6mwHfYnkMRCk3G6bEctBb7Je2mNpqs/Otxtja1dqyvYsEW6qle1gtzOj12KUbPYnVHuScraWUHaxjRRoYslptIoR4QUrGUKRETmYX2EYp1eGNNKjJCpa0F/xoiKKohiIbFGSAnpQXbFZhGFoUZANJxgjI/oLNH77vW2QkL5MxXA5XnbeD1rpGRjbIyfjsKoPjzOLnWMv7P8VuWOccwCt9AAAAAElFTkSuQmCC',
    },
  ];
  let html = '';
  if (id) {
    [].forEach.call(icons, function (icon, i) {
      if (icons[i].id === id) {
        html += `
        <div class="${ID}_tab__header">
          <div class="${ID}_tab__headerItem">
            <label for="trigger-${icons[i].id.toLowerCase()}" class="${ID}_tab__headerContent" data-tab="${icons[i].id.toLowerCase()}" data-icon="${icons[i].dataIcon}">${icons[i].text}</label>
          </div>
        </div>
        <!--End header-->
        `;
      }
    });
  } else {
    [].forEach.call(filters, function (filter, i) {
      if (filter.id.indexOf(icons[i].id) > -1) {
        html += `
        <div class="${ID}_tab__headerItem">
          <label for="trigger" class="${ID}_tab__headerContent ${i === 0 ? 'active' : ''}" data-tab="${icons[i].id.toLowerCase()}" data-icon="${icons[i].dataIcon}">${icons[i].text}</label>
        </div>
        <!--End item-->
        `;
      }
    });
  }
  return html;
}

function generateTabBody(id) {
  let html = '';
  let curListItems;
  let curContent;
  let isClicked;
  [].forEach.call(filters, function (filter) {
    curListItems = filter.querySelectorAll('ul li');
    if (filter.id.indexOf(id) > -1) {
      [].forEach.call(curListItems, function (item, i) {
        item.setAttribute('data-clickedby', `filter-${id}_${i}`);
        isClicked = item.classList.contains('active');
        if (id === 'AdultPriceFilters') {
          curContent = item.querySelector('a').textContent.trim().replace(/\s/g, '').split('(');
          curContent[0] = curContent[0].replace('-', ' - ');
          if (isClicked) {
            const newFilter = document.createElement('div');
            newFilter.classList.add(`${ID}_filter`);
            newFilter.innerHTML = `
              ${curContent[0]}
              <span class="${ID}_remove" data-remove="filter-${id}_${i}"></span>
            `;
            document.querySelector(`.${ID}_appliedFilters`).insertAdjacentElement('beforeend', newFilter);
          }
        } else {
          curContent = item.querySelector('a').textContent.trim().split('(');
          if (isClicked) {
            const newFilter = document.createElement('div');
            newFilter.classList.add(`${ID}_filter`);
            newFilter.innerHTML = `
              ${curContent[0]}
              <span class="${ID}_remove" data-remove="filter-${id}_${i}"></span>
            `;
            document.querySelector(`.${ID}_appliedFilters`).insertAdjacentElement('beforeend', newFilter);
          }
        }
        html += `
          <li class="${ID}_tab__listItem">
            <div class="${ID}_tab__listContent">
              <label for="filter-${id}_${i}" class="${ID}_tab__label">
                <input type="checkbox" class="${ID}_tab__checkbox" name="filter-${id}_${i}" id="filter-${id}_${i}" ${isClicked ? 'checked' : ''}>
                <span class="checkmark"></span>
                ${curContent[0]} (${curContent[1]}
              </label>
            </div>
          </li>
          <!--End element-->
        `;
      });
    }
  });
  return html;
}

function generateTabs(device) {
  const ids = ['AdultPriceFilters', 'DurationFilters'];
  let html = '';
  let curEl;
  if (device === 'mobile') {
    [].forEach.call(filters, function (filter, i) {
      if (filter.id.indexOf(ids[i]) > -1) {
        curEl = i;
        html += `
        <div class="${ID}_tab" id="${ids[i].toLowerCase()}">
        <input type="checkbox" class="${ID}_tab__checkbox ${ID}_tab__checkbox--trigger" id="trigger-${ids[i].toLowerCase()}">
        ${generateTabHeader(ids[i])}
          <div class="${ID}_tab__body">
            <ul class="${ID}_tab__list">
            ${generateTabBody(ids[i])}
            </ul>
          </div>
          <!--End body-->
        </div>
        <!--End tab-->
        `;
      }
    });
  } else {
    [].forEach.call(filters, function (filter, i) {
      if (filter.id.indexOf(ids[i]) > -1) {
        curEl = i;
        html += `
        <div class="${ID}_tab ${i === 0 ? 'active' : ''}" id="${ids[i].toLowerCase()}">
          <div class="${ID}_tab__body">
            <ul class="${ID}_tab__list">
            ${generateTabBody(ids[i])}
            </ul>
          </div>
          <!--End body-->
        </div>
        <!--End tab-->
        `;
      }
    });
  }
  return html;
}

function initTabs(device) {
  const isNotFound = document.querySelector('#search-results h1 span');
  if (!isNotFound) {
    const element = document.createElement('div');
    const appliedFilters = document.createElement('div');
    appliedFilters.classList.add(`${ID}_appliedFilters`);
    document.querySelector('#SearchResults .container div').insertAdjacentElement('beforeend', appliedFilters);
    element.classList.add(`${ID}_tabWrap`);
    if (device === 'mobile') {
      document.body.classList.add('mobile');
      element.innerHTML = `
      <h4 class="${ID}_tab__title">Filter by</h4>
      ${generateTabs(device)}
    `;
    } else {
      element.innerHTML = `
      <h4 class="${ID}_tab__title">Filter by</h4>
      <div class="${ID}_tab__header">
        ${generateTabHeader()}
      </div>
      <!--End header-->
      ${generateTabs()}
    `;
    }
    document.querySelector('#SearchResults .container div').insertAdjacentElement('afterbegin', element);
    attachEvents();
  }
}

export {
  setup,
  initTabs
}; // eslint-disable-line
