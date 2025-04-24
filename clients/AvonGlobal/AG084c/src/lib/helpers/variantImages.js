import getProdDetails from './getProdDetails';

const placaVariantImages = (id) => {
  //place variant images
  const skuArr = [...document.querySelectorAll(`.${id}__cartline--product-details.include`)].map((item) => {
    return item.getAttribute('data-sku');
  });

  getProdDetails(skuArr).then((data) => {
    // console.log('data', data);
    const prodVariantData = data.result.map((item) => item.variantGroups[0].variants);
    let flatArray = prodVariantData.reduce((acc, curVal) => {
      const flatArray = [...acc, ...curVal];
      return flatArray.filter((item) => skuArr.indexOf(item.sku) !== -1);
    }, []);

    flatArray.forEach((item) => {
      item.imageUrl &&
        (document.querySelector(`[data-sku="${item.sku}"]>.${id}__variant--img`).style.backgroundImage = `url(${item.imageUrl})`);
    });
  });
};

export default placaVariantImages;
