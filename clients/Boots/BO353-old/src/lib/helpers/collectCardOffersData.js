import { deduplicateAndSort } from './utils';

const collectCardOffersData = (basketDetails) => {
  const allCardOffersData = [];

  if (basketDetails.orderLevelAppliedPromotions && basketDetails.orderLevelAppliedPromotions.length > 0) {
    const orderLevelAppliedWithAttribute = basketDetails.orderLevelAppliedPromotions.map((promo) => ({
      ...promo,
      status: 'applied',
    }));

    allCardOffersData.push(...orderLevelAppliedWithAttribute);
  }

  basketDetails.orderItems.forEach((order) => {
    const missingData = order.orderItemLevelApplicablePromotions || [];
    const appliedData = order.orderItemLevelAppliedPromotions || [];

    // Add a new attribute to each element in missingData
    const missingDataWithAttribute = missingData.map((promo) => ({
      ...promo,
      status: 'missing',
    }));

    // Add a new attribute to each element in appliedData
    const appliedDataWithAttribute = appliedData.map((promo) => ({
      ...promo,
      status: 'applied',
    }));

    // Push modified elements into allCardOffersData
    allCardOffersData.push(...missingDataWithAttribute, ...appliedDataWithAttribute);
  });

  return deduplicateAndSort(allCardOffersData);
};

export default collectCardOffersData;
