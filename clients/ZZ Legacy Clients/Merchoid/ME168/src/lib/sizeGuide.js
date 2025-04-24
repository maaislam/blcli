const sizeGuide = (country, callback) => {
  const USsizeInfo = {
    XS: ['US size 4', '32-34" chest'],
    S: ['US size 6', '34-36" chest'],
    M: ['US size 8', '37-38" chest'],
    L: ['US size 10', '39-40" chest'],
    XL: ['US size 12', '41-42" chest'],
    XXL: ['US size 16', '43-45" chest'],
    XXXL: ['US size 20', '46-47" chest'],
  };
  const UKsizeInfo = {
    XS: ['UK size 8', '32-34" chest'],
    S: ['UK size 10', '34-36" chest'],
    M: ['UK size 12', '37-38" chest'],
    L: ['UK size 14', '39-40" chest'],
    XL: ['UK size 16', '41-42" chest'],
    XXL: ['UK size 18', '43-45" chest'],
    XXXL: ['UK size 20', '46-47" chest'],
  };
  // Set to US if user is from the US
  if (window.wc_aelia_currency_switcher_params) {
    if (window.wc_aelia_currency_switcher_params.selected_currency === 'USD') {
      country = 'us';
    }
  }
  if (country === 'uk') {
    if (callback) {
      callback(UKsizeInfo);
    } else {
      return UKsizeInfo;
    }
  }
  if (country === 'us') {
    if (callback) {
      callback(USsizeInfo);
    } else {
      return USsizeInfo;
    }
  }
};

export default sizeGuide;
