import { fetchAffinity } from '../../../../../lib/utils';

export const fetchBrands = () => {
  // const { Sortedbrand } = window.localStorage;

  // if (Sortedbrand) {
  //   const brandsArr = JSON.parse(Sortedbrand);
  //   const topFive = brandsArr.slice(0, 5);
  //   if (topFive) {
  //     return topFive;
  //   }
  // }

  return fetchAffinity().then((res) => {
    let storedBrands = res;
    
    // Remove numbers from array
    storedBrands = storedBrands.filter((item) => isNaN(item));
    const topFive = storedBrands.slice(0, 5);
    if (topFive) {
      return topFive;
    }
  });

};

export const fetchRecentlyViewedBrands = () => {
  const { brandStorage } = window.localStorage;
  
  if (brandStorage) {
    const sortedObj = JSON.parse(brandStorage);

    if (sortedObj) {
      return sortedObj.brand;
    }
  }
};