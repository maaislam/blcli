import shared from "./shared";

let voucherCode;
let freeDeliveryAmount;

const { ID, VARIATION } = shared;

export const deliveryThreshold = () => {
    if (VARIATION === '1') {
      freeDeliveryAmount = 30;
    } else if (VARIATION === '2') {
      freeDeliveryAmount = 35
    } else if (VARIATION === '3') {
      freeDeliveryAmount = 40;
    }
    return freeDeliveryAmount;
  }

export const getVoucherCode = () => {
    if (VARIATION === '1') {
      voucherCode = 'FREEDEL30';
    } else if (VARIATION === '2') {
      voucherCode = 'FREEDEL35';
    } else if (VARIATION === '3') {
      voucherCode = 'FREEDEL40';
    }
    return voucherCode;
}