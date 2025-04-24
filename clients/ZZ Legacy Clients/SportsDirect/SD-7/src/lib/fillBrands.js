import { fetchBrands, fetchRecentlyViewedBrands, fetchMaleFemale } from './fetchBrands';
import { populateAffinityCarousel } from './experiment';
import { pollerLite } from '../../../../../lib/uc-lib';

let thePreferredGender = "male";
let finalBrandList = [];

// This section defines whether there is enough detail within the affinity api to determine if the user
// is interested in male/female clothing. Male is the default.
let gender = fetchMaleFemale();
gender.then((genderArr) => {

  thePreferredGender = genderArr;

});

export const checkBrandPages = (data, brand) => {

  // This function takes the data returned from the ajax call to the brand inner page, and does a number
  // of checks to determine the category to be shown.

  // The logic is, top level category page (eg /nike), picks a category from floating navbar based on gender
  // second level category page (eg /karrimor) picks one category from the box of 6 featured categories.
  // third level category page (eg /england-cricket) takes either category with greatest number of products, or
  //   product type with the greatest number of products.
  
  let checkedBrands, finalCatArray = [];
  let brandPage = document.createElement('div');

  brandPage.classList.add('hidden')
  brandPage.id = "no-visual";
  brandPage.innerHTML = data;

  let brandPageType = "";

  return new Promise(function (resolve, reject) {

    if(brandPage.querySelector('.menuContainer')) {
      brandPageType = "landing-plp";
    } else if(brandPage.querySelector('.divLPtilesInner')) {
      brandPageType = "second-level-plp";
    } else {
      brandPageType = "normal-plp";
    }

    

    if(brandPageType == "second-level-plp") {
      // 2nd level plp so grab random category from 6 displayed
      let secondLevelCats = brandPage.querySelectorAll('.divLPtilesInner a');
      let secondLevelCatsArray = Array.prototype.slice.call(secondLevelCats);

      secondLevelCatsArray = secondLevelCatsArray.map(function(item) {

        let catName = "";
        if(item.querySelector('.campaignTitle')) {
          catName = item.querySelector('.campaignTitle').innerHTML.replace(/(<([^>]+)>)/gi, "").trim();
        } else {
          catName = item.querySelector('.featTxtHeader').innerHTML.replace(/(<([^>]+)>)/gi, "").trim();
        }
        
        let finalCatArray = {brand: brand['name'], name: catName, url: item.href};
        return finalCatArray;

      });

      secondLevelCatsArray = secondLevelCatsArray[Math.floor(Math.random() * secondLevelCatsArray.length)];
      finalBrandList.push(secondLevelCatsArray);

      resolve(secondLevelCatsArray);

    } else if(brandPageType == "landing-plp") {
      // landing plp so grab category from top level nav
      // if the preferred gender is male, choose sub_navA, female, sub_navB
      let landingSelector = ".sub_navA a";
      if(thePreferredGender == "female") {
        landingSelector = '.sub_navB a';
      }
      let landingCats = brandPage.querySelectorAll(landingSelector);
      let landingCatsArray = Array.prototype.slice.call(landingCats);

      landingCatsArray = landingCatsArray.map(function(item) {

        let catName = item.innerText.trim();
        let finalCatArray = {brand: brand['name'], name: catName, url: item.href};
        return finalCatArray;

      });

      landingCatsArray = landingCatsArray.filter(function(item) {
        if(item['name'].toLowerCase() == "new in" || item['name'].toLowerCase() == "sale" || item['name'].toLowerCase().indexOf('all ') >= 0) {
          return false;
        } else {
          return true;
        }

      })

      landingCatsArray = landingCatsArray[Math.floor(Math.random() * landingCatsArray.length)];
      finalBrandList.push(landingCatsArray);

      resolve(landingCatsArray);

    } else {
      // normal plp so grab category with most products
      
      let allCurrCats, allCurrCatsArray, largestCategoryCount, mostProducts, numItems, itemURL, theCategory, theCategoryPrefix;
      
      if(brandPage.querySelector('.CATG')) {
        allCurrCats = brandPage.querySelectorAll('.CATG');
        theCategoryPrefix = "CATG";
      } else {
        allCurrCats = brandPage.querySelectorAll('.ASUB');
        theCategoryPrefix = "ASUB";
      }
      
      allCurrCatsArray = Array.prototype.slice.call(allCurrCats);
      largestCategoryCount = 0;

      mostProducts = allCurrCatsArray.map(function(item) {
        numItems = parseInt(item.getAttribute('data-productcount'));
        return numItems;
      });

      mostProducts = mostProducts.sort(function(a, b) {

        if(a > b) {
          return -1;
        } else {
          return 1;
        }

      });

      theCategory = brandPage.querySelector('.'+theCategoryPrefix+'[data-productcount="'+mostProducts[0]+'"]');
      let theCategoryName = theCategory.getAttribute('data-productname');
      let theCategoryURL = brand['url']+"#dcp=1&dppp=120&OrderBy=rank&Filter="+theCategoryPrefix+"%5E"+encodeURIComponent(theCategoryName);
      finalCatArray = {brand: brand['name'], name: theCategoryName, url: theCategoryURL};
      finalBrandList.push(finalCatArray);

      resolve(finalCatArray);
    }

    
    
  });
  
};

