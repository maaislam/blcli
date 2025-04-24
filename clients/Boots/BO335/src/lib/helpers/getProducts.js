const getProducts = (productsArr) => {
  return fetch(`https://www.boots-optimisation.co.uk/prod-info/model/${productsArr.join('&')}`, {
    method: 'GET',
    headers: {
      accept: '*/*',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      return data;
    });
};

export default getProducts;