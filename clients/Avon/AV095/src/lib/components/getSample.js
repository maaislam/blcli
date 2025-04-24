export const fetchSample = async () => {
  const response = await fetch('/collections/sample/products.json');
  return await response.json();
};
export const fetchSingleSample = async (handle) => {
  const response = await fetch(`${handle}.json`);
  return await response.json();
};
