import { pageData } from '../data';

const getVariantData = () => {
  const variantGroup = pageData.find((item) =>
    item.variants.some((variant) => window.location.pathname.includes(variant.productsId))
  );
  const currentVariants = variantGroup.variants.filter((item) => !window.location.pathname.includes(item.productsId));
  console.log(variantGroup.variants);

  const selectedVariant = variantGroup.variants.find((item) => window.location.pathname.includes(item.productsId));
  //console.log('selectedVariant:', selectedVariant);

  // get Data
  const campaignID = window._ShopContext.CampaignNumber;
  const fetchURL = `/api/productsapi/getproducts?language=en&campaignNumber=${campaignID}&productIds=${variantGroup.variants.map(
    (variant) => variant.productsId
  )}`;
  return fetch(fetchURL)
    .then((response) => response.json())
    .then((jsonData) => {
      const products = jsonData.Data;
      const rearragedProducts = [];
      products.forEach((item) => {
        //get the index of the current product in the variantGroup
        const currentProductIndex = variantGroup.variants.findIndex((variant) => variant.productsId * 1 === item.Id);
        console.log('file: getVariantData.js:26 ~ products.forEach ~ currentProductIndex:', currentProductIndex);

        currentProductIndex >= 0 && (rearragedProducts[currentProductIndex] = item);
      });
      console.log('rearragedProducts:', rearragedProducts.filter(Boolean));

      const data = rearragedProducts.filter(Boolean).map((item) => {
        const modifiedName = variantGroup.variants.find((el) => el.productsId * 1 === item.Id)?.name;
        // console.log('file: getVariantData.js:24 ~ data ~ modifiedName:', modifiedName);

        return {
          id: item.Id,
          name: item.Name,
          modifiedVariantTitle: modifiedName,
          price: item.SalePriceFormatted || item.PriceFormatted,
          outOfStock: item.IsOutOfStock,
          varinatInfo: item.MetaTitle,
          variantName: item.PricePerUnitInformation,
          url: `/product/${item.Id}/${item.Slug}`,
          selectedVariant,
        };
      });
      return {
        data,
        selectedVariant,
      };
    });
};

export default getVariantData;
