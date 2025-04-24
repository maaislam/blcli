import { getCookie } from '../../../../../lib/utils';

/**
 * Get availability using address and location code from localstorage
 * When no location is set, find elm on page which would open the postcode modal and click
 * Otherwise use the response to show disabled/enabled buttons
 * Copy over the add to basket query, find basket ID
 */

const headers = {
  accept: '*/*',
  'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
  bruid2: getCookie('_br_uid_2'),
  'content-type': 'application/json',
  'sec-ch-ua':
    '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
  'sec-ch-ua-mobile': '?0',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin',
  'x-data-consumer-name': 'TP-WEB',
  'x-tp-checkout-new': 'true',
  'x-tp-request-id': '24fb997c-466b-425f-8bef-e388c5996eab',
  'x-tp-session-id': getCookie('x-tp-session-id'),
};

export const getProduct = sku => fetch('https://www.travisperkins.co.uk/graphql?op=product', {
  headers,
  referrer: window.location.href,
  referrerPolicy: 'strict-origin-when-cross-origin',
  body:
      `{"operationName":"product","variables":{"code":"${
        sku
      }"},"query":"query product($code: String!) {\\n  product(code: $code) {\\n    name\\n    code\\n    baseProductCode\\n    description\\n    featuresAndBenefits\\n    ...ProductTiersFieldsPromo\\n    primaryImage {\\n      id\\n      images {\\n        type\\n        url\\n        altText\\n        __typename\\n      }\\n      __typename\\n    }\\n    otherImages {\\n      id\\n      images {\\n        type\\n        url\\n        altText\\n        __typename\\n      }\\n      __typename\\n    }\\n    technicalSpecifications {\\n      name\\n      value\\n      __typename\\n    }\\n    review {\\n      averageRating\\n      numberOfReviews\\n      __typename\\n    }\\n    variants {\\n      product {\\n        code\\n        baseProductCode\\n        name\\n        ...ProductTiersFieldsPromo\\n        review {\\n          averageRating\\n          numberOfReviews\\n          __typename\\n        }\\n        vatRate\\n        type\\n        primaryImage {\\n          id\\n          images {\\n            type\\n            url\\n            altText\\n            __typename\\n          }\\n          __typename\\n        }\\n        otherImages {\\n          id\\n          images {\\n            type\\n            url\\n            altText\\n            __typename\\n          }\\n          __typename\\n        }\\n        __typename\\n      }\\n      features {\\n        name\\n        value\\n        __typename\\n      }\\n      __typename\\n    }\\n    parentCategory {\\n      ...ParentCategoryTree\\n      __typename\\n    }\\n    vatRate\\n    type\\n    dataSheets {\\n      name\\n      url\\n      type\\n      __typename\\n    }\\n    hireable\\n    __typename\\n  }\\n}\\n\\nfragment ParentCategory on Category {\\n  code\\n  name\\n  __typename\\n}\\n\\nfragment ParentCategoryTree on Category {\\n  ...ParentCategory\\n  parentCategory {\\n    ...ParentCategory\\n    parentCategory {\\n      ...ParentCategory\\n      parentCategory {\\n        ...ParentCategory\\n        parentCategory {\\n          ...ParentCategory\\n          parentCategory {\\n            ...ParentCategory\\n            parentCategory {\\n              ...ParentCategory\\n              parentCategory {\\n                ...ParentCategory\\n                parentCategory {\\n                  ...ParentCategory\\n                  parentCategory {\\n                    ...ParentCategory\\n                    __typename\\n                  }\\n                  __typename\\n                }\\n                __typename\\n              }\\n              __typename\\n            }\\n            __typename\\n          }\\n          __typename\\n        }\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment ProductTiersFieldsPromo on Product {\\n  price(type: PROMOTIONAL) {\\n    productCode\\n    tradePrice {\\n      valueExVat\\n      valueIncVat\\n      __typename\\n    }\\n    retailPrice {\\n      valueExVat\\n      valueIncVat\\n      __typename\\n    }\\n    promotionalPriceTiers {\\n      finalPrice {\\n        valueExVat\\n        valueIncVat\\n        __typename\\n      }\\n      minimumQuantity\\n      promotionMessages\\n      promotionType\\n      promotionEndDate\\n      __typename\\n    }\\n    priceUom {\\n      code\\n      name\\n      prefix\\n      __typename\\n    }\\n    priceOnApplication\\n    tradeHireRates {\\n      period\\n      rate {\\n        valueExVat\\n        valueIncVat\\n        __typename\\n      }\\n      __typename\\n    }\\n    retailHireRates {\\n      period\\n      rate {\\n        valueExVat\\n        valueIncVat\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n  __typename\\n}\\n"}`,
  method: 'POST',
  mode: 'cors',
  credentials: 'include',
})
  .then(response => response.json())
  .then(json => json.data || {});

