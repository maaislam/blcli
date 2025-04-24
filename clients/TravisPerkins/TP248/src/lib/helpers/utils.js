/*eslint-disable object-curly-newline */

export const isPDP = () => {
  return !!document.querySelector('[data-test-id="pdp-wrapper"]');
};

export const isPLP = () => {
  return !!document.querySelector('[data-test-id="plp-wrapper"]');
};

export const isMobile = () => window.innerWidth < 767;

export const getItemData = () => {
  const prodCards  = document.querySelectorAll('[data-test-id="product"]');
  const productData = Array?.from(prodCards).map((item)=>{
    const sku = item.querySelector('[data-test-id="product-card-code"]').innerText.split(':')[1]
    return {
      productCode: sku?.trim(),
      quantity: 1
    }
  });
  return productData;
};

export const getCustomerLocation = () => {
  //No location set?
  const preselectedDeliveryAddress = JSON.parse(localStorage.getItem('preselectedDeliveryAddress'));
  const collectionBranch = JSON.parse(localStorage.getItem('collectionBranch'));

  const deliveryPostcode = preselectedDeliveryAddress
    ? preselectedDeliveryAddress.postalCode
    : false;
  const collectionBranchId = collectionBranch ? collectionBranch.code : false;

  if (!deliveryPostcode || !collectionBranchId) return false;
  return {
    deliveryPostcode,
    collectionBranchId
  };
};

export const formatDateStr = (dateStr) => {
  const getDateSuffix = (d) => {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };
  const dateObj = new Date(dateStr);
  const date = `${dateObj.getDate()}`;
  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ][dateObj.getMonth()];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const dayName = days[dateObj.getDay()];
  const desktopDateStr = `<span>Delivery available from </span><span>${month} ${date.slice(-2)}${getDateSuffix(
    date
  )}</span>`;

  const customMobileDateStr = `<span>Delivery available from </br></span><span>${month} ${date.slice(-2)}${getDateSuffix(
    date
  )}</span>`;
  // const mobileDateStr = `<span>${dayName.slice(0, 3)} ${date.slice(-2)}${getDateSuffix(
  //   date
  // )} ${month}</span>`;

  return window.innerWidth < 440 ? customMobileDateStr : desktopDateStr;
  //return desktopDateStr;
};

export const removeExisting = (elmSelector) => {
  document.querySelectorAll(elmSelector).forEach((item) => {
    item?.remove();
  });
};
