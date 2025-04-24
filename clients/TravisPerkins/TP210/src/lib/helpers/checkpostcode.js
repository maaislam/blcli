const getPostcode = () => {
  const addr = localStorage.getItem('TP210-delivery-postcode');
  if (!addr) return false;

  const postcode = addr;
  if (!postcode) return false;
  return postcode;
};

export const postcodeMatch = (postcodes) => {
  const postcode = getPostcode();
  if (!postcode) return false;
  const space = postcode.indexOf(' ');
  return postcodes.indexOf(postcode.substr(0, space).toUpperCase()) !== -1;
};
