/**
 * @var _catDefinitions
 */
const _catDefinitions = {
  'Bathtime': /bath-.*-(?!thermometer).*\/p/i,
  'Travel': /car-seat-.*\/p/i,
  'Feeding': /(high-chair-|highchair).*\/p|booster-seat-for-dining-table.*\/p/i,
};

const _catUrls = {
  'Bathtime': 'https://www.mamasandpapas.com/en-gb/c/bathtime?q=%3AtopRated%3AsubCat%3AAccessories%3AsubCat%3ABaby%20Care%3AsubCat%3ABath%20Seat%20%3AsubCat%3ABath%20Support%3AsubCat%3ABath%20Toys%3AsubCat%3AChanging%20Mats%3AsubCat%3ATowelling',
  'Travel': 'https://www.mamasandpapas.com/en-gb/c/travel-accessories',
  'Feeding': 'https://www.mamasandpapas.com/en-gb/c/feeding?q=%3Aprice-asc%3AsubCat%3AAccessories%3AsubCat%3ABaby%20Bud%3AsubCat%3ABaby%20Snug%3AsubCat%3ABaby%20Weaning%3AsubCat%3ABibs%20%26%20Muslins%3AsubCat%3ABlenders%3AsubCat%3ABottle%20Feeding%3AsubCat%3ABreastfeeding%3AsubCat%3AHighchair%20Toys%3AsubCat%3APregnancy%20%26%20Nursing%20Pillows%3AsubCat%3ARockers%3AsubCat%3ATeethers',
};

/**
 * Helper get category from URL
 */
const getCatDefinitionFromUrl = () => {
  let thisPageCatDefinition = null;
  if(window && window.location) {
    for(var k in _catDefinitions) {
      const regex = _catDefinitions[k];
      if(window.location.pathname.match(regex)) {
        thisPageCatDefinition = k;
      }
    }
  }

  return thisPageCatDefinition;
};

export {getCatDefinitionFromUrl};

const getCatUrlFromCatDefinition = (cat) => {
  return _catUrls[cat];
}

export {getCatUrlFromCatDefinition};
