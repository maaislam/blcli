import { setup, fireEvent, newEvents } from '../../../../../core-files/services';
import shared from '../../../../../core-files/shared';
import { logMessage, pollerLite, elementIsInView } from '../../../../../lib/utils';

const { ID, VARIATION, CLIENT, LIVECODE } = shared;

const personSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
<path d="M12.075 4.79998C12.075 6.52498 10.725 7.87498 8.99999 7.87498C7.27499 7.87498 5.92499 6.52498 5.92499 4.79998C5.92499 3.07498 7.27499 1.72498 8.99999 1.72498C10.725 1.72498 12.075 3.07498 12.075 4.79998Z" stroke="black" stroke-miterlimit="10"/>
<path d="M8.99997 10.125C12.075 10.125 14.7 12.375 15.15 15.375H2.84997C3.29997 12.375 5.92497 10.125 8.99997 10.125ZM8.99997 9.22498C5.39997 9.22498 2.39997 11.925 1.94997 15.375C1.87497 15.825 2.24997 16.275 2.69997 16.275H15.225C15.675 16.275 16.05 15.825 15.975 15.375C15.6 11.925 12.6 9.22498 8.99997 9.22498Z" fill="black"/>
</svg>
`;
const purchasedSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
<path d="M14.175 3.3H10.425C10.425 1.05 9.075 0 7.5 0C5.925 0 4.575 1.05 4.575 3.3H0.825C0.375 3.3 0 3.675 0 4.2V12.525V14.175C0 14.625 0.375 15 0.825 15H14.175C14.625 15 15 14.625 15 14.175V12.525V4.2C15 3.675 14.625 3.3 14.175 3.3ZM7.5 0.825C8.625 0.825 9.6 1.5 9.6 3.3H5.4C5.4 1.5 6.375 0.825 7.5 0.825ZM0.825 4.2H14.175V11.7H0.825V4.2Z" fill="black"/>
</svg>
`;
const viewsSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="17" height="11" viewBox="0 0 17 11" fill="none">
<path d="M15.7275 5.5C15.7275 5.5 12.4308 10 8.36377 10C4.29676 10 1 5.5 1 5.5C1 5.5 4.29676 1 8.36377 1C12.4308 1 15.7275 5.5 15.7275 5.5Z" stroke="black" stroke-width="1.1" stroke-miterlimit="10"/>
<path d="M8.36377 8.36377C9.94539 8.36377 11.2275 7.08162 11.2275 5.5C11.2275 3.91838 9.94539 2.63623 8.36377 2.63623C6.78215 2.63623 5.5 3.91838 5.5 5.5C5.5 7.08162 6.78215 8.36377 8.36377 8.36377Z" fill="black"/>
</svg>
`;
const atcSVG = `
<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
<path d="M15.675 4.8H11.925C11.925 2.55 10.575 1.5 9 1.5C7.425 1.5 6.075 2.55 6.075 4.8H2.325C1.875 4.8 1.5 5.175 1.5 5.7V14.025V15.675C1.5 16.125 1.875 16.5 2.325 16.5H15.675C16.125 16.5 16.5 16.125 16.5 15.675V14.025V5.7C16.5 5.175 16.125 4.8 15.675 4.8ZM9 2.325C10.125 2.325 11.1 3 11.1 4.8H6.9C6.9 3 7.875 2.325 9 2.325ZM2.325 5.7H15.675V13.2H2.325V5.7Z" fill="black"/>
<path d="M11.925 9H6.07495V9.825H11.925V9Z" fill="black"/>
<path d="M9.37505 6.52499H8.55005V12.375H9.37505V6.52499Z" fill="black"/>
</svg>
`;

const startExperiment = () => {
  //viewed last 90 mins -
  const googleCloudStorageAPI =
    'https://storage.googleapis.com/storage/v1/b/social-proof-product-data/o/product_data_000000000000.json?alt=media';

  const getSingleSocialV1 = () => {
    return fetch(googleCloudStorageAPI, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok. Status: ${response.status} - ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data, 'data from API');

        return data['product_data'];
      });
  };
  const getInitialProductIDs = () => {
    const products = document.querySelectorAll('#main .primary-content .search-result-content ul li');
    // console.log(products);
    let productIDs = new Set();
    products.forEach((element) => {
      const productSKU = JSON.parse(element.querySelector('input').value).impression_product_SKU;
      // console.log(productSKU);
      // console.log(element);
      productIDs.add(productSKU);
    });
    // console.log(productIDs);
    return productIDs;
  };

  const createSocialProofPLP = (socialData, collectionMethod) => {
    return `
      <div class="${ID}-social-proof-plp">
        ${
          collectionMethod == 'purchased'
            ? `<div class="${ID}-social-proof__icon ${ID}-social-proof__icon--purchased"><p><i class="${ID}-icon">${purchasedSVG}</i>100+ sold in the last 48 hours</p></div>`
            : `<div class="${ID}-social-proof__icon ${ID}-social-proof__icon--viewed"><p><i class="${ID}-icon">${viewsSVG}</i><strong>Popular!</strong> ${socialData} views recently</p></div>`
        }
      </div>`;
  };

  const createSocialProofPDP = (socialData, collectionMethod) => {
    return `
      <div class="${ID}-social-proof-pdp ${ID}-display-first">
        ${
          collectionMethod == 'purchased'
            ? `<div class="${ID}-social-proof__icon ${ID}-social-proof__icon--purchased"><p><i class="${ID}-icon">${purchasedSVG}</i><strong>Selling fast!</strong> 100+ sold in the last 48 hours</p><span class="${ID}-close">X</span></div>`
            : `<div class="${ID}-social-proof__icon ${ID}-social-proof__icon--viewed"><p><i class="${ID}-icon">${atcSVG}</i><strong>Trending!</strong> Added to bag ${socialData} times in the last 48 hours</p><span class="${ID}-close">X</span></div>`
        }
      </div>`;
  };

  const createSocialProofPDPFallback = (socialData) => {
    return `
      <div class="${ID}-social-proof-pdp ${ID}-display-second">
        <div class="${ID}-social-proof__icon ${ID}-social-proof__icon--purchased"><p><i class="${ID}-icon">${viewsSVG}</i><strong>Popular!</strong>Viewed ${socialData} times recently</p><span class="${ID}-close">X</span></div>
      </div>`;
  };

  const createSocialProofCART = (socialData, collectionMethod) => {
    return `
      <div class="${ID}-social-proof-cart">
        ${
          collectionMethod == 'purchased'
            ? `<div class="${ID}-social-proof__icon ${ID}-social-proof__icon--purchased"><i class="${ID}-icon">${purchasedSVG}</i><p><strong>Selling fast!</strong> <span>100+ sold in the last 48 hours</span></p></div>`
            : `<div class="${ID}-social-proof__icon ${ID}-social-proof__icon--viewed"><i class="${ID}-icon">${atcSVG}</i><p><strong>Trending!</strong> <span>Added to bag ${socialData} times in the last 48 hours</span></p></div>`
        }
      </div>`;
  };

  const isProductInSocialData = (productID, socialData) => {
    return socialData.some((data) => data.item_id === productID);
  };
  const getViewsForProduct = (productID, socialData) => {
    return socialData.find((data) => data.item_id === productID)['itemViewsLast24Hours'];
  };
  const getPurchasesForProduct = (productID, socialData) => {
    return socialData.find((data) => data.item_id === productID)['purchasesLast48Hours'];
  };
  const getATCForProduct = (productID, socialData) => {
    return socialData.find((data) => data.item_id === productID)['addToCartsLast48Hours'];
  };
  const checkAndCreateSocialProof = (productID, socialData, pageType) => {
    // console.log(productID, socialData, pageType)
    const productInSocialData = isProductInSocialData(productID, socialData);
    // console.log(productInSocialData);
    if (productInSocialData) {
      // console.log('product in social data');
      const views = getViewsForProduct(productID, socialData);
      const purchases = getPurchasesForProduct(productID, socialData);
      const ATC = getATCForProduct(productID, socialData);
      console.log(views, 'VIEWS');
      console.log(purchases, 'purchases');
      console.log(ATC, 'ATC');
      // if(views > 100){
      // console.log(product);
      if (pageType === 'PLP') {
        const product = document
          .querySelector(`#main .primary-content .search-result-content ul li input[value*="${productID}"]`)
          .parentElement.querySelector('.product-image');
        if (purchases > 100) {
          product.insertAdjacentHTML('afterbegin', createSocialProofPLP(purchases, 'purchased'));
          setTimeout(() => {
            product.querySelector(`.${ID}-social-proof-plp`).classList.add(`${ID}-show`);
          }, 500);
        } else if (views > 70 && purchases < 100) {
          product.insertAdjacentHTML('afterbegin', createSocialProofPLP(views, 'viewed'));
          setTimeout(() => {
            product.querySelector(`.${ID}-social-proof-plp`).classList.add(`${ID}-show`);
          }, 500);
        }
      } else if (pageType === 'PDP') {
        let product;
        if (document.querySelector('.pt_product-details #product-detail-wrapper .pdp-main .product-image-container .slick-slider')) {
          product = document.querySelector('.pt_product-details #product-detail-wrapper .pdp-main .product-image-container .slick-slider');
        } else if (document.querySelector('.pt_product-details #product-detail-wrapper .pdp-main .product-image-container .product-primary-image')) {
          product = document.querySelector('.pt_product-details #product-detail-wrapper .pdp-main .product-image-container .product-primary-image');
        }
        if (purchases > 100) {
          product.insertAdjacentHTML('afterbegin', createSocialProofPDP(purchases, 'purchased'));
        } else if (purchases < 100 && ATC > 40) {
          product.insertAdjacentHTML('afterbegin', createSocialProofPDP(ATC, 'viewed'));
        }

        if (views > 70) {
          product.insertAdjacentHTML('afterbegin', createSocialProofPDPFallback(views));
        }

        const closeButtons = document.querySelectorAll(`.${ID}-close`);
        closeButtons.forEach((close) => {
          if(close){
            close.addEventListener('click', () => {
              close.closest(`.${ID}-social-proof-pdp`).classList.remove(`${ID}-show`);
            });
          }

        });
        //timing for first message
        if(product.querySelector(`.${ID}-social-proof-pdp.${ID}-display-first`)){
          setTimeout(() => {
            product.querySelector(`.${ID}-social-proof-pdp.${ID}-display-first`).classList.add(`${ID}-show`);
          }, 500);
          setTimeout(() => {
            product.querySelector(`.${ID}-social-proof-pdp.${ID}-display-first`).classList.remove(`${ID}-show`);
          }, 10000);
        }
        // setTimeout(() => {
        //   product.querySelector(`.${ID}-social-proof-pdp.${ID}-display-first`).classList.add(`${ID}-show`);
        // }, 500);
        // setTimeout(() => {
        //   product.querySelector(`.${ID}-social-proof-pdp.${ID}-display-first`).classList.remove(`${ID}-show`);
        // }, 10000);
        //timing for second message
        if(product.querySelector(`.${ID}-social-proof-pdp.${ID}-display-second`)){
          setTimeout(() => {
            product.querySelector(`.${ID}-social-proof-pdp.${ID}-display-second`).classList.add(`${ID}-show`);
          }, 5000);
          setTimeout(() => {
            product.querySelector(`.${ID}-social-proof-pdp.${ID}-display-second`).classList.remove(`${ID}-show`);
          }, 15000);
        }
        // setTimeout(() => {
        //   product.querySelector(`.${ID}-social-proof-pdp.${ID}-display-second`).classList.add(`${ID}-show`);
        // }, 5000);
        // setTimeout(() => {
        //   product.querySelector(`.${ID}-social-proof-pdp.${ID}-display-second`).classList.remove(`${ID}-show`);
        // }, 15000);
      } else if (pageType === 'CART') {
        // console.log('CART');

        pollerLite(['.pt_cart #main .cart-items-form .cart-row .item-details-table tbody'], () => {
          // console.log('CART');
          const product = document.querySelector(
            `.pt_cart #main .cart-items-form .cart-row[data-pid="${productID}"] .item-details-table tbody`
          );
          // console.log(product, 'CART')
          if (purchases > 100) {
            product.insertAdjacentHTML('beforeend', createSocialProofCART(purchases, 'purchased'));
          } else if (purchases < 100) {
            product.insertAdjacentHTML('beforeend', createSocialProofCART(ATC, 'atc'));
          }

          if(product.querySelector(`.${ID}-social-proof-cart`)){
            setTimeout(() => {
              product.querySelector(`.${ID}-social-proof-cart`).classList.add(`${ID}-show`);
            }, 500);
          }
          // setTimeout(() => {
          //   product.querySelector(`.${ID}-social-proof-cart`).classList.add(`${ID}-show`);
          // }, 500);
        });
      }
      // }
    }
  };

  //PLP VIEW
  pollerLite(['#main .primary-content .search-result-content[impression-list-type="PLP"]'], () => {
    // console.log('PLP Experiment started');

    const asyncOrder = async () => {
      const socialData = await getSingleSocialV1();
      // console.log(socialData);
      const productIDs = await getInitialProductIDs();
      // console.log(productIDs, 'PRODUCT IDS');
      productIDs.forEach((productID) => {
        checkAndCreateSocialProof(productID, socialData, 'PLP');
      });

      function refreshProductIDs() {
        const initialProductCount = document.querySelectorAll('#main .primary-content .search-result-content ul li').length;
        let loadMore = document.querySelector('#main .primary-content .search-result-content .load-more-link');

        if (loadMore) {
          // console.log(counter++);
          loadMore.addEventListener('click', () => {
            //console.log('load more clicked');
            pollerLite(['#main .primary-content .search-result-content ul li input'], () => {
              // console.log('load more products');
              // clear old product ids
              const productIdLength = productIDs.size;
              productIDs.clear();
              setTimeout(() => {
                const products = document.querySelectorAll('#main .primary-content .search-result-content ul li');
                products.forEach((element, index) => {
                  if (index >= initialProductCount && index < productIdLength + initialProductCount) {
                    // console.log(element);
                    const productSKU = JSON.parse(element.querySelector('input').value).impression_product_SKU;

                    productIDs.add(productSKU);
                  }
                });
                // console.log(productIDs);
                productIDs.forEach((productID) => {
                  checkAndCreateSocialProof(productID, socialData, 'PLP');
                });

                // Call the function recursively
                // getSocialV1(productIDs);
                refreshProductIDs();
              }, 2000);
            });
          });
        }
      }

      refreshProductIDs();
    };
    asyncOrder();
  });

  //PDP VIEW
  pollerLite(['#product-detail-wrapper .pdp-main .product-detail'], () => {
    // console.log('PDP Experiment started');

    const getInitialProductID = () => {
      const productID = document.querySelector(
        '#product-detail-wrapper .pdp-main .product-detail span[itemprop="productID"]'
      ).innerHTML;
      // console.log(productID);
      return [productID];
    };

    const asyncOrder = async () => {
      const socialData = await getSingleSocialV1();
      // console.log(socialData);
      const productIDs = await getInitialProductID();
      // console.log(productIDs, 'PRODUCT IDS');
      productIDs.forEach((productID) => {
        checkAndCreateSocialProof(productID, socialData, 'PDP');
      });
    };

    asyncOrder();
  });

  //CART VIEW
  pollerLite(['.pt_cart #main .cart-items-form .cart-row'], () => {
    //console.log('CART Experiment started');

    const getInitialProductIDs = () => {
      const productRows = document.querySelectorAll('.pt_cart #main .cart-items-form .cart-row');
      const productIDs = [];
      productRows.forEach((row) => {
        const productID = row.getAttribute('data-pid');
        productIDs.push(productID);
      });
      // console.log(productIDs);
      return productIDs;
    };

    const asyncOrder = async () => {
      const socialData = await getSingleSocialV1();
      // console.log(socialData)
      const productIDs = await getInitialProductIDs();
      // console.log(productIDs, 'PRODUCT IDS');
      productIDs.forEach((productID) => {
        // console.log(productID, 'PRODUCT ID');
        checkAndCreateSocialProof(productID, socialData, 'CART');
      });
    };
    asyncOrder();
  });
};

