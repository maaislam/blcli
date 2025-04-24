import settings from '../../settings';

export default () => {

  const shapes = {
    Baguette: 'baguette',
    'Brilliant (Round)': 'brilliant',
    Cushion: 'cushion',
    Emerald: 'emerald',
    Heart: 'heart',
    Marquise: 'marquise',
    Oval: 'oval',
    Pear: 'pear',
    Princess: 'princess',
    Radiant: 'radiant',
    Rectangle: 'rectangle',
    Round: 'round',
    Square: 'square',
  };

  const allShapes = document.querySelectorAll('#refinement-stone-shape .styled-checkbox.filters-panel__refinement-selector');
  for (let index = 0; index < allShapes.length; index += 1) {
    const element = allShapes[index];
    const elTitle = element.textContent.trim().replace(/\s(\()[\d]+(\))/gi, '');
    if (shapes[elTitle]) {
      element.classList.add(`${settings.ID}-${shapes[elTitle]}`);
    }
  }
};
