/**
 * @fileoverview The triggers file contains all activation conditions for the experiment.
 * This is the first file to be evaluated.
 */
import activate from './lib/experiment';
import { getCookie, pollerLite } from '../../../../lib/utils';
import getFacets from './lib/helpers/getFacets';

if (!getCookie('Synthetic_Testing')) {
  pollerLite(
    [
      '.hiddenDataForDX',
      () => document.querySelector('.oct-listers-facets') || document.querySelector('.oct-listers__filter-trigger'),
    ],
    () => {
      const hiddenDataForDXElem = document.querySelector('.hiddenDataForDX');

      if (!hiddenDataForDXElem) {
        return;
      }

      const hiddenDataForDX = JSON.parse(hiddenDataForDXElem.textContent);

      const categoryArr = hiddenDataForDX.appliedFilters;

      getFacets(categoryArr).then((data) => {
        const facets = data.products.facets;

        const multipleTypeFacets = facets.filter((facet) => facet.type === 'multiple' || facet.type === 'colour' || facet.type === 'ratings');

        const facetElementsData = multipleTypeFacets.reduce((acc, facet) => {
          const facetKey = facet.key;
          const facetKeyText = facet.text;
          const facetElems = facet.elements;
          const facetValuesData = facetElems.map((value) => {
            return {
              facetKeyText,
              facetKey,
              facetItemData: value,
            };
          });
          return [...acc, ...facetValuesData];
        }, []);

        window.facets = facetElementsData;
        activate();
      });
    }
  );
}