export const getBasket = basketId => fetch('https://www.travisperkins.co.uk/graphql?op=basket', {
  headers,
  referrer: window.location.href,
  referrerPolicy: 'strict-origin-when-cross-origin',
  method: 'POST',
  mode: 'cors',
  body:
      `{"operationName":"basket","variables":{"basketId":"${
        basketId
      }"},"query":"query basket($basketId: String) {\\n  basket(basketId: $basketId) {\\n    ...BasketFields\\n    __typename\\n  }\\n}\\n\\nfragment BasketFields on Basket {\\n  id\\n  code\\n  basketEntries {\\n    quantity\\n    product {\\n      code\\n      baseProductCode\\n      name\\n      description\\n      primaryImage {\\n        images {\\n          type\\n          url\\n          altText\\n          __typename\\n        }\\n        __typename\\n      }\\n      otherImages {\\n        images {\\n          type\\n          url\\n          altText\\n          __typename\\n        }\\n        __typename\\n      }\\n      ...ProductTiersFieldsPromo\\n      vatRate\\n      type\\n      variants {\\n        features {\\n          name\\n          value\\n          __typename\\n        }\\n        product {\\n          code\\n          __typename\\n        }\\n        __typename\\n      }\\n      parentCategory {\\n        ...ParentCategoryTree\\n        __typename\\n      }\\n      __typename\\n    }\\n    deliveryType\\n    collectionType\\n    fulfilmentBranch\\n    leadTimeDays\\n    __typename\\n  }\\n  appliedProductPromotions {\\n    code\\n    promotionType\\n    endDate\\n    promotionMessages\\n    consumedEntries {\\n      productCode\\n      quantity\\n      adjustedUnitPrice {\\n        valueExVat\\n        valueIncVat\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n  appliedOrderPromotions {\\n    code\\n    promotionType\\n    endDate\\n    promotionMessages\\n    consumedEntries {\\n      productCode\\n      quantity\\n      __typename\\n    }\\n    __typename\\n  }\\n  potentialOrderPromotions {\\n    code\\n    promotionType\\n    endDate\\n    promotionMessages\\n    consumedEntries {\\n      productCode\\n      __typename\\n    }\\n    __typename\\n  }\\n  potentialProductPromotions {\\n    code\\n    promotionType\\n    endDate\\n    promotionMessages\\n    consumedEntries {\\n      productCode\\n      quantity\\n      adjustedUnitPrice {\\n        valueExVat\\n        valueIncVat\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n  totals {\\n    subtotal {\\n      valueIncVat\\n      valueExVat\\n      __typename\\n    }\\n    deliveryCharge {\\n      valueIncVat\\n      valueExVat\\n      __typename\\n    }\\n    goodsVat\\n    total {\\n      valueIncVat\\n      valueExVat\\n      __typename\\n    }\\n    tradeSavings {\\n      valueIncVat\\n      valueExVat\\n      __typename\\n    }\\n    savingsPercent\\n    promotionalSavings {\\n      valueIncVat\\n      valueExVat\\n      __typename\\n    }\\n    __typename\\n  }\\n  deliveryInfo {\\n    ...DeliveryInfoFields\\n    __typename\\n  }\\n  appliedCoupon\\n  __typename\\n}\\n\\nfragment ParentCategory on Category {\\n  code\\n  name\\n  __typename\\n}\\n\\nfragment ParentCategoryTree on Category {\\n  ...ParentCategory\\n  parentCategory {\\n    ...ParentCategory\\n    parentCategory {\\n      ...ParentCategory\\n      parentCategory {\\n        ...ParentCategory\\n        parentCategory {\\n          ...ParentCategory\\n          parentCategory {\\n            ...ParentCategory\\n            parentCategory {\\n              ...ParentCategory\\n              parentCategory {\\n                ...ParentCategory\\n                parentCategory {\\n                  ...ParentCategory\\n                  parentCategory {\\n                    ...ParentCategory\\n                    __typename\\n                  }\\n                  __typename\\n                }\\n                __typename\\n              }\\n              __typename\\n            }\\n            __typename\\n          }\\n          __typename\\n        }\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment ProductTiersFieldsPromo on Product {\\n  price(type: PROMOTIONAL) {\\n    productCode\\n    tradePrice {\\n      valueExVat\\n      valueIncVat\\n      __typename\\n    }\\n    retailPrice {\\n      valueExVat\\n      valueIncVat\\n      __typename\\n    }\\n    promotionalPriceTiers {\\n      finalPrice {\\n        valueExVat\\n        valueIncVat\\n        __typename\\n      }\\n      minimumQuantity\\n      promotionMessages\\n      promotionType\\n      promotionEndDate\\n      __typename\\n    }\\n    priceUom {\\n      code\\n      name\\n      prefix\\n      __typename\\n    }\\n    priceOnApplication\\n    tradeHireRates {\\n      period\\n      rate {\\n        valueExVat\\n        valueIncVat\\n        __typename\\n      }\\n      __typename\\n    }\\n    retailHireRates {\\n      period\\n      rate {\\n        valueExVat\\n        valueIncVat\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment DeliveryInfoFields on DeliveryInfo {\\n  deliveryAddress {\\n    id\\n    line1\\n    line2\\n    line3\\n    town\\n    postalCode\\n    deliveryContact {\\n      name\\n      telephone\\n      __typename\\n    }\\n    siteAccessRestrictions {\\n      deliveryQuestion\\n      deliveryAnswer\\n      deliveryComment\\n      demandDetails\\n      siteAccessInstructionsId\\n      __typename\\n    }\\n    __typename\\n  }\\n  deliveryInstructions\\n  deliveryPhoneNumber\\n  orderReference\\n  siteReference\\n  __typename\\n}\\n"}`,
  credentials: 'include',
})
  .then(response => response.json())
  .then((json) => {
    console.log(json.data);
    return json.data || {};
  });

