export const fetchBrands = () => {
  const { Sortedbrand } = window.localStorage;

  if (Sortedbrand) {
    const brandsArr = JSON.parse(Sortedbrand);
    const topFive = brandsArr.slice(0, 5);
    if (topFive) {
      return topFive;
    }
  }
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