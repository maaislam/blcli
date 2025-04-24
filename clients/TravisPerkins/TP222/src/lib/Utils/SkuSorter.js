/* eslint-disable import/prefer-default-export */
// function which checks if sku is in array
export function isSkuInArray(sku, array) {
  return array.some(item => item === sku);
}