export const getEligibility = (items, customerLocation) => fetch(
  'https://www.travisperkins.co.uk/graphql?op=productEligibility',
  {
    headers,
    referrer: window.location.href,
    referrerPolicy: 'strict-origin-when-cross-origin',
    method: 'POST',
    mode: 'cors',
    body:
        `{"operationName":"productEligibility","variables":{"items":${
          JSON.stringify(items)
        },"customerLocation": ${
          JSON.stringify(customerLocation)
        }},"query":"query productEligibility($items: [ItemEntryInput], $customerLocation: CustomerLocationInput) {\\n  productEligibility(items: $items, customerLocation: $customerLocation) {\\n    item {\\n      productCode\\n      quantity\\n      __typename\\n    }\\n    collectionEligibility {\\n      status\\n      statusReason\\n      minimumOrderQuantity\\n      __typename\\n    }\\n    deliveryEligibility {\\n      status\\n      statusReason\\n      type\\n      estimatedDate\\n      supplierLeadTimeDays\\n      cutOffTime\\n      minimumOrderQuantity\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n"}`,
    credentials: 'include',
  },
)
  .then(response => response.json())
  .then(json => json.data.productEligibility || {});

export const getStock = (branchCodes, productCodes) => fetch('https://www.travisperkins.co.uk/graphql?op=stock', {
  headers,
  referrer: window.location.href,
  referrerPolicy: 'strict-origin-when-cross-origin',
  method: 'POST',
  mode: 'cors',
  body:
      `{"operationName":"stock","variables":{"branchCodes":${
        JSON.stringify(branchCodes)
      },"productCodes":${
        JSON.stringify(productCodes)
      }},"query":"query stock($branchCodes: [String!]!, $productCodes: [String!]!) {\\n  stock(branchCodes: $branchCodes, productCodes: $productCodes) {\\n    branchCode\\n    productCode\\n    quantity\\n    uom\\n    __typename\\n  }\\n}\\n"}`,
  credentials: 'include',
})
  .then(response => response.json())
  .then(json => json.data.stock || {});

