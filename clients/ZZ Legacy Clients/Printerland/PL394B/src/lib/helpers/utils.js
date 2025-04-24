export const isElementInViewport = (el) => {
  var rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

export const getSelectedFilter = (ID) => {
  let filterMsg;
  const urlParams = new URLSearchParams(window.location.search);
  const priceFrom = urlParams.get('price-from');
  const priceTo = urlParams.get('price-to');
  const reviewRating = urlParams.get('reviewrating');

  const selectedFilters = [...document.querySelectorAll('.current_filters li')];
  const prevSelectedFilters = sessionStorage.getItem(`${ID}__selected_filters`);

  const hasPriceFilter = prevSelectedFilters?.includes(`price-range ${priceFrom} to ${priceTo}`);
  const hasRatingFilter = prevSelectedFilters?.includes(`${reviewRating?.split(' ')[0]} star`);

  //console.log('file: utils.js:24 ~ getSelectedFilter ~ hasRatingFilter:', hasRatingFilter);

  if (priceFrom && priceTo && !hasPriceFilter) {
    selectedFilters.push(`price-range-${priceFrom}-to-${priceTo}`);
    filterMsg = `user selected filter: price-range - ${priceFrom} to ${priceTo}`;
    //return filterMsg;
  }

  if (reviewRating && hasRatingFilter === undefined) {
    selectedFilters.push(`${reviewRating.split(' ')[0]}-star`);
    filterMsg = `user selected filter: customer review - ${reviewRating.split(' ')[0]} star`;
    //return filterMsg;
  }

  const prevSelectedFiltersArr = prevSelectedFilters?.split(',') || [];
  if (prevSelectedFiltersArr.length <= selectedFilters.length) {
    const newSelectedFilter = selectedFilters.find((filter) => !prevSelectedFiltersArr.includes(filter.innerText));

    const filterName =
      typeof newSelectedFilter === 'string' ? newSelectedFilter : newSelectedFilter?.querySelector('.filter-name').innerText;

    if (filterName) {
      const filterCategories = document.querySelectorAll('.category-filters .selected');
      const filterCategory = [...filterCategories].map((category) => category.closest('.filter__container').dataset.filterName);

      filterMsg = `user selected filter: ${filterCategory[filterCategory.length - 1]} - ${filterName}`;
    }
  }
  sessionStorage.setItem(
    `${ID}__selected_filters`,
    selectedFilters.map((filter) => (typeof filter === 'string' ? filter : filter.querySelector('.filter-name')?.innerText))
  );

  if (window.location.pathname === '/printers' && window.location.search === '') {
    sessionStorage.removeItem(`${ID}__selected_filters`);
  }
  return filterMsg;
};

// export const getSelectedFilterV2 = (lastUrl, currUrl) => {
//   console.log(lastUrl, "lastUrl");
//   console.log(currUrl, "currUrl");
//   const getUrlsParts = (url) => {
//     const urlParts = new URL(url || window.location.href);
//     const filters = [];
//     const urlParams = new URLSearchParams(urlParts.search);
//     urlParts.pathname.split('/').forEach((path) => path !== '' && filters.push(path));
//     [...urlParams.entries()].forEach((param) => filters.push(param.join('-')));
//     return filters;
//   };
//   const lastUrlParts = getUrlsParts(lastUrl);
//   const currUrlParts = getUrlsParts(currUrl);
//   //find difference between last and current url
//   const diff = currUrlParts.filter((x) => !lastUrlParts.includes(x));
//   let resultStage1
//    resultStage1 = diff.length > 0 ? diff[0] : null;
//   const seperators = ['-', '|'];
//   const resultStage2 = seperators.map((sep)=>{
//     if(resultStage1.includes(sep)){
//       return resultStage1.split(sep)
//     }
//   }).flatMap((x)=>x).filter((x)=>x);

//   const finalResult = resultStage2.find((item)=>!document.referrer.includes(item))
//   console.log(finalResult, "finalResult")
//   console.log(resultStage2, "resultStage2");
// };
