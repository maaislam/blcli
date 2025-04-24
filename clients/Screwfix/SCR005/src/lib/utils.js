export const getCategoryId = () => {
  const dataObjs = window.dataLayer.filter((item) => typeof item === 'object');

  const catIdObj = dataObjs.find((item) => item.prodCategoryId);
  return catIdObj.prodCategoryId;
};