const controlTracking = () => {
  let seenTaggstarPLP = false;
  let seenTaggstarPDP = false;
  let seenTaggstarCART = false;

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('tagg-x')) {
      fireEvent('Click - Taggstar Close');
    }
  });

  document.addEventListener('scroll', () => {
    pollerLite(['.product-tile .tagg-reset'], () => {
      if (!seenTaggstarPLP) {
        const elementInView = document.querySelector('.product-tile .tagg-reset');
        if (elementIsInView(elementInView)) {
          seenTaggstarPLP = true;
          fireEvent('Scroll - Taggstar Seen PLP');
        }
      }
    });

    pollerLite(['.primary-images-carousel .tagg-reset'], () => {
      if (!seenTaggstarPDP) {
        const elementInView = document.querySelector('.primary-images-carousel .tagg-reset');
        if (elementIsInView(elementInView)) {
          seenTaggstarPDP = true;
          fireEvent('Scroll - Taggstar Seen PDP');
        }
      }
    });

    pollerLite(['.cart-row  .tagg-reset'], () => {
      if (!seenTaggstarCART) {
        const elementInView = document.querySelector('.cart-row  .tagg-reset');
        if (elementIsInView(elementInView)) {
          seenTaggstarCART = true;
          fireEvent('Scroll - Taggstar Seen CART');
        }
      }
    });
  });
};

