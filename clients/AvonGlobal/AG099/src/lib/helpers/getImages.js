const getImages = (profileNumber) => {
  const promises = [];
  const allImages = [];

  for (let index = 1; index < 1; index++) {
    const { Language, Market } = window._ShopContext;
    const imageUrl = `${
      window.location.origin
    }//assets/${Language.toLowerCase()}-${Market.toLowerCase()}/images/product/prod_${profileNumber}_${index}_613x613.jpg`;
    allImages.push(imageUrl);
    console.log(allImages);
    promises.push(fetch(imageUrl));
  }
  const allPromise = Promise.all(promises);

  allPromise.then((results) => {
    const images = results
      .map((item, i) => {
        if (item.status === 200) {
          return allImages[i];
        } else {
          return null;
        }
      })
      .filter(Boolean);
    console.log(images);
    return images;
  });
};

export default getImages;
