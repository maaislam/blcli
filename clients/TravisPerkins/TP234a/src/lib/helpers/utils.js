export const isPLP = () => {
  return location.pathname.indexOf('/search/') !== -1 || location.pathname.indexOf('/product/') !== -1;
};
const getCookie = (name) => {
  const match = document.cookie.match(new RegExp(`(^|;\\s?)${name}=([^;]*)`));
  return match && match[2] ? unescape(match[2]) : undefined;
};
const headers = {
  accept: '*/*',
  'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
  bruid2: getCookie('_br_uid_2'),
  'content-type': 'application/json',
  'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
  'sec-ch-ua-mobile': '?0',
  'sec-fetch-dest': 'empty',
  'sec-fetch-mode': 'cors',
  'sec-fetch-site': 'same-origin',
  'x-data-consumer-name': 'TP-WEB',
  'x-tp-checkout-new': 'true',
  'x-tp-request-id': '24fb997c-466b-425f-8bef-e388c5996eab',
  'x-tp-session-id': getCookie('x-tp-session-id'),
};

export const getEligibility = (prodCode, customerLocation) =>
  fetch('https://www.travisperkins.co.uk/graphql?op=productEligibility', {
    headers,
    referrer: window.location.href,
    referrerPolicy: 'strict-origin-when-cross-origin',
    method: 'POST',
    mode: 'cors',
    body: `{"operationName":"productEligibility","variables":{"items":[{\"productCode\":\"${prodCode}\",\"quantity\":1}],"customerLocation": ${JSON.stringify(
      customerLocation
    )}},"query":"query productEligibility($items: [ItemEntryInput], $customerLocation: CustomerLocationInput) {\\n  productEligibility(items: $items, customerLocation: $customerLocation) {\\n    item {\\n      productCode\\n      quantity\\n      __typename\\n    }\\n    collectionEligibility {\\n      status\\n      statusReason\\n      minimumOrderQuantity\\n      __typename\\n    }\\n    deliveryEligibility {\\n      status\\n      statusReason\\n      type\\n      estimatedDate\\n      supplierLeadTimeDays\\n      cutOffTime\\n      minimumOrderQuantity\\n      __typename\\n    }\\n    __typename\\n  }\\n}\\n"}`,
    credentials: 'include',
  })
    .then((response) => response.json())
    .then((json) => json.data?.productEligibility || {});

export const getStock = (branchCodes, productCodes) =>
  fetch('https://www.travisperkins.co.uk/graphql?op=stock', {
    headers,
    referrer: window.location.href,
    referrerPolicy: 'strict-origin-when-cross-origin',
    method: 'POST',
    mode: 'cors',
    body: `{"operationName":"stock","variables":{"branchCodes":${JSON.stringify(branchCodes)},"productCodes":${JSON.stringify(
      productCodes
    )}},"query":"query stock($branchCodes: [String!]!, $productCodes: [String!]!) {\\n  stock(branchCodes: $branchCodes, productCodes: $productCodes) {\\n    branchCode\\n    productCode\\n    quantity\\n    uom\\n    __typename\\n  }\\n}\\n"}`,
    credentials: 'include',
  })
    .then((response) => response.json())
    .then((json) => json.data.stock || {});

export const getCustomerLocation = () => {
  // No location set?
  const preselectedDeliveryAddress = JSON.parse(localStorage.getItem('preselectedDeliveryAddress'));
  const collectionBranch = JSON.parse(localStorage.getItem('collectionBranch'));

  const deliveryPostcode = preselectedDeliveryAddress ? preselectedDeliveryAddress.postalCode : false;
  const collectionBranchId = collectionBranch ? collectionBranch.code : false;

  if (!deliveryPostcode && !collectionBranchId) return false;
  return { deliveryPostcode, collectionBranchId };
};