export const addForDelivery = (code, qty, basketId) => {
  console.log('add for delivery');
  return fetch('https://www.travisperkins.co.uk/graphql?op=basketAddTo', {
    headers,
    referrer: window.location.href,
    referrerPolicy: 'strict-origin-when-cross-origin',
    method: 'POST',
    mode: 'cors',
    body:
      `{"operationName":"basketAddTo","variables":{"input":{"code":"${
        code
      }","qty":${
        qty
      },"basketId":"${
        basketId
      }", "collectionType":null,"deliveryType":"CARRIER","collectionBranch":null}},"query":"mutation basketAddTo($input: BasketAddToInput!) {\\n  basketAddTo(input: $input) {\\n    ...BasketFields\\n    __typename\\n  }\\n}\\n\\nfragment BasketFields on Basket {\\n  id\\n  code\\n  basketEntries {\\n    quantity\\n    product {\\n      code\\n      baseProductCode\\n      name\\n      description\\n      primaryImage {\\n        images {\\n          type\\n          url\\n          altText\\n          __typename\\n        }\\n        __typename\\n      }\\n      otherImages {\\n        images {\\n          type\\n          url\\n          altText\\n          __typename\\n        }\\n        __typename\\n      }\\n      ...ProductTiersFieldsPromo\\n      vatRate\\n      type\\n      variants {\\n        features {\\n          name\\n          value\\n          __typename\\n        }\\n        product {\\n          code\\n          __typename\\n        }\\n        __typename\\n      }\\n      parentCategory {\\n        ...ParentCategoryTree\\n        __typename\\n      }\\n      __typename\\n    }\\n    deliveryType\\n    collectionType\\n    fulfilmentBranch\\n    leadTimeDays\\n    __typename\\n  }\\n  appliedProductPromotions {\\n    code\\n    promotionType\\n    endDate\\n    promotionMessages\\n    consumedEntries {\\n      productCode\\n      quantity\\n      adjustedUnitPrice {\\n        valueExVat\\n        valueIncVat\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n  appliedOrderPromotions {\\n    code\\n    promotionType\\n    endDate\\n    promotionMessages\\n    consumedEntries {\\n      productCode\\n      quantity\\n      __typename\\n    }\\n    __typename\\n  }\\n  potentialOrderPromotions {\\n    code\\n    promotionType\\n    endDate\\n    promotionMessages\\n    consumedEntries {\\n      productCode\\n      __typename\\n    }\\n    __typename\\n  }\\n  potentialProductPromotions {\\n    code\\n    promotionType\\n    endDate\\n    promotionMessages\\n    consumedEntries {\\n      productCode\\n      quantity\\n      adjustedUnitPrice {\\n        valueExVat\\n        valueIncVat\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n  totals {\\n    subtotal {\\n      valueIncVat\\n      valueExVat\\n      __typename\\n    }\\n    deliveryCharge {\\n      valueIncVat\\n      valueExVat\\n      __typename\\n    }\\n    goodsVat\\n    total {\\n      valueIncVat\\n      valueExVat\\n      __typename\\n    }\\n    tradeSavings {\\n      valueIncVat\\n      valueExVat\\n      __typename\\n    }\\n    savingsPercent\\n    promotionalSavings {\\n      valueIncVat\\n      valueExVat\\n      __typename\\n    }\\n    __typename\\n  }\\n  deliveryInfo {\\n    ...DeliveryInfoFields\\n    __typename\\n  }\\n  appliedCoupon\\n  __typename\\n}\\n\\nfragment ParentCategory on Category {\\n  code\\n  name\\n  __typename\\n}\\n\\nfragment ParentCategoryTree on Category {\\n  ...ParentCategory\\n  parentCategory {\\n    ...ParentCategory\\n    parentCategory {\\n      ...ParentCategory\\n      parentCategory {\\n        ...ParentCategory\\n        parentCategory {\\n          ...ParentCategory\\n          parentCategory {\\n            ...ParentCategory\\n            parentCategory {\\n              ...ParentCategory\\n              parentCategory {\\n                ...ParentCategory\\n                parentCategory {\\n                  ...ParentCategory\\n                  parentCategory {\\n                    ...ParentCategory\\n                    __typename\\n                  }\\n                  __typename\\n                }\\n                __typename\\n              }\\n              __typename\\n            }\\n            __typename\\n          }\\n          __typename\\n        }\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment ProductTiersFieldsPromo on Product {\\n  price(type: PROMOTIONAL) {\\n    productCode\\n    tradePrice {\\n      valueExVat\\n      valueIncVat\\n      __typename\\n    }\\n    retailPrice {\\n      valueExVat\\n      valueIncVat\\n      __typename\\n    }\\n    promotionalPriceTiers {\\n      finalPrice {\\n        valueExVat\\n        valueIncVat\\n        __typename\\n      }\\n      minimumQuantity\\n      promotionMessages\\n      promotionType\\n      promotionEndDate\\n      __typename\\n    }\\n    priceUom {\\n      code\\n      name\\n      prefix\\n      __typename\\n    }\\n    priceOnApplication\\n    tradeHireRates {\\n      period\\n      rate {\\n        valueExVat\\n        valueIncVat\\n        __typename\\n      }\\n      __typename\\n    }\\n    retailHireRates {\\n      period\\n      rate {\\n        valueExVat\\n        valueIncVat\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment DeliveryInfoFields on DeliveryInfo {\\n  deliveryAddress {\\n    id\\n    line1\\n    line2\\n    line3\\n    town\\n    postalCode\\n    deliveryContact {\\n      name\\n      telephone\\n      __typename\\n    }\\n    siteAccessRestrictions {\\n      deliveryQuestion\\n      deliveryAnswer\\n      deliveryComment\\n      demandDetails\\n      siteAccessInstructionsId\\n      __typename\\n    }\\n    __typename\\n  }\\n  deliveryInstructions\\n  deliveryPhoneNumber\\n  orderReference\\n  siteReference\\n  __typename\\n}\\n"}`,
    credentials: 'include',
  })
    .then(response => response.json())
    .then(json => json.data || {});
};

