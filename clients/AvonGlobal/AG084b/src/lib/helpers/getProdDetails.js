const getProdDetails = (skusArr) => {
  const { brochure_id, campaignNumber } = PDP_MANAGER['API_DATA'];

  const response = fetch(
    `https://api.we.avon.digital-catalogue.com/avon-mas/UK/product/view-data/${campaignNumber}/?brochureId=${brochure_id}`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ skus: skusArr }),
    }
  ).then((response) => response.json());
  return response;
};

export default getProdDetails;
