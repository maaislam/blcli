const getStrategyData = (strategyId = 204429, prodData = [], numberOfProducts = 50) => {
  const styles = {
    fail: ['color: white', 'background: red'],
    pass: ['color: white', 'background: green'],
    data: ['color: white', 'font-size: 16px', 'font-weight:700'],
    error: ['color: red', 'font-size: 16px', 'font-weight:700'],
  };
  const payload = {
    data: [
      {
        wId: window.BL_StrategyId || strategyId,
        fId: '',
        maxProducts: numberOfProducts,
      },
    ],
    ctx: {
      data: prodData,
      type: window.DY.recommendationContext.type,
    },
  };
  return fetch(`https://rcom-eu.dynamicyield.com/v3/recommend/${window.DY.section}`, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => {
      const errMsg = data.errorMessage;
      if (errMsg) {
        console.log('%c FAILED ', styles.fail.join(';'));
        console.log('%cError Message: ', styles.error.join(';'), errMsg);
        return;
      }
      console.log('%c PASSED ', styles.pass.join(';'));
      console.log('%cRecommendation Data: ', styles.data.join(';'), data.response[0]);
      return data.response[0].slots;
    })
    .then((data) => {
      console.log('DY data', data);
      const productGroupIds = data.map(({ item }) => item.group_id);

      console.log('🚀 ~ file: experiment.js:83 ~ getCart ~ urlsToFetch:', productGroupIds);
      // get Data from Avon now

      const { campaignNumber, Language } = window._ShopContext;

      return fetch(`/api/productsapi/getproducts?language=${Language}&campaignNumber=${campaignNumber}&productIds=${productGroupIds.join()}`)
        .then((response) => response.json())
        .then(({ Data }) => {
          console.log('🚀 ~ file: experiment.js:83 ~ getCart ~ data:', Data);
          return Data;
        });
    });
};
export default getStrategyData;
