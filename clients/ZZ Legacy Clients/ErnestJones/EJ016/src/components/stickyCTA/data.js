const getProductData = () => {
  const productData = window.digitalData.product[0];
  const name = productData.productInfo.productName;
  const price = productData.price.currentPrice;

  return {
    name,
    price,
  };
};

export default getProductData;
