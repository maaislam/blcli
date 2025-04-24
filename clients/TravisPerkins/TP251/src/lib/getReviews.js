const getReviews = () => {
  return fetch(
    'https://readservices-b2c.powerreviews.com/m/788124/l/en_GB/product/250294/reviews?apikey=139ac5db-2c91-4112-ba89-2f931441016a'
  ).then((response) => response.json());
};

export default getReviews;
