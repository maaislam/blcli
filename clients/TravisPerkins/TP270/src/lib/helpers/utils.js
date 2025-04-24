/*eslint-disable object-curly-newline */

export const isPDP = () => {
  return window.location.search.includes('?productSku');
};

export const isMobile = () => window.innerWidth < 767;

export const getItemData = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const sku = urlSearchParams.get('productSku');

  const quantity = 1;
  return [
    {
      productCode: sku,
      quantity,
    },
  ];
};

export const getCustomerLocation = () => {
  //No location set?
  const preselectedDeliveryAddress = JSON.parse(localStorage.getItem('preselectedDeliveryAddress'));
  const collectionBranch = JSON.parse(localStorage.getItem('collectionBranch'));

  const deliveryPostcode = preselectedDeliveryAddress ? preselectedDeliveryAddress.postalCode : false;
  const collectionBranchId = collectionBranch ? collectionBranch.code : false;

  if (!deliveryPostcode || !collectionBranchId) return false;
  return {
    deliveryPostcode,
    collectionBranchId,
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
  const date = `0${dateObj.getDate()}`;
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][dateObj.getMonth()];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const dayName = days[dateObj.getDay()];
  const desktopDateStr = `<span>${dayName} </span><span>${month} ${date.slice(-2)}</span>`;
  const mobileDateStr = `<span>${dayName.slice(0, 3)} ${date.slice(-2)}${getDateSuffix(date)} ${month}</span>`;

  return isMobile() ? mobileDateStr : desktopDateStr;
};

export const removeExisting = (elmSelector) => {
  document.querySelectorAll(elmSelector).forEach((item) => {
    item?.remove();
  });
};
