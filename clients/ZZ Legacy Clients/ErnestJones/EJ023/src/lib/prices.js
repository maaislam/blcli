/**
 * Helper parse price
 */
export const parsePrice = (string) => {
  const matches = string.match(/£(\d+(\.\d{2})?)/i);

  let result = null;
  if(matches && matches[1]) {
    result = parseFloat(matches[1]);
  }

  return result;
};
