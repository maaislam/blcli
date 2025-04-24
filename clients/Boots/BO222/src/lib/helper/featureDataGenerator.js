const valueFinder = (rawData, matchStr) => {
  const dataKeys = Object.keys(rawData);
  const dataValues = Object.values(rawData);
  return dataValues[dataKeys.findIndex((key) => key == matchStr)];
};

const productsGenerator = (rawData) => {
  const prod_desc = [];
  // const imaKeys = [];
  Array.from(Object.keys(rawData)).forEach((key) => {
    if (key.includes("Image")) {
      const valNum = parseInt(key.match(/[0-9]/)?.[0]);
      if (valNum != NaN) {
        prod_desc.push({
          image: valueFinder(rawData, key),
          prod_desc: valueFinder(rawData, `Key Feature Content ${valNum}`),
        });
      }
    }
  });
  return prod_desc;
};
export const featureDataGenerator = (rawData) => {
  const summary = valueFinder(rawData, "Key Feature Content");
  const products = productsGenerator(rawData);
  const url = window.location.href;
  const pageProductDetails = document.querySelector(`.row.template_row_spacer`);

  return {
    url,
    summary,
    products,
  };
};
