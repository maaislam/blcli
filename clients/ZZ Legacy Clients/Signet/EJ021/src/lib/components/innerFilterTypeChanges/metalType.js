import settings from '../../settings';

export default () => {

  const metals = {
    'All Silver': 'silver',
    'Yellow Gold': 'yellowGold',
    'White Gold': 'whiteGold',
    'Rose Gold': 'roseGold',
    'Two colour Gold': 'twoColour',
    'Three colour Gold': 'threeColour',
    Platinum: 'platinum',
    Palladium: 'palladium',
    'Rhodium plated': 'rhodiumPlated',
    Titanium: 'titanium',
    'Stainless Steel': 'stainlessSteel',
    Tungsten: 'tungsten',
    Cobalt: 'colbalt',
  };

  const allMetals = document.querySelectorAll('#refinement-material .styled-checkbox.filters-panel__refinement-selector');
  for (let index = 0; index < allMetals.length; index += 1) {
    const element = allMetals[index];
    const elTitle = element.textContent.trim().replace(/\s(\()[\d]+(\))/gi, '');
    if (metals[elTitle]) {
      element.classList.add(`${settings.ID}-${metals[elTitle]}`);
    }
  }
};
