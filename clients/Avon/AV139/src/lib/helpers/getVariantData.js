import { pageData } from '../data';

const getVariantData = () => {
  const variantGroup = pageData.find((item) =>
    item.variants.some((variant) => window.location.pathname.includes(variant.productsId))
  );
  const currentVariants = variantGroup.variants.filter((item) => window.location.pathname !== '/products' + item.productsId);
  console.log(variantGroup);
  console.log('currentVariants:', currentVariants);
  const selectedVariant = variantGroup.variants.find((item) => window.location.pathname.includes(item.productsId));
  console.log('selectedVariant:', selectedVariant);

  // get Data

  const promises = [...currentVariants, selectedVariant].map((item) => {
    return fetch(`/products${item.productsId}.js`);
  });

  return Promise.all(promises)
    .then((responses) => {
      return Promise.allSettled(responses.map((response) => response.json()));
    })
    .then((jsonData) => {
      console.log('jsonData:', jsonData);

      const rearragedProducts = [];
      jsonData.forEach((item) => {
        if (item.status === 'rejected') return;
        //get the index of the current product in the variantGroup
        const currentProductIndex = variantGroup.variants.findIndex(
          (variant) => '/products' + variant.productsId === item.value.url
        );

        if (currentProductIndex >= 0) {
          rearragedProducts[currentProductIndex] = item;
        }
      });

      const data = rearragedProducts
        .map((item) => {
          const { status, value } = item;
          if (status === 'rejected') {
            return null;
          }
          const price = value.price < value.compare_at_price || !value.compare_at_price ? value.price : value.compare_at_price;
          const modifiedName = variantGroup.variants.find((el) => '/products' + el.productsId === value.url)?.name;

          return {
            id: value.id,
            name: value.title,
            modifiedVariantTitle: modifiedName,
            price,
            outOfStock: !value.available,
            url: value.url,
            selectedVariant,
          };
        })
        .filter(Boolean);
      return {
        data,
        selectedVariant,
      };
    });
};

export default getVariantData;
