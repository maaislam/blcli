const triggerEvent = (btnType, fireEvent, localSave, cookieSave) => {
  const applyBtn = document.querySelector('[class^="DeliveryAddressSelector__ApplyButton-sc"] button');
  applyBtn?.click();

  if (btnType === 'trade') {
    fireEvent('customer identified as trade customer');
    localSave('TP229-usertype', btnType);
    cookieSave('TP229-usertype', btnType, 365);
  } else if (btnType === 'diy') {
    fireEvent('customer identified as DIY customer');
    localSave('TP229-usertype', btnType);
    cookieSave('TP229-usertype', btnType, 365);
  } else if (btnType === 'neither') {
    fireEvent('customer identified as "neither" customer');
    localSave('TP229-usertype', btnType);
    cookieSave('TP229-usertype', btnType, 365);
  }
};

export default triggerEvent;
