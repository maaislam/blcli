import { updateUrlParameter } from '../../../../../../lib/utils';

const applyPrice = () => {

  const lowPrice = jQuery('#lowLimit').val();
  const highPrice = jQuery('#highLimit').val();

  let url = window.location.href;

  console.log(lowPrice);
  console.log(highPrice);
  if (lowPrice === '' && highPrice !== '') { // if low price empty, high price entered
    url = updateUrlParameter(url, 'Nf', `P_Current_Price%7CBTWN+0+${highPrice}`);
  } else if (highPrice === '' && lowPrice !== '') { // if high price empty, low price entered
    url = updateUrlParameter(url, 'Nf', `P_Current_Price%7CBTWN+${lowPrice}+9999`);
  } else if (highPrice === '' && lowPrice === '') { // if both entered
    url = updateUrlParameter(url, 'Nf', 'P_Current_Price%7CBTWN+0+9999');
  } else { // if none entered
    url = updateUrlParameter(url, 'Nf', `P_Current_Price%7CBTWN+${lowPrice}+${highPrice}`);
  }
  window.location.href = url;
};

export default applyPrice;


