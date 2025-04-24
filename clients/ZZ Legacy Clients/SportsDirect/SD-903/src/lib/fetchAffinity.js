import { fetchAffinityAllData, logMessage } from '../../../../../lib/utils';

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
    const topFive = storedBrands.slice(0, 20);
    if (topFive) {
      return topFive;
    }
  });

};

export const fetchMaleFemaleKids = () => {
  return fetchAffinityAllData().then((res) => {
    if(res.gender && res.age_group) {
      
      let genderMaleScore = res.gender.Male ? res.gender.Male : 0;
      let genderFemaleScore = res.gender.Female ? res.gender.Female : 0;
      let ageGroupAdultScore = res.age_group.Adult ? res.age_group.Adult : 0;
      let ageGroupKidsScore = res.age_group.Kids ? res.age_group.Kids : 0;
      let ageGroup = ageGroupAdultScore >= ageGroupKidsScore ? `Adult` : `Kids`;
      
      let preferredGender = "";

      if(genderMaleScore >= genderFemaleScore && ageGroup == "Adult") {
        preferredGender = "male";
      } else if(genderMaleScore <= genderFemaleScore && ageGroup == "Adult") {
        preferredGender = "female";
      } else if(ageGroup == "Kids") {
        preferredGender = "kids";
      }
      logMessage("gms: "+genderMaleScore+" gfs: "+genderFemaleScore+" agas: "+ageGroupAdultScore+" agks: "+ageGroupKidsScore+ " pref gender: "+preferredGender);
  
      return preferredGender;
       
    } else {
      return "none";
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