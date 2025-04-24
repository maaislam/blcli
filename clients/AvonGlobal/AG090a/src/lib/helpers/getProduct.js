const getProductDetails = (productGroupIds) => {
  console.log(productGroupIds);
  const campaign = _ShopContext.CampaignNumber;

  const response = fetch(
    `/api/productsapi/getproducts?language=en&campaignNumber=${campaign}&productIds=${productGroupIds.join(',')}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  ).then((response) => response.json());
  return response;
};

export default getProductDetails;