export const addForCollection = (code, qty, basketId, branchId) => {
  console.log('add for collection');
  return fetch('https://www.travisperkins.co.uk/graphql?op=basketAddTo', {
    headers,
    referrer: window.location.href,
    referrerPolicy: 'strict-origin-when-cross-origin',
    method: 'POST',
    mode: 'cors',
    body:
      `{"operationName":"basketAddTo","variables":{"input":{"code":"${
        code
      }","qty":${
        qty
      },"basketId":"${
        basketId
      }","collectionType":"COLLECT_IN_STOCK","deliveryType":null,"collectionBranch":"${
        branchId
      }"}},"query":"mutation basketAddTo($input: BasketAddToInput!) {\\n  basketAddTo(input: $input) {\\n    ...BasketFields\\n    __typename\\n  }\\n}\\n\\nfragment BasketFields on Basket {\\n  id\\n  code\\n  basketEntries {\\n    quantity\\n    product {\\n      code\\n      baseProductCode\\n      name\\n      description\\n      primaryImage {\\n        images {\\n          type\\n          url\\n          altText\\n          __typename\\n        }\\n        __typename\\n      }\\n      otherImages {\\n        images {\\n          type\\n          url\\n          altText\\n          __typename\\n        }\\n        __typename\\n      }\\n      ...ProductTiersFieldsPromo\\n      vatRate\\n      type\\n      variants {\\n        features {\\n          name\\n          value\\n          __typename\\n        }\\n        product {\\n          code\\n          __typename\\n        }\\n        __typename\\n      }\\n      parentCategory {\\n        ...ParentCategoryTree\\n        __typename\\n      }\\n      __typename\\n    }\\n    deliveryType\\n    collectionType\\n    fulfilmentBranch\\n    leadTimeDays\\n    __typename\\n  }\\n  appliedProductPromotions {\\n    code\\n    promotionType\\n    endDate\\n    promotionMessages\\n    consumedEntries {\\n      productCode\\n      quantity\\n      adjustedUnitPrice {\\n        valueExVat\\n        valueIncVat\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n  appliedOrderPromotions {\\n    code\\n    promotionType\\n    endDate\\n    promotionMessages\\n    consumedEntries {\\n      productCode\\n      quantity\\n      __typename\\n    }\\n    __typename\\n  }\\n  potentialOrderPromotions {\\n    code\\n    promotionType\\n    endDate\\n    promotionMessages\\n    consumedEntries {\\n      productCode\\n      __typename\\n    }\\n    __typename\\n  }\\n  potentialProductPromotions {\\n    code\\n    promotionType\\n    endDate\\n    promotionMessages\\n    consumedEntries {\\n      productCode\\n      quantity\\n      adjustedUnitPrice {\\n        valueExVat\\n        valueIncVat\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n  totals {\\n    subtotal {\\n      valueIncVat\\n      valueExVat\\n      __typename\\n    }\\n    deliveryCharge {\\n      valueIncVat\\n      valueExVat\\n      __typename\\n    }\\n    goodsVat\\n    total {\\n      valueIncVat\\n      valueExVat\\n      __typename\\n    }\\n    tradeSavings {\\n      valueIncVat\\n      valueExVat\\n      __typename\\n    }\\n    savingsPercent\\n    promotionalSavings {\\n      valueIncVat\\n      valueExVat\\n      __typename\\n    }\\n    __typename\\n  }\\n  deliveryInfo {\\n    ...DeliveryInfoFields\\n    __typename\\n  }\\n  appliedCoupon\\n  __typename\\n}\\n\\nfragment ParentCategory on Category {\\n  code\\n  name\\n  __typename\\n}\\n\\nfragment ParentCategoryTree on Category {\\n  ...ParentCategory\\n  parentCategory {\\n    ...ParentCategory\\n    parentCategory {\\n      ...ParentCategory\\n      parentCategory {\\n        ...ParentCategory\\n        parentCategory {\\n          ...ParentCategory\\n          parentCategory {\\n            ...ParentCategory\\n            parentCategory {\\n              ...ParentCategory\\n              parentCategory {\\n                ...ParentCategory\\n                parentCategory {\\n                  ...ParentCategory\\n                  parentCategory {\\n                    ...ParentCategory\\n                    __typename\\n                  }\\n                  __typename\\n                }\\n                __typename\\n              }\\n              __typename\\n            }\\n            __typename\\n          }\\n          __typename\\n        }\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment ProductTiersFieldsPromo on Product {\\n  price(type: PROMOTIONAL) {\\n    productCode\\n    tradePrice {\\n      valueExVat\\n      valueIncVat\\n      __typename\\n    }\\n    retailPrice {\\n      valueExVat\\n      valueIncVat\\n      __typename\\n    }\\n    promotionalPriceTiers {\\n      finalPrice {\\n        valueExVat\\n        valueIncVat\\n        __typename\\n      }\\n      minimumQuantity\\n      promotionMessages\\n      promotionType\\n      promotionEndDate\\n      __typename\\n    }\\n    priceUom {\\n      code\\n      name\\n      prefix\\n      __typename\\n    }\\n    priceOnApplication\\n    tradeHireRates {\\n      period\\n      rate {\\n        valueExVat\\n        valueIncVat\\n        __typename\\n      }\\n      __typename\\n    }\\n    retailHireRates {\\n      period\\n      rate {\\n        valueExVat\\n        valueIncVat\\n        __typename\\n      }\\n      __typename\\n    }\\n    __typename\\n  }\\n  __typename\\n}\\n\\nfragment DeliveryInfoFields on DeliveryInfo {\\n  deliveryAddress {\\n    id\\n    line1\\n    line2\\n    line3\\n    town\\n    postalCode\\n    deliveryContact {\\n      name\\n      telephone\\n      __typename\\n    }\\n    siteAccessRestrictions {\\n      deliveryQuestion\\n      deliveryAnswer\\n      deliveryComment\\n      demandDetails\\n      siteAccessInstructionsId\\n      __typename\\n    }\\n    __typename\\n  }\\n  deliveryInstructions\\n  deliveryPhoneNumber\\n  orderReference\\n  siteReference\\n  __typename\\n}\\n"}`,
    credentials: 'include',
  })
    .then(response => response.json())
    .then(json => json.data || {});
};

export default {};