const variationTracking = () => {
  let seenBLPLP = false;
  let seenBLPDP = false;
  let seenBLCART = false;

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains(`${ID}-close`)) {
      fireEvent('Click - BL Close');
    }
  });

  document.addEventListener('scroll', () => {
    pollerLite([`.${ID}-social-proof-plp`], () => {
      if (!seenBLPLP) {
        const elementInView = document.querySelector(`.${ID}-social-proof-plp`);
        if (elementIsInView(elementInView)) {
          seenBLPLP = true;
          fireEvent('Scroll - BL Seen PLP');
        }
      }
    });

    pollerLite([`.${ID}-social-proof-pdp`], () => {
      if (!seenBLPDP) {
        const elementInView = document.querySelector(`.${ID}-social-proof-pdp`);
        if (elementIsInView(elementInView)) {
          seenBLPDP = true;
          // console.log('seenBLPDP');
          fireEvent('Scroll - BL Seen PDP');
        }
      }
    });

    pollerLite([`.${ID}-social-proof-cart`], () => {
      if (!seenBLCART) {
        const elementInView = document.querySelector(`.${ID}-social-proof-cart`);
        if (elementIsInView(elementInView)) {
          seenBLCART = true;
          fireEvent('Scroll - BL Seen CART');
        }
      }
    });
  });
};

export default () => {
  newEvents.initiate = true;
  newEvents.method = ['ga4'];
  newEvents.property = 'G-B37NQR1RWZ';

  setup();

  logMessage(ID + ' Variation: ' + VARIATION);

  fireEvent('Conditions Met');

  // -----------------------------
  // Add events that apply to both variant and control
  // @see https://app.gitbook.com/@userconversion/s/development/events/helpers/
  // -----------------------------
  // ...
  controlTracking();
  // -----------------------------
  // If control, bail out from here
  // -----------------------------
  if (VARIATION == 'control') {
    return;
  }

  // -----------------------------
  // Write experiment code here
  // -----------------------------
  // ...

  startExperiment();
  variationTracking();
};
