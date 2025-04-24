import { fetchAffinity, fetchAffinityAllData } from '../../../../../lib/utils';

export const fetchBrands = () => {
  // const { Sortedbrand } = window.localStorage;

  // if (Sortedbrand) {
  //   const brandsArr = JSON.parse(Sortedbrand);
  //   const topFive = brandsArr.slice(0, 5);
  //   if (topFive) {
  //     return topFive;
  //   }
  // }

  return fetchAffinityAllData().then((res) => {
    let storedBrands = res.brand;
    const array = [];
    for (var brand in storedBrands) {
      array.push([brand, storedBrands[brand]])
    }
    
    array.sort(function(a, b) {
      return b[1] - a[1];
    });

    storedBrands = array;

    // Remove numbers from array
    storedBrands = storedBrands.filter((item) => isNaN(item));
    const topSeven = storedBrands.slice(0, 7);
    if (topSeven) {
      return topSeven;
    }
  });

};

export const fetchMaleFemale = () => {
  return fetchAffinityAllData().then((res) => {
    let gender = res.gender;
    let preferredGender = "";

    if(gender) {
      if(gender.Male >= gender.Female) {
        preferredGender = "male";
      } else {
        preferredGender = "female";
      }

      return preferredGender;
    } else {
      return "male";
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