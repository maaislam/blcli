import shared from '../../../../../core-files/shared';
import { fireEvent } from '../../../../../core-files/services';


const { ID, VARIATION } = shared;

export const getPageType = () => {
  let pageType = '';

  if (window.location.pathname.indexOf('webstore/l') > -1) {
    pageType = 'plp';
  } else if (window.location.pathname.indexOf('webstore/d') > -1) {
    pageType = 'pdp';
  }

  return pageType;
}

export const getBrand = (pageType) => {
  let brand = '';
  
  if (pageType == 'pdp' && window.dataLayer[3] && window.dataLayer[3].digitalData.product[0] && window.dataLayer[3].digitalData.product[0].productInfo.brand) {
    brand = window.dataLayer[3].digitalData.product[0].productInfo.brand;
  } else if (pageType == 'plp') {
    if (window.location.href.match(/.*webstore\/l\/.*(omega).*/g) !== null) {
      brand = "Omega";
    } else if (window.location.href.match(/.*webstore\/l\/(breitling).*/g) !== null) {
      brand = "Breitling";
    } else if (window.location.href.match(/.*webstore\/l\/(tag).*/g) !== null) {
      brand = "TAG Heuer";
    } else if (window.location.href.match(/.*webstore\/l\/(tudor).*/g) !== null) {
      brand = "Tudor";
    }
    
  }

  return brand;
}

export const checkPageBrand = (pageType) => {
  let brandIncludedInExp = false;
  // brands included in experiment
  let brandsList = ["Omega", "Breitling", "TAG Heuer", "Tudor"];
  
  if (pageType == 'plp') {
    const regex = /.*webstore\/l\/.*(omega|breitling|tag|tudor).*/g;
    const found = window.location.href.match(regex);

    if (brandsList.indexOf(`${getBrand('plp')}`) > -1
      && found !== null) {
      brandIncludedInExp = true;
    }

  } else if ('pdp') {
    if (brandsList.indexOf(`${getBrand('pdp')}`) > -1) {
      brandIncludedInExp = true;
    }
  }

  return brandIncludedInExp;
}

export const runExperimentOnPage = () => {

  let pageType = getPageType();
  
  let runExperiment = checkPageBrand(pageType);
        
  return runExperiment;
}