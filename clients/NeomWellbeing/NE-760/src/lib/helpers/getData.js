import { comparisonProducts, extraData } from '../data';

const comparisonData = comparisonProducts[window.location.pathname];
const slotsData = Object.values(comparisonData);

const emptySlots = slotsData.filter((slot) => !slot.handle);

const filledSlots = slotsData.filter((slot) => slot.handle);

const fetchHandles = async () => {
  const response = await Promise.all(
    filledSlots.map(async ({ handle }) => {
      const data = await fetch(`${handle}.js`);
      return data.json();
    })
  ).then((results) => {
    let finalData = [];
    results.forEach((item, i) => {
      const { available, title, compare_at_price, price, images, url } = item;

      const staticCompareData = extraData[filledSlots[i].dataIndex];

      const obj = {
        available,
        title,
        compare_at_price,
        price,
        image: images[0],
        url,
        ...staticCompareData,
      };

      finalData[filledSlots[i].dataIndex] = obj;
    });

    emptySlots.forEach((slot) => {
      const staticCompareData = extraData[slot.dataIndex];
      const obj = {
        available: null,
        title: '',
        compare_at_price: '',
        price: '',
        image: '',
        url: '',
        ...staticCompareData,
      };

      finalData[slot.dataIndex] = obj;
    });

    return finalData;
  });
  return response;
};

export default fetchHandles;
