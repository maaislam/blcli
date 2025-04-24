/**
 * IDXXX - Description
 * @author User Conversion
 */
import {
  setup
} from './services';
import {
  cacheDom
} from '../../../../../lib/cache-dom';

const activate = () => {
  setup();

  var trackerName = window.ga.getAll()[0].get('name');

  // if (document.referrer.indexOf('avon') === -1) {
  //     function getClientID() {
  //         try {
  //         var trackers = ga.getAll();
  //         var i, len;
  //         for (i = 0, len = trackers.length; i < len; i += 1) {
  //             return trackers[i].get('clientId');
  //         }
  //         } catch(e) {}  
  //         return 'false';
  //     }

  //     function getSessionID() {
  //         return new Date().getTime() + '.' + Math.random().toString(36).substring(5);
  //     }

  //     window.ga(trackerName + '.send', 'event', 'Dimension Update', 'Set Dimensions', {
  //         nonInteraction: true,
  //         'dimension13': getSessionID(),
  //         'dimension12': getClientID()
  //       });
  // }

  if (document.querySelector('meta[property="og:type"]').getAttribute('content') === "product") {

    function getMeta(metaName) {
      const metas = document.getElementsByTagName('meta');

      for (let i = 0; i < metas.length; i++) {
        if (metas[i].getAttribute('property') === metaName) {
          return metas[i].getAttribute('content');
        }
      }

      return '';
    }

    // const data = document.querySelector('#MainContentWrapper div[ng-init]').getAttribute('ng-init').replace('ViewModel=', '');
    // const jsonData = JSON.parse(data);

    // let onSale;

    //   if(document.querySelector('.ListPrice') === null){
    //     onSale = 'False'
    //     }
    //     else if(document.querySelector('.ListPrice.ng-hide')){
    //     onSale = 'False'  
    //     }
    //     else if(document.querySelector('.Details .ListPrice')){
    //     onSale = 'True'
    //     }

    // window.waitForApp().then(function() {
    var productScope = window.AppModule.RootScope.ShopContext.ProductViewModel,
      brandName = productScope.BrandName,
      productName = productScope.Product.Name,
      onSale = productScope.Product.IsOnSale,
      price = productScope.Product.SalePriceFormatted,
      currency = productScope.Product.Currency,
      sku = window.AppModule.RootScope.ShopContext.ProductViewModel.Product.Id;
    // });

    var pdpPrice = price,
      segment,
      saleStatus = onSale,
      pdpName = productName,
      pdpCurrency = currency,
      pdpBrand = brandName,
      pdpCategory = document.getElementById('BreadcrumbBar').textContent.trim().replace(/[\s]+/gmi, '/'),
      pdpCategorySeg = pdpCategory.match(/\/[\w\d]+$/)[0].replace('/', ''),
      date = new Date(),
      timeStamp = date.getTime();
    
    if (pdpCategorySeg.match(/^(LIPSTICK|GLOSS|OIL|KITS|FOUNDATION|FOUNDATION|POWDER|COMPACT|PRIMER|CONCEALER|BLUSHER|BRONZER|HIGHLIGHTER|MASCARA|BROWS|EYELINER|MAKEUP BRUSHES|ACCESSORIES|SPRAYS|LOTIONS|SPRAYS|MISTS|POWDER|WOMENSWEAR|SHAPEWEAR|PERFUME|MAKEUP|RARE|AWAY|COVERAGE|LESS|SET|BRUSHES|TRUE|LIPS|NAILS|LUCK)$/gi)){
      segment = 'Daily Makeup'
    } 
    else if (pdpCategorySeg.match(/^(LINER|EYESHADOW|PALETTES|GEL|COLOUR|MASKS|SETS|BATH|OILS|MASKS|AROMATHERAPY|PURSES|NIGHTWEAR|LINGERIE|JEWELLERY|ACCESSORIES|WATCHES|FOOTWEAR|ACCESSORIES|WELLBEING|FRAGRANCE|GADGETS|KITCHEN|GIFTS|JEWELLERY|SALE|SETS|WELLBEING|LINGERIE|WATCHES)$/gi)){
      segment = 'Glam & Treat'
    } 
    else if (pdpCategorySeg.match(/^(CARE|SKINCARE|MOISTURISERS|CLEANSERS|CREAMS|TREATMENTS|CREAM|DEODERANT|SPRAYS|MOISTURISER|GELS|CREMES|HAIRCARE|DEODERANTS|REMOVAL|FITNESS|SKINCARE|HAIRCARE|SHAMPOO|CONDITIONER|SHAMPOO|CONDITIONER|SENSES|SPRAY|TOILETRISE|CLEARSKIN|DYE|SERUMES|TOOLS|EFFECTS|ANEW|GROOMING|WORKS|STYLING|NATURALS|DEODRANT|WASH|SOFT)$/gi)){
      segment = 'Health Routine'
    } 

    console.log(segment)

    window.ga(trackerName + '.send', 'event', 'PDP Tracking', 'Price: ' + pdpPrice + ' ' + pdpCurrency + ' | On Sale: ' + saleStatus + ' | Product Name: ' + pdpName + ' | Brand: ' + pdpBrand + ' | Category: ' + pdpCategory + '' + ' | Segment: ' + segment + ' | SKU: ' + sku + '' , '' + timeStamp + '', {
      nonInteraction: true
    });

  }

};

export default activate;