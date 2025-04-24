const getProductDetails = (productGroupIds) => {
  console.log(productGroupIds);
  const campaign = _ShopContext.CampaignNumber;

  const response = fetch(`/api/productsapi/getproducts?language=en&campaignNumber=${campaign}&productIds=${productGroupIds}`, {
    method: 'GET',
  }).then((response) => response.json());
  return response;
};

export default getProductDetails;
