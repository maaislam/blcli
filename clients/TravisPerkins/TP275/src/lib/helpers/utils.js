import { getCookie } from '../../../../../../lib/utils';

const headers = {
  accept: '*/*',
  'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
  authorization: `Bearer ${getCookie('access_token')}`,
  bruid2: getCookie('_br_uid_2'),
  'content-type': 'application/json',
};

export const addForDelivery = (code, qty) => {
  const basketId = getCookie('basketId');
  console.log('add for delivery');
  const mutation = `
    mutation basketAddTo($input: BasketAddToInput!) {
  basketAddTo(input: $input) {
    ...BasketFields
    __typename
  }
}

fragment BasketFields on Basket {
  id
  code
  basketEntries {
    quantity
    tpplcProduct {
      sku
      id
      baseProductId
      name
      description
      primaryImage {
        images {
          type
          url
          altText
          __typename
        }
        __typename
      }
      otherImages {
        images {
          type
          url
          altText
          __typename
        }
        __typename
      }
      vatRate
      type
      variants {
        features {
          name
          value
          __typename
        }
        product {
          sku
          __typename
        }
        __typename
      }
      parentCategories {
        ...TPPLCParentCategoriesTree
        __typename
      }
      ...TPPLCProductPriceFields
      __typename
    }
    deliveryType
    collectionType
    fulfilmentBranch
    leadTimeDays
    __typename
  }
  appliedProductPromotions {
    code
    promotionType
    endDate
    promotionMessages
    consumedEntries {
      productCode
      quantity
      adjustedUnitPrice {
        valueExVat
        valueIncVat
        __typename
      }
      __typename
    }
    __typename
  }
  appliedOrderPromotions {
    code
    promotionType
    endDate
    promotionMessages
    consumedEntries {
      productCode
      quantity
      __typename
    }
    __typename
  }
  potentialOrderPromotions {
    code
    promotionType
    endDate
    promotionMessages
    consumedEntries {
      productCode
      __typename
    }
    __typename
  }
  potentialProductPromotions {
    code
    promotionType
    endDate
    promotionMessages
    consumedEntries {
      productCode
      quantity
      adjustedUnitPrice {
        valueExVat
        valueIncVat
        __typename
      }
      __typename
    }
    __typename
  }
  totals {
    subtotal {
      valueIncVat
      valueExVat
      __typename
    }
    deliveryCharge {
      valueIncVat
      valueExVat
      __typename
    }
    goodsVat
    total {
      valueIncVat
      valueExVat
      __typename
    }
    tradeSavings {
      valueIncVat
      valueExVat
      __typename
    }
    savingsPercent
    promotionalSavings {
      valueIncVat
      valueExVat
      __typename
    }
    __typename
  }
  deliveryInfo {
    ...DeliveryInfoFields
    __typename
  }
  appliedCoupon
  __typename
}

fragment TPPLCParentCategories on TpplcCategory {
  code
  name
  __typename
}

fragment TPPLCParentCategoriesTree on TpplcCategory {
  ...TPPLCParentCategories
  parentCategories {
    ...TPPLCParentCategories
    parentCategories {
      ...TPPLCParentCategories
      parentCategories {
        ...TPPLCParentCategories
        parentCategories {
          ...TPPLCParentCategories
          parentCategories {
            ...TPPLCParentCategories
            parentCategories {
              ...TPPLCParentCategories
              parentCategories {
                ...TPPLCParentCategories
                parentCategories {
                  ...TPPLCParentCategories
                  parentCategories {
                    ...TPPLCParentCategories
                    __typename
                  }
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
  __typename
}

fragment TPPLCProductPriceFields on TpplcProduct {
  price {
    price {
      ... on TpplcBuyPrice {
        promotionalPriceTiers {
          finalPrice {
            valueExVat
            valueIncVat
            __typename
          }
          minimumQuantity
          promotionEndDate
          promotionMessages
          promotionType
          __typename
        }
        retailPrice {
          valueExVat
          valueIncVat
          __typename
        }
        tradePrice {
          valueExVat
          valueIncVat
          __typename
        }
        typicalTradePrice {
          valueExVat
          valueIncVat
          __typename
        }
        tradePriceType
        __typename
      }
      ... on TpplcHirePrice {
        retailHireRates {
          period
          rate {
            valueExVat
            valueIncVat
            __typename
          }
          __typename
        }
        tradeHireRates {
          period
          rate {
            valueExVat
            valueIncVat
            __typename
          }
          __typename
        }
        __typename
      }
      __typename
    }
    priceOnApplication
    priceUom {
      code
      name
      prefix
      __typename
    }
    __typename
  }
  __typename
}

fragment DeliveryInfoFields on DeliveryInfo {
  deliveryAddress {
    id
    line1
    line2
    line3
    town
    postalCode
    deliveryContact {
      name
      telephone
      __typename
    }
    siteAccessRestrictions {
      deliveryQuestion
      deliveryAnswer
      deliveryComment
      demandDetails
      siteAccessInstructionsId
      __typename
    }
    __typename
  }
  deliveryInstructions
  deliveryPhoneNumber
  orderReference
  siteReference
  __typename
}
  
  `;
  const variables = {
    input: {
      code: code,
      qty: qty,
      basketId: basketId,
      collectionType: null,
      deliveryType: 'BRANCH', // Assuming this is a constant value
      collectionBranch: null,
      supplierLeadTimeDays: null,
    },
  };
  return fetch('https://www.travisperkins.co.uk/graphql?op=basketAddTo', {
    headers,
    referrer: window.location.href,
    referrerPolicy: 'strict-origin-when-cross-origin',
    method: 'POST',
    body: JSON.stringify({
      operationName: 'basketAddTo',
      variables: variables,
      query: mutation,
    }),
    mode: 'cors',
    credentials: 'include',
  })
    .then((response) => response.json())
    .then((json) => json.data || {});
};
export const convertToSlug = (inputString) => inputString.toLowerCase().replace(/ /g, '-');

export const formatPrice = (amount, code = 'en-GB', currency = 'GBP') => {
  return new Intl.NumberFormat(code, {
    style: 'currency',
    currency,
  }).format(amount);
};