export const buildAllLinks = (validBrands) => {
  
  // This function creates an array of promises which mean that our AJAX requests will not break the whole running
  // of the experiment if one of the AJAX requests fails. If one fails, then the code will use the 'finalBrandList'
  // array which is built up to serve as a backup. Then if one or two of the promises has managed to complete, it will
  // pass that array to the pac function which will in-fill with backup brands.

  const promises = [];
  [].slice.call(validBrands).forEach(function(brand) {
    if (brand) {
      let link = brand['url'];
    const firstRequestPromise = new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open('GET', link, true);
      request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        const data = request.responseText;
        // const sizeVariantId = request.responseURL;
        if (data) {
        checkBrandPages(data, brand).then((brandReturn) => {
          resolve(brandReturn);
        });
        }
      }
      };
      request.onerror = () => {
      // There was a connection error of some sort
      };
      request.send();
    });
    promises.push(firstRequestPromise);
    }
  });
  Promise.all(promises).then((values) => {
    // if all promises complete then the pac function is called with the promise return values.
    populateAffinityCarousel(values);
  }).catch(() => {
    // If one of the promises breaks, the rest of the promises return what they can by filling finalBrandList
    // and the pac function fills the brand list with backup brands
    populateAffinityCarousel(finalBrandList);
  });
}

export const checkOuterBrandPage = (data, brandsToCheck) => {

  // This function checks the brands main page to determine whether the brands we've got within our affinity profile match
  // any on the page. If the brand has less than 20 products it is not displayed (due to the fact that small brands are unlikely
  // to have categories to be displayed) If the selector is not available, the brand is disregarded also.

  let checkedBrands = [];
  const html = document.createElement('div');

  html.classList.add('hidden')
  html.id = "no-visual";
  html.innerHTML = data;

  let selector, brandItemInnerNumber, brandItemInnerText, brandURL;

  checkedBrands = brandsToCheck.filter(brandItem => {
    brandURL = brandItem['url'];
    selector = '.letItems a[href="/'+brandURL+'"]';
    if(!html.querySelector(selector)) {
      return false;
    }
    brandItemInnerText = html.querySelector(selector).innerText.trim();
    brandItemInnerNumber = brandItemInnerText.substring(brandItemInnerText.indexOf('(') +1, brandItemInnerText.indexOf(')'));

    if(brandItemInnerNumber > 20) {
      return brandItem;
    } else {
      return false;
    }
    
    
  });

  checkedBrands = checkedBrands.map(brandItem => {
    brandURL = "/"+brandItem['url'];
    let brandName = brandItem['name'];
    let href = "/"+brandURL;
    selector = '.letItems a[href="'+brandURL+'"]';
    brandItemInnerText = html.querySelector(selector).innerText.trim();
    brandItemInnerNumber = brandItemInnerText.substring(brandItemInnerText.indexOf('(') +1, brandItemInnerText.indexOf(')'));

    return {'name': brandName, 'url': brandURL};
    
    
  });
  
  html.remove();

  let finalListLength = 0;
  if(checkedBrands.length > 5) {
    checkedBrands = checkedBrands.slice(0, 5);
    finalListLength = 5;
  } else {

    finalListLength = checkedBrands.length;
  }
  
  buildAllLinks(checkedBrands);

  

}

