import { fireBootsEvent } from '../../../../../../core-files/services';
import shared from '../../../../../../core-files/shared';
import actionTypes from '../actionTypes';
import facetsListItem from '../components/filterListItems';
import eventTypes from '../eventTypes';
import { applySelectedClass, updateURLFilter } from '../helpers/utils';

const filterSearchHandler = (e) => {
  const { ID } = shared;
  const { target } = e;
  const query = target.value.trim().toLowerCase();

  const filterListItems = document.querySelectorAll(`.${ID}__filter-result`);

  target.classList.remove('err-input');

  //remove all filter Items
  filterListItems.forEach((item) => {
    item.remove();
  });

  //remove group headers
  const groupHeaders = document.querySelectorAll('[class*="__groupheader"]');
  groupHeaders.forEach((groupHeader) => {
    groupHeader.remove();
  });

  const filterContainer = document.querySelector(`.${ID}__filter-results`);

  if (query === '') {
    filterContainer.innerHTML = '';

    return;
  }

  const allFacets = window.facets;

  const matchingFacets = allFacets.filter((facet) => {
    const { facetItemData, facetKey } = facet;
    const val = facetItemData.text.toLowerCase();

    return query !== '' && (val.includes(query) || facetKey.includes(query));

    //return query !== '' && (fuzzyMatch(query, val) || fuzzyMatch(query, facetKey));
  });

  if (matchingFacets.length === 0) {
    //show error message
    const errElem = `
      <li class="${ID}__filter-result ${ID}__filter-result--error">
        <p class="${ID}__filter-result-text">No results were found for "${query}".</p>
        <p class="${ID}__filter-result-text">Please try another search.</p>
      </li>`;
    filterContainer.insertAdjacentHTML('beforeend', errElem);
    target.classList.add('err-input');
    return;
  }

  matchingFacets.forEach((facet, index) => {
    //console.log('🚀 ~ matchingFacets.forEach ~ facet:', facet);
    const facetElem = facetsListItem(facet, ID, index);
    filterContainer.insertAdjacentHTML('beforeend', facetElem);
    applySelectedClass();

    //add change event

    const checkboxes = document.querySelector(`.${ID}__checkbox-${index}`);

    checkboxes.addEventListener('change', (e) => {
      const li = e.target.closest(`.${ID}__filter-result`);
      const filterName = li.getAttribute('data-filtername');
      const filterValue = li.getAttribute('data-filtervalue');

      updateURLFilter(filterName, filterValue, query);

      fireBootsEvent(`${filterName} -Searched Filter Clicked`, true, eventTypes.experience_action, {
        action: actionTypes.click_cta,
        action_detail: `${filterName} -Searched Filter Clicked`,
      });
    });
  });

  //get unique visible filter names

  const visibleFilterNames = [...document.querySelectorAll(`.${ID}__filter-result`)].map((item) =>
    item.getAttribute('data-facetskeyText')
  );
  //no duplicates

  const uniqueVisibleFilterNames = [...new Set(visibleFilterNames)];

  uniqueVisibleFilterNames.forEach((uniqueVisibleFilterName) => {
    const firstGroupItem = document.querySelector(`[data-facetskeyText="${uniqueVisibleFilterName}"]`);

    const groupHeaderElem = `<h2 class="${ID}__groupheader-${uniqueVisibleFilterName} oct-text oct-text--standard oct-text--size_m oct-aem-text oct-aem-text--h2--variant-1 oct-accordion__text--primary">
            ${uniqueVisibleFilterName.replace(/_/g, ' ')}
          </h2>`;

    firstGroupItem.insertAdjacentHTML('beforebegin', groupHeaderElem);
  });
};

export default filterSearchHandler;
