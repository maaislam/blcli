import { fetchBrands, fetchRecentlyViewedBrands } from './fetchBrands';
import { pollerLite } from '../../../../../lib/uc-lib';

export const fillBrands = (existingList, numberRequired = 1) => {
  let matchingBrands = [];
  const viewedBrands = fetchRecentlyViewedBrands();
  
  // Toggle the Quantity filters on PLP
  pollerLite([
    '.productFilterList .SortQtyName a:first-of-type',
  ], () => {
    const qtyOrderBtn = document.querySelector('.productFilterList .SortQtyName a:first-of-type');
    qtyOrderBtn.click();

    const brandList = document.querySelectorAll('.productFilterList .FilterListItem.ABRA');
    const brandListTextArr = [];
    for( var i = brandList.length-1; i >= 0; i--) {
      brandListTextArr.push(brandList[i].getAttribute('data-productname'));
    }
    
    // Match against recently viewed
    let count = 0;
    
    brandListTextArr.map((element, index) => {
      let capEl = element.toUpperCase();
      if (count == numberRequired) {
        return;
      }
      if (viewedBrands) {
        const upperCaseViewedBrands = viewedBrands.map((brand) => brand.toUpperCase());
        existingList = existingList.map((brand) => brand.toUpperCase());

        if (!matchingBrands.includes(capEl) && !existingList.includes(capEl)) {
          matchingBrands.push(capEl);
          count += 1;
        }
      } else {
        // Just get enough filters to make up the number
        if (!existingList.includes(capEl) && !matchingBrands.includes(capEl)) {
          matchingBrands.push(capEl);
          count += 1;
        }
      }
      if (index == brandListTextArr.length - 1) {
        count += 1;
      }
    });    
    
  });

  return matchingBrands;
  
};