const facetsListItem = (data, ID, index) => {
  const { facetKey, facetItemData, facetKeyText } = data;
  const facetName = facetItemData.text;
  const count = facetItemData.count;

  const ratingText = facetKeyText === 'Rating' ? `${Number(facetName) === 1 ? ' Star' : ' Stars'}` : '';

  const htmlStr = `
      <li class="${ID}__filter-result checkbox-list-facet__child facet__child" data-facetskeyText="${facetKeyText}" data-filterName="${facetKey}" data-filterValue="${facetName.replace(
    '#',
    '_'
  )}">
        <label class="oct-checkbox">
            <input class="${ID}__checkbox-${index} oct-checkbox__input"
                  type="checkbox"
                  data-testid="checkbox-input"
                  value="">
            <svg width="32px"
                height="32px"
                viewBox="0 0 32 32"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                role="img"
                class="oct-icon"
                aria-hidden="true"
                aria-label=""
                style="height: 20px; width: 20px; fill: white;">
                <g stroke="none"
                  stroke-width="1"
                  fill-rule="evenodd">
                    <polygon points="13 21.2 5.9 14.1 4.5 15.5 11.6 22.6 13 24 27.1 9.9 25.7 8.4"></polygon>
                </g>
            </svg>
            <span data-testid="checkbox-label ${ID}__filter-result-label"
                  class="checkbox__label">${facetName.includes('#') ? facetName.split('#')[0] : facetName}${ratingText}<span
                      class="checkbox-list-facet__child__count facet__child__count">(${count})</span></span>
        </label>
      </li>
    `;
  return htmlStr;
};

export default facetsListItem;
