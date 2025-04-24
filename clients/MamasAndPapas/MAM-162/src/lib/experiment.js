/**
 * ID - Description
 *
 * @fileoverview The main experiment logic goes here. Everything should be written inside the
 * activate function which is called if the conditions in triggers.js have passed evaluation
 * @author User Conversion
 */
import { setup, getPageData } from './services';
import { pollerLite, events, logMessage, observer } from '../../../../../lib/utils';
import settings from './shared';
import { getProductData } from './productData';

const { ID, VARIATION } = settings; 

const alterationDataArray = getProductData();
let dataLayerSettings = [];

logMessage("Alteration Data Array: ");
logMessage(alterationDataArray);

const replacePDPImage = (sku) => {

  let zoomImage = "https://cdn.shopify.com/s/files/1/0414/6023/6453/files/MAM-162-"+sku+"-lifestyle-zoom.jpg?v=1";
  let mainImage = "https://cdn.shopify.com/s/files/1/0414/6023/6453/files/MAM-162-"+sku+"-lifestyle-pdp.jpg?v=1";
  let thumbImage = "https://cdn.shopify.com/s/files/1/0414/6023/6453/files/MAM-162-"+sku+"-lifestyle-plp.jpg?v=1";

  pollerLite(['.media-gallery__image', '.media-gallery-nav__thumbnails', '.zoomImg', '.feature-row__image', '.product-single__photo'], () => {
    logMessage("replacing PDP Image - inside poller");
    let galleryImages = document.querySelector('.media-gallery-wrapper.slick-slider');
    let firstGalleryImage = galleryImages.querySelector('.media-gallery__image');
    firstGalleryImage.querySelector('.feature-row__image').src = mainImage;
    firstGalleryImage.querySelector('.zoomImg').src = zoomImage;
    let thumbImages = document.querySelector('.media-gallery-nav-wrapper.slick-slider');
    let thumbImageTBR = thumbImages.querySelector('.media-gallery-nav__thumbnails[data-slick-index="0"]');
    thumbImageTBR.querySelector('.media-gallery-nav__thumbnail-image').src = thumbImage;
  });

}

const replacePLPImage = (sku, item) => {

  let replacementImagePositionElement = item.querySelector('.grid-view-item__image');
  item.classList.add('MAM-81-replacement-item');
  let replacementImage = `<img src="https://cdn.shopify.com/s/files/1/0414/6023/6453/files/MAM-162-${sku}-lifestyle-plp.jpg?v=1" alt="replacement lifestyle image" class="MAM-81-replacement-image grid-view-item__image" />`;
  replacementImagePositionElement.insertAdjacentHTML('beforebegin', replacementImage);

  item.addEventListener('click', (e) => {
    events.send(ID + ' - Variation: '+VARIATION, 'PLP lifestyle image changed and user has clicked', sku);
  });

}

const scanPDP = () => {

  let pdpSKU = dataLayerSettings.product.sku;

  let pdpFound = alterationDataArray.find(x => pdpSKU.indexOf(x) > -1);
  if(pdpFound !== undefined) {
    logMessage("PDP // SKU: "+pdpSKU+" Item detected in array: "+pdpFound+" Replacing image");
    if(pdpFound.length == 7) {
      pdpSKU = pdpSKU.substring(0, pdpSKU.length - 2);
    }
    events.send(ID, 'Variation '+VARIATION, 'PDP lifestyle image changed and user has viewed');
    if(VARIATION == 1) {
      replacePDPImage(pdpSKU);
    }
  } else {
    logMessage("PDP // SKU: "+pdpSKU+" Item not detected in array");
  }

}

const scanPLP = (method) => {

  let plpProductListElement = document.getElementById('bc-sf-filter-products');
  let plpProductListItems = [].slice.call(plpProductListElement.querySelectorAll('.grid__item'));
  let plpScanReplacedItems = false;
  plpProductListItems.map((item) => {
    
    let alterationItem = item;
    let productDetails = JSON.parse(alterationItem.querySelector('script').innerHTML);
    let listingSKU = productDetails.variants[0].sku.toUpperCase();

    let plpFound = alterationDataArray.find(x => listingSKU.indexOf(x) > -1);
    if(plpFound !== undefined) {
      logMessage("PLP // SKU: "+listingSKU+" Item detected in array: "+plpFound+" Replacing image");
      if(plpFound.length == 7) {
        listingSKU = listingSKU.substring(0, listingSKU.length - 2);
      }
      if(VARIATION == 1) {
        replacePLPImage(listingSKU, alterationItem);
      }
      plpScanReplacedItems = true;
    } else {
      logMessage("PLP // SKU: "+listingSKU+" Item not detected in array");
    }

  });

  if(plpScanReplacedItems == true) {
    events.send(ID, 'Variation '+VARIATION, 'Some items on the PLP: '+window.location.href+' changed and user has viewed');


  }

}


export default () => {
  setup();

  logMessage(ID + " Variation: "+VARIATION);

  pollerLite([

    () => {
      if(typeof getPageData() !== 'undefined') {
        return true;
      }
    }],
    () => {

      dataLayerSettings = getPageData();
      events.send(ID, 'Variation '+VARIATION, 'variation seen');
      if(dataLayerSettings.page.template == "search" || dataLayerSettings.page.template.indexOf('collection') > -1) {
        let productFilterHolder = document.getElementById('bc-sf-filter-products');
        if(productFilterHolder) {
          observer.connect(productFilterHolder, function () {
            setTimeout(function() {
              scanPLP("update");
            }, 1000);

          }, {
            config: {
              attributes: true,
              childList: true,
              subtree: false,
            }
          });
        }  
      } else if(dataLayerSettings.page.template == "product") {
        scanPDP();
      }






    });

};
