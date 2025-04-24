import offerFilter from './offerFilter';
import offerHeaderInfo from './offerHeaderInfo';
import offerSlider from './offerSlider';

const getUniqueTags = (arr) => {
  const tagSet = new Set();

  arr.forEach((item) => {
    item.category.forEach((tag) => tagSet.add(tag));
  });

  return Array.from(tagSet);
};

const transformData = (data) => {
  if (!data) return [];
  const transformedData = data.flatMap((item) => {
    const categoryParts = item.categoryListNameFuzzy?.split(' > ');
    const offer = categoryParts?.pop();
    const category = categoryParts?.join(' > ');

    return item.promotions.map((promotion) => ({
      offer,
      category: category ? category?.split('>').map((item) => item.trim()) : [offer],
      promotionTitle: promotion?.replace(/�/g, '£'),
    }));
  });

  return transformedData;
};

const offerWrapper = (id, data, isFiltered = false) => {
  const result = !isFiltered ? transformData(data) : data;
  // console.log(result, 'result222');
  if (!window[`${id}__offers`]) {
    window[`${id}__offers`] = result;
  }
  const filterData = getUniqueTags(result);
  console.log(data, 'filterData:::');
  const totalCountPromos = !isFiltered ? data?.reduce((acc, item) => acc + parseInt(item.countPromos), 0) : data.length;
  const html = `
        <div class="${id}__offerWrapper">
            <div class="${id}__offerContainer">
                ${offerHeaderInfo(id, totalCountPromos)}
                <div class="${id}__offerContent">
                    <div class="${id}__offerContentSlider">
                        ${offerSlider(id, result)}
                    </div>
                    <div class="${id}__offerContentFilter">
                      ${offerFilter(id, filterData)}
                    </div>
                </div>
            </div>
        </div>
    `;

  return html.trim();
};

export default offerWrapper;
