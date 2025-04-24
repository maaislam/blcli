export const checkUserPurchase = (init) => {
  const STRATEGY_ID = 146861;
  DYO.recommendationWidgetData(STRATEGY_ID, {}, (error, data) => {
    if (error) {
      console.log(error);
      return;
    }

    const products = data.slots;
    const purchasedSamples = products.filter((product) => product.item.name.indexOf('Sample') !== -1).slice(0, 3);
    const purchasedFullSizedProducts = products.filter((product) => product.item.name.indexOf('Sample') === -1);
    if (purchasedSamples.length <= 0) return;
    init(purchasedSamples, purchasedFullSizedProducts);
  });
};
