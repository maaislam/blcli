import algoliasearch from "algoliasearch";

const fetchAlgoliaResults = (productIDs) => {
  const client = algoliasearch(
    "89JDFPR8F6",
    "057d489220f6a6a7675568b41438c324"
  );

  return new Promise((res) => {
    const index = client.initIndex("prod_live_products_uk");
    index
      .getObjects(productIDs, {
        attributesToRetrieve: [
          "offerName",
          "regularPrice",
          "currentPrice",
          "productAttributes.hasPriceAdvantageDeal",
          "productAttributes.priceAdvPrice",
          // "inStock",
          "averageReviewScore",
          "numberOfReviews",
          "referenceImageURL",
          "actionURL",
          "promotionalText",
        ],
      })
      .then((data) => res(data.results));
  });
};

export default fetchAlgoliaResults;
