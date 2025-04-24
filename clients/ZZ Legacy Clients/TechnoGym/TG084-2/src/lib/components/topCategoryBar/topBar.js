import settings from '../../../lib/settings';

const { ID } = settings;

export default class TopBar {
  constructor() {
    this.create();
    this.render();
  }

  create() {
    const element = document.createElement('div');
    element.classList.add(`${ID}-categoryBar`);
    element.innerHTML = `
    <span class="${ID}-catTitle">Show me treadmills for</span>
    <div class="${ID}-categoryLink" cat-target="#${ID}-myrun"><span>Fitness</span></div>
    <div class="${ID}-categoryLink" cat-target="#${ID}-skillMill"><span>Performance</span></div>`;

    this.component = element;
  }
  render() {
    const { component } = this;
    const topHeaderWrapper = document.querySelector(`.${ID}-topContent`);
    topHeaderWrapper.appendChild(component);
  }
}
